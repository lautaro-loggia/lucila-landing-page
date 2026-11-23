"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Barbell,
  CaretDown,
  CalendarCheck,
  ChatCircleDots,
  Check,
  Heartbeat,
  House,
  type Icon,
  Lightning,
  MapPin,
  Medal,
  Plant,
  Target,
  TrendUp,
  Trophy,
  UsersThree,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/site";
import { setSmoothScroll } from "./smooth-scroll";

/** Lo que se puede elegir de entrada desde un botón (la tarjeta de un programa, el ticket del taller). */
export type ProgramChoice = "CrossFit" | "Musculación" | "Home training" | "Presencial en Tigre" | "Taller para mi box";

const WORKSHOP: ProgramChoice = "Taller para mi box";

type Option = { value: string; hint?: string; icon?: Icon };

type Answers = {
  program: string;
  goal: string;
  level: string;
  group: string;
  name: string;
  place: string;
  box: string;
  notes: string;
};

const empty: Answers = { program: "", goal: "", level: "", group: "", name: "", place: "", box: "", notes: "" };

type Question = { key: "program" | "goal" | "level" | "group"; title: string; options: Option[]; columns?: 2 };

const programQ: Question = {
  key: "program",
  title: "¿Qué te interesa?",
  options: [
    { value: "CrossFit", hint: "Programación para tu box", icon: Lightning },
    { value: "Musculación", hint: "Para entrenar en el gimnasio", icon: Barbell },
    { value: "Home training", hint: "Desde tu casa, con lo que tengas", icon: House },
    { value: "Presencial en Tigre", hint: "Personalizado, cara a cara", icon: MapPin },
    { value: WORKSHOP, hint: "Un taller para tu comunidad", icon: UsersThree },
    { value: "No sé todavía", hint: "Lo charlamos y te recomiendo uno", icon: ChatCircleDots },
  ],
};

const goalQ: Question = {
  key: "goal",
  title: "¿Qué querés lograr?",
  columns: 2,
  options: [
    { value: "Ganar fuerza", icon: Barbell },
    { value: "Mejorar la técnica", icon: Target },
    { value: "Más motor y resistencia", icon: Heartbeat },
    { value: "Ser constante", icon: CalendarCheck },
  ],
};

const levelQ: Question = {
  key: "level",
  title: "¿Cómo venís con el entrenamiento?",
  options: [
    { value: "Recién arranco", hint: "Quiero empezar desde la base", icon: Plant },
    { value: "Entreno hace poco", hint: "Ya tengo algo de base", icon: TrendUp },
    { value: "Entreno hace años", hint: "Quiero llevarlo a otro nivel", icon: Medal },
    { value: "Compito", hint: "Busco rendimiento", icon: Trophy },
  ],
};

const groupQ: Question = {
  key: "group",
  title: "¿Cuántas personas serían, más o menos?",
  columns: 2,
  options: [
    { value: "Hasta 10" },
    { value: "Entre 10 y 20" },
    { value: "Más de 20" },
    { value: "No sé todavía" },
  ],
};

/** Las preguntas cambian según lo que eligió: entrenar o pedir un taller. */
function questionsFor(program: string, preset: boolean): Question[] {
  const rest = program === WORKSHOP ? [groupQ] : [goalQ, levelQ];
  return preset ? rest : [programQ, ...rest];
}

/** Arma el mensaje de WhatsApp solo con lo que la persona completó. */
export function buildMessage(a: Answers) {
  const name = a.name.trim();
  const notes = a.notes.trim();
  const place = a.place.trim();

  if (a.program === WORKSHOP) {
    const box = a.box.trim();
    const intro = `¡Hola Lucila! ${name ? `Soy ${name}${box ? `, de ${box},` : ""} y` : "Tengo un box y"} me interesa que des un taller de CrossFit para nuestra comunidad.`;
    const lines = [
      box && `• Box: ${box}`,
      place && `• Ciudad: ${place}`,
      a.group && `• Personas: ${a.group}`,
      notes && `• Algo más: ${notes}`,
    ].filter(Boolean);
    return lines.length ? `${intro}\n\n${lines.join("\n")}` : intro;
  }

  const what =
    a.program === "Presencial en Tigre"
      ? "quiero entrenar presencial con vos en Tigre."
      : a.program === "No sé todavía"
        ? "quiero entrenar con Wonder Program y me gustaría que me recomiendes un programa."
        : "quiero entrenar con Wonder Program.";
  const intro = `¡Hola Lucila! ${name ? `Soy ${name} y ${what}` : what.charAt(0).toUpperCase() + what.slice(1)}`;
  const lines = [
    a.program && a.program !== "No sé todavía" && `• Programa: ${a.program}`,
    a.goal && `• Objetivo: ${a.goal}`,
    a.level && `• Experiencia: ${a.level}`,
    place && `• Desde: ${place}`,
    notes && `• Algo más: ${notes}`,
  ].filter(Boolean);
  return lines.length ? `${intro}\n\n${lines.join("\n")}` : intro;
}

const ContactFormContext = createContext<(program?: ProgramChoice) => void>(() => {});

/** Abre el formulario, opcionalmente con un programa ya elegido. */
export function useContactForm() {
  return useContext(ContactFormContext);
}

function OptionCard({
  option,
  active,
  compact,
  onSelect,
}: {
  option: Option;
  active: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`flex w-full gap-3.5 rounded-2xl border p-4 text-left transition-[border-color,background-color,transform] duration-200 active:scale-[0.98] ${
        compact ? "flex-col items-start" : "items-center"
      } ${active ? "border-clay bg-clay/12" : "border-ink/10 bg-shell hover:border-clay/50"}`}
    >
      {Icon && (
        <span
          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            active ? "bg-clay text-sand" : "bg-clay/15 text-cream"
          }`}
        >
          <Icon size={20} weight="duotone" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-medium leading-snug text-ink">{option.value}</span>
        {option.hint && <span className="mt-0.5 block text-sm leading-snug text-cocoa">{option.hint}</span>}
      </span>
      {!compact && (
        <span
          className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
            active ? "border-clay bg-clay text-sand" : "border-ink/20 text-transparent"
          }`}
        >
          <Check size={12} weight="bold" />
        </span>
      )}
    </button>
  );
}

const field =
  "w-full rounded-xl border border-ink/12 bg-shell px-4 text-base text-ink outline-none transition-colors placeholder:text-taupe focus:border-clay";

/**
 * Antes de ir a WhatsApp, unas preguntas cortas de a una por pantalla: se toca
 * una opción y pasa sola a la siguiente (todo se puede saltear). Al final, el
 * nombre y unos datos, y el botón abre el chat con el mensaje ya armado.
 * No se guarda nada: el mensaje viaja solo en el link de WhatsApp.
 *
 * Es un <dialog> nativo: foco atrapado, Escape para cerrar y fondo inerte.
 * En mobile sube desde abajo como una hoja; en desktop va centrado.
 */
export function ContactFormProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<Answers>(empty);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  // Si se entró desde un programa o desde el taller, esa pregunta ya está respondida
  const [preset, setPreset] = useState(false);

  const steps = questionsFor(answers.program, preset);
  const TOTAL = steps.length + 1;
  const workshop = answers.program === WORKSHOP;

  const open = useCallback((program?: ProgramChoice) => {
    setPreset(Boolean(program));
    setStep(0);
    setDir(1);
    setAnswers(program ? { ...empty, program } : empty);
    dialog.current?.showModal();
    // Mientras está abierto, la página de atrás no scrollea
    document.documentElement.style.overflow = "hidden";
    setSmoothScroll(false);
  }, []);

  const unlock = () => {
    document.documentElement.style.overflow = "";
    setSmoothScroll(true);
  };

  // Cierre animado: baja la hoja y apaga el fondo, y recién ahí cierra el <dialog>
  const close = () => {
    const el = dialog.current;
    if (!el?.open || el.classList.contains("closing")) return;
    const finish = () => {
      if (!el.classList.contains("closing")) return;
      el.classList.remove("closing");
      el.close();
      unlock();
    };
    if (reduce) {
      el.close();
      return unlock();
    }
    el.classList.add("closing");
    el.addEventListener("animationend", finish, { once: true });
    // Por si el evento no llega (pestaña en segundo plano), cierra igual
    setTimeout(finish, 400);
  };

  const go = (to: number, total = TOTAL) => {
    setDir(to > step ? 1 : -1);
    setStep(Math.max(0, Math.min(total - 1, to)));
  };

  const choose = (key: Question["key"], value: string) => {
    const next = { ...answers, [key]: value };
    // Si cambió de "entrenar" a "taller" (o al revés), las preguntas siguientes cambian
    const total = questionsFor(next.program, preset).length + 1;
    setAnswers(next);
    setTimeout(() => go(step + 1, total), reduce ? 0 : 260);
  };

  const question = steps[step];
  const isLast = step === TOTAL - 1;
  const picked = steps.filter((q) => answers[q.key]);
  const message = buildMessage(answers);

  return (
    <ContactFormContext.Provider value={open}>
      {children}

      <dialog
        ref={dialog}
        aria-labelledby="contact-form-title"
        // Lenis no toma la rueda adentro: el formulario scrollea solo
        data-lenis-prevent
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => {
          if (!dialog.current?.open) unlock();
        }}
        onClick={(e) => {
          // Un click en el fondo (fuera de la hoja) cierra
          if (e.target === e.currentTarget) close();
        }}
        className="contact-form m-0 mt-auto w-full max-w-none overscroll-contain bg-transparent p-0 text-ink backdrop:bg-[#05030f]/70 backdrop:backdrop-blur-sm md:m-auto md:max-w-lg"
      >
        <div className="flex max-h-[90svh] flex-col overflow-hidden rounded-t-[28px] border border-ink/10 bg-sand md:rounded-[28px]">
          {/* Barra de arriba: volver, progreso y cerrar */}
          <div className="flex items-center gap-3 px-4 pt-4 md:px-6 md:pt-5">
            <button
              type="button"
              onClick={() => go(step - 1)}
              aria-label="Volver"
              disabled={step === 0}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-ink transition-[opacity,color] hover:text-cream disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <div className="flex flex-1 gap-1.5" aria-hidden>
              {Array.from({ length: TOTAL }, (_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/12">
                  <span
                    className={`block h-full rounded-full bg-clay transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i <= step ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-ink transition-colors hover:text-cream"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          <div className="flex-1 overflow-x-hidden overflow-y-auto px-5 pt-5 pb-6 md:px-7 md:pb-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${step}-${workshop}`}
                initial={reduce ? false : { opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs tracking-[0.16em] text-clay uppercase">
                  {isLast ? "Último paso" : `Paso ${step + 1} de ${TOTAL}`}
                </p>

                {question ? (
                  <>
                    <h2 id="contact-form-title" className="display mt-2 text-[1.75rem] leading-tight">
                      {question.title}
                    </h2>
                    <div className={`mt-5 grid gap-2.5 ${question.columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {question.options.map((o) => (
                        <OptionCard
                          key={o.value}
                          option={o}
                          compact={question.columns === 2 && Boolean(o.icon)}
                          active={answers[question.key] === o.value}
                          onSelect={() => choose(question.key, o.value)}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => go(step + 1)}
                      className="mx-auto mt-5 block text-sm text-taupe underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      Saltear esta pregunta
                    </button>
                  </>
                ) : (
                  <>
                    <h2 id="contact-form-title" className="display mt-2 text-[1.75rem] leading-tight">
                      ¡Listo! <span className="ital">¿Cómo te llamás?</span>
                    </h2>

                    {/* Lo elegido, a mano para revisar: tocar uno vuelve a esa pregunta */}
                    {(preset || picked.length > 0) && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {preset && answers.program ? (
                          <span className="rounded-lg bg-clay/15 px-2.5 py-1 text-xs text-cream">{answers.program}</span>
                        ) : null}
                        {picked.map((q) => (
                          <button
                            key={q.key}
                            type="button"
                            onClick={() => go(steps.indexOf(q))}
                            className="rounded-lg bg-clay/15 px-2.5 py-1 text-xs text-cream transition-colors hover:bg-clay/25"
                          >
                            {answers[q.key]}
                          </button>
                        ))}
                      </div>
                    )}

                    <input
                      type="text"
                      name="nombre"
                      autoComplete="given-name"
                      aria-label="Tu nombre"
                      value={answers.name}
                      onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className={`${field} mt-5 h-13`}
                    />
                    {workshop ? (
                      <input
                        type="text"
                        name="box"
                        autoComplete="organization"
                        aria-label="Nombre del box"
                        value={answers.box}
                        onChange={(e) => setAnswers((a) => ({ ...a, box: e.target.value }))}
                        placeholder="Nombre del box"
                        className={`${field} mt-2.5 h-13`}
                      />
                    ) : null}
                    <input
                      type="text"
                      name="lugar"
                      autoComplete="address-level2"
                      aria-label={workshop ? "Ciudad del box" : "Desde dónde entrenás"}
                      value={answers.place}
                      onChange={(e) => setAnswers((a) => ({ ...a, place: e.target.value }))}
                      placeholder={workshop ? "Ciudad del box" : "¿Desde dónde? Ciudad, país (opcional)"}
                      className={`${field} mt-2.5 h-13`}
                    />
                    <textarea
                      name="mensaje"
                      rows={2}
                      aria-label="Algo más que quieras contarle"
                      value={answers.notes}
                      onChange={(e) => setAnswers((a) => ({ ...a, notes: e.target.value }))}
                      placeholder={
                        workshop
                          ? "¿Algo más? Fechas posibles, qué les gustaría trabajar… (opcional)"
                          : "¿Algo más? Lesiones, horarios, disponibilidad… (opcional)"
                      }
                      className={`${field} mt-2.5 resize-none py-3`}
                    />

                    {/* Vista previa: así le llega a Lucila */}
                    <details className="group mt-4 rounded-xl border border-ink/10 bg-shell/60">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-cocoa">
                        Ver cómo le llega el mensaje
                        <CaretDown size={16} aria-hidden className="transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mx-3 mb-3 rounded-xl rounded-tr-sm bg-[#1f5c4a] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line text-white">
                        {message}
                      </p>
                    </details>

                    {/* Un link y no un submit: en iOS es la forma segura de abrir WhatsApp */}
                    <a
                      href={whatsappLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-[15px] font-medium text-sand transition-colors hover:bg-cream active:scale-[0.98]"
                    >
                      <WhatsappLogo size={20} weight="fill" />
                      Enviar por WhatsApp
                    </a>
                    <p className="mt-3 text-center text-xs text-taupe">
                      Te lleva a WhatsApp con el mensaje listo para mandarle a Lucila.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </dialog>
    </ContactFormContext.Provider>
  );
}

/** Botón que abre el formulario (en vez de ir directo a WhatsApp). */
export function ContactButton({
  program,
  className = "",
  onClick,
  children,
}: {
  program?: ProgramChoice;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const open = useContactForm();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        open(program);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
