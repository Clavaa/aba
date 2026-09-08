import Link from "next/link";
import CallCta from "@/components/CallCta";
import Sprout from "@/components/Sprout";

/**
 * `cta-image-background-section` — a full-width rounded band carrying a
 * centered statement and the two primary actions.
 *
 * TODO(photography): this is where a real full-bleed background photo goes,
 * with the ink scrim over it. Until then it runs as a solid ink band, which
 * keeps contrast honest rather than faking a photo.
 */
export default function CtaImageBackground({
  eyebrow,
  heading,
  body,
  primary,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: { href: string; label: string };
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-3 py-16 sm:py-20">
      <div className="field-card relative overflow-hidden bg-ink px-6 py-20 text-center text-cream sm:px-12">
        <Sprout
          className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rotate-[-12deg] text-coral/25"
          strokeWidth={2}
        />
        <Sprout
          className="pointer-events-none absolute -bottom-8 -right-4 h-44 w-44 rotate-[14deg] text-coral/20"
          strokeWidth={2}
        />
        <div className="relative">
          {eyebrow && <p className="eyebrow text-coral">{eyebrow}</p>}
          <h2 className="display display-hero mt-5 text-cream">{heading}</h2>
          {body && (
            <p className="mx-auto mt-7 max-w-2xl text-lg text-cream/80">{body}</p>
          )}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
            </Link>
            <CallCta className="btn btn-outline !border-cream !bg-transparent !text-cream hover:!bg-cream hover:!text-ink" fallbackLabel="Talk to a person" />
          </div>
        </div>
      </div>
    </section>
  );
}
