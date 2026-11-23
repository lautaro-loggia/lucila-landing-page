"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { placeholderTestimonials, testimonials } from "@/lib/testimonials";
import { Reveal, SectionHead, ease } from "./ui";

const fallbackPhotos = ["/images/taller-1.jpg", "/images/taller-3.jpg", "/images/taller-4.jpg", "/images/taller-5.jpg"];

const list =
  testimonials.length > 0
    ? testimonials
    : process.env.NODE_ENV === "development"
      ? placeholderTestimonials
      : [];

/** Mazo de tarjetas que se arrastra + cita grande a la derecha. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  if (list.length === 0) return null;

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + list.length) % list.length);
  };
  const t = list[i];
  const words = t.quote.split(" ");

  return (
    <section id="testimonios" aria-label="Testimonios" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        chip="Testimonios"
        title={
          <>
            Lo que dicen <span className="ital">mis alumnos.</span>
          </>
        }
        aside="Historias reales de quienes entrenan con Wonder Program. Arrastrá las tarjetas para leer más."
      />

      <div className="mt-14 grid items-center gap-16 md:grid-cols-[minmax(0,1.05fr)_1fr] md:gap-16">
        <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-[min(100%,480px)] md:max-w-[520px]">
          {list.map((item, n) => {
            const depth = (n - i + list.length) % list.length;
            if (depth > 2) return null;
            const photo = item.photo ?? fallbackPhotos[n % fallbackPhotos.length];
            return (
              <motion.div
                key={n}
                drag={depth === 0 && !reduce ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 80) go(info.offset.x < 0 ? 1 : -1);
                }}
                animate={{
                  rotate: depth === 0 ? 0 : depth === 1 ? -5 : 6,
                  x: depth * -14,
                  y: depth * 10,
                  scale: 1 - depth * 0.04,
                  zIndex: 10 - depth,
                }}
                whileDrag={{ rotate: 6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`absolute inset-0 overflow-hidden rounded-[28px] bg-shell p-2 ring-1 ring-ink/10 shadow-[0_30px_50px_-24px_rgba(5,3,20,0.45)] ${
                  depth === 0 ? "cursor-grab active:cursor-grabbing" : ""
                }`}
              >
                {/* La foto ocupa toda la tarjeta; el nombre va encima, sobre un degradé. */}
                <div className="relative h-full overflow-hidden rounded-[22px] bg-blush">
                  <Image src={photo} alt="" fill sizes="(min-width: 768px) 520px, 90vw" quality={80} draggable={false} className="pointer-events-none object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110c26]/90 via-[#110c26]/10 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#efebfb]/90 px-3 py-1 text-xs text-sand">{item.detail}</span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-white/70">{item.detail}</p>
                    </div>
                    <span aria-hidden className="text-sm tracking-[0.15em] text-cream">★★★★★</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <p className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs text-taupe">Arrastrá la tarjeta →</p>
        </Reveal>

        <div>
          <span aria-hidden className="ital block text-7xl leading-none text-clay">“</span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={i}
              initial="hide"
              animate="show"
              exit="out"
              className="display mt-2 text-[clamp(1.6rem,2.5vw,2.25rem)] leading-[1.16] tracking-[-0.04em]"
            >
              {words.map((w, n) => (
                <motion.span
                  key={n}
                  className="inline-block pr-[0.25em]"
                  variants={{
                    hide: { opacity: 0, y: 14, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: n * 0.025, duration: 0.5, ease } },
                    out: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-taupe">{t.detail}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label="Anterior" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-blush">
                ←
              </button>
              <button type="button" aria-label="Siguiente" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full bg-clay text-sand">
                →
              </button>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {list.map((_, n) => (
              <span key={n} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/12">
                <motion.span
                  className="block h-full origin-left bg-ink"
                  animate={{ scaleX: n <= i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
