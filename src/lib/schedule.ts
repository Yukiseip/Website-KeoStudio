import {
  WEEKLY_SCHEDULE,
  BUFFER_MINUTES,
  type DaySchedule,
} from "./data";

export interface TimeSlot {
  startTime: string; // e.g. "10:30 am"
  endTime: string;   // e.g. "11:10 am"
  startMinutes: number;
  endMinutes: number;
  available: boolean;
  reason?: string;
}

/**
 * Returns the schedule for a given date, or null if the salon is closed.
 */
export function getScheduleForDate(date: Date): DaySchedule | null {
  return WEEKLY_SCHEDULE[date.getDay()] ?? null;
}

/**
 * Returns true when the given date is a day the salon is closed (Monday / holiday).
 */
export function isClosed(date: Date): boolean {
  return getScheduleForDate(date) === null;
}

/**
 * Parse any time string ("10:30", "10:30 am", "01:20 pm") into total minutes from midnight.
 */
export function parseTimeToMinutes(t: string): number {
  const clean = t.trim().toLowerCase();
  const isPM = clean.includes("pm");
  const isAM = clean.includes("am");
  const numOnly = clean.replace(/[^\d:]/g, "");
  const [hStr, mStr] = numOnly.split(":");
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;

  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;

  return h * 60 + m;
}

/**
 * Format total minutes from midnight into 12-hour format ("10:30 am", "01:20 pm").
 */
export function formatMinutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const period = h >= 12 ? "pm" : "am";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}

/**
 * Calculate dynamic slots for a given date and service duration.
 * Strictly respects:
 *  - 1 stylist capacity (at most 1 client at a time).
 *  - 10 min cleaning/prep buffer between appointments.
 *  - Closing time limit (no appointment can finish after closing).
 *  - Booked slots preventing double-booking.
 */
export function getAvailableSlots(
  date: Date,
  serviceDuration: number,
  bookedSlots: string[] = [],
  bookedDurations: Record<string, number> = {}
): TimeSlot[] {
  const schedule = getScheduleForDate(date);
  if (!schedule) return [];

  const openMin = parseTimeToMinutes(schedule.open);
  const closeMin = parseTimeToMinutes(schedule.close);

  // Parse booked occupied intervals [bookedStart, bookedEndWithBuffer)
  const occupiedRanges: Array<{ start: number; endWithBuffer: number }> = bookedSlots.map((slot) => {
    const start = parseTimeToMinutes(slot);
    const duration = bookedDurations[slot] ?? serviceDuration;
    return {
      start,
      endWithBuffer: start + duration + BUFFER_MINUTES,
    };
  });

  const slots: TimeSlot[] = [];
  const step = serviceDuration + BUFFER_MINUTES;

  // Generate slots starting from opening time
  for (let current = openMin; current + serviceDuration <= closeMin; current += step) {
    const appointmentEnd = current + serviceDuration;
    const appointmentWithBuffer = appointmentEnd + BUFFER_MINUTES;

    // Check overlap with any existing booked range
    const hasCollision = occupiedRanges.some((range) => {
      // Overlap occurs if this appointment (including buffer) conflicts with an existing range
      return current < range.endWithBuffer && appointmentWithBuffer > range.start;
    });

    slots.push({
      startTime: formatMinutesToTime(current),
      endTime: formatMinutesToTime(appointmentEnd),
      startMinutes: current,
      endMinutes: appointmentEnd,
      available: !hasCollision,
      reason: hasCollision ? "Ocupado" : undefined,
    });
  }

  return slots;
}

/**
 * Build a calendar grid for a given month/year (Sunday to Saturday).
 */
export function buildCalendarGrid(
  year: number,
  month: number
): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();

  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = new Array(startDow).fill(null);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}
