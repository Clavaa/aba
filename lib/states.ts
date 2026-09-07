/**
 * Build-time data layer for the 51-jurisdiction ABA dataset
 * (data/aba_states_ALL.csv — 50 states + DC).
 *
 * Everything here runs on the server at build time only.
 * Display copy NEVER shows the raw "(verify)" research markers — `clean()`
 * strips them, and fields that say "not published" get graceful fallbacks
 * in the page components.
 */
import fs from "node:fs";
import path from "node:path";

export type StateRecord = {
  /** Full display name, e.g. "New Hampshire" */
  name: string;
  /** URL slug, e.g. "new-hampshire" */
  slug: string;
  /** Cleaned display fields (verify-markers stripped) */
  pathway: string;
  agency: string;
  priorAuth: string;
  mandate: string;
  hours: string;
  rate: string;
  waivers: string;
  licensure: string;
  /** Derived: hourly Medicaid reimbursement range for 1:1 ABA, if published */
  hourlyRate: { min: number; max: number } | null;
  /** Derived: year the state insurance mandate was enacted, if we can tell */
  mandateYear: number | null;
  /** True when the state publishes no usable hours guidance */
  hoursUnpublished: boolean;
  /** True when the state publishes no usable rate */
  rateUnpublished: boolean;
};

/* ------------------------------------------------------------------ */
/* CSV parsing (quote-aware, handles embedded commas and quotes)       */
/* ------------------------------------------------------------------ */

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* Cleaning                                                            */
/* ------------------------------------------------------------------ */

/**
 * Strip research annotations that must never reach display copy:
 *   "(verify)", "(verify phone)", "(verify against ... schedule)", etc.
 * Then tidy the leftover punctuation/whitespace.
 */
export function clean(raw: string): string {
  return (
    raw
      .replace(/\s*[—–-]?\s*\(verify[^)]*\)/gi, "")
      .replace(/\s*[—–-]\s*verify\b[^;.,]*/gi, "")
      // Expand researcher shorthand so display copy reads like English
      .replace(/\bdx\b/gi, "diagnosis")
      .replace(/\bhrs\/wk\b/gi, "hours a week")
      .replace(/\bhrs\/yr\b/gi, "hours a year")
      .replace(/\bhrs\b/gi, "hours")
      .replace(/\beff\.\s*/gi, "effective ")
      .replace(/\bincl\.\s*/gi, "including ")
      .replace(/\s{2,}/g, " ")
      .replace(/\s+([;,.])/g, "$1")
      .replace(/;\s*$/g, "")
      .trim()
  );
}

function isUnpublished(cleaned: string): boolean {
  const t = cleaned.toLowerCase();
  if (t.length === 0) return true;
  // "not published", "Not published — ...", "not published; ..." with no
  // substantive detail beyond the disclaimer.
  return /^not (state-)?published[.;,\s—–-]*$/.test(t);
}

/* ------------------------------------------------------------------ */
/* Rate extraction                                                     */
/* ------------------------------------------------------------------ */

/**
 * Pull hourly dollar figures for 97153-style 1:1 ABA out of the free-text
 * rate field. Credential tiers and site-of-service differentials mean many
 * states have several figures — we surface the honest range, never a single
 * cherry-picked number.
 */
function extractHourlyRange(raw: string): { min: number; max: number } | null {
  // A figure is only displayable when the state actually publishes a current
  // rate. "not published" fields sometimes still carry a stale or third-party
  // number ("a 2021 document listed…", "per secondary compilation only") and
  // Vermont's hourly rate was replaced by monthly case tiers — none of those
  // may ship as a current per-hour price.
  if (/not\s+(?:clearly\s+|publicly\s+|easily\s+)?(?:published|posted)/i.test(raw))
    return null;
  if (/historically|replaced by/i.test(raw)) return null;

  const values: number[] = [];

  // Explicit hourly figures: "$40.00/hr", "(~$77.56/hr)", "$60/hr", "per hour"
  const hourly = raw.matchAll(
    /\$\s*(\d[\d,]*(?:\.\d+)?)\s*(?:\/\s*|\s+per\s+)(?:hr|hour)\b/gi
  );
  for (const m of hourly) values.push(parseFloat(m[1].replace(/,/g, "")));

  // Per-15-minute-unit figures → ×4: "$10.00 per 15-min unit", "$27.50/15 min"
  const perUnit = raw.matchAll(
    /\$\s*(\d{1,2}(?:\.\d+)?)\s*(?:\/\s*|\s+per\s+)(?:15[\s-]?min(?:ute)?s?\b|unit\b)/gi
  );
  for (const m of perUnit) values.push(parseFloat(m[1].replace(/,/g, "")) * 4);

  // Filter to a sane hourly band so annual caps etc. can never sneak in.
  const sane = values.filter((v) => v >= 20 && v <= 200);
  if (sane.length === 0) return null;
  return { min: Math.min(...sane), max: Math.max(...sane) };
}

function extractMandateYear(raw: string): number | null {
  // Prefer a year adjacent to enactment language; fall back to first year.
  const enacted = raw.match(
    /(?:enacted|eff\.?(?:ective)?|law)\s*\(?\s*((?:19|20)\d{2})/i
  );
  if (enacted) return parseInt(enacted[1], 10);
  const first = raw.match(/\b((?:19|20)\d{2})\b/);
  return first ? parseInt(first[1], 10) : null;
}

/* ------------------------------------------------------------------ */
/* Loading                                                             */
/* ------------------------------------------------------------------ */

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

let cache: StateRecord[] | null = null;

export function getAllStates(): StateRecord[] {
  if (cache) return cache;
  const csvPath = path.join(process.cwd(), "data", "aba_states_ALL.csv");
  const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));
  const [, ...records] = rows; // drop header

  cache = records.map((r) => {
    const [
      name,
      pathwayRaw,
      agencyRaw,
      priorAuthRaw,
      mandateRaw,
      hoursRaw,
      rateRaw,
      waiversRaw,
      licensureRaw,
    ] = r;

    const hours = clean(hoursRaw);
    const rate = clean(rateRaw);

    return {
      name,
      slug: slugify(name),
      pathway: clean(pathwayRaw),
      agency: clean(agencyRaw),
      priorAuth: clean(priorAuthRaw),
      mandate: clean(mandateRaw),
      hours,
      rate,
      waivers: clean(waiversRaw),
      licensure: clean(licensureRaw),
      hourlyRate: extractHourlyRange(rateRaw),
      mandateYear: extractMandateYear(mandateRaw),
      hoursUnpublished: isUnpublished(hours),
      rateUnpublished: isUnpublished(rate) || extractHourlyRange(rateRaw) === null,
    };
  });
  return cache;
}

export function getState(slug: string): StateRecord | undefined {
  return getAllStates().find((s) => s.slug === slug);
}

/** Lightweight list for selectors and grids */
export function getStateLinks(): { name: string; slug: string }[] {
  return getAllStates().map(({ name, slug }) => ({ name, slug }));
}

/** Format a dollar amount for display, e.g. 40 → "$40", 49.04 → "$49" */
export function usd(n: number): string {
  return `$${Math.round(n)}`;
}
