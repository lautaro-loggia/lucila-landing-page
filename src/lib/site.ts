// Datos de contacto y redes en un solo lugar para editarlos fácil.
const WHATSAPP_NUMBER = "59899553066";

/** Link a WhatsApp con el mensaje ya escrito. */
export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const wa = whatsappLink;

export const site = {
  name: "Lucila Carro",
  brand: "Wonder Program",
  // Dominio público: el que se configure a mano o, en Vercel, el de producción del proyecto.
  // Se usa para los links absolutos de la imagen OG al compartir la web.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  whatsappDisplay: "+598 99 553 066",
  links: {
    start: wa("¡Hola Lucila! Quiero empezar a entrenar con Wonder Program."),
    workshop: wa("¡Hola Lucila! Tengo un box y me interesa que des un taller de CrossFit."),
    tigre: wa("¡Hola Lucila! Me interesa entrenar presencial con vos en Tigre."),
    instagram: "https://www.instagram.com/lucilacarro/",
    instagramWonder: "https://www.instagram.com/wonderprogram_/",
    tiktok: "https://www.tiktok.com/@lucilacarro",
  },
} as const;
