import Image from "next/image";
import { Barbell, House, MapPin } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { CtaLink } from "./cta-link";
import { Reveal, SplitHeading } from "./motion-primitives";

export function Programs() {
  return (
    <section id="programas" className="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 lg:pt-40">
      <SplitHeading
        text="Tres formas de entrenar a distancia. Una en persona."
        accent={["distancia."]}
        className="max-w-[16ch] font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] font-bold tracking-tighter"
      />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">
          Con Wonder Program recibís tu planificación y entrenás a tu ritmo, en cualquier país y
          con el material que tengas.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-5">
        {/* CrossFit: la celda principal */}
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <article className="group relative flex h-full min-h-[520px] flex-col justify-end overflow-hidden rounded-[28px] p-7 sm:p-9">
            <Image
              src="/images/crossfit.jpg"
              alt="Lucila saltando la soga en una competencia de CrossFit"
              fill
              quality={70}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="-z-10 object-cover object-[50%_25%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/0" />
            <h3 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">CrossFit</h3>
            <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-mist/85">
              Programación para hacer en tu box, con tres niveles para que avances desde tus
              primeros WODs hasta competir.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Niveles">
              {["Nivel 1", "Nivel 2", "Nivel 3"].map((lvl) => (
                <li
                  key={lvl}
                  className="rounded-full border border-lilac/60 bg-ink/40 px-4 py-1.5 text-sm font-semibold text-lilac backdrop-blur-sm"
                >
                  {lvl}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* Musculación */}
        <Reveal delay={0.08} className="lg:col-span-5">
          <article className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] p-7">
            <Image
              src="/images/musculacion.jpg"
              alt="Lucila levantando una barra olímpica en el gimnasio"
              fill
              quality={70}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="-z-10 object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <Barbell size={30} weight="duotone" className="mb-auto text-lilac" aria-hidden />
            <h3 className="font-display text-3xl font-bold tracking-tight">Musculación</h3>
            <p className="mt-2 max-w-[40ch] text-mist/85">
              Planificación de fuerza para entrenar en el gimnasio con un objetivo claro.
            </p>
          </article>
        </Reveal>

        {/* Home training: celda de color de marca */}
        <Reveal delay={0.16} className="lg:col-span-5">
          <article className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[28px] bg-violet p-7 text-ink">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-10 font-display text-[11rem] leading-none font-extrabold tracking-tighter text-ink/10"
            >
              WP
            </span>
            <House size={30} weight="duotone" aria-hidden />
            <h3 className="mt-auto font-display text-3xl font-bold tracking-tight">Home training</h3>
            <p className="mt-2 max-w-[38ch] font-medium text-ink/80">
              Sesiones completas para entrenar en tu casa, adaptadas a lo que tenés a mano.
            </p>
          </article>
        </Reveal>

        {/* Presencial en Tigre */}
        <Reveal className="lg:col-span-12">
          <article className="grid overflow-hidden rounded-[28px] border border-mist/10 bg-night md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[260px] md:min-h-[340px]">
              <Image
                src="/images/coaching.jpg"
                alt="Lucila dando indicaciones a un alumno durante un entrenamiento"
                fill
                quality={70}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <p className="flex items-center gap-2 text-sm font-semibold text-lilac">
                <MapPin size={18} weight="fill" aria-hidden /> Tigre, Buenos Aires
              </p>
              <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Entrenamiento personalizado presencial
              </h3>
              <p className="max-w-[48ch] leading-relaxed text-muted">
                Si estás por la zona de Tigre, entrenamos cara a cara: técnica, corrección en el
                momento y un plan hecho para vos.
              </p>
              <div>
                <CtaLink href={site.links.tigre} variant="ghost" icon="arrow">
                  Consultar por Tigre
                </CtaLink>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
