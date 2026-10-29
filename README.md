# ✂️ Kéo Salón-Studio — Landing Page & Motor de Reservas

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

Landing page moderna tipo *one-page* con motor de reservaciones paso a paso para **"Kéo Salón-Studio"**, una estética y salón boutique de atención personalizada de un solo estilista ubicada en **Arboledas del Sur, Alcaldía Tlalpan, Ciudad de México**.

---

## 🌟 Características Principales

### 1. 🎨 Estética Editorial & Dirección de Arte
- **Paleta de Colores:** Fondo obsidiana profundo (`#0B0B0B`, `#141414`), tarjetas en zinc oscuro (`#18181B`) con bordes sutiles (`border-zinc-800`), acentos dorado champaña (`#D4AF37`, `#C5A880`) y textos marfil (`#F4F4F5`).
- **Identidad Minimalista:** Logotipo con silueta estilizada de tijera en dorado y tipografía serif elegante (*Cinzel*) combinada con una sans-serif geométrica moderna (*Plus Jakarta Sans*).
- **Mobile-First:** Interfaz responsiva ultra fluida pensada para smartphones, tablets y pantallas de escritorio.

### 2. 📅 Motor de Reservaciones Inteligente (3 Pasos)
- **Atención Exclusiva 1:1:** Capacidad de 1 solo estilista (máximo una persona atendida a la vez).
- **Margen de Limpieza (Buffer):** Se calculan 10 minutos adicionales obligatorios de desinfección entre cada cita.
- **Horarios Oficiales & Límite de Cierre:**
  - **Lunes y festivos:** Cerrado (bloqueados automáticamente en el calendario).
  - **Martes a Jueves:** 10:30 am a 6:30 pm.
  - **Viernes a Domingo:** 10:30 am a 3:30 pm.
  - Los turnos que rebasen la hora de cierre según la duración del servicio no se generan.
- **Prevención de Doble Reserva:** Detección en tiempo real de intervalos ocupados con simulación de estado local (`useState`).
- **Confirmación con WhatsApp:** Generación instantánea de mensaje pre-llenado listo para enviar a WhatsApp tras agendar.
- **Estructura API Ready:** Preparado con esquemas tipados para conexión a **Google Calendar API** y envío de correos transaccionales con **Resend**.

### 3. 📸 Galería & Reseñas de Google Maps
- **Fotos de Estudio Reales:** Carrusel con trabajos auténticos de corte, balayage, tinte, estilizado y peinado para clientas del salón.
- **Marquee Infinito:** Desplazamiento continuo horizontal con pausa automática al interactuar o colocar el cursor (`pause on hover`).
- **Controles Manuales:** Botones de navegación (← / →) para explorar cómodamente cada fotografía y reseña de 5 estrellas.

### 4. 📍 Ubicación Exacta & Horarios Desglosados
- Tarjeta informativa con desglose de días y horarios.
- Iframe de **Google Maps** embebido con tratamiento oscuro y coordenadas exactas en:
  > *Calle Santos #10, Col. Arboledas Del Sur, Alc. Tlalpan, CDMX, C.P. 14376*.
- Botón directo para abrir navegación en la aplicación de Google Maps.

---

## 🛠️ Stack Tecnológico

| Tecnología | Rol |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework React full-stack con Server Components y optimización estática |
| **React 19** | Biblioteca de UI con hooks y manejo de estado moderno |
| **Tailwind CSS v4 + PostCSS** | Motor de estilos utilitarios compilado |
| **TypeScript** | Tipado estático estricto para modelos de servicio, horarios y reservas |
| **Google Fonts** | Tipografías Cinzel & Plus Jakarta Sans |

---

## 📁 Estructura del Proyecto

```text
keo/
├── public/
│   ├── imagenes/           # Fotografías reales de estudio para el carrusel
│   └── favicon.ico         # Icono del sitio
├── src/
│   ├── app/
│   │   ├── globals.css     # Tokens de diseño, animaciones marquee y utilidades
│   │   ├── layout.tsx      # Root layout, meta-tags SEO y tipografías
│   │   ├── page.tsx        # Página principal one-page
│   │   ├── robots.ts       # Reglas de indexación para motores de búsqueda
│   │   └── sitemap.ts      # Mapa del sitio dinámico
│   ├── components/
│   │   ├── Header.tsx          # Navbar flotante con glassmorphism y logo
│   │   ├── Hero.tsx            # Sección principal con badge de disponibilidad
│   │   ├── PriceList.tsx       # Menú filtrado de servicios y tarifas
│   │   ├── BookingWizard.tsx   # Motor paso a paso con validaciones y modal
│   │   ├── Calendar.tsx        # Calendario mensual y generador dinámico de turnos
│   │   ├── ServiceGrid.tsx     # Tarjetas interactivas de selección de servicio
│   │   ├── ReviewMarquee.tsx   # Carrusel continuo con fotos reales y reseñas
│   │   ├── LocationSection.tsx # Horarios y mapa embebido
│   │   └── Footer.tsx          # Contacto directo, WhatsApp y notas legales
│   └── lib/
│       ├── data.ts         # Catálogo de servicios, precios, reseñas y datos de contacto
│       └── schedule.ts     # Algoritmo de cálculo de bloques horarios y buffers
├── .env.example            # Plantilla de variables de entorno
├── next.config.ts          # Encabezados de seguridad HTTP (CSP, HSTS, X-Frame)
├── postcss.config.mjs      # Configuración de PostCSS para Tailwind v4
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Scripts de build, desarrollo y dependencias
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18.18+ o Node.js 20+
- Gestor de paquetes: `pnpm` (recomendado), `npm` o `yarn`

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/keo-salon.git
   cd keo-salon
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o: npm install
   ```

3. **Configurar variables de entorno (opcional):**
   ```bash
   cp .env.example .env.local
   ```

4. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm run dev
   # o: npm run dev
   ```

5. Abrir en el navegador: [http://localhost:3000](http://localhost:3000).

---

## 🔒 Buenas Prácticas de Seguridad Implementadas

1. **Cabeceras de Seguridad HTTP:** Configuradas en `next.config.ts`:
   - `Strict-Transport-Security` (HSTS): Fuerza conexiones HTTPS seguras.
   - `X-Frame-Options: SAMEORIGIN`: Previene ataques de *Clickjacking*.
   - `X-Content-Type-Options: nosniff`: Evita la interpretación errónea de tipos MIME.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Protege la privacidad en enlaces salientes.
   - `Permissions-Policy`: Restringe el acceso a cámara, micrófono y geolocalización no solicitados.
   - `poweredByHeader: false`: Oculta la firma `X-Powered-By: Next.js` para evitar escaneos de vulnerabilidades.
2. **Saneamiento y Validación de Entradas:**
   - Longitud máxima en campos de texto (`maxLength`).
   - Filtrado de caracteres no numéricos en números de teléfono.
   - Sanitización contra inyecciones XSS en el formulario de citas.
3. **Control de Repositorio:**
   - `.gitignore` robusto que excluye claves privadas, logs, archivos `.env` y temporales de compilación.

---

## ☁️ Despliegue en Vercel

El proyecto está 100% optimizado para compilarse y desplegarse en **Vercel**:

### Opción 1: Desde la Web de Vercel (Recomendada)
1. Sube tu código a un repositorio en **GitHub**.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión.
3. Haz clic en **"Add New..."** > **"Project"**.
4. Selecciona tu repositorio `keo-salon`.
5. Vercel detectará automáticamente Next.js. Haz clic en **Deploy**.

### Opción 2: Vía Vercel CLI
```bash
pnpm add -g vercel
vercel login
vercel
```

---

## 📜 Licencia & Créditos

Desarrollado para **Kéo Salón-Studio** — Tlalpan, CDMX.  
Todos los derechos reservados © 2026.
