import Link from "next/link";
import { siteConfig, ratingIsReal } from "@/site.config";

/**
 * The always-visible spruce ratings top bar (Style Bible signature #1):
 * rating pills + "Does my child have autism?" link + call-tracked phone.
 * Placeholder ratings render as "★ —" so nothing fabricated ever displays.
 */
export default function TopBar() {
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
                  : `${r.source} rating coming soon`
              }
            >
              <span aria-hidden="true" className="text-marigold">
                ★
              </span>
              <span>
                {/* TODO(config): real ratings replace the em-dash automatically */}
                {ratingIsReal(r) ? r.value : "—"}{" "}
                <span className="hidden sm:inline text-ivory/70">
                  {r.source}
                </span>
              </span>
            </span>
          ))}
        </div>

        <Link
          href="/getting-started/"
          className="hidden md:inline font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:text-marigold"
        >
          Does my child have autism?
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
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
