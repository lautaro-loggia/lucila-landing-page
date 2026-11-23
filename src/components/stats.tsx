import { Asterisk } from "@phosphor-icons/react/dist/ssr";
import { CountUp, Reveal } from "./motion-primitives";

const stats = [
  { value: 9, suffix: "", label: "años haciendo CrossFit" },
  { value: 5, suffix: "", label: "años compitiendo en élite" },
  { value: 4, suffix: "", label: "clasificaciones seguidas a Copa Sur" },
  { value: 8, suffix: "", label: "países donde compitió" },
];

const countries = [
  "Uruguay",
  "Argentina",
  "Chile",
  "Brasil",
  "Sudáfrica",
  "Ecuador",
  "Colombia",
  "Estados Unidos",
];

export function Stats() {
  return (
    <section aria-label="Trayectoria en números" className="pt-24 lg:pt-32">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-12 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-l border-violet/40 pl-5">
            <p className="font-display text-6xl font-bold tracking-tighter text-mist lg:text-7xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 max-w-[18ch] text-sm leading-snug text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="marquee mt-20 overflow-hidden border-y border-mist/10 bg-night py-6" aria-label="Países donde compitió">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
              {countries.map((c) => (
                <li key={c} className="flex items-center">
                  <span className="px-8 font-display text-3xl font-semibold tracking-tight text-mist/90 sm:text-4xl">
                    {c}
                  </span>
                  <Asterisk size={26} weight="bold" className="text-violet" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
