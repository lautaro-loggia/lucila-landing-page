"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Aparece al entrar en pantalla: sube y se aclara. El desenfoque solo se usa en
 * textos (blur), porque animar un filtro sobre bloques grandes con fotos cuesta
 * mucho en celulares.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  blur = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : blur ? { opacity: 0, y, filter: "blur(8px)" } : { opacity: 0, y }}
      whileInView={blur ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Encabezado de sección: chip + título a la izquierda, bajada a la derecha. */
export function SectionHead({
  chip,
  title,
  aside,
  center = false,
  className = "",
}: {
  chip: string;
  title: ReactNode;
  aside?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  if (center) {
    return (
      <Reveal blur className={`mx-auto max-w-2xl text-center ${className}`}>
        <span className="chip">{chip}</span>
        <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)] text-balance">{title}</h2>
        {aside ? <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-cocoa">{aside}</p> : null}
      </Reveal>
    );
  }
  return (
    <div className={`grid items-end gap-6 md:grid-cols-[1.4fr_1fr] ${className}`}>
      <Reveal blur>
        <span className="chip">{chip}</span>
        <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)] text-balance">{title}</h2>
      </Reveal>
      {aside ? (
        <Reveal blur delay={0.1} className="md:justify-self-end">
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-cocoa">{aside}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Clases del botón principal, para usarlas también en botones que no son links. */
export function buttonClass(variant: "dark" | "soft" = "dark", className = "") {
  const styles = variant === "dark" ? "bg-clay text-sand hover:bg-cream" : "bg-blush text-ink hover:bg-rose";
  return `group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-[background-color,transform] duration-300 active:scale-[0.97] ${styles} ${className}`;
}

export function Button({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "soft";
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, className)}
    >
      {children}
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-block transition-transform duration-300 group-hover:translate-x-1 ${className}`}>
      →
    </span>
  );
}
