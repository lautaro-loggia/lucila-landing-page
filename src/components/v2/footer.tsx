"use client";

import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { ContactButton } from "./contact-form";
import { Arrow, Reveal, buttonClass } from "./ui";

const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#programas", label: "Programas" },
  { href: "#alumnos", label: "Alumnos" },
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
      <Reveal blur className="mx-auto max-w-2xl text-center">
        <h2 className="display text-[clamp(2.6rem,5vw,4rem)] leading-[1.02]">
          Entrená fuerte. <br className="sm:hidden" />
          <span className="ital">Entrená bien.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[36ch] text-[15px] leading-relaxed text-cocoa">
          Programas de CrossFit, musculación y home training a distancia. Personalizados presenciales
          en Tigre.
        </p>
        <ContactButton className={buttonClass("dark", "mt-9")}>
          Escribime por WhatsApp <Arrow />
        </ContactButton>
      </Reveal>

      <div className="mx-auto mt-20 max-w-3xl border-t border-ink/10 pt-12 text-center sm:mt-24">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[15px] text-cocoa">
          {nav.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Redes, todas juntas: en celular una debajo de otra, en desktop en fila */}
        <p className="mt-12 text-xs tracking-[0.2em] text-taupe uppercase">Seguime</p>
        <ul
          aria-label="Redes sociales"
          className="mx-auto mt-4 flex max-w-[280px] flex-col gap-2.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
        >
          {socials.map(({ href, label, Icon, name }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex items-center justify-center gap-2.5 rounded-full bg-shell px-5 py-3 text-sm text-cocoa ring-1 ring-ink/10 transition-colors hover:bg-blush hover:text-ink"
              >
                <Icon size={18} weight="regular" aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-1.5 text-sm text-taupe sm:flex-row sm:justify-center sm:gap-3">
          <p>Tigre, Buenos Aires · Online para todo el mundo</p>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <p>WhatsApp {site.whatsappDisplay}</p>
        </div>
      </div>

      <div ref={ref} className="mx-auto mt-16 max-w-[1440px] overflow-hidden sm:mt-20">
        <motion.p
          aria-hidden
          style={reduce ? undefined : { y }}
          className="display text-center text-[clamp(5rem,24vw,22rem)] leading-[0.9] tracking-[-0.075em] whitespace-nowrap"
        >
          Lucila
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-2 border-t border-ink/10 py-8 text-center text-xs leading-relaxed text-taupe sm:flex-row sm:justify-between sm:text-left">
        <p>© 2026 Lucila Carro · Wonder Program. Todos los derechos reservados.</p>
        <p>Argentina · Uruguay · Online</p>
      </div>
    </footer>
  );
}
