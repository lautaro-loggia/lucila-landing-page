"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Reveal } from "./motion-primitives";

const items = [
  {
    title: "Fittest de Uruguay",
    body: "Campeona nacional de Uruguay en la temporada de los CrossFit Games.",
    image: { src: "/images/podio.jpg", alt: "Lucila en lo más alto del podio con la bandera de Uruguay" },
  },
  {
    title: "4 años seguidos en Copa Sur",
    body: "Clasificó a la semifinal de los CrossFit Games cuatro años consecutivos: uno en equipo y tres como atleta individual.",
    image: { src: "/images/salto.jpg", alt: "Lucila festejando con un salto frente al público" },
  },
  {
    title: "Campeona SouthFit 2026",
    body: "Ganó la edición 2026 de SouthFit. El festejo quedó en el video.",
    image: { src: "/images/medalla.jpg", alt: "Lucila con la medalla, levantando un disco sobre la cabeza" },
  },
  {
    title: "Podios en todo el mundo",
    body: "Ganó y subió al podio en Chile, Brasil, Sudáfrica, Ecuador, Colombia, Uruguay y Argentina. También compitió en Estados Unidos.",
    image: { src: "/images/strong.jpg", alt: "Lucila sonriendo en la arena de una competencia internacional" },
  },
];

function AutoVideo() {
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

export function Achievements() {
  return (
    <section id="logros" className="mx-auto max-w-[1320px] px-4 pt-40 sm:px-6 lg:pt-52">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-lilac uppercase">Logros</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-bold tracking-tighter">
              Del podio a tu planificación.
            </h2>
            <div className="relative mt-10 aspect-[9/14] h-[min(60dvh,590px)] max-w-full overflow-hidden rounded-[28px] bg-night">
              <AutoVideo />
            </div>
          </div>
        </div>

        <ol className="flex flex-col gap-24 lg:col-span-7 lg:gap-36 lg:pt-40">
          {items.map((item, i) => (
            <li key={item.title}>
              <Reveal>
                <div className="grid items-end gap-6 sm:grid-cols-[1fr_200px]">
                  <div>
                    <span className="font-display text-sm font-semibold text-violet tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">{item.body}</p>
                  </div>
                  <div className="relative aspect-[3/4] w-40 overflow-hidden rounded-[28px] sm:w-full">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      quality={70}
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
