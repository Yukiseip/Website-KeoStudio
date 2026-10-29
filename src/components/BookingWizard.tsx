"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { type Service, DAY_NAMES, LOCATION } from "@/lib/data";
import ServiceGrid from "./ServiceGrid";
import Calendar from "./Calendar";

interface ContactData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export default function BookingWizard() {
  // Wizard steps: 0 = Service, 1 = Date & Time, 2 = Contact
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactData>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Month navigation (initialized safely on mount to satisfy Next.js 16 prerender requirements)
  const [calendarMonth, setCalendarMonth] = useState(9);
  const [calendarYear, setCalendarYear] = useState(2026);

  // Local state persistence for booked slots (seeded with mock booked slot for demonstration)
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [bookedDurations, setBookedDurations] = useState<
    Record<string, Record<string, number>>
  >({});

  useEffect(() => {
    const now = new Date();
    setCalendarMonth(now.getMonth());
    setCalendarYear(now.getFullYear());

    const sampleDateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate() + 1).padStart(2, "0")}`;
    setBookedSlots({
      [sampleDateKey]: ["10:30 am"],
    });
    setBookedDurations({
      [sampleDateKey]: {
        "10:30 am": 40,
      },
    });
  }, []);

  const handleSelectService = useCallback((service: Service) => {
    setSelectedService(service);
    setSelectedTime(null);
    setStep(1);
  }, []);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleSelectTime = useCallback((time: string) => {
    setSelectedTime(time);
    setStep(2);
  }, []);

  const handleChangeMonth = useCallback(
    (delta: number) => {
      let m = calendarMonth + delta;
      let y = calendarYear;
      if (m < 0) {
        m = 11;
        y--;
      }
      if (m > 11) {
        m = 0;
        y++;
      }
      setCalendarMonth(m);
      setCalendarYear(y);
    },
    [calendarMonth, calendarYear]
  );

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "";
    return `${DAY_NAMES[selectedDate.getDay()]} ${selectedDate.getDate()} de ${selectedDate.toLocaleDateString("es-MX", { month: "long" })} ${selectedDate.getFullYear()}`;
  }, [selectedDate]);

  // Handle final reservation confirmation
  const handleConfirm = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    if (!contact.name.trim() || !contact.phone.trim()) return;

    setIsSubmitting(true);

    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    // Structure ready for Google Calendar API payload
    const _googleCalendarPayload = {
      summary: `Cita Kéo Salón: ${selectedService.name} - ${contact.name}`,
      description: `Cliente: ${contact.name}\nWhatsApp: ${contact.phone}\nEmail: ${contact.email}\nServicio: ${selectedService.name} ($${selectedService.price})\nNotas: ${contact.notes}`,
      location: `${LOCATION.street}, ${LOCATION.colony}, ${LOCATION.borough}, ${LOCATION.city}`,
      date: dateKey,
      time: selectedTime,
      durationMinutes: selectedService.duration,
    };

    // Structure ready for Resend email integration
    const _resendEmailPayload = {
      to: contact.email ? [contact.email, "contacto@keosalon.com"] : ["contacto@keosalon.com"],
      subject: `Confirmación de Cita — Kéo Salón-Studio (${selectedService.name})`,
      clientName: contact.name,
      serviceName: selectedService.name,
      appointmentDate: formattedDate,
      appointmentTime: selectedTime,
    };

    // Simulate network submission
    await new Promise((r) => setTimeout(r, 600));

    // Persist slot locally to ensure no double-booking
    setBookedSlots((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), selectedTime],
    }));

    setBookedDurations((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] ?? {}),
        [selectedTime]: selectedService.duration,
      },
    }));

    setIsSubmitting(false);
    setConfirmed(true);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setContact({ name: "", phone: "", email: "", notes: "" });
    setConfirmed(false);
  };

  // WhatsApp prefilled link for booking confirmation
  const whatsappBookingUrl = useMemo(() => {
    if (!selectedService || !selectedDate || !selectedTime) return LOCATION.whatsapp;
    const msg = `¡Hola Kéo Salón! Acabo de registrar mi cita:\n\n✨ Servicio: ${selectedService.name}\n📅 Fecha: ${formattedDate}\n⏰ Hora: ${selectedTime}\n👤 Nombre: ${contact.name}\n📱 Teléfono: ${contact.phone}${contact.notes ? `\n📝 Notas: ${contact.notes}` : ""}\n\n¿Me confirman su disponibilidad? ¡Gracias!`;
    return `https://wa.me/525512345678?text=${encodeURIComponent(msg)}`;
  }, [selectedService, selectedDate, selectedTime, formattedDate, contact]);

  const STEPS = [
    { label: "1. Servicio", completed: !!selectedService },
    { label: "2. Fecha & Hora", completed: !!selectedDate && !!selectedTime },
    { label: "3. Contacto", completed: !!contact.name && !!contact.phone },
  ];

  return (
    <section id="reservar" className="relative py-24 px-5 scroll-mt-16">
      {/* Glow highlight */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-[#141414] text-xs text-[#D4AF37] mb-3">
            <span>Atención exclusiva 1:1</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F4F5] tracking-tight">
            Motor de Reservaciones
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-md mx-auto">
            Elige tu tratamiento, selecciona un bloque garantizado sin esperas y recibe confirmación instantánea.
          </p>
        </div>

        {/* Success Modal */}
        {confirmed && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#121212] p-6 sm:p-8 text-center shadow-2xl relative">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="font-serif text-2xl text-[#F4F4F5] mb-1">
                ¡Cita Registrada con Éxito!
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Hemos reservado tu turno exclusivo en Kéo Salón-Studio.
              </p>

              {/* Receipt Summary Card */}
              <div className="rounded-xl border border-zinc-800 bg-[#18181B] p-5 text-left mb-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Servicio</span>
                  <span className="font-medium text-[#F4F4F5]">{selectedService.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Fecha</span>
                  <span className="font-medium text-[#F4F4F5]">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Horario de cita</span>
                  <span className="font-semibold text-[#D4AF37]">{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Duración estimada</span>
                  <span className="text-zinc-300">{selectedService.duration} min (+10 min sanitización)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Cliente</span>
                  <span className="text-zinc-300">{contact.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">WhatsApp</span>
                  <span className="text-zinc-300">{contact.phone}</span>
                </div>
                <div className="h-px bg-zinc-800 pt-1" />
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-zinc-400">Tarifa de referencia</span>
                  <span className="text-base font-bold text-[#D4AF37]">
                    {selectedService.fromPrice && "Desde "}${selectedService.price} MXN
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-950/40"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Confirmar en WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-zinc-700 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Agendar otra cita
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step Tabs Navigation */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (i <= step || s.completed) setStep(i);
                }}
                disabled={i > step && !s.completed}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  i === step
                    ? "bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] shadow-sm"
                    : s.completed
                    ? "text-[#D4AF37]/80 hover:text-[#D4AF37] cursor-pointer"
                    : "text-zinc-600 border border-transparent cursor-not-allowed"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    s.completed && i !== step
                      ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                      : i === step
                      ? "bg-[#D4AF37] text-[#0B0B0B] font-bold"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {s.completed && i !== step ? "✓" : i + 1}
                </span>
                <span>{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="h-px w-4 sm:w-8 bg-zinc-800" />
              )}
            </div>
          ))}
        </div>

        {/* Step Container */}
        <div className="rounded-2xl border border-zinc-800 bg-[#141414] p-6 sm:p-8 shadow-xl">
          {/* Step 1: Select Service */}
          {step === 0 && (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F4F4F5]">
                    Paso 1: Selecciona tu Servicio
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Precios transparentes y tiempos dedicados exclusivamente a ti.
                  </p>
                </div>
                {selectedService && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-[#0B0B0B] hover:bg-[#C5A880]"
                  >
                    <span>Continuar con fecha</span>
                    <span>→</span>
                  </button>
                )}
              </div>
              <ServiceGrid
                selected={selectedService}
                onSelect={handleSelectService}
              />
            </div>
          )}

          {/* Step 2: Select Date & Slot */}
          {step === 1 && selectedService && (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">
                      Servicio Seleccionado
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F4F4F5]">
                    {selectedService.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Duración: {selectedService.duration} min • {selectedService.fromPrice ? `Desde $${selectedService.price}` : `$${selectedService.price}`} MXN
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="text-xs text-[#D4AF37] hover:underline self-start"
                >
                  Cambiar servicio
                </button>
              </div>

              <Calendar
                serviceDuration={selectedService.duration}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                bookedSlots={bookedSlots}
                bookedDurations={bookedDurations}
                onSelectDate={handleSelectDate}
                onSelectTime={handleSelectTime}
                calendarMonth={calendarMonth}
                calendarYear={calendarYear}
                onChangeMonth={handleChangeMonth}
              />

              {selectedDate && selectedTime && (
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#0B0B0B] hover:bg-[#C5A880] transition-colors shadow-lg shadow-[#D4AF37]/15"
                  >
                    Continuar con mis datos →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact Details & Confirmation */}
          {step === 2 && selectedService && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6 text-center">
                <h3 className="font-serif text-2xl text-[#F4F4F5] mb-1">
                  Paso 3: Tus Datos de Contacto
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Para recordatorios y confirmación personalizada de tu estilista.
                </p>
              </div>

              {/* Order Recap Banner */}
              <div className="mb-6 rounded-xl border border-zinc-800 bg-[#1A1A1A] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-[#D4AF37] font-medium uppercase tracking-wide">
                    Resumen de Cita
                  </span>
                  <div className="text-sm font-semibold text-[#F4F4F5]">
                    {selectedService.name} ({selectedService.duration} min)
                  </div>
                  <div className="text-xs text-zinc-400">
                    {formattedDate} a las <span className="text-[#D4AF37] font-semibold">{selectedTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#D4AF37]">
                    {selectedService.fromPrice && "Desde "}${selectedService.price} MXN
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[11px] text-zinc-400 hover:text-zinc-200 underline"
                  >
                    Editar horario
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="client-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Nombre Completo <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="client-name"
                    required
                    type="text"
                    maxLength={70}
                    value={contact.name}
                    onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej. Valeria Montes"
                    className="w-full rounded-lg border border-zinc-800 bg-[#0E0E0E] px-4 py-3 text-sm text-[#F4F4F5] placeholder:text-zinc-600 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="client-phone" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Teléfono WhatsApp <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="client-phone"
                      required
                      type="tel"
                      maxLength={15}
                      value={contact.phone}
                      onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value.replace(/[^\d\s+-]/g, "") }))}
                      placeholder="Ej. 55 1234 5678"
                      className="w-full rounded-lg border border-zinc-800 bg-[#0E0E0E] px-4 py-3 text-sm text-[#F4F4F5] placeholder:text-zinc-600 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="client-email" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Correo Electrónico <span className="text-zinc-500 font-normal">(Opcional)</span>
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      maxLength={100}
                      value={contact.email}
                      onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="valeria@ejemplo.com"
                      className="w-full rounded-lg border border-zinc-800 bg-[#0E0E0E] px-4 py-3 text-sm text-[#F4F4F5] placeholder:text-zinc-600 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="client-notes" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Notas adicionales o requerimientos especiales <span className="text-zinc-500 font-normal">(Opcional)</span>
                  </label>
                  <textarea
                    id="client-notes"
                    rows={2}
                    maxLength={300}
                    value={contact.notes}
                    onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Ej. Tengo cabello decolorado, requiero corte en capas..."
                    className="w-full rounded-lg border border-zinc-800 bg-[#0E0E0E] px-4 py-2.5 text-sm text-[#F4F4F5] placeholder:text-zinc-600 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border border-zinc-800 px-6 py-3 text-sm text-zinc-400 hover:text-[#F4F4F5] hover:bg-zinc-800 transition-colors"
                  >
                    ← Regresar al calendario
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !contact.name.trim() || !contact.phone.trim()}
                    className="flex-1 rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0B0B0B] hover:bg-[#C5A880] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Confirmando...</span>
                      </>
                    ) : (
                      <span>Confirmar Reservación</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
