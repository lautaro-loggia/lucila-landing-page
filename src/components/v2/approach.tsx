"use client";

import Image from "next/image";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal, SectionHead } from "./ui";

const orbit = [
  "/images/podio.jpg",
  "/images/salto.jpg",
  "/images/medalla.jpg",
  "/images/strong.jpg",
  "/images/crossfit.jpg",
  "/images/flex.jpg",
  "/images/foco.jpg",
  "/images/hero.jpg",
];

function Card({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={`relative overflow-hidden rounded-[24px] bg-shell ${className}`}>
      {children}
    </Reveal>
  );
}

function PhotoCard({
  src,
  label,
  icon,
  className = "",
  pos = "object-center",
  delay = 0,
}: {
  src: string;
  label: string;
  icon: string;
  className?: string;
  pos?: string;
  delay?: number;
}) {
  return (
    <Card delay={delay} className={`group min-h-[300px] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        quality={85}
        sizes="(min-width: 768px) 33vw, 100vw"
        className={`object-cover transition-transform duration-[1.2s] group-hover:scale-105 ${pos}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#110c26]/70 via-transparent to-transparent" />
      <p className="display absolute bottom-5 left-5 flex items-center gap-3 text-2xl tracking-[-0.035em] text-white">
        <span className="grid size-8 place-items-center rounded-full bg-[#efebfb] text-sm text-sand">{icon}</span>
        {label}
      </p>
    </Card>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{v}</span>;
}

/** Bento "sobre mí": órbita de fotos, marquesina gigante, letra capital y contador. */
export function Approach() {
  return (
    <section id="valores" aria-label="Valores" className="mx-auto max-w-[1180px] px-5 pb-32 sm:pb-40">
      <SectionHead
        chip="Valores"
        title={
          <>
            Tres cosas que <span className="ital">nunca</span> <br className="hidden md:block" />
            negocio.
          </>
        }
        aside="Los principios con los que armo cada plan de Wonder Program."
      />

      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {/* Fila 1 */}
        <Card className="flex min-h-[340px] md:min-h-[420px] flex-col">
          <h3 className="display p-6 text-[2.1rem] leading-[1.02] tracking-[-0.045em]">
            <span className="mb-3 block font-sans text-xs tracking-normal text-taupe">01</span>
            Técnica
            <br />
            <span className="ital">primero</span>
          </h3>
          <div className="relative mt-auto h-[270px]">
            <Image src="/images/sobre-mi.jpg" alt="Lucila apoyada sobre una barra con discos" fill quality={85} sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-[50%_25%]" />
          </div>
        </Card>

        <Card delay={0.08} className="flex min-h-[340px] md:min-h-[420px] flex-col items-center justify-between p-6">
          <span className="self-start text-xs text-taupe">02</span>
          <div className="relative size-[230px]">
            <div className="orbit absolute inset-0">
              {orbit.map((src, n) => {
                const a = (n / orbit.length) * Math.PI * 2;
                return (
                  <span
                    key={src}
                    className="absolute size-12 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + Math.cos(a) * 42}%`, top: `${50 + Math.sin(a) * 42}%` }}
                  >
                    <span className="orbit-counter relative block size-12 overflow-hidden rounded-full shadow-md ring-4 ring-shell">
                      <Image src={src} alt="" fill sizes="48px" quality={78} className="object-cover object-top" />
                    </span>
                  </span>
                );
              })}
            </div>
            <span className="ital absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-clay text-3xl text-sand">
              L
            </span>
          </div>
          <h3 className="display self-start text-[2.1rem] leading-[1.02] tracking-[-0.045em]">
            Disfrutar
            <br />
            <span className="ital">el proceso</span>
          </h3>
        </Card>

        <Card delay={0.16} className="flex min-h-[340px] md:min-h-[420px] flex-col">
          <h3 className="display p-6 text-[2.1rem] leading-[1.02] tracking-[-0.045em]">
            <span className="mb-3 block font-sans text-xs tracking-normal text-taupe">03</span>
            Constancia
            <br />
            sin excusas
          </h3>
          <p className="px-6 text-sm text-taupe">fuerza · técnica · constancia ·</p>
          <div aria-hidden className="mt-auto overflow-hidden pb-4">
            <div className="marquee-track flex w-max">
              {[0, 1].map((k) => (
                <span key={k} className="ital pr-8 text-[9rem] leading-none whitespace-nowrap">
                  fuerza · técnica · constancia ·
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Filas 2 y 3 */}
        <PhotoCard
          src="/images/musculacion.jpg"
          label="Precisión antes que velocidad"
          icon="●"
          className="max-md:hidden md:row-span-2"
          pos="object-[50%_30%]"
        />

        <Card delay={0.08} className="grid gap-6 p-7 max-md:hidden md:col-span-2 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <h3 className="display self-center text-[2.4rem] leading-[1.02] tracking-[-0.045em]">
            Un plan
            <br />
            <span className="ital">para vos.</span>
          </h3>
          <p className="font-serif text-[17px] leading-[1.5] text-cocoa">
            <span className="float-left mr-2 font-serif text-[4.2rem] leading-[0.8] text-clay">C</span>
            ada planificación arranca por vos: tu experiencia, tus objetivos y dónde entrenás. Soy
            Técnica en Fitness por el IUACJ y CrossFit Level 1 Trainer, y hace tres años vivo en
            Argentina, donde doy entrenamientos personalizados en Tigre y recorro boxes con mis
            talleres. Respondo personalmente cada mensaje.
          </p>
        </Card>

        <Card delay={0.1} className="flex min-h-[260px] flex-col justify-between p-7 max-md:hidden">
          <p className="text-xs text-taupe">Desde hace</p>
          <p className="display text-[6.5rem] leading-none tracking-[-0.07em]">
            <Counter to={9} />
            <span className="ital text-5xl"> años</span>
          </p>
          <p className="max-w-[26ch] text-sm text-cocoa">haciendo CrossFit, cinco de ellos compitiendo en élite.</p>
        </Card>

        <PhotoCard src="/images/taller-2.jpg" label="Una comunidad real" icon="♡" delay={0.16} pos="object-center" className="max-md:hidden" />
      </div>
    </section>
  );
}
