"use client";

import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { studentResults, type StudentResult } from "@/lib/students";
import { Reveal, SectionHead, ease } from "./ui";

const sizes = "(min-width: 768px) 500px, 100vw";

/**
 * Antes y después superpuestos: la línea sigue al mouse y vuelve al centro al salir.
 * En pantallas táctiles se arrastra con el dedo; con teclado, flechas izquierda y derecha.
 */
function Compare({ s }: { s: StudentResult }) {
  const ref = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const touched = useRef(false);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Posición de la línea, en % del ancho
  const target = useMotionValue(50);
  const smooth = useSpring(target, { stiffness: 420, damping: 40, mass: 0.4 });
  const pos = reduce ? target : smooth;
  const clip = useMotionTemplate`inset(0 0 0 ${pos}%)`;
  const left = useMotionTemplate`${pos}%`;
  const beforeOpacity = useTransform(pos, [0, 25], [0.35, 1]);
  const afterOpacity = useTransform(pos, [75, 100], [1, 0.35]);

  // Al aparecer, la línea se mueve una vez sola para mostrar que se puede usar
  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    const c = animate(target, [50, 22, 78, 50], { duration: 2.4, delay: 0.6, ease });
    const stop = () => c.stop();
    const el = ref.current;
    el?.addEventListener("pointermove", stop, { once: true });
    el?.addEventListener("keydown", stop, { once: true });
    return () => {
      stop();
      el?.removeEventListener("pointermove", stop);
      el?.removeEventListener("keydown", stop);
    };
  }, [inView, reduce, target]);

  const set = (v: number) => {
    touched.current = true;
    const value = Math.min(100, Math.max(0, v));
    target.set(value);
    if (range.current) range.current.value = String(Math.round(value));
  };
  const follow = (e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };

  return (
    <div>
      <div
        ref={ref}
        onPointerMove={follow}
        onClick={follow}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") set(50);
        }}
        className="relative aspect-[3/4] cursor-ew-resize touch-pan-y overflow-hidden rounded-[24px] bg-blush select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-clay sm:rounded-[28px]"
      >
        <Image src={s.before} alt={`${s.name}, antes`} fill quality={85} sizes={sizes} draggable={false} className="pointer-events-none object-cover" />
        <motion.div style={{ clipPath: clip }} className="pointer-events-none absolute inset-0">
          <Image src={s.after} alt={`${s.name}, después`} fill quality={85} sizes={sizes} draggable={false} className="object-cover" />
        </motion.div>

        {/* Línea y manija */}
        <motion.div aria-hidden style={{ left }} className="pointer-events-none absolute inset-y-0 w-0">
          <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(5,3,20,0.5)]" />
          <span className="absolute top-1/2 left-0 flex size-11 -translate-1/2 items-center justify-center rounded-full bg-white text-sand shadow-[0_6px_20px_-4px_rgba(5,3,20,0.6)]">
            <CaretLeft size={14} weight="bold" />
            <CaretRight size={14} weight="bold" />
          </span>
        </motion.div>

        <input
          ref={range}
          type="range"
          min={0}
          max={100}
          step={5}
          defaultValue={50}
          aria-label="Comparar antes y después"
          onChange={(e) => set(Number(e.target.value))}
          className="pointer-events-none absolute inset-0 opacity-0"
        />
      </div>
      <div aria-hidden className="ital mt-3 flex justify-between px-1 text-2xl leading-none">
        <motion.span style={{ opacity: beforeOpacity }}>Antes</motion.span>
        <motion.span style={{ opacity: afterOpacity }}>Después</motion.span>
      </div>
    </div>
  );
}

/** Antes y después de alumnos de Wonder Program. */
export function Results() {
  if (studentResults.length === 0) return null;
  return (
    <section id="alumnos" aria-label="Resultados de alumnos" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        chip="Alumnos"
        title={
          <>
            Cambios que <span className="ital">se construyen.</span>
          </>
        }
        aside="El proceso de quienes entrenan con Wonder Program: un plan, constancia y tiempo."
      />
      <div className="mt-14 flex flex-col gap-16">
        {studentResults.map((s) => (
          <figure key={s.before} className="grid gap-6 md:grid-cols-[1fr_minmax(0,500px)] md:items-center md:gap-14">
            <Reveal className="md:order-last">
              <Compare s={s} />
            </Reveal>
            <figcaption className="flex flex-col gap-2">
              <span className="display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.05] text-balance">{s.name}</span>
              <span className="text-[15px] text-cocoa">{s.since}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
