"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SplitHeading } from "./motion-primitives";

const certs = [
  {
    src: "/images/cert-tecnica.jpg",
    alt: "Título de Técnica en Fitness del IUACJ a nombre de Lucila Zoe Carro",
    title: "Técnica en Fitness",
    detail: "IUACJ, Uruguay. Orientación en entrenamiento personalizado.",
    w: 1536,
    h: 1024,
  },
  {
    src: "/images/cert-level1.jpg",
    alt: "Certificado CrossFit Level 1 Trainer a nombre de Lucila Carro",
    title: "CrossFit Level 1 Trainer",
    detail: "Entrenadora licenciada por CrossFit.",
    w: 1284,
    h: 927,
  },
  {
    src: "/images/cert-campeona.jpg",
    alt: "Certificado de CrossFit Games que nombra a Lucila Carro campeona nacional de Uruguay 2025",
    title: "Campeona Nacional de Uruguay",
    detail: "Reconocimiento oficial de los CrossFit Games, temporada 2025.",
    w: 1284,
    h: 916,
  },
];

const spread = [
  { x: "-6%", rotate: -5, y: 0 },
  { x: "0%", rotate: 0, y: -18 },
  { x: "6%", rotate: 5, y: 0 },
];

export function Credentials() {
  const reduce = useReducedMotion();

  return (
    <section id="formacion" className="mx-auto max-w-[1320px] overflow-x-clip px-4 pt-32 sm:px-6 lg:pt-44">
      <SplitHeading
        text="Formación que respalda cada planificación."
        accent={["respalda"]}
        className="max-w-[18ch] font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.02] font-bold tracking-tighter"
      />
      <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
        Además de su título y su licencia, Lucila suma cursos de musculación, entrenamiento funcional
        y mucho más.
      </p>

      <motion.ul
        className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6"
        initial={reduce ? false : "stacked"}
        whileInView="spread"
        viewport={{ once: true, amount: 0.35 }}
      >
        {certs.map((c, i) => (
          <motion.li
            key={c.title}
            variants={{
              stacked: { opacity: 0, x: `${(1 - i) * 100}%`, rotate: (i - 1) * -10, y: 60 },
              spread: {
                opacity: 1,
                ...spread[i],
                transition: { type: "spring", stiffness: 70, damping: 16, delay: i * 0.08 },
              },
            }}
            whileHover={reduce ? undefined : { rotate: 0, y: -24, scale: 1.03 }}
            className="relative"
            style={{ zIndex: i === 1 ? 2 : 1 }}
          >
            <figure className="rounded-[28px] border border-mist/10 bg-night p-3 shadow-[0_40px_80px_-30px_rgba(5,3,20,0.9)]">
              <div className="overflow-hidden rounded-[20px] bg-mist">
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.w}
                  height={c.h}
                  quality={70}
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="px-3 pt-5 pb-3">
                <p className="font-display text-xl font-semibold tracking-tight">{c.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{c.detail}</p>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
