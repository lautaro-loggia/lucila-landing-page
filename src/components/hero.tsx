"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { CtaLink } from "./cta-link";
import { Magnetic } from "./motion-primitives";

const headline = "Entrená con la Fittest de Uruguay.";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const sideY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate overflow-hidden pt-28 pb-16 lg:min-h-[100dvh] lg:pt-24 lg:pb-0"
    >
      {/* Wordmark gigante de fondo, eco de los posteos de la marca */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: wordX }}
        className="pointer-events-none absolute -bottom-[4vw] left-0 -z-10 select-none whitespace-nowrap font-display text-[26vw] leading-none font-extrabold tracking-tighter text-plum/70"
      >
        WONDER
      </motion.div>

      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 sm:px-6 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="fade-in mb-6 text-xs font-semibold tracking-[0.2em] text-lilac uppercase">
            Wonder Program by Lucila
          </p>

          <h1
            aria-label={headline}
            className="font-display text-[clamp(2.75rem,6.4vw,5.6rem)] leading-[0.98] font-bold tracking-tighter"
          >
            {headline.split(" ").map((w, i, arr) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
                <span
                  className={`word-in inline-block ${i >= 3 ? "text-lilac" : ""}`}
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  {w}
                  {i < arr.length - 1 ? "\u00a0" : ""}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="fade-in mt-7 max-w-[46ch] text-lg leading-relaxed text-muted"
            style={{ animationDelay: "0.55s" }}
          >
            Programas de CrossFit, musculación y home training para tu box, tu gimnasio o tu casa.
            Estés donde estés.
          </p>

          <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.7s" }}>
            <Magnetic>
              <CtaLink href={site.links.start}>Empezá hoy</CtaLink>
            </Magnetic>
            <CtaLink href="#programas" variant="ghost" icon="none">
              Ver programas
            </CtaLink>
          </div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative ml-auto w-[82%] sm:w-[70%] lg:w-[78%]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <motion.div style={reduce ? undefined : { y: mainY }} className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src="/images/hero.jpg"
                  alt="Lucila Carro colgada de la barra, a punto de hacer dominadas"
                  fill
                  preload
                  fetchPriority="high"
                  quality={70}
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover object-[50%_30%]"
                />
              </motion.div>
              <div aria-hidden className="curtain absolute inset-0 bg-violet" />
            </div>
          </div>

          <motion.div
            style={reduce ? undefined : { y: sideY }}
            className="absolute -bottom-6 left-0 w-[44%] sm:w-[36%] lg:-bottom-10 lg:w-[42%]"
          >
            <div className="card-in tilt relative aspect-[3/4] overflow-hidden rounded-[28px] border-4 border-ink shadow-[0_30px_80px_-20px_rgba(10,6,30,0.9)]">
              <Image
                src="/images/flex.jpg"
                alt="Lucila sonriendo y mostrando los bíceps en plena competencia"
                fill
                quality={70}
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
