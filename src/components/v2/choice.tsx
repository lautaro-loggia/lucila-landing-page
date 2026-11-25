"use client";

import { ContactButton } from "./contact-form";
import { Arrow, Reveal } from "./ui";

/** Bloque para elegir modalidad: cada botón abre el formulario con esa respuesta ya elegida. */
export function Choice() {
  return (
    <section id="empezar" aria-label="Online o presencial" className="px-5 pb-28 sm:pb-36">
      <Reveal className="mx-auto max-w-[860px] rounded-[28px] bg-shell px-5 py-9 text-center ring-1 ring-ink/8 sm:px-10 sm:py-12">
        <h2 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.04] text-balance">
          Empezá a construir <span className="ital">tu mejor versión.</span>
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <ContactButton
            program="Online"
            className="group flex items-center justify-between gap-4 rounded-[22px] bg-clay px-5 py-4 text-left text-sand transition-[background-color,transform] duration-300 hover:bg-cream active:scale-[0.98]"
          >
            <span>
              <span className="block text-[17px] leading-tight font-medium">Entrená conmigo online</span>
              <span className="mt-1 block text-sm leading-tight">A distancia, estés donde estés</span>
            </span>
            <Arrow />
          </ContactButton>
          <ContactButton
            program="Presencial en Tigre"
            className="group flex items-center justify-between gap-4 rounded-[22px] border border-clay px-5 py-4 text-left text-ink transition-[background-color,transform] duration-300 hover:bg-blush active:scale-[0.98]"
          >
            <span>
              <span className="block text-[17px] leading-tight font-medium">Entrená conmigo presencialmente</span>
              <span className="mt-1 block text-sm leading-tight text-cocoa">En Tigre, Buenos Aires</span>
            </span>
            <Arrow />
          </ContactButton>
        </div>
        <p className="mx-auto mt-6 max-w-[38ch] text-sm leading-relaxed text-balance text-cocoa sm:max-w-none">
          Todos los niveles. Diferentes objetivos. Un mismo compromiso.
        </p>
      </Reveal>
    </section>
  );
}
