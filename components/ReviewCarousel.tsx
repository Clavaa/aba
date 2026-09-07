"use client";

import { useRef } from "react";
import { siteConfig, reviewIsPlaceholder } from "@/site.config";

/**
 * Named + dated review carousel (Style Bible signature #4) with the consent
 * footnote. While config still holds TODO placeholders, cards render as
 * clearly-labeled empty frames — fabricated quotes never ship.
 */
export default function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * (track.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]"
        aria-label="Reviews from families"
        role="group"
      >
        {siteConfig.reviews.map((review, i) => {
          const placeholder = reviewIsPlaceholder(review);
          return (
            <figure
              key={i}
              className={`rounded-[30px] min-w-[85%] snap-start p-6 sm:min-w-[46%] sm:p-8 lg:min-w-[31%] ${
                placeholder
                  ? "border-2 border-dashed border-spruce/25 bg-white/60"
                  : "bg-white shadow-lift"
              }`}
            >
              {placeholder ? (
                <>
                  <p className="display text-sm text-spruce/50">
                    Real review coming soon
                  </p>
                  <blockquote className="mt-2 text-spruce-soft">
                    We only publish real, named and dated Google reviews that
                    families have agreed to share. This spot is waiting for one.
                  </blockquote>
                </>
              ) : (
                <>
                  <p aria-hidden="true" className="text-xl text-marigold">
                    ★★★★★
                  </p>
                  <blockquote className="mt-2 text-spruce">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-4 font-semibold">
                    {review.name}
                    <span className="block text-sm font-normal text-spruce-soft">
                      {review.location ? `${review.location} · ` : ""}
                      {review.date} · Google review
                    </span>
                  </figcaption>
                </>
              )}
            </figure>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-spruce-soft">
          Reviews are shared verbatim, with each family&apos;s consent.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-spruce/30 text-lg font-bold hover:bg-teal-80"
            aria-label="Previous reviews"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-spruce/30 text-lg font-bold hover:bg-teal-80"
            aria-label="Next reviews"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
