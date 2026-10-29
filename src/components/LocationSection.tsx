import { LOCATION, WEEKLY_SCHEDULE, DAY_NAMES } from "@/lib/data";

export default function LocationSection() {
  return (
    <section id="ubicacion" className="py-24 px-5 scroll-mt-16 bg-[#0E0E0E]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Encuéntranos
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl text-[#F4F4F5]">
            Ubicación & Horarios
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ambiente exclusivo y privado en Arboledas del Sur, Alcaldía Tlalpan, CDMX.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Information & Hours Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#141414] p-6 sm:p-8 shadow-xl">
            <div>
              {/* Address section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Dirección del Salón</span>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                  {LOCATION.street}
                  <br />
                  {LOCATION.colony}
                  <br />
                  {LOCATION.borough}, {LOCATION.city}
                  <br />
                  <span className="text-zinc-400 font-normal">C.P. {LOCATION.zip}</span>
                </p>
              </div>

              {/* Weekly schedule */}
              <div className="mb-6 border-t border-zinc-800/80 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Horarios de Atención</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {DAY_NAMES.map((name, i) => {
                    const sched = WEEKLY_SCHEDULE[i];
                    const isClosed = !sched;
                    return (
                      <li
                        key={name}
                        className="flex items-center justify-between py-1 border-b border-zinc-900 last:border-b-0"
                      >
                        <span className={isClosed ? "text-zinc-500" : "text-zinc-300"}>
                          {name}
                        </span>
                        <span
                          className={`font-medium ${
                            isClosed
                              ? "text-red-400/80 bg-red-950/20 px-2 py-0.5 rounded"
                              : "text-[#F4F4F5]"
                          }`}
                        >
                          {sched ? `${sched.open} am – ${sched.close} pm` : "Cerrado"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Direct Directions Button */}
            <div className="pt-4 border-t border-zinc-800">
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B0B0B] hover:bg-[#C5A880] transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Cómo Llegar en Google Maps</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Maps with Dark Aesthetic Treatment */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-[#141414] overflow-hidden min-h-[380px] sm:min-h-[460px] relative shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.234125893121!2d-99.1365125!3d19.2941235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0196bbef06ff%3A0x2a9e52c8dfd50a22!2sCalle%20Santos%2010%2C%20Arboledas%20del%20Sur%2C%20Tlalpan%2C%2014376%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1715000000000"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: 400,
                filter: "invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de Kéo Salón-Studio"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
