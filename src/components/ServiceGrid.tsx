"use client";

import { useState } from "react";
import {
  SERVICES,
  CATEGORY_LABELS,
  type Service,
  type ServiceCategory,
} from "@/lib/data";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ServiceCategory[];

interface Props {
  selected: Service | null;
  onSelect: (service: Service) => void;
}

export default function ServiceGrid({ selected, onSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("cabello");

  const filtered = SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6 border-b border-zinc-800/60">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#D4AF37] text-[#0B0B0B] font-bold shadow-md shadow-[#D4AF37]/20"
                : "border border-zinc-800 bg-[#161616] text-zinc-400 hover:border-zinc-700 hover:text-[#F4F4F5]"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => {
          const isSelected = selected?.id === service.id;
          return (
            <button
              type="button"
              key={service.id}
              onClick={() => onSelect(service)}
              className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-1 ring-[#D4AF37] shadow-lg shadow-[#D4AF37]/10"
                  : "border-zinc-800 bg-[#18181B]/80 hover:border-zinc-650 hover:bg-[#1E1E22]"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold text-[#F4F4F5] group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </h4>
                  {isSelected && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#0B0B0B] text-xs font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                  <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{service.duration} min estimados</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                  {service.fromPrice ? "Tarifa base" : "Precio fijo"}
                </span>
                <span className="text-sm font-bold text-[#D4AF37]">
                  {service.fromPrice && <span className="text-xs font-normal text-zinc-400 mr-1">Desde</span>}
                  ${service.price} <span className="text-xs text-zinc-400 font-normal">MXN</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
