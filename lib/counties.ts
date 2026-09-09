/**
 * Build-time data layer for the 3,144-county dataset (data/counties.json).
 *
 * Source shape: { "StateName": [{ county, pop, fips }, ...] } with each
 * state's list already sorted by population, descending. That ordering is
 * load-bearing: "neighboring counties" links use proximity in this list so
 * every county page links to similarly-sized counties in the same state.
 *
 * Slug policy (kebab-case):
 *  - Strip the generic suffix ("County", "Parish", "Borough", "Census Area",
 *    "Municipality", "City and Borough") in the SLUG only — display copy
 *    always keeps the full official name.
 *  - Independent-city names ("Baltimore city", "Carson City") keep their
 *    "city" word, which is exactly what keeps Virginia's Richmond city and
 *    Richmond County from colliding.
 *  - Apostrophes and periods are dropped ("O'Brien" → obrien, "St. Louis" →
 *    st-louis); diacritics are folded ("Doña Ana" → dona-ana).
 *  - If stripping would ever collide within a state, the colliding counties
 *    fall back to their full-name slug. (The current dataset has zero
 *    collisions; the guard keeps future data honest.)
 */
import fs from "node:fs";
import path from "node:path";
import { getAllStates, type StateRecord } from "@/lib/states";

export type CountyRecord = {
  /** Full official display name, e.g. "St. Louis County" */
  name: string;
  /** URL slug, e.g. "st-louis" */
  slug: string;
  /** 2020s census population estimate */
  pop: number;
  /** 5-digit FIPS code */
  fips: string;
  /** Parent state display name */
  stateName: string;
  /** Parent state slug (matches lib/states.ts) */
  stateSlug: string;
  /** USPS abbreviation, e.g. "MO" */
  stateAbbrev: string;
  /** 0-based rank in the state's population-sorted list */
  rank: number;
};

/* ------------------------------------------------------------------ */
/* State abbreviations                                                 */
/* ------------------------------------------------------------------ */

export const STATE_ABBREV: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR",
  California: "CA", Colorado: "CO", Connecticut: "CT", Delaware: "DE",
  "District of Columbia": "DC", Florida: "FL", Georgia: "GA", Hawaii: "HI",
  Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS",
  Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
  Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS",
  Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM",
  "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
  Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA",
  "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
  Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT", Virginia: "VA",
  Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
};

/* ------------------------------------------------------------------ */
/* Slugging                                                            */
/* ------------------------------------------------------------------ */

function slugifyName(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // fold diacritics (Doña → Dona)
    .replace(/['’.]/g, "") // O'Brien → OBrien, St. → St
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Slug base with the generic geography suffix stripped. */
function countySlugBase(name: string): string {
  const stripped = name
    .replace(/\s+City and Borough$/i, "")
    .replace(/\s+(County|Parish|Borough|Census Area|Municipality)$/i, "");
  return slugifyName(stripped);
}

/* ------------------------------------------------------------------ */
/* Loading                                                             */
/* ------------------------------------------------------------------ */

type RawCounty = { county: string; pop: number; fips: string };

let byState: Map<string, CountyRecord[]> | null = null;

function load(): Map<string, CountyRecord[]> {
  if (byState) return byState;
  const raw: Record<string, RawCounty[]> = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "counties.json"), "utf8")
  );
  const states = getAllStates();

  byState = new Map();
  for (const state of states) {
    const list = raw[state.name] ?? [];

    // First pass: preferred (suffix-stripped) slugs, to detect collisions.
    const baseCounts = new Map<string, number>();
    for (const c of list) {
      const b = countySlugBase(c.county);
      baseCounts.set(b, (baseCounts.get(b) ?? 0) + 1);
    }

    const records = list.map((c, i): CountyRecord => {
      const base = countySlugBase(c.county);
      // Collision guard: keep the full name in the slug when stripping the
      // suffix would make two counties in this state share a URL.
      const slug = baseCounts.get(base)! > 1 ? slugifyName(c.county) : base;
      return {
        name: c.county,
        slug,
        pop: c.pop,
        fips: c.fips,
        stateName: state.name,
        stateSlug: state.slug,
        stateAbbrev: STATE_ABBREV[state.name] ?? "",
        rank: i,
      };
    });
    byState.set(state.slug, records);
  }
  return byState;
}

/** All counties for a state, population-sorted descending. */
export function getCountiesForState(stateSlug: string): CountyRecord[] {
  return load().get(stateSlug) ?? [];
}

export function getCounty(
  stateSlug: string,
  countySlug: string
): CountyRecord | undefined {
  return getCountiesForState(stateSlug).find((c) => c.slug === countySlug);
}

/** Every {state, county} pair — used by generateStaticParams. */
export function getAllCountyParams(): { state: string; county: string }[] {
  const out: { state: string; county: string }[] = [];
  for (const [stateSlug, list] of load()) {
    for (const c of list) out.push({ state: stateSlug, county: c.slug });
  }
  return out;
}

/**
 * 5–8 "neighboring" counties: nearest by position in the state's
 * population-sorted list, so links stay between comparable communities.
 */
export function getNeighborCounties(
  county: CountyRecord,
  max = 8
): CountyRecord[] {
  const list = getCountiesForState(county.stateSlug);
  const out: CountyRecord[] = [];
  for (let d = 1; out.length < max && d < list.length; d++) {
    const above = list[county.rank - d];
    const below = list[county.rank + d];
    if (above) out.push(above);
    if (below && out.length < max) out.push(below);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Display helpers                                                     */
/* ------------------------------------------------------------------ */

/** "664,744" */
export function formatPop(pop: number): string {
  return pop.toLocaleString("en-US");
}

/**
 * Rounded, honest "about N people" figure: 2 significant digits so census
 * point estimates never masquerade as exact counts in prose.
 */
export function approxPop(pop: number): string {
  const digits = Math.floor(Math.log10(pop));
  const unit = Math.pow(10, Math.max(digits - 1, 1));
  const rounded = Math.round(pop / unit) * unit;
  if (rounded >= 1_000_000) {
    const m = rounded / 1_000_000;
    return `${m % 1 === 0 ? m : m.toFixed(1)} million`;
  }
  return rounded.toLocaleString("en-US");
}

export type CountySize = "metro" | "large" | "mid" | "small";

/** Size bucket drives the in-home vs. setting framing and FAQ variants. */
export function countySize(pop: number): CountySize {
  if (pop >= 500_000) return "metro";
  if (pop >= 150_000) return "large";
  if (pop >= 50_000) return "mid";
  return "small";
}

/**
 * The short program name a parent would recognize, pulled from the state's
 * agency field when it names one (e.g. "TennCare", "Medi-Cal"), otherwise
 * "{State} Medicaid".
 */
export function medicaidProgramName(state: StateRecord): string {
  const known = state.agency.match(
    /\b(Medi-Cal|TennCare|MassHealth|SoonerCare|Husky Health|HUSKY|BadgerCare(?:\s*Plus)?|Apple Health|MO HealthNet|Health First Colorado|AHCCCS|Medicaid)\b/i
  );
  if (known && !/^medicaid$/i.test(known[1])) return known[1];
  return `${state.name} Medicaid`;
}
