"use client";

import { useState } from "react";
import ScrollRail from "@/components/ScrollRail";
import { siteConfig, reviewIsPlaceholder, type Review } from "@/site.config";

/**
 * `testimonials-horizontal-scroll` — review cards on a rail: name, dated
 * month, a star row, the quote, and a "Read more" disclosure.
 *
 * Placeholder reviews render as obvious empty frames. Nothing here ever
 * displays a fabricated quote or a star rating we can't source — the target
 * shows real Google reviews, and so will we, or none at all.
 */

function Stars() {
  return (
    <p className="mt-2 flex gap-0.5 text-coral" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </p>
  );
}

function Card({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const placeholder = reviewIsPlaceholder(review);

  if (placeholder) {
    return (
      <article className="w-[19rem] rounded-[30px] border-2 border-dashed border-ink/20 bg-white/60 p-6 sm:w-[23rem]">
        {/* TODO(reviews): replace with a real, named, dated Google review
            carrying the family's written consent. */}
        <p className="eyebrow text-ink/40">Review slot</p>
        <p className="mt-3 text-ink/45">
          A real, named and dated review goes here once we have one with the
          family&rsquo;s written consent. We don&rsquo;t write these ourselves.
        </p>
      </article>
    );
  }

  return (
    <article className="flex w-[19rem] flex-col rounded-[30px] bg-white p-6 shadow-lift sm:w-[23rem]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="display-round display-round-md">{review.name}</p>
          <p className="eyebrow mt-1 text-ink-muted">{review.date}</p>
        </div>
        <span className="eyebrow shrink-0 text-ink-muted">Google</span>
      </div>
      <Stars />
      <p className={`mt-4 text-ink-muted ${open ? "" : "line-clamp-6"}`}>
        {review.quote}
      </p>
      {review.location && (
        <p className="mt-3 text-sm text-ink-muted">{review.location}</p>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-auto pt-4 text-left text-sm font-semibold text-ink-muted hover:text-coral"
        aria-expanded={open}
      >
        {open ? "Read less ⌃" : "Read more ⌄"}
      </button>
    </article>
  );
}

export default function TestimonialRail() {
  const reviews = siteConfig.reviews;

  return (
    <section className="py-16 sm:py-24" aria-labelledby="testimonial-heading">
      <p className="eyebrow px-4 text-center">Why choose {siteConfig.brand.shortName}?</p>
      <h2
        id="testimonial-heading"
        className="display-round display-round-xl mx-auto mt-5 max-w-4xl px-4 text-center text-coral"
      >
        Hear from other parents and caregivers.
      </h2>

      <div className="mx-auto mt-12 max-w-[1400px]">
        <ScrollRail label="Family reviews">
          {reviews.map((r, i) => (
            <Card key={`${r.name}-${i}`} review={r} />
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
