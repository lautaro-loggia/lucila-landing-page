"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

let instance: Lenis | null = null;
/** Frena o reanuda el scroll suave (por ejemplo, mientras hay un modal abierto). */
export function setSmoothScroll(on: boolean) {
  if (on) instance?.start();
  else instance?.stop();
}

/** Scroll suave para toda la página (rueda y links internos). Se apaga con "reducir movimiento". */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      autoRaf: true,
      // Los links "#programas", "#sobre-mi", etc. también se deslizan, dejando lugar para la barra fija.
      anchors: { offset: -96 },
    });
    instance = lenis;
    return () => {
      instance = null;
      lenis.destroy();
    };
  }, []);
  return null;
}
