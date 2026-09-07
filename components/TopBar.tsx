"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, ratingIsReal } from "@/site.config";
import { strings } from "@/lib/i18n";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * The always-visible spruce ratings top bar (Style Bible signature #1):
 * rating pills + "Does my child have autism?" link + call-tracked phone,
 * plus the EN|ES switch. Placeholder ratings render as "★ —" so nothing
 * fabricated ever displays.
 */
export default function TopBar() {
  const t = strings(usePathname());

  return (
    <div className="bg-spruce text-ivory text-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-2">
          {siteConfig.ratings.map((r) => (
            <span
              key={r.source}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold"
              title={
                ratingIsReal(r)
                  ? `${r.value} on ${r.source} (${r.count} reviews)`
                  : t.ratingSoon(r.source)
              }
            >
              <span aria-hidden="true" className="text-marigold">
                ★
              </span>
              <span>
                {/* TODO(config): real ratings replace the em-dash automatically */}
                {ratingIsReal(r) ? r.value : "—"}{" "}
                <span className="hidden sm:inline text-ivory/70">{r.source}</span>
              </span>
            </span>
          ))}
        </div>

        <Link
          href={t.autismQuestionHref}
          className="hidden md:inline font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:text-marigold"
        >
          {t.autismQuestion}
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={t.langSwitchHref}
            hrefLang={t.langSwitchHref === "/es/" ? "es" : "en"}
            className="hidden font-semibold underline-offset-4 hover:text-marigold hover:underline sm:inline"
          >
            {t.langSwitchLabel}
          </Link>
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-marigold px-3.5 py-1 font-bold text-spruce hover:bg-[#f0a713]"
          >
            <PhoneIcon />
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
