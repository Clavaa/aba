"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { strings } from "@/lib/i18n";
import { siteConfig } from "@/site.config";
import Logo from "@/components/Logo";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * White header: wordmark left, nav centered, a circular search affordance
 * and one coral pill CTA on the right — the target's header-logo /
 * header-main-menu / header-nav-btn modules, measured at 18px/400 nav type.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = strings(usePathname());
  const nav = t.nav;
  const mobileNav = t.mobileNav;

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-4">
        <Link
          href={t.langSwitchHref === "/" ? "/es/" : "/"}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap"
          aria-label={t.homeAria(siteConfig.brand.name)}
        >
          <Logo markClass="h-10 w-10" textClass="text-[1.4rem]" />
        </Link>

        <nav
          aria-label={t.mainNav}
          className="hidden items-center gap-5 lg:flex xl:gap-8"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[17px] font-medium text-ink hover:text-coral"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/locations/"
            aria-label="Find your state"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-beige-80 text-ink hover:bg-teal-80 md:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>

          <Link
            href={t.langSwitchHref === "/" ? "/es/como-empezar/" : "/getting-started/"}
            className="btn btn-primary hidden md:inline-flex"
          >
            {t.langSwitchHref === "/" ? "Empezar hoy" : "Get help today"}
          </Link>

          <button
            type="button"
            className="btn btn-outline !px-4 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t.menuClose : t.menuOpen}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>
            <span aria-hidden="true">{t.menu}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t.mobileNavLabel}
          className="border-t border-ink/10 bg-white px-4 pb-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {mobileNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 font-medium hover:bg-teal-80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={siteConfig.contact.phoneHref} className="btn btn-primary w-full">
                <PhoneIcon />
                {t.call(siteConfig.contact.phone)}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
