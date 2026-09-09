/**
 * Single source of truth for brand + contact + trust data.
 * Every component reads from this file — change it here, it changes everywhere.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  Brand is FINAL: Sproutwell ABA · sproutwellaba.com (domain verified
 *  available). TODO BEFORE LAUNCH (all clearly marked):
 *  1. contact.phone     → real call-tracked number (one per landing page ideally)
 *  2. contact.email     → real intake inbox (mailboxes on sproutwellaba.com)
 *  3. ratings           → REAL rating values + counts, or leave null to hide.
 *                         NEVER publish fabricated ratings.
 *  4. reviews           → REAL named + dated Google reviews WITH written consent,
 *                         or leave empty to hide the carousel.
 *  5. intake.startTimeframe → verify this is TRUE for your operation before
 *                         publishing any speed promise.
 *  6. acceptedPlans     → the payers you are actually in-network with, per state.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Rating = {
  /** e.g. "Google" | "BBB" */
  source: string;
  /** e.g. "4.9" — string so we never do float display math */
  value: string;
  /** e.g. 218 */
  count: number;
};

export type Review = {
  quote: string;
  /** First name + last initial, e.g. "Maria G." */
  name: string;
  /** Human-readable date, e.g. "March 2026" */
  date: string;
  location?: string;
};

/**
 * Canonical origin, resolved at build time.
 *
 * Precedence:
 *  1. NEXT_PUBLIC_SITE_URL — set this to https://sproutwellaba.com the moment
 *     the domain is registered and pointed at the host. It wins always.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the stable production deploy URL, so a
 *     deploy before the domain exists still emits canonicals that resolve.
 *  3. localhost, for local builds.
 *
 * While we're on a provisional host (case 2 or 3) the site emits noindex and
 * a disallow-all robots.txt — a temporary domain that gets indexed is a
 * migration problem you have to clean up later, so we don't let it happen.
 */
function resolveOrigin(): { url: string; provisional: boolean } {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return { url: explicit.replace(/\/$/, ""), provisional: false };

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return { url: `https://${vercel}`, provisional: true };

  return { url: "http://localhost:3000", provisional: true };
}

const origin = resolveOrigin();

/** True while the site is served from a temporary host — gates indexing. */
export const isProvisionalHost = origin.provisional;

export const siteConfig = {
  brand: {
    name: "Sproutwell ABA",
    /** Short form used in tight UI spots (sticky bar, chips) */
    shortName: "Sproutwell",
    /**
     * Canonical base for metadata, sitemaps and JSON-LD (no trailing slash).
     * Resolved above — set NEXT_PUBLIC_SITE_URL to pin it to the real domain.
     */
    domain: origin.url,
    tagline: "ABA therapy for kids, backup for parents — in all 50 states.",
    /** Legal entity line for the footer. TODO: confirm the registered legal name */
    legalName: "Sproutwell ABA, LLC",
  },

  contact: {
    /**
     * Call-tracked phone number. NULL until a real one exists — the whole site
     * hides every phone CTA while this is null rather than publishing a number
     * that rings nowhere. Set it (with phoneHref) and the buttons come back
     * everywhere at once; nothing else needs touching.
     */
    phone: null as string | null,
    /** tel: href form of the number above — keep the two in sync */
    phoneHref: null as string | null,
    /**
     * Public-facing email. NULL until a real mailbox exists on the domain —
     * sproutwellaba.com is registered but has no mail set up, and an address
     * that bounces is worse than no address. While this is null the site
     * shows the contact form instead, everywhere. Set it and the mailto links
     * return on their own.
     */
    email: null as string | null,
    /** Where /api/lead delivers. Real, monitored inbox — leads arrive here. */
    leadInbox: "support@offendersearch.app",
    /** Verified sender for SendGrid. TODO: verify this sender on the domain */
    leadFrom: "website@sproutwellaba.com",
  },

  /**
   * Ratings shown in the top bar and near forms.
   * TODO: replace with REAL ratings or set to [] to hide the pills entirely.
   * These placeholder entries render as "★ —" so nothing fake ever displays.
   */
  ratings: [
    { source: "Google", value: "—", count: 0 },
    { source: "BBB", value: "—", count: 0 },
  ] satisfies Rating[],

  /**
   * Review carousel content.
   * TODO: replace with REAL named + dated reviews (with written consent) or
   * leave as-is — entries whose quote starts with "TODO" are rendered as
   * obvious placeholder frames, never as if they were real quotes.
   */
  reviews: [
    {
      quote:
        "TODO: paste a real, verbatim Google review here — named, dated, and with the family's written consent.",
      name: "TODO First L.",
      date: "TODO Month Year",
      location: "TODO City, ST",
    },
    {
      quote:
        "TODO: paste a real, verbatim Google review here — named, dated, and with the family's written consent.",
      name: "TODO First L.",
      date: "TODO Month Year",
      location: "TODO City, ST",
    },
    {
      quote:
        "TODO: paste a real, verbatim Google review here — named, dated, and with the family's written consent.",
      name: "TODO First L.",
      date: "TODO Month Year",
      location: "TODO City, ST",
    },
  ] satisfies Review[],

  intake: {
    /**
     * The true-urgency promise. TODO: verify this is actually true for your
     * operation before launch; delete the sentence anywhere it appears if not.
     */
    startTimeframe: "Most families who qualify start within 2–3 weeks",
    /** Length of the first phone call, used in CTA copy */
    callLength: "15-minute",
  },

  /**
   * Payers we can name on insurance pages.
   * TODO: replace with the plans you are ACTUALLY in-network with (per state
   * if it differs). "Medicaid" stays — the state pages document the real
   * state-by-state Medicaid pathways from the research dataset.
   */
  acceptedPlans: [
    "Medicaid & CHIP",
    "TODO: Payer 1",
    "TODO: Payer 2",
    "TODO: Payer 3",
    "TODO: Payer 4",
  ],

  cta: {
    primary: "Get backup today",
    checkState: "Check my state + insurance",
    talk: "Talk to a real person",
    startIntake: "Start the 15-minute intake",
    checkCoverage: "Check my coverage",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * True only when a real, call-tracked number is configured. Every phone CTA
 * on the site is behind this, so the site never shows a number that doesn't
 * ring — it offers the contact form instead.
 */
export const hasEmail: boolean =
  typeof siteConfig.contact.email === "string" &&
  siteConfig.contact.email.length > 0;

export const hasPhone: boolean =
  typeof siteConfig.contact.phone === "string" &&
  siteConfig.contact.phone.length > 0;

/** True when a rating has a real value worth displaying */
export function ratingIsReal(r: Rating): boolean {
  return r.value !== "—" && r.count > 0;
}

/** True when a review is still an unfilled placeholder */
export function reviewIsPlaceholder(r: Review): boolean {
  return r.quote.startsWith("TODO") || r.name.startsWith("TODO");
}
