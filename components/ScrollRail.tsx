"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The horizontal scroll rail behind three of the target's modules
 * (services-horizontal-scroll, testimonials-horizontal-scroll,
 * whats-happening-carousel): a snapping overflow row with circular
 * prev/next controls that disable at the ends.
 *
 * Keyboard- and screen-reader-safe: the rail itself is focusable and
 * scrollable with arrow keys, and the buttons are real buttons.
 */
export default function ScrollRail({
  children,
  label,
  controlsClassName = "mt-8 flex justify-center gap-3",
}: {
  children: ReactNode;
  label: string;
  controlsClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // one "page" minus a sliver, so the next card peeks
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={ref}
        onScroll={sync}
        className="scroll-rail px-4"
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {children}
      </div>
      <div className={controlsClassName}>
        <button
          type="button"
          className="rail-btn"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="Scroll left"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="rail-btn"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="Scroll right"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </>
  );
}
