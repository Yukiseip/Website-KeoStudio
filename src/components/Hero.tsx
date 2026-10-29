export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-5 pt-32 pb-20 text-center overflow-hidden">
      {/* Editorial ambient background glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(212,175,55,0.12) 0%, rgba(20,20,20,0.5) 60%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-[#C5A880]/5 blur-3xl" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Availability Live Badge */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-[#141414]/90 px-4 py-1.5 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
          </span>
          <span className="text-xs font-medium text-zinc-300 tracking-wide">
            Abierto de Martes a Domingo desde 10:30 am • Tlalpan, CDMX
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F4F5] leading-[1.1]">
          Estética de Alta Precisión,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4E8C1] to-[#C5A880]">
            Un Solo Estilista.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
          Diseño de imagen exclusivo en Arboledas del Sur, Tlalpan. Un espacio boutique concebido para dedicar el 100% del tiempo a tu transformación personal, sin esperas ni distracciones.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#reservar"
            className="w-full sm:w-auto rounded-full bg-[#D4AF37] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0B0B0B] transition-all duration-300 hover:bg-[#C5A880] hover:scale-105 shadow-xl shadow-[#D4AF37]/25"
          >
            Agendar Cita en Línea
          </a>
          <a
            href="#servicios"
            className="w-full sm:w-auto rounded-full border border-zinc-800 bg-[#141414]/80 px-8 py-4 text-xs sm:text-sm font-medium tracking-wide text-[#F4F4F5] transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-850"
          >
            Ver Menú de Servicios y Precios
          </a>
        </div>

        {/* Value Points */}
        <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-12 border-t border-zinc-900 pt-8 max-w-xl text-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">1 a 1</div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Atención Privada</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">10 min</div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Buffer de Limpieza</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">100%</div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Puntualidad Garantizada</div>
          </div>
        </div>
      </div>
    </section>
  );
}
