"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";
import { strings } from "@/lib/i18n";
import CallCta from "@/components/CallCta";
import Logo from "@/components/Logo";

/**
 * Teal footer band: coral tagline headline left, link columns right,
 * circular outlined social marks, and the oversized logotype sign-off —
 * the target's footer-social / footer-copyright modules, recolored.
 */

const SOCIALS = [
  { label: "Facebook", d: "M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.5-1.5H17V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3z" },
  { label: "Instagram", d: "M12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9zM17.8 7.3a1 1 0 1 1-1-1 1 1 0 0 1 1 1zM12 4.6c2.4 0 2.7 0 3.6.05a3.4 3.4 0 0 1 3.75 3.75c.05.9.05 1.2.05 3.6s0 2.7-.05 3.6a3.4 3.4 0 0 1-3.75 3.75c-.9.05-1.2.05-3.6.05s-2.7 0-3.6-.05a3.4 3.4 0 0 1-3.75-3.75C4.6 14.7 4.6 14.4 4.6 12s0-2.7.05-3.6A3.4 3.4 0 0 1 8.4 4.65c.9-.05 1.2-.05 3.6-.05z" },
  { label: "LinkedIn", d: "M8.3 18.5H5.5V9.7h2.8v8.8zM6.9 8.5A1.6 1.6 0 1 1 8.5 6.9 1.6 1.6 0 0 1 6.9 8.5zM18.5 18.5h-2.8v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.4H9.9V9.7h2.7v1.2h.04a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.3v4.8z" },
  { label: "YouTube", d: "M20.6 8.5a2.2 2.2 0 0 0-1.6-1.6C17.6 6.5 12 6.5 12 6.5s-5.6 0-7 .4A2.2 2.2 0 0 0 3.4 8.5 23 23 0 0 0 3 12a23 23 0 0 0 .4 3.5 2.2 2.2 0 0 0 1.6 1.6c1.4.4 7 .4 7 .4s5.6 0 7-.4a2.2 2.2 0 0 0 1.6-1.6A23 23 0 0 0 21 12a23 23 0 0 0-.4-3.5zM10.3 14.6V9.4l4.5 2.6z" },
];

export default function SiteFooter() {
  const t = strings(usePathname());
  const year = new Date().getFullYear();

  const columns = [
    ...t.footerColumns,
    {
      heading: t.footerTalk,
      links: [
        // Phone link only appears once a real number is configured.
        ...(siteConfig.contact.phoneHref && siteConfig.contact.phone
          ? [{ href: siteConfig.contact.phoneHref, label: t.call(siteConfig.contact.phone) }]
          : [{ href: "/contact/", label: t.talkCta }]),
        { href: t.langSwitchHref, label: t.langSwitchLabel },
      ],
    },
  ];

  return (
    <footer className="bg-teal-80 text-ink">
      <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Logo markClass="h-11 w-11" textClass="text-[1.5rem]" />
            <p className="display display-h3 mt-6 max-w-sm text-coral">
              {siteConfig.brand.tagline}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="eyebrow text-ink">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
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
        </div>

        {/* card-contact — the tinted contact block pinned in the footer grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="rounded-[30px] bg-teal-100 p-7 lg:max-w-sm">
            <p className="display-round display-round-md">Contact us</p>
            <ul className="mt-4 space-y-3">
              <li>
                <CallCta
                  className="flex items-center gap-3 font-semibold underline-offset-4 hover:text-coral hover:underline"
                  fallbackLabel={t.talkCta}
                  href={t.langSwitchHref === "/" ? "/es/como-empezar/" : "/contact/"}
                />
              </li>
              <li className="text-ink/80">
                Send us your details and a real person replies — the form takes
                about a minute.
              </li>
            </ul>
            <Link
              href="/getting-started/"
              className="mt-5 inline-block font-bold underline underline-offset-4 hover:text-coral"
            >
              Get help
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="font-bold">Be a part of our circle</p>
          <ul className="flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                {/* TODO(social): point these at the real profiles before launch */}
                <span
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-coral text-coral"
                  aria-label={s.label}
                  role="img"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink/60">
          {t.disclaimer}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
          <p>
            © {year} {siteConfig.brand.legalName}. {t.rights}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/contact/" className="underline-offset-4 hover:underline">
              Contact
            </Link>
            <Link href="/privacy-policy/" className="underline-offset-4 hover:underline">
              Privacy policy
            </Link>
            <Link href="/terms/" className="underline-offset-4 hover:underline">
              Terms of service
            </Link>
          </nav>
        </div>
      </div>

      {/* Oversized logotype sign-off */}
      <div className="overflow-hidden px-3 pb-3" aria-hidden="true">
        <p className="display select-none whitespace-nowrap text-center text-[15vw] leading-[0.8] text-coral">
          {siteConfig.brand.shortName}
          <span className="ml-[0.12em] inline-block rounded-full border-[0.055em] border-coral px-[0.16em] align-baseline">
            ABA
          </span>
        </p>
      </div>
    </footer>
  );
}
