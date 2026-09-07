import Sprout from "@/components/Sprout";

/**
 * Styled placeholder for a real photo slot — no stock photos ship.
 *
 * `intent` documents exactly what photo belongs here per the Style Bible:
 * golden-hour, real homes, caregiver + child TOGETHER, never a child alone
 * being treated. Rendered as a soft tinted panel until real photography
 * exists; `alt` on the wrapper describes the future image for planning.
 */
export default function ImageSlot({
  intent,
  className = "",
  tint = "bg-mint",
}: {
  /** Art direction note, e.g. "Parent and child reading on a sunlit couch" */
  intent: string;
  className?: string;
  tint?: string;
}) {
  return (
    <div
      className={`field-card relative grid place-items-center overflow-hidden ${tint} ${className}`}
      role="img"
      aria-label={`Photo placeholder: ${intent}`}
    >
      {/* TODO(photography): replace this slot with a real photo — {intent} */}
      <div className="flex flex-col items-center gap-2 p-6 text-center text-spruce/50">
        <Sprout className="h-14 w-14" strokeWidth={2} />
        <p className="max-w-56 text-sm font-semibold leading-snug">{intent}</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-3xl border-2 border-dashed border-spruce/20"
      />
    </div>
  );
}
