/*
  TESTIMONIOS
  Cargá acá los testimonios reales. Mientras la lista esté vacía:
  - en producción la sección NO se muestra (no se publica nada de ejemplo),
  - en desarrollo (npm run dev) se ven tarjetas de ejemplo para revisar el diseño.

  Formato de cada uno:
  {
    quote: "Texto corto, idealmente 2 o 3 líneas.",
    name: "Nombre y apellido",
    detail: "Programa y lugar, ej: CrossFit Nivel 2 · Madrid",
    photo: "/images/testimonios/nombre.jpg", // opcional, foto cuadrada en public/images/testimonios/
  }
*/

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [];

// Solo para ver el diseño en desarrollo. Nunca se muestran en producción.
export const placeholderTestimonials: Testimonial[] = [
  {
    quote:
      "Testimonio de ejemplo. Acá va lo que cuenta una alumna sobre cómo cambió su entrenamiento con Wonder Program.",
    name: "Alumna de ejemplo",
    detail: "CrossFit Nivel 2",
  },
  {
    quote: "Testimonio de ejemplo más corto, de una o dos líneas.",
    name: "Alumno de ejemplo",
    detail: "Musculación",
  },
  {
    quote: "Testimonio de ejemplo sobre el home training y entrenar desde casa sin perder intensidad.",
    name: "Alumna de ejemplo",
    detail: "Home training",
  },
  {
    quote: "Testimonio de ejemplo de un box que contrató un taller de CrossFit.",
    name: "Box de ejemplo",
    detail: "Taller de CrossFit",
  },
];
