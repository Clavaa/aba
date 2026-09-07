"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/site.config";
import Logo from "@/components/Logo";
import { PhoneIcon } from "@/components/TopBar";

/**
 * Desktop nav: the tight, high-intent link set. "About" lives in the footer
 * (and the mobile menu) so the header never crowds at lg widths.
 */
const nav = [
  { href: "/services/", label: "Services" },
  { href: "/locations/", label: "Where we work" },
  { href: "/insurance/", label: "Insurance" },
  { href: "/cost-of-aba-therapy/", label: "Cost" },
  { href: "/getting-started/", label: "Getting started" },
  { href: "/careers/", label: "Careers" },
];

/** Mobile menu keeps the fuller set — space isn't the constraint there. */
const mobileNav = [
  ...nav.slice(0, 5),
  { href: "/autism-evaluation/", label: "Autism evaluation" },
  { href: "/resources/", label: "Parent guides" },
  { href: "/about/", label: "About" },
  nav[5],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-spruce/10 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap"
          aria-label={`${siteConfig.brand.name} home`}
        >
          <Logo markClass="h-10 w-10" textClass="text-[1.45rem]" />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-4 text-[15px] lg:flex xl:gap-6 xl:text-[17px]"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-semibold text-spruce hover:text-garden"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className="btn btn-primary hidden whitespace-nowrap !px-5 !py-2.5 md:inline-flex xl:!px-7"
          >
            <PhoneIcon />
            <span>Call {siteConfig.contact.phone}</span>
          </a>
          <button
            type="button"
            className="btn btn-outline !px-4 !py-2.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
            <span aria-hidden="true">Menu</span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-spruce/10 bg-ivory px-4 pb-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {mobileNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 font-semibold hover:bg-mint"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={siteConfig.contact.phoneHref} className="btn btn-primary w-full">
                <PhoneIcon />
                Call {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
