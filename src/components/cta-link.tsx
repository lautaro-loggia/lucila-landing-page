import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  icon?: "whatsapp" | "arrow" | "none";
  className?: string;
};

export function CtaLink({ href, children, variant = "primary", icon = "whatsapp", className = "" }: Props) {
  const external = href.startsWith("http");
  const base =
    "group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 font-display text-[15px] font-semibold tracking-tight transition-[transform,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]";
  const styles =
    variant === "primary"
      ? "bg-violet text-ink hover:bg-lilac"
      : "border border-mist/25 text-mist hover:border-lilac hover:text-lilac";

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon === "whatsapp" && <WhatsappLogo size={20} weight="fill" aria-hidden />}
      {children}
      {icon === "arrow" && (
        <ArrowUpRight
          size={18}
          weight="bold"
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
