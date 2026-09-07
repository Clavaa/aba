"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = {
  /** Small kicker above the title (e.g. "WHAT YOU'RE DOING") */
  kicker?: string;
  title: string;
  body: ReactNode;
  /** Optional second panel section (e.g. "HOW WE HELP") */
  relief?: { kicker: string; body: ReactNode };
};

/**
 * Accessible accordion used for pain/relief cards, the 4-step intake, and
 * state FAQs. Alternates the Style Bible pastel tints per item.
 */
export default function Accordion({
  items,
  tinted = true,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  /** Alternate mint/butter/peach backgrounds */
  tinted?: boolean;
  /** Index open on load; -1 for all closed */
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const baseId = useId();
  const tints = ["bg-mint", "bg-butter", "bg-peach"];

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div
            key={item.title}
            className={`field-card overflow-hidden ${
              tinted ? tints[i % tints.length] : "border-2 border-spruce/15 bg-white"
            }`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7 sm:py-5"
              >
                <span>
                  {item.kicker && (
                    <span className="display block text-xs tracking-wide text-garden">
                      {item.kicker}
                    </span>
                  )}
                  <span className="display text-lg sm:text-xl">
                    {item.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-spruce/30 text-xl font-bold transition-transform ${
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
                aria-labelledby={buttonId}
                className="px-5 pb-5 sm:px-7 sm:pb-6"
              >
                <div className="max-w-2xl text-spruce-soft">{item.body}</div>
                {item.relief && (
                  <div className="mt-4 rounded-2xl bg-white/70 p-4 sm:p-5">
                    <p className="display text-xs tracking-wide text-garden">
                      {item.relief.kicker}
                    </p>
                    <div className="mt-1 max-w-2xl text-spruce">
                      {item.relief.body}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
