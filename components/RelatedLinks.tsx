import Link from "next/link";

/**
 * "Keep reading" — contextual cross-links at the foot of a content page.
 *
 * Distinct from the footer sitemap: that one is the same everywhere and exists
 * for crawl depth, this one is hand-picked per page and exists because a
 * parent reading about autism levels genuinely does want the evaluation page
 * next. Each link carries a sentence saying what it answers, so the anchor is
 * descriptive rather than "learn more".
 */

export type Related = { href: string; label: string; note: string };

export default function RelatedLinks({
  heading = "Keep reading",
  intro,
  links,
}: {
  heading?: string;
  intro?: string;
  links: Related[];
}) {
  if (links.length === 0) return null;
  return (
    <section
      className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20"
      aria-labelledby="related-heading"
    >
      <h2 id="related-heading" className="display display-h2">
        {heading}
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">{intro}</p>
      )}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group block h-full rounded-[30px] border-2 border-ink/10 bg-white/60 p-6 transition hover:border-coral"
            >
              <p className="display-round display-round-md group-hover:text-coral">
                {l.label}
              </p>
              <p className="mt-2 text-spruce-soft">{l.note}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
