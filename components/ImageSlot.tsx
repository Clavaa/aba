import Image from "next/image";
import Sprout from "@/components/Sprout";

/**
 * A photo slot.
 *
 * With `src`, renders the real photograph through next/image (which handles
 * responsive sizes and modern formats). Without one, renders a labelled
 * placeholder carrying the art direction for the shot that belongs here — so
 * an unfilled slot is a brief, not a mystery.
 *
 * `intent` stays required either way: it documents the shot, and when a photo
 * is present it becomes the basis for the alt text.
 */
export default function ImageSlot({
  intent,
  src,
  alt,
  className = "",
  tint = "bg-beige-100",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  /** Art direction note, e.g. "Parent and child reading on a sunlit couch" */
  intent: string;
  /** Path under /public once the real photo exists */
  src?: string;
  /** Describes the photo for screen readers. Falls back to `intent`. */
  alt?: string;
  className?: string;
  tint?: string;
  /** Set on the above-the-fold hero image so it isn't lazy-loaded */
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt ?? intent}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

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
