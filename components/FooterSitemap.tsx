import Link from "next/link";

/**
 * The fat-footer sitemap band that sits above the footer proper on every
 * English page.
 *
 * A site with 13,000+ pages needs real internal linking or the long tail never
 * gets crawled: every page here is otherwise reachable only through a
 * category index two or three clicks deep. This puts every hub, every payer,
 * every guide and all 51 state pages one hop from anywhere on the site.
 *
 * Data comes from the server (layout.tsx) rather than being imported here,
 * so the same markup can render inside the client footer.
 */

export type FooterLink = { href: string; label: string };
export type FooterGroup = { heading: string; links: FooterLink[] };

export default function FooterSitemap({
  groups,
  states,
}: {
  groups: FooterGroup[];
  states: FooterLink[];
}) {
  return (
    <div className="border-b border-ink/10 pb-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <nav key={g.heading} aria-label={g.heading}>
            <h2 className="eyebrow text-ink">{g.heading}</h2>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-ink/80 underline-offset-4 hover:text-coral hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <nav aria-label="ABA therapy by state" className="mt-12">
        <h2 className="eyebrow text-ink">ABA therapy by state</h2>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {states.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="text-sm text-ink/75 underline-offset-4 hover:text-coral hover:underline"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
