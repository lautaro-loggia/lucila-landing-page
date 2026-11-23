"use client";

import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { Arrow, Button, Reveal } from "./ui";

const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#programas", label: "Programas" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#talleres", label: "Talleres" },
];

const socials = [
  { href: site.links.instagram, label: "@lucilacarro", Icon: InstagramLogo, name: "Instagram de Lucila" },
  { href: site.links.instagramWonder, label: "@wonderprogram_", Icon: InstagramLogo, name: "Instagram de Wonder Program" },
  { href: site.links.tiktok, label: "@lucilacarro", Icon: TiktokLogo, name: "TikTok de Lucila" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

  return (
    <footer className="overflow-hidden px-5 pt-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="display text-[clamp(2.6rem,5vw,4rem)]">
          Entrená fuerte. <span className="ital">Entrená bien.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[40ch] text-[15px] leading-relaxed text-cocoa">
          Programas de CrossFit, musculación y home training a distancia. Personalizados presenciales
          en Tigre.
        </p>
        <Button href={site.links.start} className="mt-8">
          Escribime por WhatsApp <Arrow />
        </Button>
      </Reveal>

      <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-cocoa">
        {nav.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      {/* Redes, todas juntas */}
      <ul aria-label="Redes sociales" className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
        {socials.map(({ href, label, Icon, name }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="inline-flex items-center gap-2 rounded-full bg-shell px-4 py-2 text-sm text-cocoa ring-1 ring-ink/10 transition-colors hover:bg-blush hover:text-ink"
            >
              <Icon size={18} weight="regular" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-taupe">
        Tigre, Buenos Aires · Programas online para todo el mundo · WhatsApp {site.whatsappDisplay}
      </p>

      <div ref={ref} className="mx-auto max-w-[1440px] overflow-hidden">
        <motion.p
          aria-hidden
          style={reduce ? undefined : { y }}
          className="display text-center text-[clamp(5rem,24vw,22rem)] leading-[0.9] tracking-[-0.075em] whitespace-nowrap"
        >
          Lucila
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-3 border-t border-ink/10 py-6 text-xs text-taupe">
        <p>© 2026 Lucila Carro · Wonder Program. Todos los derechos reservados.</p>
        <p>Argentina · Uruguay · Online</p>
      </div>
    </footer>
  );
}
