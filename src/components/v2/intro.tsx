"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "./ui";

const avatars = ["/images/podio.jpg", "/images/medalla.jpg", "/images/strong.jpg"];

/** Franja de prueba social bajo el hero. */
export function Rating() {
  return (
    <section aria-label="Reconocimiento" className="px-5 pt-16 pb-16 text-center">
      <Reveal>
        <div className="flex justify-center -space-x-3">
          {avatars.map((src) => (
            <span key={src} className="relative size-12 overflow-hidden rounded-full ring-4 ring-sand">
              <Image src={src} alt="" fill sizes="48px" quality={78} className="object-cover object-top" />
            </span>
          ))}
        </div>
        <p aria-hidden className="mt-4 text-[13px] tracking-[0.3em] text-clay">★★★★★</p>
        <p className="mt-2 text-lg font-medium tracking-tight">Campeona nacional de Uruguay 2025</p>
        <p className="mt-2 text-sm text-taupe">
          Cuatro años seguidos en Copa Sur y competencias en ocho países.
        </p>
      </Reveal>
    </section>
  );
}

// Provisoria: Lucila va a pasar una frase suya para reemplazarla.
const quote = "Entrenar no es hacer más. | Es hacerlo *bien.*"; // "|" = salto de línea

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
    <section aria-label="Filosofía" className="px-5 py-24 text-center sm:py-36">
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

// Fotos que no aparecen en "Mi historia", para no repetir.
const polaroids = [
  { src: "/images/podio.jpg", title: "Con la celeste", note: "bandera en alto", rot: -6, y: 10, pos: "object-[50%_30%]" },
  { src: "/images/medalla.jpg", title: "Disco en alto", note: "con la medalla puesta", rot: 3, y: -8, pos: "object-top" },
  { src: "/images/foco.jpg", title: "Foco", note: "concentrada", rot: -2, y: 14, pos: "object-center" },
  { src: "/images/crossfit.jpg", title: "Salto con soga", note: "en competencia", rot: 5, y: -4, pos: "object-[50%_40%]" },
  { src: "/images/bici.jpg", title: "Assault bike", note: "a fondo", rot: -4, y: 8, pos: "object-[50%_35%]" },
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
      className="relative w-[64vw] max-w-[260px] shrink-0 snap-center md:w-[210px] bg-[#efebfb] p-2.5 pb-3 md:cursor-grab md:touch-pan-y text-sand shadow-[0_24px_40px_-18px_rgba(5,3,20,0.35)] select-none"
    >
      {/* cinta */}
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-rose/80 shadow-sm"
      />
      <div className="relative aspect-[4/5] overflow-hidden bg-blush">
        <Image
          src={p.src}
          alt=""
          fill
          draggable={false}
          sizes="210px"
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
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : el.clientWidth;
    setCurrent(Math.min(polaroids.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };
  const goTo = (n: number) => {
    const el = strip.current;
    const item = el?.children[n] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
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
