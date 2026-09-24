/**
 * Content revision dates for <lastmod>.
 *
 * Google treats sitemap lastmod as a real crawl-scheduling signal, but only
 * while it stays consistent: a site that stamps every URL with "now" on every
 * request trains Google to ignore the field entirely. So these are hand-set
 * dates that move ONLY when the underlying template or dataset actually
 * changes — which is what makes them worth sending.
 *
 * When you materially change a page family, bump its date here. Do not wire
 * these to build time, Date.now(), or the deploy timestamp.
 */

/** Census population, land area and distance dataset behind every geo page. */
export const GEO_DATA_REVISED = "2026-09-17";

/** The geo page templates (FindingCare block, near-me phrasing, name fixes). */
export const GEO_TEMPLATE_REVISED = "2026-09-17";

/** Careers pages, including the 51 pay-by-state pages. */
export const CAREERS_REVISED = "2026-09-14";

/** Parent guides under /resources/ and the evaluation pages. */
export const GUIDES_REVISED = "2026-09-14";

/** Payer and cost-of-care pages. */
export const COVERAGE_REVISED = "2026-09-14";

/** Everything else: home, about, contact, services, legal. */
export const CORE_REVISED = "2026-09-14";

/** Sitemap entries want a Date, not a string. */
export function rev(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}
