/**
 * Build-time data layer for the city pages (data/cities.json).
 *
 * Source: U.S. Census Bureau sub-county population estimates (incorporated
 * places, 2024 vintage), joined to the site's own county dataset by FIPS so a
 * city can only ever attach to a county page that actually exists.
 *
 * Selection: the six largest incorporated places per state with at least
 * 15,000 residents. That's deliberate restraint — 287 pages, not thousands.
 * A city page has to say something a county page doesn't, and below that size
 * it can't.
 *
 * Routing: cities live UNDER their county — /locations/{state}/{county}/{city}/
 * — because Next.js can't have two dynamic segments at the same level, and
 * /locations/nc/durham would otherwise be ambiguous between Durham the city
 * and Durham County. Nesting also gives every city page a real breadcrumb.
 */
import fs from "node:fs";
import path from "node:path";
import { getCountiesForState, type CountyRecord } from "@/lib/counties";
import { getAllStates } from "@/lib/states";

export type CityRecord = {
  /** Display name, e.g. "Winston-Salem" */
  name: string;
  /** URL slug, e.g. "winston-salem" */
  slug: string;
  /** 2024 census population estimate */
  pop: number;
  /** The county this city primarily sits in */
  county: CountyRecord;
  /** How many counties the city's territory touches (1 = wholly contained) */
  spansCounties: number;
  stateName: string;
  stateSlug: string;
  stateAbbrev: string;
};

type RawCity = {
  city: string;
  pop: number;
  countyFips: string;
  county: string;
  spansCounties: number;
};

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’.]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let cache: Map<string, CityRecord[]> | null = null;

/** Keyed by `${stateSlug}/${countySlug}` */
function load(): Map<string, CityRecord[]> {
  if (cache) return cache;
  const raw: Record<string, RawCity[]> = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "cities.json"), "utf8")
  );
  cache = new Map();

  for (const state of getAllStates()) {
    const list = raw[state.name] ?? [];
    const counties = getCountiesForState(state.slug);

    for (const c of list) {
      const county = counties.find((x) => x.fips === c.countyFips);
      if (!county) continue; // never orphan a city from its county page

      const key = `${state.slug}/${county.slug}`;
      const siblings = cache.get(key) ?? [];
      // Guard against two cities in one county sharing a slug.
      let slug = slugify(c.city);
      if (siblings.some((s) => s.slug === slug)) {
        slug = `${slug}-${slugify(state.name)}`;
      }
      siblings.push({
        name: c.city,
        slug,
        pop: c.pop,
        county,
        spansCounties: c.spansCounties,
        stateName: state.name,
        stateSlug: state.slug,
        stateAbbrev: county.stateAbbrev,
      });
      cache.set(key, siblings);
    }
  }

  // Population-sorted within each county
  for (const list of cache.values()) list.sort((a, b) => b.pop - a.pop);
  return cache;
}

export function getCitiesForCounty(
  stateSlug: string,
  countySlug: string
): CityRecord[] {
  return load().get(`${stateSlug}/${countySlug}`) ?? [];
}

export function getCity(
  stateSlug: string,
  countySlug: string,
  citySlug: string
): CityRecord | undefined {
  return getCitiesForCounty(stateSlug, countySlug).find(
    (c) => c.slug === citySlug
  );
}

/** Every city in a state, population-sorted — used by state pages and sitemaps. */
export function getCitiesForState(stateSlug: string): CityRecord[] {
  const out: CityRecord[] = [];
  for (const [key, list] of load()) {
    if (key.startsWith(`${stateSlug}/`)) out.push(...list);
  }
  return out.sort((a, b) => b.pop - a.pop);
}

/** All {state, county, city} triples — for generateStaticParams. */
export function getAllCityParams(): {
  state: string;
  county: string;
  city: string;
}[] {
  const out: { state: string; county: string; city: string }[] = [];
  for (const [key, list] of load()) {
    const [state, county] = key.split("/");
    for (const c of list) out.push({ state, county, city: c.slug });
  }
  return out;
}

/**
 * The other big cities in the same state, for cross-linking. Excludes the
 * current city and prefers ones of comparable size.
 */
export function getSiblingCities(city: CityRecord, max = 6): CityRecord[] {
  return getCitiesForState(city.stateSlug)
    .filter((c) => !(c.slug === city.slug && c.county.slug === city.county.slug))
    .slice(0, max);
}

export type CitySize = "major" | "mid" | "small" | "town";

/** Size bucket — drives which "what's realistic here" copy a page gets. */
export function citySize(pop: number): CitySize {
  if (pop >= 250_000) return "major";
  if (pop >= 100_000) return "mid";
  if (pop >= 40_000) return "small";
  return "town";
}

/**
 * Share of the county's population that lives in this city, as a rounded
 * percentage — used to say something true about whether the city IS the
 * county or is one of many towns in it.
 */
export function shareOfCounty(city: CityRecord): number {
  if (!city.county.pop) return 0;
  return Math.round((city.pop / city.county.pop) * 100);
}
