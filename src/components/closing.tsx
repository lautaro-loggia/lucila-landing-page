"use client";

import Image from "next/image";
import { InstagramLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { CtaLink } from "./cta-link";
import { Magnetic, SplitHeading } from "./motion-primitives";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section ref={ref} className="px-3 pt-32 lg:pt-44">
      <div className="relative isolate mx-auto flex min-h-[86dvh] max-w-[1400px] items-end overflow-hidden rounded-[28px] bg-night p-6 sm:p-12 lg:p-16">
        <motion.div style={reduce ? undefined : { scale }} className="absolute inset-y-0 right-0 -z-10 w-full origin-right lg:w-[62%]">
          <Image
            src="/images/bici.jpg"
            alt="Lucila pedaleando a fondo en la bicicleta durante una competencia"
            fill
            quality={70}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/0 lg:bg-gradient-to-r lg:from-night lg:from-35% lg:via-night/60 lg:via-55% lg:to-transparent" />
        <div className="max-w-2xl">
          <SplitHeading
            text="Tu próximo entrenamiento empieza con un mensaje."
            accent={["mensaje."]}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-bold tracking-tighter"
          />
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mist/85">
            Contame tu objetivo y armamos juntos el camino. Respondo personalmente cada mensaje.
          </p>
          <div className="mt-9">
            <Magnetic>
              <CtaLink href={site.links.start}>Empezá hoy</CtaLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

const socials = [
  { href: site.links.instagram, label: "@lucilacarro", icon: InstagramLogo, network: "Instagram" },
  { href: site.links.instagramWonder, label: "@wonderprogram_", icon: InstagramLogo, network: "Instagram" },
  { href: site.links.tiktok, label: "@lucilacarro", icon: TiktokLogo, network: "TikTok" },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1320px] px-4 pt-24 pb-28 sm:px-6 lg:pb-12">
      <div className="grid gap-10 border-t border-mist/10 pt-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">Lucila Carro</p>
          <p className="mt-1 text-sm text-lilac">Wonder Program</p>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
            Entrenamiento a distancia de CrossFit, musculación y home training. Personalizados
            presenciales en Tigre.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Redes</p>
          <ul className="mt-4 space-y-3">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-lilac"
                >
                  <s.icon size={20} aria-hidden />
                  <span>
                    {s.label} <span className="sr-only">en {s.network}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Contacto</p>
          <a
            href={site.links.start}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2.5 text-muted transition-colors hover:text-lilac"
          >
            <WhatsappLogo size={20} aria-hidden />
            {site.whatsappDisplay}
          </a>
        </div>
      </div>
      <p className="mt-12 text-xs text-muted">
        © 2026 Lucila Carro · Wonder Program
      </p>
    </footer>
  );
}

/** Botón flotante de WhatsApp: aparece al pasar el hero. */
export function FloatingWhatsapp() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 700;
    if (next !== show) setShow(next);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.links.start}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribile a Lucila por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-violet text-ink shadow-[0_18px_40px_-12px_rgba(157,99,247,0.55)] sm:right-6 sm:bottom-6"
        >
          <WhatsappLogo size={28} weight="fill" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
