"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ContactButton } from "./contact-form";
import { Arrow, ease } from "./ui";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#programas", label: "Programas" },
  { href: "#alumnos", label: "Alumnos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#talleres", label: "Talleres" },
];

/** Barra transparente arriba; al bajar se vuelve una pastilla flotante. */
export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <motion.nav
        aria-label="Principal"
        animate={{
          maxWidth: scrolled ? 1140 : 1220,
          backgroundColor: scrolled ? "rgba(27,21,64,0.82)" : "rgba(27,21,64,0)",
          boxShadow: scrolled
            ? "0 10px 30px -12px rgba(5,3,20,0.18), inset 0 0 0 1px rgba(5,3,20,0.06)"
            : "0 0 0 0 rgba(5,3,20,0), inset 0 0 0 0 rgba(5,3,20,0)",
          paddingTop: scrolled ? 10 : 18,
          paddingBottom: scrolled ? 10 : 18,
        }}
        transition={{ duration: 0.5, ease }}
        className="mx-auto flex items-center justify-between rounded-full px-4 backdrop-blur-md sm:px-6"
      >
        <a href="#inicio" className="display text-[22px] tracking-[-0.04em]">
          Lucila Carro
        </a>
        <ul className="hidden items-center gap-9 text-[15px] text-cocoa lg:flex">
          {links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} className={`transition-colors hover:text-ink ${i === 0 ? "text-ink" : ""}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ContactButton className="group hidden items-center gap-2 rounded-full bg-clay px-5 py-3 text-[15px] font-medium text-sand sm:inline-flex">
            Empezá hoy <Arrow />
          </ContactButton>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full bg-clay text-sand lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className="mx-auto mt-2 max-w-[1140px] rounded-[28px] bg-shell p-6 shadow-[0_20px_50px_-20px_rgba(5,3,20,0.3)] lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="display block py-2 text-3xl">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ContactButton
              onClick={() => setOpen(false)}
              className="mt-5 flex w-full items-center justify-between rounded-full bg-clay px-6 py-4 text-sand"
            >
              Empezá hoy <span aria-hidden>→</span>
            </ContactButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
