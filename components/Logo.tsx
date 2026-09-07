import { siteConfig } from "@/site.config";

/**
 * The Sproutwell ABA brand mark: a clean line-drawn seedling — gently curved
 * stem, two leaves reaching opposite ways, a marigold sun-dot the top leaf
 * grows toward, and a short ground line. Strokes inherit `currentColor`; the
 * sun-dot is always marigold. Decorative (aria-hidden) — pair with text.
 */
export function SproutMark({
  className = "",
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      role="presentation"
      className={className}
    >
      {/* stem — slight S-curve */}
      <path
        d="M31 54 C30 47 33.5 41 30.5 30"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* lower-left leaf */}
      <path
        d="M30.5 38 C24 38.5 16.5 34.5 13.5 26 C22 24 28.5 29 30.5 36.5 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* lower-left leaf vein */}
      <path
        d="M18 28.5 C23 31 27 33.5 29.5 36"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
      {/* upper-right leaf — reaches toward the sun-dot */}
      <path
        d="M30.5 29.5 C32 21 38.5 14 48 12.5 C47.5 22 41 28.5 32 29.5 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* upper-right leaf vein */}
      <path
        d="M44.5 16.5 C40 20.5 35.5 24.5 32 28.5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
      {/* marigold sun-dot */}
      <circle cx="54.5" cy="7.5" r="4" fill="var(--color-marigold)" />
      {/* ground line */}
      <path
        d="M21 56 Q31.5 52.5 42 56"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Full logo lockup: seedling mark + "SPROUTWELL ABA" wordmark in the site's
 * condensed 800-weight Bricolage display type.
 *
 * tone="light" (default) — for light backgrounds: garden mark, spruce
 * wordmark, garden "ABA".
 * tone="dark" — for the spruce footer: mint mark, ivory wordmark,
 * marigold "ABA" (garden green is unreadable on spruce).
 */
export default function Logo({
  tone = "light",
  className = "",
  markClass = "h-10 w-10",
  textClass = "text-[1.4rem]",
}: {
  tone?: "light" | "dark";
  className?: string;
  markClass?: string;
  textClass?: string;
}) {
  const dark = tone === "dark";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <SproutMark
        className={`${markClass} shrink-0 ${dark ? "text-mint" : "text-garden"}`}
      />
      <span
        className={`display leading-none tracking-tight ${textClass} ${
          dark ? "text-ivory" : "text-spruce"
        }`}
      >
        {siteConfig.brand.shortName}{" "}
        <span className={dark ? "text-marigold" : "text-garden"}>ABA</span>
      </span>
    </span>
  );
}
