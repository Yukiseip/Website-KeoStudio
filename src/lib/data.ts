/* ------------------------------------------------------------------ */
/*  Kéo Salón-Studio — Service catalogue, schedule rules & reviews    */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  name: string;
  /** MXN price – `null` means "desde" pricing shown separately */
  price: number;
  /** True when the price is a "desde" (starting-at) estimate */
  fromPrice?: boolean;
  /** Minutes the service takes */
  duration: number;
  category: ServiceCategory;
}

export type ServiceCategory =
  | "cabello"
  | "cejas-pestanas"
  | "unas";

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  cabello: "Cabello & Barbería",
  "cejas-pestanas": "Cejas, Pestañas & Maquillaje",
  unas: "Uñas & Manicure",
};

export const SERVICES: Service[] = [
  // — Cabello & Barbería —
  { id: "corte",           name: "Cortes",             price: 150,  duration: 40,  category: "cabello" },
  { id: "barba-corte",     name: "Barba + Corte",      price: 200,  duration: 50,  category: "cabello" },
  { id: "planchado",       name: "Planchado Exprés",   price: 250,  duration: 45,  category: "cabello" },
  { id: "tinte",           name: "Tinte Capilar",      price: 450,  duration: 120, category: "cabello", fromPrice: true },
  { id: "efecto-color",    name: "Efecto Color",       price: 950,  duration: 150, category: "cabello", fromPrice: true },

  // — Cejas, Pestañas & Maquillaje —
  { id: "planchado-cejas", name: "Planchado de Cejas", price: 100,  duration: 30,  category: "cejas-pestanas" },
  { id: "depilado-cejas",  name: "Depilado de Cejas",  price: 100,  duration: 25,  category: "cejas-pestanas" },
  { id: "pestana-tira",    name: "Pestaña Tira",       price: 100,  duration: 25,  category: "cejas-pestanas" },
  { id: "maquillaje",      name: "Maquillaje",         price: 500,  duration: 60,  category: "cejas-pestanas" },
  { id: "maquillaje-ondas",name: "Maquillaje + Ondas", price: 650,  duration: 90,  category: "cejas-pestanas" },

  // — Uñas & Manicure —
  { id: "gelish",          name: "Gelish",             price: 150,  duration: 45,  category: "unas" },
  { id: "remocion-gelish", name: "Remoción Gelish",    price: 100,  duration: 30,  category: "unas" },
  { id: "manicure-ruso",   name: "Manicure Ruso",      price: 250,  duration: 60,  category: "unas" },
  { id: "extension-gel",   name: "Extensión Gel",      price: 350,  duration: 90,  category: "unas" },
  { id: "tratamiento",     name: "Tratamiento Proactivo", price: 250, duration: 60, category: "unas" },
];

/* ------------------------------------------------------------------ */
/*  Schedule rules                                                     */
/* ------------------------------------------------------------------ */

/** Buffer between appointments in minutes */
export const BUFFER_MINUTES = 10;

export interface DaySchedule {
  open: string;   // "HH:mm"
  close: string;  // "HH:mm"
}

/**
 * 0 = Sunday, 1 = Monday, … 6 = Saturday.
 * `null` → closed.
 */
export const WEEKLY_SCHEDULE: Record<number, DaySchedule | null> = {
  0: { open: "10:30", close: "15:30" }, // Domingo
  1: null,                               // Lunes — cerrado
  2: { open: "10:30", close: "18:30" }, // Martes
  3: { open: "10:30", close: "18:30" }, // Miércoles
  4: { open: "10:30", close: "18:30" }, // Jueves
  5: { open: "10:30", close: "15:30" }, // Viernes
  6: { open: "10:30", close: "15:30" }, // Sábado
};

export const DAY_NAMES = [
  "Domingo", "Lunes", "Martes", "Miércoles",
  "Jueves", "Viernes", "Sábado",
];

/* ------------------------------------------------------------------ */
/*  Location                                                           */
/* ------------------------------------------------------------------ */

export const LOCATION = {
  street: "Calle Santos #10",
  colony: "Col. Arboledas Del Sur",
  borough: "Alc. Tlalpan",
  city: "CDMX",
  zip: "14376",
  mapsUrl:
    "https://www.google.com/maps/place/Calle+Santos+10,+Arboledas+del+Sur,+Tlalpan,+14376+Ciudad+de+M%C3%A9xico,+CDMX",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.234125893121!2d-99.1365125!3d19.2941235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0196bbef06ff%3A0x2a9e52c8dfd50a22!2sCalle%20Santos%2010%2C%20Arboledas%20del%20Sur%2C%20Tlalpan%2C%2014376%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1715000000000",
  whatsapp: "https://wa.me/525512345678",
  phone: "+52 55 1234 5678",
};

/* ------------------------------------------------------------------ */
/*  Reviews (Google Maps reviews with studio showcase photographs)    */
/* ------------------------------------------------------------------ */

export interface Review {
  name: string;
  text: string;
  timeAgo: string;
  rating: 5;
  image: string;
  serviceTag: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Andrea Montes",
    serviceTag: "Corte en Capas & Brushing",
    image: "/imagenes/191483902_107555914868467_1004260284412493497_n.jpg",
    text: "La mejor experiencia en Tlalpan. El corte en capas le dio muchísimo movimiento a mi cabello y el secado duró intacto todo el fin de semana. Atención 10/10.",
    timeAgo: "hace 2 semanas",
    rating: 5,
  },
  {
    name: "Sofía Galindo",
    serviceTag: "Efecto Color & Balayage",
    image: "/imagenes/192190342_107551544868904_1881070725174351679_n.jpg",
    text: "Tenía miedo de decolorarme, pero me cuidaron el cabello como en ningún otro salón. La transición de luz quedó suave, brillante y súper sana.",
    timeAgo: "hace 3 semanas",
    rating: 5,
  },
  {
    name: "Mariana Rivas",
    serviceTag: "Tinte Capilar & Tratamiento",
    image: "/imagenes/192194080_107553171535408_5210118588623273104_n.jpg",
    text: "El tono castaño luminoso quedó exactamente como la foto que le mostré. El tratamiento proactivo me dejó el cabello como seda. ¡Súper recomendado!",
    timeAgo: "hace 1 mes",
    rating: 5,
  },
  {
    name: "Valentina Solís",
    serviceTag: "Maquillaje Social & Ondas Glam",
    image: "/imagenes/466737578_867654525525265_2766990852945233884_n.jpg",
    text: "El maquillaje para mi evento me duró impecable toda la noche y las ondas tenían una textura súper elegante y natural. Todos me chulearon el look.",
    timeAgo: "hace 3 semanas",
    rating: 5,
  },
  {
    name: "Camila Navarro",
    serviceTag: "Corte Bob & Planchado Exprés",
    image: "/imagenes/476624275_925035953120455_6224549872666333809_n.jpg",
    text: "La precisión del corte fue impresionante; tiene una técnica y simetría increíbles. Estar sola con el estilista en el estudio hace que la atención sea un lujo.",
    timeAgo: "hace 1 semana",
    rating: 5,
  },
];
