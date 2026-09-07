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

export const siteConfig = {
  brand: {
    name: "Sproutwell ABA",
    /** Short form used in tight UI spots (sticky bar, chips) */
    shortName: "Sproutwell",
    /** Production domain — canonical base for metadata, sitemap, JSON-LD (no trailing slash) */
    domain: "https://sproutwellaba.com",
    tagline: "ABA therapy for kids, backup for parents — in all 50 states.",
    /** Legal entity line for the footer. TODO: confirm the registered legal name */
    legalName: "Sproutwell ABA, LLC",
  },

  contact: {
    /** TODO: real call-tracked phone number */
    phone: "(800) 555-0134",
    /** tel: href form of the number above — keep in sync */
    phoneHref: "tel:+18005550134",
    /** TODO: placeholder — set up the real intake inbox on this domain */
    email: "hello@sproutwellaba.com",
    /** Where /api/lead sends new leads. TODO: placeholder — set up real inbox */
    leadInbox: "intake@sproutwellaba.com",
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

/** True when a rating has a real value worth displaying */
export function ratingIsReal(r: Rating): boolean {
  return r.value !== "—" && r.count > 0;
}

/** True when a review is still an unfilled placeholder */
export function reviewIsPlaceholder(r: Review): boolean {
  return r.quote.startsWith("TODO") || r.name.startsWith("TODO");
}
