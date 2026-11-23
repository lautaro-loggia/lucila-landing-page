"use client";

import { Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "./motion-primitives";

const steps = [
  { title: "Escribime", body: "Mandame un WhatsApp y contame tu experiencia, tus objetivos y dónde entrenás." },
  { title: "Elegimos tu programa", body: "CrossFit en su nivel justo, musculación o home training. El que mejor encaje con vos." },
  { title: "A entrenar", body: "Recibís tu planificación y entrenás desde tu box, tu gimnasio o tu casa, en cualquier país." },
];

const faqs = [
  {
    q: "¿Puedo entrenar desde otro país?",
    a: "Sí. Los programas de Wonder Program son a distancia, así que podés seguirlos desde cualquier parte del mundo.",
  },
  {
    q: "¿Necesito experiencia previa?",
    a: "No. El programa de CrossFit tiene tres niveles y arrancás en el que corresponde a tu momento. Musculación y home training también se adaptan a vos.",
  },
  {
    q: "¿Qué necesito para el home training?",
    a: "Contame qué material tenés en casa y te digo cómo encarar el programa para sacarle el máximo provecho.",
  },
  {
    q: "¿Hacés talleres en otros boxes?",
    a: "Sí. Ya dicté talleres en Argentina y Uruguay. Si tenés un box, escribime y coordinamos fecha y formato.",
  },
  {
    q: "¿Cómo me inscribo y cuánto cuesta?",
    a: "Escribime por WhatsApp: te cuento las opciones, los precios y cómo empezar esta misma semana.",
  },
];

function Item({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-mist/10">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          {q}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors ${
              open ? "border-violet bg-violet text-ink" : "border-mist/20 text-mist"
            }`}
          >
            <Plus size={16} weight="bold" aria-hidden />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-6 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="mx-auto max-w-[1320px] px-4 pt-32 sm:px-6 lg:pt-44">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02] font-bold tracking-tighter">
            Empezar es simple.
          </h2>
          <ol className="mt-12 space-y-10">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.1} className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span className="font-display text-5xl leading-none font-bold text-violet tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight">{s.title}</p>
                    <p className="mt-2 max-w-[40ch] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-lilac uppercase">Preguntas frecuentes</p>
          <div className="border-t border-mist/10">
            {faqs.map((f, i) => (
              <Item
                key={f.q}
                id={`faq-${i}`}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
