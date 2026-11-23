import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { placeholderTestimonials, testimonials, type Testimonial } from "@/lib/testimonials";
import { Reveal, SplitHeading } from "./motion-primitives";

function Person({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      {t.photo ? (
        <Image src={t.photo} alt="" width={44} height={44} quality={70} className="size-11 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="grid size-11 place-items-center rounded-full bg-plum font-display font-bold text-lilac">
          {t.name.charAt(0)}
        </span>
      )}
      <span>
        <span className="block font-display font-semibold tracking-tight text-mist">{t.name}</span>
        <span className="block text-sm text-muted">{t.detail}</span>
      </span>
    </figcaption>
  );
}

export function Testimonials() {
  const isDev = process.env.NODE_ENV === "development";
  const items = testimonials.length > 0 ? testimonials : isDev ? placeholderTestimonials : [];
  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section id="testimonios" className="mx-auto max-w-[1320px] px-4 pt-32 sm:px-6 lg:pt-44">
      <SplitHeading
        text="Lo que cuentan quienes entrenan conmigo."
        accent={["entrenan", "conmigo."]}
        className="max-w-[18ch] font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.02] font-bold tracking-tighter"
      />

      <Reveal className="mt-14">
        <figure className="relative overflow-hidden rounded-[28px] bg-violet p-8 text-ink sm:p-12">
          <Quotes size={56} weight="fill" aria-hidden className="text-ink/25" />
          <blockquote className="mt-4 max-w-[34ch] font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] font-semibold tracking-tight">
            “{featured.quote}”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            {featured.photo ? (
              <Image src={featured.photo} alt="" width={52} height={52} quality={70} className="size-13 rounded-full object-cover" />
            ) : (
              <span aria-hidden className="grid size-13 place-items-center rounded-full bg-ink font-display text-lg font-bold text-lilac">
                {featured.name.charAt(0)}
              </span>
            )}
            <span>
              <span className="block font-display text-lg font-bold tracking-tight">{featured.name}</span>
              <span className="block text-sm font-medium text-ink/75">{featured.detail}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>

      {rest.length > 0 && (
        <div className="mt-5 gap-5 sm:columns-2 lg:columns-3">
          {rest.map((t, i) => (
            <Reveal key={`${t.name}-${i}`} delay={i * 0.08} className="mb-5 break-inside-avoid">
              <figure className="rounded-[28px] border border-mist/10 bg-night p-7">
                <blockquote className="text-lg leading-relaxed text-mist/90">“{t.quote}”</blockquote>
                <Person t={t} />
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
