"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { CtaLink } from "./cta-link";

const photos = [
  { src: "/images/taller-1.jpg", alt: "Grupo de alumnos con sus certificados al final de un taller de CrossFit" },
  { src: "/images/taller-2.jpg", alt: "Participantes festejando bajo banderas de varios países al cerrar un taller" },
  { src: "/images/taller-3.jpg", alt: "Foto grupal sentados en el piso del box después del taller" },
  { src: "/images/taller-4.jpg", alt: "Alumnos posando con sus diplomas en un box de CrossFit" },
  { src: "/images/taller-5.jpg", alt: "Grupo numeroso con certificados en un box amplio" },
];

const cities = [
  { name: "Saladillo", country: "AR" },
  { name: "Rosario", country: "AR" },
  { name: "Paysandú", country: "UY" },
  { name: "Rivera", country: "UY" },
  { name: "Colonia", country: "UY" },
  { name: "Tacuarembó", country: "UY" },
];

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[34vw] lg:pr-10">
      <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-bold tracking-tighter">
        Llevá un taller de CrossFit <span className="text-lilac">a tu box.</span>
      </h2>
      <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">
        Ya dicté talleres en Argentina y Uruguay. Si tenés un box, armamos uno para tu comunidad.
      </p>
      <ul className="mt-7 flex flex-wrap gap-2" aria-label="Ciudades donde dictó talleres">
        {cities.map((c) => (
          <li key={c.name} className="rounded-full border border-mist/15 px-4 py-1.5 text-sm text-mist">
            {c.name} <span className="text-muted">{c.country}</span>
          </li>
        ))}
      </ul>
      <div className="mt-9">
        <CtaLink href={site.links.workshop}>Pedí un taller</CtaLink>
      </div>
    </div>
  );
}

export function Workshops() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const pan = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={wrap}
      id="talleres"
      className="relative mt-40 lg:mt-52"
      style={pan ? { height: `calc(100dvh + ${distance}px)` } : undefined}
    >
      <div className={pan ? "sticky top-0 flex h-[100dvh] items-center overflow-hidden" : ""}>
        <motion.div
          ref={track}
          style={pan ? { x } : undefined}
          className={
            pan
              ? "flex w-max items-center gap-6 pr-[8vw] pl-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))]"
              : "px-4 sm:px-6"
          }
        >
          <Intro />
          <div
            className={
              pan
                ? "flex gap-6"
                : "-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6"
            }
          >
            {photos.map((p, i) => (
              <figure
                key={p.src}
                className={`relative shrink-0 snap-center overflow-hidden rounded-[28px] ${
                  pan ? "h-[72dvh] w-[44vh]" : "aspect-[3/4] w-[78vw] sm:w-[44vw]"
                } ${pan && i % 2 === 1 ? "translate-y-10" : ""}`}
              >
                <Image src={p.src} alt={p.alt} fill quality={70} sizes="(min-width: 1024px) 44vh, 78vw" className="object-cover" />
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
