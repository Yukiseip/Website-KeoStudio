import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kéo Salón-Studio — Diseño de Imagen & Barbería en Tlalpan",
  description:
    "Estética boutique de atención personalizada de un solo estilista en Tlalpan, CDMX. Cortes, efectos de color, diseño de cejas, manicure ruso y más.",
  keywords: [
    "Kéo Salón-Studio",
    "estética Tlalpan",
    "salón boutique CDMX",
    "corte de cabello Tlalpan",
    "efecto color",
    "manicure ruso",
    "Arboledas del Sur",
  ],
  openGraph: {
    title: "Kéo Salón-Studio — Diseño de Imagen en Tlalpan",
    description: "Atención personalizada de un solo estilista. Reserva tu cita en línea.",
    url: "https://keosalon.com",
    siteName: "Kéo Salón-Studio",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#0B0B0B] text-[#F4F4F5] selection:bg-[#D4AF37]/30 selection:text-[#F4F4F5]">
        {children}
      </body>
    </html>
  );
}
