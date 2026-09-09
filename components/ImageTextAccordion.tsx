"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";

/**
 * `image-text-accordion` — a sticky photo on one side, an accordion of
 * expandable points on the other. The photo intent swaps with the open item,
 * so the picture always illustrates whatever is currently open.
 */

export type AccordionPoint = {
  title: string;
  body: ReactNode;
  photoIntent: string;
  photo?: string;
  photoAlt?: string;
};

export default function ImageTextAccordion({
  eyebrow,
  heading,
  points,
  cta,
}: {
  eyebrow: string;
  heading: string;
  points: AccordionPoint[];
  cta?: { href: string; label: string };
}) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section
      className="mx-auto max-w-[1400px] px-4 py-16 sm:py-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ImageSlot
            intent={points[open]?.photoIntent ?? points[0].photoIntent}
            src={points[open]?.photo ?? points[0].photo}
            alt={points[open]?.photoAlt ?? points[0].photoAlt}
            tint="bg-beige-100"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="field-card aspect-[4/5] w-full"
          />
        </div>

        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={`${baseId}-heading`}
            className="display display-h2 mt-5 text-coral"
          >
            {heading}
          </h2>

          <div className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
            {points.map((p, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-p-${i}`;
              const btnId = `${baseId}-b-${i}`;
              return (
                <div key={p.title}>
                  <h3>
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="display-round display-round-md">
                        {p.title}
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
                      className="pb-7 text-lg text-ink-muted"
                    >
                      {p.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {cta && (
            <Link href={cta.href} className="btn btn-primary mt-10">
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
