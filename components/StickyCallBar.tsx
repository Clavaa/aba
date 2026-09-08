"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { strings } from "@/lib/i18n";
import CallCta from "@/components/CallCta";

/**
 * Mobile-only sticky bottom bar (Shared CRO spine: phone-first category —
 * senior/child-care call leads convert ~41% vs ~1.7% for forms).
 * Two thumbs-reach actions: call, or start the coverage check.
 */
export default function StickyCallBar() {
  const t = strings(usePathname());
  const isEs = t.langSwitchHref === "/";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
      role="region"
      aria-label={t.quickContact}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <Link
          href={isEs ? "/es/como-empezar/#quiz" : "/getting-started/#quiz"}
          className="btn btn-primary flex-1 !px-3 !py-3.5"
        >
          {t.checkCoverage}
        </Link>
        <CallCta
          className="btn btn-outline flex-1 !px-3 !py-3.5"
          fallbackLabel={t.talkCta}
          href={isEs ? "/es/como-empezar/" : "/contact/"}
        />
      </div>
    </div>
  );
}
