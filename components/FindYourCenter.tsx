"use client";

import Link from "next/link";
import { useState } from "react";
import CallCta from "@/components/CallCta";
import ImageSlot from "@/components/ImageSlot";

/**
 * `find-your-center` (their name) — a photo carousel with an overlaid control strip and a
 * location caption, a benefits list beside it, then a grid of place cards.
 *
 * Ours are STATES rather than buildings, because that's the real footprint — we
 * all 50 plus DC, each with its own coverage page.
 */

type Slide = { intent: string; caption: string };

export default function FindYourCenter({
  states,
  slides,
  bullets,
}: {
  states: { name: string; slug: string }[];
  slides: Slide[];
  bullets: string[];
}) {
  const [i, setI] = useState(0);
  const go = (d: 1 | -1) => setI((v) => (v + d + slides.length) % slides.length);

  // The card grid stays a readable size; the full 51 live on /locations/.
  const featured = states.slice(0, 12);

  return (
    <section className="bg-peach-100 py-16 sm:py-24" aria-labelledby="fyc-heading">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
        <div className="relative">
          <ImageSlot
            intent={slides[i].intent}
            tint="bg-beige-100"
            className="field-card aspect-[4/3] w-full"
          />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-full bg-ink/45 px-3 py-2 backdrop-blur">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/70 text-cream hover:bg-cream hover:text-ink"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/70 text-cream hover:bg-cream hover:text-ink"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
            <p aria-live="polite" className="pr-2 font-semibold text-cream">
              {slides[i].caption}
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Discover where we work</p>
          <h2 id="fyc-heading" className="display display-h2 mt-5 text-coral">
            Find your state.
          </h2>
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-lg text-ink-muted">
                <span aria-hidden="true" className="mt-1 text-coral">
                  ●
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link href="/locations/" className="btn btn-primary mt-9">
            See all 50 states
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-4">
        <p className="text-lg">
          <strong>We work in every state.</strong> Pick yours for the local
          coverage rules, or{" "}
          <CallCta className="underline decoration-ink/30 underline-offset-4 hover:text-coral" fallbackLabel="Talk to a person" icon={false} />
          .
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/locations/${s.slug}/`}
                className="flex items-center justify-between gap-3 rounded-[24px] bg-peach-120 px-6 py-6 font-bold transition-colors hover:bg-white"
              >
                {s.name}
                <span aria-hidden="true" className="text-xl">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/locations/" className="btn btn-outline mt-8">
          Every state and DC
        </Link>
      </div>
    </section>
  );
}
