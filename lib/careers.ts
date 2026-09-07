/**
 * Careers data layer.
 *
 * Two rules govern everything in here:
 *
 * 1. NO INVENTED PAY FIGURES. `payBands` ships empty. The pay page renders a
 *    framework and an honest "we're assembling verified data" state until
 *    someone loads real, sourced numbers (BLS OEWS or verified market data)
 *    with the source and date attached. Nothing here fills itself in.
 *
 * 2. NO FAKE JOB POSTINGS. `openings` ships empty, and JobPosting structured
 *    data is emitted ONLY for entries that actually exist. Emitting schema for
 *    jobs that aren't real is a Google penalty risk and a lie to applicants.
 */

export type PayBand = {
  /** Two-letter state code, e.g. "NC" */
  state: string;
  role: "RBT" | "BCBA";
  /** Hourly for RBT, annual for BCBA — units carried explicitly */
  unit: "hour" | "year";
  low: number;
  median: number;
  high: number;
  /** Where the figure came from, shown on the page verbatim */
  source: string;
  /** ISO date the figure was published or pulled */
  asOf: string;
};

/**
 * TODO(pay-data): load verified, sourced pay bands here before launch.
 * Every entry must carry `source` and `asOf` — they render on the page.
 */
export const payBands: PayBand[] = [];

export function hasPayData(role: PayBand["role"]): boolean {
  return payBands.some((b) => b.role === role);
}

export type Opening = {
  /** Stable slug used in the URL and the schema @id */
  slug: string;
  title: string;
  role: "RBT" | "BCBA" | "Other";
  /** Where the work happens, e.g. "Raleigh, NC" */
  location: string;
  /** Two-letter state code for the schema address */
  stateCode: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
  /** ISO date the posting went live — required by JobPosting schema */
  datePosted: string;
  /** ISO date it expires; postings past this date must be pulled */
  validThrough: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  /** Optional — only emit salary schema when the figure is real */
  pay?: { min: number; max: number; unit: "HOUR" | "YEAR" };
};

/**
 * TODO(openings): real, currently-open roles only.
 * A posting that has been filled must be deleted, not left up — stale
 * JobPosting markup is worse than none.
 */
export const openings: Opening[] = [];

export function getOpening(slug: string): Opening | undefined {
  return openings.find((o) => o.slug === slug);
}
