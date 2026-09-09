"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * `insurance-logos-section` — the payer wall that sits directly under the
 * hero: a state selector + "all plans" link, then an edge-faded marquee of
 * payer pills.
 *
 * We render payer NAMES, not logos. Reproducing insurer marks would claim a
 * relationship we don't have yet — site.config.acceptedPlans is still TODO —
 * and those marks are trademarks. Names in a neutral pill state the same
 * thing honestly: these are the plans people ask us about.
 */

const PLANS = [
  "Medicaid",
  "CHIP",
  "Aetna",
  "UnitedHealthcare",
  "Cigna",
  "Blue Cross Blue Shield",
  "TRICARE",
  "Kaiser Permanente",
  "Humana",
  "Optum",
  "Evernorth",
  "CareSource",
];

export default function InsuranceMarquee({
  states,
}: {
  states: { name: string; slug: string }[];
}) {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  return (
    <section className="py-10 sm:py-12" aria-labelledby="plans-marquee-heading">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-4 px-4">
        <label
          htmlFor="marquee-state"
          id="plans-marquee-heading"
          className="font-bold"
        >
          Accepted insurance plans in
        </label>
        <select
          id="marquee-state"
          value={slug}
          onChange={(e) => {
            const v = e.target.value;
            setSlug(v);
            if (v) router.push(`/locations/${v}/`);
          }}
          className="rounded-full border border-ink/20 bg-white px-5 py-2.5 font-medium"
        >
          <option value="">All states</option>
          {states.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <Link
          href="/insurance/"
          className="underline decoration-ink/30 underline-offset-4 hover:text-coral"
        >
          All insurance plans
        </Link>
      </div>

      <div className="marquee mt-8">
        {/* duplicated once so the -50% translate loops seamlessly */}
        <ul className="marquee-track" aria-label="Plans families ask us about">
          {[...PLANS, ...PLANS].map((p, i) => (
            <li
              key={`${p}-${i}`}
              aria-hidden={i >= PLANS.length}
              className="grid h-16 min-w-[13rem] place-items-center rounded-full border border-ink/12 bg-white px-8 font-bold text-ink/75"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-5 max-w-2xl px-4 text-center text-sm text-ink-muted">
        {/* TODO(config): once contracts exist, mark which of these we are
            actually in-network with, per state. */}
        Plans families ask us about most. We verify your specific plan on the
        first conversation — network status varies by state.
      </p>
    </section>
  );
}
