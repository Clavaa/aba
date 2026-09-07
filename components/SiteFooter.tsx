import Link from "next/link";
import { siteConfig } from "@/site.config";
import Logo from "@/components/Logo";

const columns: { heading: string; links: { href: string; label: string }[] }[] =
  [
    {
      heading: "Families",
      links: [
        { href: "/getting-started/", label: "Check my coverage" },
        { href: "/insurance/", label: "Insurance we accept" },
        { href: "/cost-of-aba-therapy/", label: "What ABA costs" },
        { href: "/locations/", label: "All 50 states + DC" },
      ],
    },
    {
      heading: "Company",
      links: [
        { href: "/about/", label: "About us" },
        { href: "/about/leadership/", label: "Our leadership" },
        { href: "/careers/", label: "Work with us" },
        { href: "/careers/rbt/", label: "RBT jobs & guide" },
        { href: "/careers/bcba/", label: "BCBA jobs & guide" },
      ],
    },
    {
      heading: "Talk to us",
      links: [
        {
          href: siteConfig.contact.phoneHref,
          label: `Call ${siteConfig.contact.phone}`,
        },
        {
          href: `mailto:${siteConfig.contact.email}`,
          label: siteConfig.contact.email,
        },
      ],
    },
  ];

export default function SiteFooter() {
  const year = new Date().getFullYear();
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
          Coverage details on this site describe public state Medicaid and
          insurance-law programs and can change. They are general information,
          not legal, medical, or benefits advice — your health plan&apos;s
          written determination is what counts. Call us and we&apos;ll check
          your exact plan for you.
        </p>

        <p className="mt-4 text-sm text-ivory/60">
          © {year} {siteConfig.brand.legalName}. All rights reserved.
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
