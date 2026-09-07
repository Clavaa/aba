"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { strings } from "@/lib/i18n";
import { siteConfig } from "@/site.config";
import PhoneIcon from "@/components/PhoneIcon";

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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-spruce/15 bg-ivory/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
      role="region"
      aria-label={t.quickContact}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={siteConfig.contact.phoneHref}
          className="btn btn-primary flex-1 !px-3 !py-3 text-base"
        >
          <PhoneIcon />
          {t.callNow}
        </a>
        <Link
          href={isEs ? "/es/como-empezar/#quiz" : "/getting-started/#quiz"}
          className="btn btn-marigold flex-1 !px-3 !py-3 text-base"
        >
          {t.checkCoverage}
        </Link>
      </div>
    </div>
  );
}
