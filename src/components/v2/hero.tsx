"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ContactButton } from "./contact-form";
import { Arrow, Button, buttonClass } from "./ui";

const tags = ["CrossFit", "Musculación", "Home training", "Presencial"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0.2, 0.75], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative isolate min-h-[100dvh] overflow-x-clip">
      {/* El recorte va solo en el fondo: el texto baja con el parallax y no se corta contra la sección siguiente */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Foto a sangre que se funde con el fondo */}
        <motion.div
          style={reduce ? undefined : { y: imgY }}
          className="absolute inset-y-0 right-0 -z-10 w-full max-md:bottom-auto max-md:h-[64%] max-md:[mask-image:linear-gradient(180deg,black_45%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.15)_88%,transparent_100%)] md:-right-[9%] md:w-[60%] md:[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.35)_22%,black_52%)]"
        >
          <div className="hero-img relative h-full w-full">
            <Image
              src="/images/retrato.jpg"
              alt="Retrato de Lucila Carro en plena competencia"
              fill
              priority
              quality={85}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-[45%_12%] md:object-[40%_22%]"
            />
          </div>
        </motion.div>
        {/* Velos: tinte violeta + fundido a la izquierda y abajo */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#282060]/20 mix-blend-multiply" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--sand)_0%,rgba(17,12,38,0.8)_30%,rgba(17,12,38,0)_50%)] max-md:bg-[linear-gradient(0deg,var(--sand)_8%,rgba(17,12,38,0.85)_45%,rgba(17,12,38,0.1)_75%)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-gradient-to-t from-sand via-sand/70 to-transparent" />
      </div>

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="mx-auto flex min-h-[100dvh] max-w-[1180px] flex-col justify-end px-5 pb-12 pt-36 sm:px-8 md:justify-center md:pb-0"
      >
        <div className="max-w-[600px]">
          <span className="rise chip bg-shell/80 px-3.5 py-1.5 text-[13px] backdrop-blur" style={{ animationDelay: "0.1s" }}>
            Wonder Program · Entrenadora de CrossFit
          </span>
          <h1 className="display mt-5 text-[clamp(2rem,8.5vw,2.8rem)] leading-[1.02] text-white md:mt-6 md:text-[clamp(2.8rem,5.4vw,4.75rem)] md:leading-[1]">
            <span className="rise block" style={{ animationDelay: "0.2s" }}>
              Entrená con un plan.
            </span>
            <span className="rise block" style={{ animationDelay: "0.32s" }}>
              Mejorá con un <span className="ital pr-1">propósito.</span>
            </span>
          </h1>
          <p
            className="rise mt-5 max-w-[46ch] text-[15px] leading-relaxed text-cocoa md:mt-7 md:text-[17px]"
            style={{ animationDelay: "0.45s" }}
          >
            Programas de CrossFit, musculación y home training de Lucila Carro, campeona nacional de
            Uruguay. Para tu box, tu gimnasio o tu casa, estés donde estés.
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3 md:mt-9" style={{ animationDelay: "0.58s" }}>
            <ContactButton className={buttonClass()}>
              Empezá hoy <Arrow />
            </ContactButton>
            <Button href="#programas" variant="soft">
              Ver programas
            </Button>
          </div>
          <ul className="rise mt-9 hidden flex-wrap gap-2 md:flex" style={{ animationDelay: "0.7s" }} aria-label="Modalidades">
            {tags.map((t) => (
              <li key={t} className="rounded-full bg-shell/85 px-3.5 py-1.5 text-[13px] backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
