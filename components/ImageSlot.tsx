import Sprout from "@/components/Sprout";

/**
 * Styled placeholder for a real photo slot — no stock photos ship.
 *
 * Ground is a warm neutral rather than a brand tint, so the tinted panels
 * that overlap photos in this design keep their contrast even before real
 * photography lands.
 *
 * `intent` documents exactly what photo belongs here per the Style Bible:
 * golden-hour, real homes, caregiver + child TOGETHER, never a child alone
 * being treated.
 */
export default function ImageSlot({
  intent,
  className = "",
  tint = "bg-beige-100",
}: {
  /** Art direction note, e.g. "Parent and child reading on a sunlit couch" */
  intent: string;
  className?: string;
  tint?: string;
}) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${tint} ${className}`}
      role="img"
      aria-label={`Photo placeholder: ${intent}`}
    >
      {/* TODO(photography): replace this slot with a real photo — {intent} */}
      <div className="flex max-w-xs flex-col items-center gap-3 p-8 text-center text-ink/45">
        <Sprout className="h-12 w-12" strokeWidth={2} />
        <p className="text-sm font-medium leading-snug">{intent}</p>
      </div>
    </div>
  );
}
