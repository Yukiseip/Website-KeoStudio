"use client";

import { useEffect, useState } from "react";
import { LOCATION } from "@/lib/data";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-zinc-800/80 bg-[#080808] text-zinc-400 py-16 px-5">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-12 pb-12 border-b border-zinc-900">
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 text-[#D4AF37]"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
              <span className="font-serif text-lg tracking-wider font-semibold text-[#F4F4F5]">
                KÉO <span className="text-[#D4AF37]">Salón-Studio</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Estética boutique y barbería de autor en Tlalpan, CDMX. Atención privada 1 a 1 de un solo estilista para quienes valoran la dedicación, la técnica y la puntualidad.
            </p>
          </div>

          {/* Quick Contact & WhatsApp Action */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Atención Directa & Cancelaciones
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              ¿Dudas sobre tu servicio o necesitas reprogramar? Escríbenos directamente:
            </p>
            <a
              href="https://wa.me/525512345678?text=Hola%20K%C3%A9o%20Sal%C3%B3n,%20quisiera%20consultar%20sobre%20los%20servicios%20o%20mi%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-4 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-900/30 hover:border-emerald-500/60 transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp: +52 55 1234 5678</span>
            </a>
          </div>

          {/* Location summary */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Ubicación
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {LOCATION.street}, {LOCATION.colony}
              <br />
              {LOCATION.borough}, CDMX
              <br />
              C.P. {LOCATION.zip}
            </p>
          </div>
        </div>

        {/* Disclaimer & Copyright Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-zinc-500 max-w-xl">
            <span className="text-zinc-400 font-medium">Nota legal y tarifaria:</span> Precios de tintes y efectos de color son de referencia y pueden variar según el largo y volumen del cabello.
          </p>
          <div className="text-xs text-zinc-500">
            © {currentYear} Kéo Salón-Studio. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
