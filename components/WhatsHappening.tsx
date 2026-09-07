import Link from "next/link";
import ScrollRail from "@/components/ScrollRail";
import ImageSlot from "@/components/ImageSlot";

/**
 * `whats-happening-carousel` — the "what's new" rail. On the target this
 * runs events and blog posts; ours runs the parent guides, which is what we
 * actually publish. No blog on this site by decision.
 */

export type HappeningCard = {
  href: string;
  kicker: string;
  title: string;
  body: string;
  photoIntent: string;
};

export default function WhatsHappening({
  eyebrow,
  heading,
  cards,
  cta,
}: {
  eyebrow: string;
  heading: string;
  cards: HappeningCard[];
  cta: { href: string; label: string };
}) {
  return (
    <section className="bg-teal-80 py-16 sm:py-24" aria-labelledby="happening-heading">
      <p className="eyebrow px-4 text-center">{eyebrow}</p>
      <h2
        id="happening-heading"
        className="display-round display-round-xl mx-auto mt-5 max-w-4xl px-4 text-center"
      >
        {heading}
      </h2>

      <div className="mx-auto mt-12 max-w-[1400px]">
        <ScrollRail label={heading}>
          {cards.map((c) => (
            <article key={c.href} className="w-[18rem] sm:w-[21rem]">
              <Link href={c.href} className="group block">
                <ImageSlot
                  intent={c.photoIntent}
                  tint="bg-white/70"
                  className="aspect-[16/10] rounded-[20px]"
                />
                <p className="eyebrow mt-5 text-coral">{c.kicker}</p>
                <h3 className="display-round display-round-md mt-2 group-hover:text-coral">
                  {c.title}
                </h3>
                <p className="mt-3 text-ink-muted">{c.body}</p>
              </Link>
            </article>
          ))}
        </ScrollRail>
      </div>

      <div className="mt-10 flex justify-center px-4">
        <Link href={cta.href} className="btn btn-primary">
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
