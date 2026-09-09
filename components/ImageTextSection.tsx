import Link from "next/link";
import type { ReactNode } from "react";
import ImageSlot from "@/components/ImageSlot";

/**
 * `image-text-section` — a tinted copy panel paired with a photo, outer
 * corners heavily rounded and the shared inner edge square. Reversible.
 */
export default function ImageTextSection({
  eyebrow,
  heading,
  body,
  cta,
  photoIntent,
  photo,
  photoAlt,
  tint = "bg-peach-100",
  reverse = false,
}: {
  eyebrow?: string;
  heading: string;
  body: ReactNode;
  cta?: { href: string; label: string };
  photoIntent: string;
  photo?: string;
  photoAlt?: string;
  tint?: string;
  reverse?: boolean;
}) {
  const panel = (
    <div
      className={`${tint} ${
        reverse ? "pair-right" : "pair-left"
      } px-6 py-14 sm:px-12 lg:py-20`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display display-h2 mt-6 max-w-xl">{heading}</h2>
      <div className="mt-6 max-w-xl text-lg text-ink-muted">{body}</div>
      {cta && (
        <Link href={cta.href} className="btn btn-primary mt-8">
          {cta.label}
        </Link>
      )}
    </div>
  );

  const photoEl = (
    <ImageSlot
      intent={photoIntent}
      src={photo}
      alt={photoAlt}
      tint="bg-beige-100"
      sizes="(max-width: 1024px) 100vw, 50vw"
      className={`${reverse ? "pair-left" : "pair-right"} min-h-[24rem]`}
    />
  );

  return (
    <section className="mx-auto max-w-[1400px] px-3">
      <div className="grid overflow-hidden lg:grid-cols-2">
        {reverse ? (
          <>
            {photoEl}
            {panel}
          </>
        ) : (
          <>
            {panel}
            {photoEl}
          </>
        )}
      </div>
    </section>
  );
}
