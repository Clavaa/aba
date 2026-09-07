import Link from "next/link";
import { siteConfig } from "@/site.config";
import { PhoneIcon } from "@/components/TopBar";

/**
 * Mobile-only sticky bottom bar (Shared CRO spine: phone-first category —
 * senior/child-care call leads convert ~41% vs ~1.7% for forms).
 * Two thumbs-reach actions: call, or start the coverage check.
 */
export default function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-spruce/15 bg-ivory/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={siteConfig.contact.phoneHref}
          className="btn btn-primary flex-1 !px-3 !py-3 text-base"
        >
          <PhoneIcon />
          Call now
        </a>
        <Link
          href="/getting-started/#quiz"
          className="btn btn-marigold flex-1 !px-3 !py-3 text-base"
        >
          {siteConfig.cta.checkCoverage}
        </Link>
      </div>
    </div>
  );
}
