"use client";

import { useRef } from "react";
import Image from "next/image";
import { REVIEWS } from "@/lib/data";

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function ReviewMarquee() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Repeat reviews so the marquee never runs out of cards
  const displayReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  const scrollBy = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="resenas" className="py-24 overflow-hidden bg-[#0B0B0B] scroll-mt-16 relative">
      <div className="mx-auto max-w-5xl px-5 text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-[#141414] text-xs text-[#D4AF37] mb-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>5.0 Estrellas en Google Maps • Resultados Reales</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F4F5] tracking-tight">
          Galería & Opiniones de Clientes
        </h2>
        <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
          Resultados auténticos fotografiados en el estudio y testimonios de quienes confían su imagen a Kéo Salón-Studio en Tlalpan.
        </p>

        {/* Manual navigation controls for PC and tablet */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollBy("left")}
            aria-label="Ver anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-[#141414] text-zinc-300 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] hover:scale-105 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            Desliza o pon el cursor para pausar
          </span>
          <button
            type="button"
            onClick={() => scrollBy("right")}
            aria-label="Ver siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-[#141414] text-zinc-300 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] hover:scale-105 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Marquee & Scrollable Showcase Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#0B0B0B] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#0B0B0B] to-transparent" />

        {/* Marquee row */}
        <div
          ref={scrollContainerRef}
          className="animate-marquee flex gap-6 py-4 overflow-x-visible select-none"
        >
          {displayReviews.map((review, i) => (
            <article
              key={`${review.name}-${i}`}
              className="group flex-shrink-0 w-[300px] sm:w-[350px] rounded-2xl border border-zinc-800 bg-[#141414] overflow-hidden shadow-xl transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Frame with Service Tag */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={review.image}
                  alt={`Trabajo realizado para ${review.name} - ${review.serviceTag}`}
                  fill
                  sizes="(max-width: 640px) 300px, 350px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle dark gradient overlay at bottom of photo for visual transition */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />

                {/* Service Tag Badge on photo */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block rounded-full bg-[#0B0B0B]/85 backdrop-blur-md border border-[#D4AF37]/40 px-3 py-1 text-[11px] font-semibold text-[#D4AF37] shadow-md">
                    {review.serviceTag}
                  </span>
                </div>
              </div>

              {/* Review Content Box */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Rating Stars & Google Verified Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1" aria-label="Calificación: 5 estrellas">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <StarIcon key={j} />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                      <svg className="h-3.5 w-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span>Google Review</span>
                    </div>
                  </div>

                  {/* Customer testimonial quote */}
                  <blockquote className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-5 font-light">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>

                {/* Author footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37]/15 text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F4F4F5] flex items-center gap-1">
                        <span>{review.name}</span>
                        <svg className="h-3 w-3 text-emerald-400 inline" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-[10px] text-zinc-500">Cliente Verificado</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500">{review.timeAgo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
