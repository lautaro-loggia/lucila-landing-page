"use client";

import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ContactButton } from "./contact-form";
import { Arrow, Reveal, SectionHead } from "./ui";

const includes = ["Técnica de levantamientos", "Gimnásticos", "Certificado para cada alumno"];
const cities = ["Argentina", "Uruguay"];
const steps = ["Me escribís por WhatsApp", "Coordinamos fecha y formato", "Voy a tu box"];

const workshopPhotos = [
  "/images/taller-2.jpg",
  "/images/taller-3.jpg",
  "/images/taller-4.jpg",
  "/images/taller-5.jpg",
  "/images/taller-1.jpg",
];

/**
 * Carrusel de fotos de talleres: se desliza con el dedo o con las flechas y
 * avanza solo cada unos segundos mientras está en pantalla (se frena al
 * tocarlo o pasar el mouse).
 */
function WorkshopCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const inView = useInView(track, { amount: 0.5 });

  const goTo = (n: number) => {
    const el = track.current;
    const count = workshopPhotos.length;
    const i = ((n % count) + count) % count;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    // Centra la foto elegida (en desktop las primeras/últimas quedan contra el borde)
    const left = Math.min(
      el.scrollWidth - el.clientWidth,
      Math.max(0, item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2),
    );
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const item = c as HTMLElement;
      const d = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setCurrent(best);
  };

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = setTimeout(() => goTo(current + 1), 4000);
    return () => clearTimeout(id);
    // goTo solo depende de refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, inView, paused, reduce]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] max-sm:-mx-5 max-sm:px-[8vw]"
      >
        {workshopPhotos.map((src, n) => (
          <div
            key={src}
            className={`relative aspect-[4/3] w-[84vw] shrink-0 snap-center overflow-hidden rounded-[20px] transition-[opacity,transform] duration-500 sm:w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] ${
              n === current ? "opacity-100" : "max-sm:scale-[0.96] max-sm:opacity-60"
            }`}
          >
            <Image
              src={src}
              alt="Grupo de alumnos con sus certificados al cierre de un taller"
              fill
              quality={78}
              sizes="(min-width: 768px) 330px, (min-width: 640px) 50vw, 84vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Controles: puntitos + flechas */}
      <div className="mt-5 flex items-center justify-center gap-4 sm:justify-between">
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => {
            setPaused(true);
            goTo(current - 1);
          }}
          className="hidden size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-blush sm:grid"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <div className="flex items-center gap-2">
          {workshopPhotos.map((src, n) => (
            <button
              key={src}
              type="button"
              aria-label={`Ver foto ${n + 1} de ${workshopPhotos.length}`}
              aria-current={n === current}
              onClick={() => {
                setPaused(true);
                goTo(n);
              }}
              className="grid h-6 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${n === current ? "w-6 bg-clay" : "w-1.5 bg-ink/25"}`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={() => {
            setPaused(true);
            goTo(current + 1);
          }}
          className="hidden size-11 place-items-center rounded-full bg-clay text-sand transition-colors hover:bg-cream sm:grid"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}

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

      <Reveal className="mx-auto mt-8 max-w-[980px]">
        <WorkshopCarousel />
      </Reveal>
    </section>
  );
}
