/**
 * The reassurance strip that sits directly under the hero on the target's
 * money pages: three icon + bold-statement pairs on the page ground.
 *
 * Every claim passed in must be verifiable — this component is a frame, not
 * a place to invent proof.
 */

export type Feature = { icon: "ages" | "clock" | "shield" | "map"; text: string };

const ICONS: Record<Feature["icon"], React.ReactNode> = {
  ages: (
    <>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s6.5-5.5 6.5-10a6.5 6.5 0 1 0-13 0C5.5 15.5 12 21 12 21Z" />
      <circle cx="12" cy="11" r="2.4" />
    </>
  ),
};

export default function FeatureStrip({ features }: { features: Feature[] }) {
  return (
    <ul className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 sm:grid-cols-3 sm:py-12">
      {features.map((f) => (
        <li key={f.text} className="flex items-center justify-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[f.icon]}
            </svg>
          </span>
          <span className="font-bold leading-snug">{f.text}</span>
        </li>
      ))}
    </ul>
  );
}
