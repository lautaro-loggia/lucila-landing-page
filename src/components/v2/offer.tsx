"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ContactButton } from "./contact-form";
import { Arrow, Reveal, SectionHead } from "./ui";

const includes = ["Técnica de levantamientos", "Gimnásticos", "Certificado para cada alumno"];
const cities = ["Argentina", "Uruguay"];
const steps = ["Me escribís por WhatsApp", "Coordinamos fecha y formato", "Voy a tu box"];

/** Entrada tipo "ticket" para pedir un taller en tu box. */
export function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const tilt = useTransform(scrollYProgress, [0, 0.45], [-3, 0]);

  return (
    <section id="talleres" aria-label="Talleres" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        center
        chip="Talleres"
        title={
          <>
            Llevá un <span className="ital">taller a tu box.</span>
          </>
        }
        aside="Ya dicté talleres en boxes de Argentina y Uruguay. Si tenés un box, armamos uno para tu comunidad."
      />

      <motion.div
        ref={ref}
        style={reduce ? undefined : { rotate: tilt }}
        className="mx-auto mt-12 grid max-w-[980px] overflow-hidden rounded-[24px] shadow-[0_40px_80px_-40px_rgba(5,3,20,0.5)] md:grid-cols-[1.5fr_1fr]"
      >
        {/* Cuerpo del ticket */}
        <div className="relative isolate min-h-[340px] overflow-hidden p-6 text-white sm:p-8">
          <motion.div style={reduce ? undefined : { y: imgY }} className="absolute -inset-y-[10%] inset-x-0 -z-10">
            <Image src="/images/taller-1.jpg" alt="" fill quality={85} sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-[#110c26]/70" />
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
            Taller de CrossFit · <span className="text-white/75">Argentina y Uruguay</span>
          </span>
          <h3 className="display mt-7 max-w-[13ch] text-[clamp(2.1rem,3.6vw,3.1rem)] leading-[0.98]">
            Tu comunidad, <span className="ital">entrenando mejor.</span>
          </h3>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-white/80">
            Una jornada en tu box con técnica, corrección en el momento y mucha energía. Coordinamos
            fecha y formato según tu comunidad.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {includes.map((x) => (
              <li key={x} className="rounded-full border border-white/25 px-3 py-1.5 text-xs">
                ✓ {x}
              </li>
            ))}
          </ul>
        </div>

        {/* Talón */}
        <div className="relative flex flex-col bg-shell p-6 sm:p-7">
          {/* muescas y línea punteada */}
          <span aria-hidden className="absolute top-0 left-0 hidden h-full border-l-2 border-dashed border-ink/15 md:block" />
          <span aria-hidden className="absolute -top-4 -left-4 hidden size-8 rounded-full bg-sand md:block" />
          <span aria-hidden className="absolute -bottom-4 -left-4 hidden size-8 rounded-full bg-sand md:block" />

          <p className="text-[11px] tracking-[0.25em] text-clay">PASE GRUPAL</p>
          <p className="display mt-2 text-[3.25rem] leading-none tracking-[-0.06em]">Tu box</p>
          <p className="mt-1 text-sm text-taupe">{cities.join(" · ")}</p>

          <p className="mt-6 text-xs text-taupe">Cómo se arma</p>
          <ol className="mt-2 flex flex-col divide-y divide-dashed divide-ink/15">
            {steps.map((step, n) => (
              <li key={step} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blush text-xs tabular-nums text-cream">
                  {n + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div aria-hidden className="hidden min-h-6 flex-1 md:block" />

          <ContactButton
            program="Taller para mi box"
            className="group mt-6 flex items-center justify-between rounded-full bg-clay px-5 py-3 text-sm font-medium text-sand md:mt-auto"
          >
            Pedí un taller <Arrow />
          </ContactButton>
        </div>
      </motion.div>

      <Reveal className="mx-auto mt-6 flex max-w-[980px] gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
        {["/images/taller-2.jpg", "/images/taller-3.jpg", "/images/taller-4.jpg", "/images/taller-5.jpg"].map((src) => (
          <div key={src} className="relative aspect-[4/3] w-[60vw] shrink-0 overflow-hidden rounded-[20px] sm:w-[calc(25%-9px)]">
            <Image src={src} alt="Grupo de alumnos con sus certificados al cierre de un taller" fill quality={78} sizes="(min-width: 640px) 25vw, 60vw" className="object-cover" />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
