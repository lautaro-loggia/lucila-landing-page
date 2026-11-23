import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/v2/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Programas de entrenamiento a distancia de CrossFit, musculación y home training con Lucila Carro, atleta élite de CrossFit y Técnica en Fitness. Entrená desde cualquier lugar del mundo.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Lucila Carro | Wonder Program - Entrenamiento de CrossFit online",
  description,
  keywords: [
    "Lucila Carro",
    "Wonder Program",
    "programa de CrossFit online",
    "entrenamiento a distancia",
    "musculación",
    "home training",
    "entrenadora de CrossFit",
    "entrenamiento personalizado Tigre",
    "taller de CrossFit",
  ],
  openGraph: {
    title: "Lucila Carro | Wonder Program",
    description,
    type: "website",
    locale: "es_AR",
    siteName: "Wonder Program",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucila Carro | Wonder Program",
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#110c26",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucila Carro",
  jobTitle: "Entrenadora y atleta de CrossFit",
  nationality: "Uruguay",
  hasCredential: [
    "Técnica en Fitness (IUACJ)",
    "CrossFit Level 1 Trainer",
  ],
  award: [
    "Campeona Nacional de Uruguay - CrossFit Games 2025",
    "Campeona SouthFit 2026",
  ],
  sameAs: [site.links.instagram, site.links.instagramWonder, site.links.tiktok],
  brand: { "@type": "Brand", name: "Wonder Program" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${serif.variable} antialiased`}>
      <body className="min-h-full font-sans">
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
