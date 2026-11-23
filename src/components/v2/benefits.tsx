"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ContactButton, type ProgramChoice } from "./contact-form";
import { Reveal, SectionHead, ease } from "./ui";

const benefits = [
  {
    title: "Fuerza real",
    body: "Progresiones de fuerza bien medidas para que levantes más, semana a semana y sin lesionarte.",
    src: "/images/musculacion.jpg",
  },
  {
    title: "Técnica sólida",
    body: "Cada movimiento con su progresión: olímpicos, gimnásticos y básicos hechos como corresponde.",
    src: "/images/hero.jpg",
  },
  {
    title: "Más motor",
    body: "Engine y acondicionamiento para aguantar los WODs largos y terminar entero.",
    src: "/images/bici.jpg",
  },
  {
    title: "Constancia",
    body: "Un plan claro cada semana: sabés qué hacer cada día y dejás de improvisar.",
    src: "/images/sobre-mi.jpg",
  },
  {
    title: "Desde donde estés",
    body: "En tu box, tu gimnasio o tu casa, en cualquier país y con el material que tengas.",
    src: "/images/home.jpg",
  },
];

/** Video del festejo en SouthFit: se reproduce solo mientras está en pantalla. */
function BenefitsVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src="/video/southfit.mp4"
      poster="/video/southfit-poster.jpg"
      muted
      loop
      playsInline
      preload="none"
      controls={!!reduce}
      aria-label="Video de Lucila festejando su victoria en SouthFit 2026"
    />
  );
}

/** Lista acordeón que avanza sola; avanza sola mientras está en pantalla. */
export function Benefits() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = setTimeout(() => setI((v) => (v + 1) % benefits.length), 4500);
    return () => clearTimeout(id);
  }, [i, inView, paused, reduce]);

  return (
    <section aria-label="Beneficios" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        chip="Beneficios"
        title={
          <>
            Lo que <span className="ital">Wonder</span> hace por vos.
          </>
        }
        aside="Un plan serio, pensado por una atleta élite — para tu cuerpo y para tu cabeza."
      />
      <div
        ref={ref}
        className="mt-14 grid gap-10 md:grid-cols-[0.85fr_1fr] md:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ol className="flex flex-col">
          {benefits.map((b, n) => {
            const on = n === i;
            return (
              <li key={b.title} className="border-t border-ink/12 last:border-b">
                <button
                  type="button"
                  onClick={() => setI(n)}
                  aria-expanded={on}
                  className="flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span className={`text-xs tabular-nums transition-colors ${on ? "text-ink" : "text-taupe/60"}`}>
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`display text-[clamp(1.6rem,2.8vw,2.3rem)] transition-colors duration-500 ${
                      on ? "text-ink" : "text-taupe/45 hover:text-taupe"
                    }`}
                  >
                    {b.title}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40ch] pb-6 pl-10 text-[15px] leading-relaxed text-cocoa">{b.body}</p>
                      {!paused && !reduce ? (
                        <motion.span
                          key={i}
                          aria-hidden
                          className="mb-[-1px] block h-px origin-left bg-ink"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: inView ? 1 : 0 }}
                          transition={{ duration: 4.5, ease: "linear" }}
                        />
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-blush md:aspect-auto md:min-h-[560px]">
          <BenefitsVideo />
          <span className="absolute bottom-5 left-5 rounded-full bg-shell/90 px-3 py-1 text-xs backdrop-blur">
            Campeona SouthFit 2026
          </span>
        </Reveal>
      </div>
    </section>
  );
}

const programs = [
  {
    name: "CrossFit",
    role: "En tu box · 3 niveles",
    body: "Programación para tu box con tres niveles, para que avances desde tus primeros WODs hasta competir.",
    tags: ["Nivel 1", "Nivel 2", "Nivel 3"],
    src: "/images/crossfit.jpg",
    pos: "object-[50%_35%] max-md:object-[50%_30%]",
    choice: "CrossFit" as ProgramChoice,
  },
  {
    name: "Musculación",
    role: "En el gimnasio",
    body: "Planificación de fuerza para entrenar en el gimnasio con un objetivo claro y progresiones medidas.",
    tags: ["Fuerza", "Hipertrofia", "Técnica"],
    src: "/images/musculacion.jpg",
    pos: "object-[50%_30%] max-md:object-[50%_38%]",
    choice: "Musculación" as ProgramChoice,
  },
  {
    name: "Home training",
    role: "Desde tu casa",
    body: "Sesiones completas para entrenar en tu casa, adaptadas al material que tengas a mano.",
    tags: ["Poco material", "Full body", "Movilidad"],
    src: "/images/home.jpg",
    pos: "object-[50%_30%] max-md:object-[50%_58%]",
    choice: "Home training" as ProgramChoice,
  },
  {
    name: "Presencial",
    role: "Personalizado en Tigre",
    body: "Si estás por la zona de Tigre, entrenamos cara a cara: técnica, corrección en el momento y un plan hecho para vos.",
    tags: ["1 a 1", "Técnica", "Tigre"],
    src: "/images/coaching.jpg",
    pos: "object-[30%_30%] max-md:object-[30%_45%]",
    choice: "Presencial en Tigre" as ProgramChoice,
  },
];

/** Tarjetas que se expanden al pasar el mouse (en mobile, al tocarlas). */
export function Programs() {
  const [active, setActive] = useState(0);

  return (
    <section id="programas" aria-label="Programas" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        chip="Programas"
        title={
          <>
            Elegí cómo
            <br />
            <span className="ital">querés entrenar.</span>
          </>
        }
        aside="Elegí un programa para ver qué incluye, dónde se entrena y cómo arrancar."
      />
      <Reveal className="@container mt-14 flex flex-col gap-3 md:h-[560px] md:flex-row">
        {programs.map((p, n) => {
          const on = n === active;
          return (
            <motion.article
              key={p.name}
              onMouseEnter={() => setActive(n)}
              onFocus={() => setActive(n)}
              onClick={() => setActive(n)}
              initial={false}
              animate={{ flexGrow: on ? 3.2 : 1 }}
              transition={{ duration: 0.8, ease }}
              style={{ flexBasis: 0 }}
              className={`relative isolate cursor-pointer overflow-hidden rounded-[24px] bg-blush ${
                on ? "min-h-[460px]" : "min-h-[120px]"
              } md:min-h-0`}
            >
              <Image
                src={p.src}
                alt=""
                fill
                quality={85}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`-z-10 object-cover transition-transform duration-1000 ${p.pos} ${on ? "scale-100" : "scale-110"}`}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#110c26]/85 via-[#110c26]/15 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-shell/25 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                {String(n + 1).padStart(2, "0")}
              </span>
              {/*
                El título y la bajada quedan siempre visibles y solo cambian de tamaño.
                La descripción se despliega debajo con ancho fijo (el de la tarjeta abierta),
                así no se re-acomoda mientras la tarjeta cambia de ancho.
              */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <motion.h3
                  initial={false}
                  animate={{ fontSize: on ? "36px" : "20px" }}
                  transition={{ duration: 0.8, ease }}
                  className="display leading-[1.05]"
                >
                  {p.name}
                </motion.h3>
                <p className="mt-1 text-xs text-white/75">{p.role}</p>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.6, delay: 0.2, ease },
                          opacity: { duration: 0.4, delay: 0.5 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: { opacity: { duration: 0.12 }, height: { duration: 0.5, ease } },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="w-[calc(100cqw-2.5rem)] max-w-[460px] pt-3 sm:w-[calc(100cqw-3rem)] md:w-[calc((100cqw-36px)*0.516-3rem)]">
                        <p className="text-sm leading-relaxed text-white/85">{p.body}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-full bg-[#efebfb] px-3 py-1 text-xs text-sand">
                              {t}
                            </span>
                          ))}
                          <ContactButton
                            program={p.choice}
                            className="ml-1 text-xs text-white underline-offset-4 hover:underline"
                          >
                            Quiero este →
                          </ContactButton>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </Reveal>
    </section>
  );
}
