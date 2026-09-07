"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";

/**
 * `sticky-accordion-section` — the heading pins to the left while a column
 * of white question cards scrolls past it on the right.
 */

export type StickyItem = { q: string; a: ReactNode };

export default function StickyAccordion({
  eyebrow,
  heading,
  items,
  cta,
}: {
  eyebrow: string;
  heading: string;
  items: StickyItem[];
  cta?: { href: string; label: string };
}) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <section
      className="mx-auto max-w-[1400px] px-4 py-16 sm:py-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={`${baseId}-heading`}
            className="display display-h2 mt-5 text-coral"
          >
            {heading}
          </h2>
          {cta && (
            <Link href={cta.href} className="btn btn-primary mt-8">
              {cta.label}
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-sp-${i}`;
            const btnId = `${baseId}-sb-${i}`;
            return (
              <div key={item.q} className="rounded-[30px] bg-white p-2">
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                  >
                    <span className="display-round display-round-md max-w-md">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/25 text-xl leading-none transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-6 pb-7 text-lg text-ink-muted"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
