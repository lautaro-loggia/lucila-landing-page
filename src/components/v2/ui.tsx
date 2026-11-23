"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/** Aparece al entrar en pantalla: sube, se desenfoca y se aclara. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
      <Reveal className={`mx-auto max-w-2xl text-center ${className}`}>
        <span className="chip">{chip}</span>
        <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)] text-balance">{title}</h2>
        {aside ? <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-cocoa">{aside}</p> : null}
      </Reveal>
    );
  }
  return (
    <div className={`grid items-end gap-6 md:grid-cols-[1.4fr_1fr] ${className}`}>
      <Reveal>
        <span className="chip">{chip}</span>
        <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)] text-balance">{title}</h2>
      </Reveal>
      {aside ? (
        <Reveal delay={0.1} className="md:justify-self-end">
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-cocoa">{aside}</p>
        </Reveal>
      ) : null}
    </div>
  );
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
  const styles =
    variant === "dark"
      ? "bg-clay text-sand hover:bg-cream"
      : "bg-blush text-ink hover:bg-rose";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-[background-color,transform] duration-300 active:scale-[0.97] ${styles} ${className}`}
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
