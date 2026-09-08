"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, ratingIsReal } from "@/site.config";
import { strings } from "@/lib/i18n";
import CallCta from "@/components/CallCta";

/**
 * Dark utility bar: rating pills left, the autism question centered and
 * underlined, phone in a pill on the right. Modelled on the target's
 * top-banner module (measured: dark ink ground, translucent white pills at
 * 999px radius, 13px type).
 */
export default function TopBar() {
  const t = strings(usePathname());

  return (
    <div className="bg-ink text-cream">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 text-[13px]">
        <div className="flex items-center gap-2">
          {siteConfig.ratings.map((r) => (
            <span
              key={r.source}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 leading-tight"
              title={
                ratingIsReal(r)
                  ? `${r.value} on ${r.source} (${r.count} reviews)`
                  : t.ratingSoon(r.source)
              }
            >
              <span aria-hidden="true" className="text-amber">
                ★
              </span>
              {/* TODO(config): real ratings replace the em-dash automatically */}
              <span className="font-semibold">
                {ratingIsReal(r) ? `Rated ${r.value}/5.0` : "—"}
              </span>
              <span className="hidden text-cream/60 sm:inline">{r.source}</span>
            </span>
          ))}
        </div>

        <Link
          href={t.autismQuestionHref}
          className="hidden items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:text-coral-soft md:inline-flex"
        >
          {t.autismQuestion}
          <span aria-hidden="true">›</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={t.langSwitchHref}
            hrefLang={t.langSwitchHref === "/es/" ? "es" : "en"}
            className="hidden font-semibold underline-offset-4 hover:text-coral-soft hover:underline sm:inline"
          >
            {t.langSwitchLabel}
          </Link>
          <CallCta
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-semibold hover:bg-white/20"
            fallbackLabel={t.talkCta}
            href={t.langSwitchHref === "/" ? "/es/como-empezar/" : "/contact/"}
          />
        </div>
      </div>
    </div>
  );
}
