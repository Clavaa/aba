import Link from "next/link";
import ScrollRail from "@/components/ScrollRail";
import ImageSlot from "@/components/ImageSlot";

/**
 * `services-horizontal-scroll` — photo-topped cards on a snapping rail,
 * each a sentence-case heading with an inline chevron, then a one-line
 * description. Two CTAs underneath.
 */

export type RailCard = {
  href: string;
  title: string;
  body: string;
  photoIntent: string;
  /** Real photo, once one exists for this card */
  photo?: string;
  photoAlt?: string;
};

export default function ServiceRail({
  eyebrow,
  cards,
  primary,
  secondary,
}: {
  eyebrow: string;
  cards: RailCard[];
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="service-rail-heading">
      <h2 id="service-rail-heading" className="eyebrow px-4 text-center">
        {eyebrow}
      </h2>

      <div className="mx-auto mt-10 max-w-[1400px]">
        <ScrollRail label={eyebrow}>
          {cards.map((c) => (
            <article key={c.href} className="w-[17rem] sm:w-[19rem]">
              <Link href={c.href} className="group block">
                <ImageSlot
                  intent={c.photoIntent}
                  src={c.photo}
                  alt={c.photoAlt}
                  tint="bg-beige-100"
                  sizes="(max-width: 640px) 80vw, 19rem"
                  className="aspect-[4/3] rounded-[20px]"
                />
                <h3 className="display-round display-round-md mt-5 flex items-start gap-2 group-hover:text-coral">
                  <span>{c.title}</span>
                  <span aria-hidden="true" className="mt-0.5 shrink-0">
                    ›
                  </span>
                </h3>
                <p className="mt-3 text-ink-muted">{c.body}</p>
              </Link>
            </article>
          ))}
        </ScrollRail>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3 px-4">
        <Link href={primary.href} className="btn btn-primary">
          {primary.label}
        </Link>
        <Link href={secondary.href} className="btn btn-outline">
          {secondary.label}
        </Link>
      </div>
      <p className="mt-5 px-4 text-center text-sm text-ink-muted">
        Not sure which fits? Tell us about your week and we&rsquo;ll say which
        setting we&rsquo;d start with.
      </p>
    </section>
  );
}
