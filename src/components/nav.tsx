"use client";

import { List, X, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#programas", label: "Programas" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#logros", label: "Logros" },
  { href: "#talleres", label: "Talleres" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`mx-auto mt-3 flex h-16 max-w-[1320px] items-center justify-between rounded-full px-4 transition-[background-color,border-color,margin] duration-500 sm:px-6 lg:mx-auto ${
          scrolled || open
            ? "mx-3 border border-mist/10 bg-night/75 backdrop-blur-xl"
            : "mx-3 border border-transparent"
        }`}
      >
        <a href="#inicio" className="flex items-baseline gap-2 font-display" onClick={() => setOpen(false)}>
          <span className="text-lg font-bold tracking-tight">Lucila Carro</span>
          <span className="hidden text-xs font-medium text-lilac sm:inline">Wonder Program</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-mist"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.links.start}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-violet px-5 py-2.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-lilac active:scale-[0.97] sm:inline-flex"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden />
            Empezá hoy
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-mist lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-3 mt-2 rounded-[28px] border border-mist/10 bg-night/95 p-3 backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3.5 font-display text-xl font-semibold hover:bg-plum"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.links.start}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-violet px-5 py-4 font-display font-semibold text-ink"
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Empezá hoy
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
