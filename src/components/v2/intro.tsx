"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "./ui";

const quote = "Tu mejor versión no se encuentra. | Se *construye.*"; // "|" = salto de línea

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#3d3566", "#efebfb"]);
  if (word === "|") return <br />;
  const italic = word.startsWith("*");
  const clean = word.replaceAll("*", "");
  return (
    <motion.span style={{ color }} className={italic ? "ital" : undefined}>
      {clean}{" "}
    </motion.span>
  );
}

/** Cita que se "tiñe" palabra por palabra mientras scrolleás. */
export function Philosophy() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.4"] });
  // Suaviza el scroll (rueda del mouse a saltos) con un resorte.
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5, restDelta: 0.0005 });
  const words = quote.split(" ");
  // Cada palabra se tiñe en una ventana ancha que se superpone con las vecinas,
  // así el color avanza como un degradé y no palabra por palabra de golpe.
  const span = 0.22;
  const range = (i: number): [number, number] => {
    const start = (i / (words.length - 1)) * (1 - span);
    return [start, start + span];
  };

  return (
    <section aria-label="Filosofía" className="px-5 py-24 text-center sm:py-32">
      <Reveal>
        <span className="chip">Filosofía</span>
      </Reveal>
      <p
        ref={ref}
        className="display mx-auto mt-8 max-w-[24ch] text-[clamp(1.9rem,3.6vw,3.15rem)] leading-[1.12] tracking-[-0.04em]"
      >
        {reduce
          ? quote.replaceAll("*", "").replace(" | ", " ")
          : words.map((w, i) => (
              <Word key={i} word={w} progress={progress} range={range(i)} />
            ))}
      </p>
      <Reveal blur delay={0.1}>
        <p className="mt-8 text-sm text-taupe">— Wonder Program</p>
      </Reveal>
    </section>
  );
}

// Logros de Lucila. No agregar resultados ni fechas sin confirmar.
const polaroids = [
  { src: "/images/podio.jpg", alt: "Lucila en el podio con la bandera de Uruguay", title: "Colombia 2026", note: "segundo puesto, élite", rot: -5, y: 10, pos: "object-[50%_30%]", wide: false },
  { src: "/images/medalla.jpg", alt: "Lucila con la medalla y el disco de SouthFit en alto", title: "Campeona de SouthFit 2026", note: "primer puesto", rot: 3, y: -8, pos: "object-top", wide: false },
  { src: "/images/diploma.jpg", alt: "Diploma de campeona nacional de Uruguay de los CrossFit Games 2025", title: "Campeona nacional", note: "hace más de 4 años", rot: -2, y: 12, pos: "object-center", wide: true },
  { src: "/images/strong.jpg", alt: "Lucila en la arena de los StrongFit Games", title: "StrongFit Games 2026", note: "Argentina", rot: 4, y: -4, pos: "object-top", wide: false },
];

const desktopQuery = "(min-width: 768px)";
function subscribeDesktop(cb: () => void) {
  const m = window.matchMedia(desktopQuery);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
/** En celular las fotos se deslizan en fila; solo en desktop se arrastran. */
function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => true);
}

function Polaroid({ p, i, canDrag }: { p: (typeof polaroids)[number]; i: number; canDrag: boolean }) {
  const reduce = useReducedMotion();
  // En celular, menos giro y menos desnivel: se leen mejor de a una
  const k = canDrag ? 1 : 0.4;
  return (
    <motion.figure
      drag={!reduce && canDrag}
      dragSnapToOrigin
      dragElastic={0.6}
      whileDrag={{ scale: 1.06, rotate: 0, zIndex: 20, cursor: "grabbing" }}
      whileHover={canDrag ? { rotate: 0, y: p.y - 10, scale: 1.03 } : undefined}
      initial={reduce ? false : { opacity: 0, y: p.y * k + 60, rotate: p.rot * k * 2.5 }}
      whileInView={{ opacity: 1, y: p.y * k, rotate: p.rot * k }}
      viewport={{ once: true, amount: canDrag ? 0.3 : 0.01 }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay: (i % 4) * 0.08 }}
      className={`relative shrink-0 snap-center bg-[#efebfb] p-2.5 pb-3 md:cursor-grab md:touch-pan-y text-sand shadow-[0_24px_40px_-18px_rgba(5,3,20,0.35)] select-none ${
        p.wide ? "w-[78vw] max-w-[340px] md:w-[330px]" : "w-[64vw] max-w-[260px] md:w-[235px]"
      }`}
    >
      {/* cinta */}
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-rose/80 shadow-sm"
      />
      <div className={`relative overflow-hidden bg-blush ${p.wide ? "aspect-[1278/984]" : "aspect-[4/5]"}`}>
        <Image
          src={p.src}
          alt={p.alt}
          fill
          draggable={false}
          sizes={p.wide ? "340px" : "260px"}
          quality={85}
          className={`pointer-events-none object-cover ${p.pos}`}
        />
      </div>
      <figcaption className="px-1 pt-3">
        <span className="ital block text-lg leading-none">{p.title}</span>
        <span className="mt-1 block text-[11px] text-[#6b6390]">{p.note}</span>
      </figcaption>
    </motion.figure>
  );
}

/** Tira corta de polaroids con cinta, que se pueden arrastrar (cierra "Mi historia"). */
export function Gallery() {
  const desktop = useIsDesktop();
  const strip = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // En celular: qué foto está centrada, para los puntitos de abajo
  const onScroll = () => {
    const el = strip.current;
    if (!el || desktop) return;
    // Las fotos no miden todas lo mismo: gana la más cercana al centro
    const center = el.scrollLeft + el.clientWidth / 2;
    const dist = Array.from(el.children).map((c) => {
      const item = c as HTMLElement;
      return Math.abs(item.offsetLeft - el.offsetLeft + item.offsetWidth / 2 - center);
    });
    setCurrent(dist.indexOf(Math.min(...dist)));
  };
  const goTo = (n: number) => {
    const el = strip.current;
    const item = el?.children[n] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - el.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section aria-label="Galería" className="overflow-x-clip px-5 pb-32 sm:pb-40">
      <Reveal blur className="mx-auto max-w-xl text-center">
        <h2 className="display text-[clamp(2rem,3.6vw,2.8rem)]">
          Del box <span className="ital">al podio.</span>
        </h2>
      </Reveal>
      <div
        ref={strip}
        onScroll={onScroll}
        className="mx-auto mt-6 flex max-w-[1180px] snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[18vw] pt-6 pb-6 [scrollbar-width:none] max-md:-mx-5 md:mt-12 md:justify-center md:gap-0 md:overflow-visible md:px-0 md:pt-4 md:pb-0 md:[&>*+*]:-ml-5"
      >
        {polaroids.map((p, i) => (
          <Polaroid key={p.src} p={p} i={i} canDrag={desktop} />
        ))}
      </div>

      {/* Celular: puntitos que muestran cuántas fotos hay y en cuál estás */}
      <div className="mt-2 flex items-center justify-center gap-2 md:hidden">
        {polaroids.map((p, n) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Ver foto ${n + 1} de ${polaroids.length}`}
            aria-current={n === current}
            onClick={() => goTo(n)}
            className="grid h-6 place-items-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${n === current ? "w-6 bg-clay" : "w-1.5 bg-ink/25"}`}
            />
          </button>
        ))}
      </div>
      <p className="mt-8 hidden text-center text-xs text-taupe md:block">Arrastrá las fotos ↔</p>
    </section>
  );
}
