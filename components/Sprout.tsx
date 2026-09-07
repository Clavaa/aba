/**
 * The brand mascot: a simple line-drawn sprout character.
 * Drawn inline so it inherits `currentColor` and costs zero requests.
 * Purely decorative everywhere it appears (aria-hidden).
 */
export default function Sprout({
  className = "",
  strokeWidth = 2.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      role="presentation"
    >
      {/* head */}
      <circle
        cx="32"
        cy="40"
        r="13"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* eyes */}
      <circle cx="27" cy="38" r="1.7" fill="currentColor" />
      <circle cx="37" cy="38" r="1.7" fill="currentColor" />
      {/* smile */}
      <path
        d="M27 43.5 Q32 47.5 37 43.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* stem */}
      <path
        d="M32 27 C32 22 32 19 32 15"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* left leaf */}
      <path
        d="M32 18 C26 19 19 16 16 9 C24 7 30 11 32 16 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* right leaf */}
      <path
        d="M32 14 C36 12 43 10 48 13 C45 19 37 20 32 17 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* soil mound */}
      <path
        d="M12 58 Q32 51 52 58"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
