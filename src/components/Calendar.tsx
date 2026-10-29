"use client";

import { useMemo, useState, useEffect } from "react";
import { buildCalendarGrid, getAvailableSlots, isClosed } from "@/lib/schedule";
import { DAY_NAMES } from "@/lib/data";

interface Props {
  serviceDuration: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  bookedSlots: Record<string, string[]>;
  bookedDurations: Record<string, Record<string, number>>;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  calendarMonth: number;
  calendarYear: number;
  onChangeMonth: (delta: number) => void;
}

const SHORT_DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function Calendar({
  serviceDuration,
  selectedDate,
  selectedTime,
  bookedSlots,
  bookedDurations,
  onSelectDate,
  onSelectTime,
  calendarMonth,
  calendarYear,
  onChangeMonth,
}: Props) {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
  }, []);

  const weeks = useMemo(
    () => buildCalendarGrid(calendarYear, calendarMonth),
    [calendarYear, calendarMonth]
  );

  const dateKey = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  const computedSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableSlots(
      selectedDate,
      serviceDuration,
      bookedSlots[dateKey] ?? [],
      bookedDurations[dateKey] ?? {}
    );
  }, [selectedDate, serviceDuration, bookedSlots, bookedDurations, dateKey]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Calendar grid */}
      <div className="rounded-xl border border-zinc-850 bg-[#121212]/70 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => onChangeMonth(-1)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-[#F4F4F5] transition-colors"
            aria-label="Mes anterior"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-base font-semibold text-[#F4F4F5] tracking-wide">
            {MONTH_NAMES[calendarMonth]} <span className="text-[#D4AF37]">{calendarYear}</span>
          </h3>
          <button
            type="button"
            onClick={() => onChangeMonth(1)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-[#F4F4F5] transition-colors"
            aria-label="Mes siguiente"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {SHORT_DAYS.map((d, idx) => (
            <div
              key={d}
              className={`text-center text-xs font-medium py-1.5 ${
                idx === 1 ? "text-red-400/70" : "text-zinc-500"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-1.5">
          {weeks.flat().map((date, i) => {
            if (!date) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }

            const isPast = today ? date < today : false;
            const closed = isClosed(date);
            const disabled = isPast || closed;
            const isSelected =
              selectedDate &&
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear();
            const isToday =
              today &&
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            return (
              <button
                type="button"
                key={date.toISOString()}
                disabled={disabled}
                onClick={() => onSelectDate(date)}
                title={
                  closed
                    ? "Lunes / Cerrado"
                    : isPast
                    ? "Fecha anterior"
                    : `${DAY_NAMES[date.getDay()]} ${date.getDate()}`
                }
                className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-xs sm:text-sm transition-all duration-200 ${
                  disabled
                    ? "text-zinc-700 bg-transparent cursor-not-allowed opacity-50"
                    : isSelected
                    ? "bg-[#D4AF37] text-[#0B0B0B] font-bold shadow-lg shadow-[#D4AF37]/20 scale-105"
                    : isToday
                    ? "border border-[#D4AF37]/50 text-[#F4F4F5] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-[#F4F4F5]"
                }`}
              >
                <span>{date.getDate()}</span>
                {closed && !isPast && (
                  <span className="text-[9px] text-zinc-600 leading-none">Off</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Schedule metadata for selected day */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
            <span>1 Estilista exclusivo</span>
          </div>
          <div>
            {selectedDate ? (
              <span className={isClosed(selectedDate) ? "text-red-400" : "text-zinc-300"}>
                {DAY_NAMES[selectedDate.getDay()]}:{" "}
                {isClosed(selectedDate)
                  ? "Cerrado"
                  : selectedDate.getDay() === 0 || selectedDate.getDay() >= 5
                  ? "10:30 am – 3:30 pm"
                  : "10:30 am – 6:30 pm"}
              </span>
            ) : (
              <span>Elige un día activo</span>
            )}
          </div>
        </div>
      </div>

      {/* Time slots */}
      <div className="rounded-xl border border-zinc-850 bg-[#121212]/70 p-5 backdrop-blur-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#F4F4F5] tracking-wide">
              {selectedDate ? "Turnos disponibles" : "Selecciona una fecha"}
            </h3>
            {selectedDate && !isClosed(selectedDate) && (
              <span className="text-xs text-zinc-400">
                Margen de 10 min entre citas
              </span>
            )}
          </div>

          {!selectedDate ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              <svg className="mx-auto h-8 w-8 text-zinc-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Selecciona un día en el calendario para ver los horarios calculados para tu servicio.
            </div>
          ) : isClosed(selectedDate) ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              El salón permanece cerrado este día. Por favor elige de Martes a Domingo.
            </div>
          ) : computedSlots.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No hay turnos disponibles que concluyan antes de la hora de cierre para esta duración ({serviceDuration} min).
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {computedSlots.map((slot) => {
                const isSelected = selectedTime === slot.startTime;
                return (
                  <button
                    type="button"
                    key={slot.startTime}
                    disabled={!slot.available}
                    onClick={() => onSelectTime(slot.startTime)}
                    className={`group relative flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all duration-150 ${
                      !slot.available
                        ? "border-zinc-800/50 bg-zinc-900/30 text-zinc-600 cursor-not-allowed line-through"
                        : isSelected
                        ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] font-semibold ring-1 ring-[#D4AF37]"
                        : "border-zinc-800 bg-[#161616] text-zinc-200 hover:border-zinc-600 hover:bg-zinc-800/80"
                    }`}
                  >
                    <span className="text-sm font-medium tracking-tight">
                      {slot.startTime}
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-0.5 group-hover:text-zinc-400">
                      Termina {slot.endTime}
                    </span>
                    {!slot.available && (
                      <span className="text-[10px] text-red-400/80 mt-0.5">
                        {slot.reason ?? "Ocupado"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {selectedTime && selectedDate && (
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Turno seleccionado:</span>
            <span className="text-sm font-semibold text-[#D4AF37]">{selectedTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
