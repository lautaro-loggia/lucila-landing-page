"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Reveal } from "./motion-primitives";

const manifesto =
  "Soy uruguaya, atleta de CrossFit y entrenadora. Hace nueve años que entreno y cinco que compito en élite. Todo lo que aprendí compitiendo lo puse en Wonder Program, para que entrenes con un plan serio estés donde estés.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  // Arranca en un violeta apagado que igual cumple contraste 3:1 para texto grande.
  const color = useTransform(progress, range, ["#716aa3", "#efebfb"]);
  return (
    <motion.span style={{ color }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  const className =
    "font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.18] font-semibold tracking-tight text-mist";

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section ref={ref} id="sobre-mi" className="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 lg:pt-44">
      <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] w-[85%] overflow-hidden rounded-[28px]">
            <motion.div style={reduce ? undefined : { y: bigY }} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/images/sobre-mi.jpg"
                alt="Lucila Carro sonriendo apoyada sobre una barra con discos"
                fill
                quality={70}
                sizes="(min-width: 1024px) 34vw, 85vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <motion.div
            style={reduce ? undefined : { y: smallY }}
            className="absolute right-0 -bottom-10 aspect-[3/4] w-[42%] overflow-hidden rounded-[28px] border-4 border-ink"
          >
            <Image
              src="/images/foco.jpg"
              alt="Primer plano de Lucila concentrada antes de competir"
              fill
              quality={70}
              sizes="(min-width: 1024px) 16vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:pl-8 lg:pt-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-bold tracking-tighter">
              Hola, soy <span className="text-lilac">Lucila</span>.
            </h2>
          </Reveal>
          <div className="mt-8">
            <ScrollText text={manifesto} />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">
              Hace tres años vivo en Argentina. Además de los programas online, doy entrenamientos
              personalizados en Tigre y recorro boxes de Argentina y Uruguay con mis talleres.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
