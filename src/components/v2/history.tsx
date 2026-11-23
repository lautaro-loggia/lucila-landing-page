"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHead, ease } from "./ui";

/*
  Todos los datos salen de la info que pasó Lucila para el sitio anterior
  (sobre mí, logros, números y certificados). No agregar fechas ni logros sin confirmar.
*/
const chapters = [
  {
    tag: "El comienzo",
    title: "Todo empezó en Uruguay",
    body: "Soy uruguaya, atleta de CrossFit y entrenadora. Hace nueve años que hago CrossFit.",
    src: "/images/sobre-mi.jpg",
    alt: "Lucila apoyada sobre una barra con discos",
    pos: "object-[50%_25%]",
  },
  {
    tag: "La élite",
    title: "Cuatro años seguidos en Copa Sur",
    body: "Hace cinco años que compito en élite. Clasifiqué cuatro años consecutivos a Copa Sur, la semifinal de los CrossFit Games: uno en equipo y tres como atleta individual.",
    src: "/images/salto.jpg",
    alt: "Lucila festejando con los brazos arriba en una competencia",
    pos: "object-[50%_30%]",
  },
  {
    tag: "Por el mundo",
    title: "Podios en siete países",
    body: "Gané y subí al podio en Chile, Brasil, Sudáfrica, Ecuador, Colombia, Uruguay y Argentina. También competí en Estados Unidos.",
    src: "/images/strong.jpg",
    alt: "Lucila sonriendo en la arena de una competencia",
    pos: "object-top",
  },
  {
    tag: "Formación",
    title: "De atleta a entrenadora",
    body: "Me recibí de Técnica en Fitness en el IUACJ, con orientación en entrenamiento personalizado, y soy CrossFit Level 1 Trainer.",
    src: "/images/coaching.jpg",
    alt: "Lucila entrenando",
    pos: "object-[30%_30%]",
  },
  {
    tag: "Argentina",
    title: "Una nueva casa",
    body: "Hace tres años vivo en Argentina. Doy entrenamientos personalizados en Tigre y recorro boxes de Argentina y Uruguay con mis talleres.",
    src: "/images/taller-1.jpg",
    alt: "Grupo de alumnos con sus certificados al cierre de un taller",
    pos: "object-center",
  },
  {
    tag: "2025 · 2026",
    title: "Campeona nacional y SouthFit",
    body: "En 2025 fui campeona nacional de Uruguay en la temporada de los CrossFit Games, y en 2026 gané SouthFit.",
    src: "/video/southfit-poster.jpg",
    alt: "Lucila festejando su victoria en SouthFit 2026",
    pos: "object-[50%_30%]",
  },
  {
    tag: "Hoy",
    title: "Wonder Program",
    body: "Todo lo que aprendí compitiendo lo puse en Wonder Program, para que entrenes con un plan serio estés donde estés.",
    src: "/images/hero.jpg",
    alt: "Lucila en plena competencia",
    pos: "object-[50%_25%]",
  },
];

function Chapter({
  c,
  n,
  active,
  onActive,
}: {
  c: (typeof chapters)[number];
  n: number;
  active: boolean;
  onActive: (n: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  // Se activa cuando el capítulo cruza la franja central de la pantalla.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  // Entrada: se dispara una sola vez cuando el capítulo asoma en pantalla.
  const shown = useInView(ref, { once: true, amount: 0.2 });
  useEffect(() => {
    if (inView) onActive(n);
  }, [inView, n, onActive]);

  const state = reduce || shown ? "show" : "hide";
  const item = {
    hide: { opacity: 0, y: 22, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
  };

  return (
    <li ref={ref} className="relative pl-10 md:min-h-[46vh] md:pl-14">
      <motion.span
        aria-hidden
        initial={false}
        animate={reduce ? undefined : { scale: active ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.5, ease }}
        className={`absolute top-1 left-0 grid size-7 -translate-x-1/2 place-items-center rounded-full text-[11px] tabular-nums transition-colors duration-500 md:size-8 ${
          active ? "bg-clay text-sand shadow-[0_0_0_6px_rgba(157,99,247,0.18)]" : "bg-shell text-taupe ring-1 ring-ink/15"
        }`}
      >
        {String(n + 1).padStart(2, "0")}
      </motion.span>
      <motion.div
        initial={reduce ? false : "hide"}
        animate={state}
        variants={{ hide: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className={`transition-opacity duration-500 ${active ? "md:opacity-100" : "md:opacity-40"}`}
      >
        <motion.p variants={item} className="text-xs tracking-[0.2em] text-clay uppercase">
          {c.tag}
        </motion.p>
        <motion.h3
          variants={item}
          className="display mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.045em]"
        >
          {c.title}
        </motion.h3>
        <motion.p variants={item} className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-cocoa">
          {c.body}
        </motion.p>
      </motion.div>
      {/* En mobile la foto va dentro de cada capítulo: entra después del texto con un zoom suave */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={state === "show" ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[18px] bg-blush md:hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.1 }}
          animate={state === "show" ? { scale: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.3, ease }}
        >
          <Image src={c.src} alt={c.alt} fill quality={70} sizes="90vw" className={`object-cover ${c.pos}`} />
        </motion.div>
      </motion.div>
    </li>
  );
}

/** Mi historia: línea de tiempo con foto fija que cambia según el capítulo. */
export function History() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.55", "end 0.55"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const c = chapters[active];

  return (
    <section id="sobre-mi" aria-label="Mi historia" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        chip="Mi historia"
        title={
          <>
            Hola, soy <span className="ital">Lucila.</span>
          </>
        }
        aside="Del primer WOD en Uruguay a competir por el mundo y entrenar gente en Argentina. Esta es mi historia."
      />

      <div className="mt-14 grid gap-12 md:grid-cols-[0.9fr_1fr] md:gap-16">
        {/* Foto fija (desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-28">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-blush">
              <AnimatePresence initial={false}>
                <motion.div
                  key={c.src}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Image src={c.src} alt={c.alt} fill quality={80} sizes="45vw" className={`object-cover ${c.pos}`} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#110c26]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={c.tag}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="ital text-3xl"
                  >
                    {c.tag}
                  </motion.p>
                </AnimatePresence>
                <p className="text-sm tabular-nums text-white/70">
                  {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Capítulos con línea de progreso */}
        <div className="relative">
          <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-ink/12" />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY: line }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-clay"
          />
          <ol ref={listRef} className="flex flex-col gap-14 md:gap-0 md:pb-[10vh]">
            {chapters.map((ch, n) => (
              <Chapter key={ch.title} c={ch} n={n} active={n === active} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
