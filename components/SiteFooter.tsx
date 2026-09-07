"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";
import { strings } from "@/lib/i18n";
import Logo from "@/components/Logo";

export default function SiteFooter() {
  const t = strings(usePathname());
  const year = new Date().getFullYear();

  const columns = [
    ...t.footerColumns,
    {
      heading: t.footerTalk,
      links: [
        {
          href: siteConfig.contact.phoneHref,
          label: t.call(siteConfig.contact.phone),
        },
        {
          href: `mailto:${siteConfig.contact.email}`,
          label: siteConfig.contact.email,
        },
        { href: t.langSwitchHref, label: t.langSwitchLabel },
      ],
    },
  ];

  return (
    <footer className="bg-spruce text-ivory">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo tone="dark" markClass="h-12 w-12" textClass="text-[1.55rem]" />
            <p className="mt-4 max-w-xs text-ivory/80">
              {siteConfig.brand.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="display text-lg text-marigold">{col.heading}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-ivory/85 underline-offset-4 hover:text-marigold hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-ivory/60">
          {t.disclaimer}
        </p>

        <p className="mt-4 text-sm text-ivory/60">
          © {year} {siteConfig.brand.legalName}. {t.rights}
        </p>
      </div>

      {/* Giant logotype sign-off (Style Bible: footer with giant logotype) */}
      <div className="overflow-hidden px-2 pb-2" aria-hidden="true">
        <p className="display select-none whitespace-nowrap text-center text-[13vw] leading-none text-ivory/10">
          {siteConfig.brand.shortName}{" "}
          <span className="text-marigold/15">ABA</span>
        </p>
      </div>
    </footer>
  );
}
