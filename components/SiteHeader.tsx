"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { strings } from "@/lib/i18n";
import { siteConfig } from "@/site.config";
import CallCta from "@/components/CallCta";
import Logo from "@/components/Logo";

/**
 * White header with mega-menu dropdowns — the target's header-logo /
 * header-main-menu / header-nav-btn modules.
 *
 * Menus open on hover and on focus, close on Escape and on outside click,
 * and every trigger stays a real link so the section is reachable without a
 * pointer.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const t = strings(pathname);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // After Escape the pointer is usually still sitting on the trigger, which
  // would re-open the menu the moment it re-renders. Suppress that item's
  // hover until the pointer actually leaves it.
  const [suppressed, setSuppressed] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Route change closes everything. Adjusted during render rather than in an
  // effect — this is the "reset state when a value changes" pattern, and it
  // avoids the cascading re-render an effect would cause.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setOpenMenu(null);
    setOpenMobile(null);
  }

  // Escape closes the open panel. Depends on `openMenu` so the handler always
  // closes over the current value — no ref-during-render needed.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSuppressed(openMenu);
      setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  // A click anywhere outside the nav closes whatever is open.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const isEs = t.langSwitchHref === "/";

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-4">
        <Link
          href={isEs ? "/es/" : "/"}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap"
          aria-label={t.homeAria(siteConfig.brand.name)}
        >
          <Logo markClass="h-10 w-10" textClass="text-[1.4rem]" />
        </Link>

        <div ref={navRef} className="hidden lg:block">
          <nav aria-label={t.mainNav}>
            <ul className="flex items-center gap-4 xl:gap-7">
              {t.mainMenu.map((item) => {
                const hasKids = !!item.children?.length;
                const isOpen = openMenu === item.label;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasKids && suppressed !== item.label) {
                        setOpenMenu(item.label);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!hasKids) return;
                      setOpenMenu(null);
                      setSuppressed(null);
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={hasKids ? isOpen : undefined}
                      aria-haspopup={hasKids ? "true" : undefined}
                      onFocus={() => {
                        if (hasKids) {
                          setSuppressed(null);
                          setOpenMenu(item.label);
                        }
                      }}
                      className="flex items-center gap-1.5 whitespace-nowrap py-2 text-[17px] font-medium text-ink hover:text-coral"
                    >
                      {item.label}
                      {hasKids && (
                        <svg
                          viewBox="0 0 24 24"
                          className={`h-3.5 w-3.5 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {hasKids && isOpen && (
                      <div className="absolute left-1/2 top-full z-50 w-[28rem] -translate-x-1/2 pt-3">
                        <ul className="overlap-panel bg-white p-3">
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="block rounded-[18px] px-4 py-3 hover:bg-teal-80"
                              >
                                <span className="block font-bold">{c.label}</span>
                                {c.note && (
                                  <span className="mt-0.5 block text-sm text-ink-muted">
                                    {c.note}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

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
            href={isEs ? "/es/como-empezar/" : "/getting-started/"}
            className="btn btn-primary hidden md:inline-flex"
          >
            {isEs ? "Empezar hoy" : "Get help today"}
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
          className="max-h-[70vh] overflow-y-auto border-t border-ink/10 bg-white px-4 pb-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {t.mainMenu.map((item) => {
              const hasKids = !!item.children?.length;
              const isOpen = openMobile === item.label;
              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-2xl px-3 py-3 font-bold hover:bg-teal-80"
                    >
                      {item.label}
                    </Link>
                    {hasKids && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() => setOpenMobile(isOpen ? null : item.label)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/20 text-xl leading-none"
                      >
                        <span aria-hidden="true" className={isOpen ? "rotate-45" : ""}>
                          +
                        </span>
                      </button>
                    )}
                  </div>
                  {hasKids && isOpen && (
                    <ul className="mb-2 ml-3 border-l border-ink/12 pl-3">
                      {item.children!.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-xl px-3 py-2.5 text-ink-muted hover:bg-teal-80 hover:text-ink"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="pt-2">
              <CallCta
                className="btn btn-primary w-full"
                fallbackLabel={t.talkCta}
                href={isEs ? "/es/como-empezar/" : "/contact/"}
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
