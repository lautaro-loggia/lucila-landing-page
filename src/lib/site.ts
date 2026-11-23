// Datos de contacto y redes en un solo lugar para editarlos fácil.
const WHATSAPP_NUMBER = "59899553066";

const wa = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const site = {
  name: "Lucila Carro",
  brand: "Wonder Program",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
