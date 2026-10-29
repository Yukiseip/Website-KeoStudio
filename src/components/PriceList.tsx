"use client";

import {
  SERVICES,
  CATEGORY_LABELS,
  type ServiceCategory,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ServiceCategory[];

export default function PriceList() {
  return (
    <section id="servicios" className="py-24 px-5 scroll-mt-16 bg-[#0E0E0E]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Catálogo Exclusivo
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl text-[#F4F4F5]">
            Servicios & Tarifas
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto">
            Cada servicio incluye consulta estética personalizada, productos de gama profesional y el tiempo necesario para un acabado impecable.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const items = SERVICES.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="relative rounded-2xl border border-zinc-800 bg-[#141414] p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
                    <h3 className="font-serif text-lg font-semibold text-[#F4F4F5]">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <span className="text-[11px] font-medium text-[#D4AF37] uppercase tracking-wider">
                      {items.length} opciones
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {items.map((s) => (
                      <li
                        key={s.id}
                        className="group flex flex-col pb-3 border-b border-zinc-900 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-zinc-200 group-hover:text-[#D4AF37] transition-colors">
                            {s.name}
                          </span>
                          <span className="shrink-0 text-sm font-bold text-[#D4AF37]">
                            {s.fromPrice && <span className="text-xs font-normal text-zinc-400 mr-1">Desde</span>}
                            ${s.price}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 mt-0.5">
                          Tiempo estimado: {s.duration} min
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-850">
                  <a
                    href="#reservar"
                    className="block w-full text-center rounded-lg border border-zinc-800 bg-[#1A1A1A] py-2.5 text-xs font-medium text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
                  >
                    Agendar en esta categoría →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 rounded-xl border border-zinc-850 bg-[#121212] p-4 text-center">
          <p className="text-xs text-zinc-400">
            <span className="text-[#D4AF37] font-medium">Nota:</span> Los precios de tintes capilares y efectos de color son estimados base y pueden ajustarse tras valoración según el largo, volumen y estado de la fibra capilar.
          </p>
        </div>
      </div>
    </section>
  );
}
