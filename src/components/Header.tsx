"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Reservar", href: "#reservar" },
  { label: "Reseñas", href: "#resenas" },
  { label: "Ubicación", href: "#ubicacion" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0B0B]/90 backdrop-blur-md border-b border-zinc-800/80 py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        {/* Logo with Stylized Scissor Silhouette */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-[#141414] transition-all duration-300 group-hover:border-[#D4AF37]/50 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-12"
            >
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wider font-semibold text-[#F4F4F5] leading-tight">
              KÉO
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-medium">
              Salón-Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-[#F4F4F5] transition-colors duration-200 tracking-wide font-normal hover:translate-y-[-1px]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservar"
            className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-semibold text-[#0B0B0B] transition-all duration-200 hover:bg-[#C5A880] hover:scale-105 shadow-md shadow-[#D4AF37]/20 uppercase tracking-wider"
          >
            Agendar Cita
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg border border-zinc-800 bg-[#141414] text-zinc-300"
          aria-label="Alternar menú"
        >
          <span
            className={`block h-0.5 w-5 bg-[#F4F4F5] transition-all duration-300 ${
              menuOpen ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#D4AF37] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#F4F4F5] transition-all duration-300 ${
              menuOpen ? "-translate-y-[8px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 border-b border-zinc-800 bg-[#0B0B0B]/98 backdrop-blur-xl" : "max-h-0"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-[#D4AF37] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservar"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-[#D4AF37] px-5 py-3 text-center text-xs font-bold text-[#0B0B0B] uppercase tracking-wider shadow-md hover:bg-[#C5A880]"
          >
            Agendar Cita
          </a>
        </div>
      </div>
    </header>
  );
}
