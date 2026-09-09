/**
 * Build-time data layer for the city pages (data/cities.json) — 10,255
 * incorporated places of 1,000+ residents, across all 50 states and DC.
 *
 * Sources, all real:
 *  - population: Census sub-county population estimates, 2024 vintage
 *  - land area + coordinates: Census 2024 Gazetteer place file
 *  - county: Census place-in-county records, joined by FIPS to the site's own
 *    county dataset so a city can never orphan from a county page
 *
 * Derived at data-prep time (not at build time, so the build stays fast):
 *  - density: population / land area, which separates a dense small city from
 *    a spread-out town of the same size
 *  - nearest hub: the closest place of 50,000+ and the great-circle distance
 *    to it. This is the best available proxy for local clinician supply, which
 *    is why it drives what the page recommends
 *  - the county's largest place and the distance to it
 *  - how many places share the county
 *
 * Routing: cities nest under their county — Next can't have two dynamic
 * segments at one level, and a flat city segment would collide with the
 * county segment (Durham the city vs Durham County).
 */
import fs from "node:fs";
import path from "node:path";
import { getCountiesForState, type CountyRecord } from "@/lib/counties";
import { getAllStates } from "@/lib/states";

export type NearbyPlace = {
  name: string;
  pop: number;
  miles: number;
  same: boolean;
};

export type NearbyTown = {
  name: string;
  slug: string;
  pop: number;
  miles: number;
  countySlug: string | null;
};

export type CityRecord = {
  name: string;
  slug: string;
  pop: number;
  /** Land area in square miles */
  sqmi: number;
  /** People per square mile of land */
  density: number;
  lat: number;
  lon: number;
  county: CountyRecord;
  /** How many counties the city's territory touches (1 = wholly contained) */
  spansCounties: number;
  /** How many incorporated places sit in this county */
  placesInCounty: number;
  /** True when the city is itself a place of 50,000+ */
  isHub: boolean;
  /** Nearest place of 50,000+, or null when this city is one */
  hub: NearbyPlace | null;
  /** The largest incorporated place in the same county */
  countyBiggest: NearbyPlace;
  /** 2020 census base, for real growth/decline since */
  pop2020: number | null;
  /** Population rank among the places we publish in this state */
  stateRank: number;
  /** Population rank within its county */
  countyRank: number;
  /** How many places we publish in this county */
  citiesInCountyPublished: number;
  /** The three genuinely nearest towns, by great-circle distance */
  nearby: NearbyTown[];
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
  sqmi: number;
  density: number;
  lat: number;
  lon: number;
  placesInCounty: number;
  isHub: boolean;
  hub: NearbyPlace | null;
  countyBiggest: NearbyPlace;
  pop2020: number | null;
  stateRank: number;
  countyRank: number;
  citiesInCountyPublished: number;
  nearby: { name: string; pop: number; miles: number; cfips: string }[];
};

/** Strip the Census legal-status suffix for display: "Austin city" → "Austin" */
export function cleanPlaceName(raw: string): string {
  return raw
    .replace(/\s*\(balance\)$/i, "")
    .replace(
      /\s+(city and borough|consolidated government|metropolitan government|unified government|urban county|municipality|borough|village|township|town|city|CDP)$/i,
      ""
    )
    .replace(/\s+(town|city|village|borough)$/i, "")
    .trim();
}

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
    const byFips = new Map(counties.map((c) => [c.fips, c]));

    for (const c of list) {
      const county = byFips.get(c.countyFips);
      if (!county) continue;

      const key = `${state.slug}/${county.slug}`;
      const siblings = cache.get(key) ?? [];
      const display = cleanPlaceName(c.city);
      let slug = slugify(display);
      // Two places in one county can clean to the same name (a village and a
      // town). Keep both reachable rather than dropping one.
      if (siblings.some((s) => s.slug === slug)) slug = slugify(c.city);
      if (siblings.some((s) => s.slug === slug)) continue;

      siblings.push({
        name: display,
        slug,
        pop: c.pop,
        sqmi: c.sqmi,
        density: c.density,
        lat: c.lat,
        lon: c.lon,
        county,
        spansCounties: c.spansCounties,
        placesInCounty: c.placesInCounty,
        isHub: c.isHub,
        hub: c.hub ? { ...c.hub, name: cleanPlaceName(c.hub.name) } : null,
        countyBiggest: {
          ...c.countyBiggest,
          name: cleanPlaceName(c.countyBiggest.name),
        },
        pop2020: c.pop2020 ?? null,
        stateRank: c.stateRank,
        countyRank: c.countyRank,
        citiesInCountyPublished: c.citiesInCountyPublished,
        nearby: c.nearby.map((n) => {
          const nm = cleanPlaceName(n.name);
          const nc = byFips.get(n.cfips);
          return {
            name: nm,
            slug: slugify(nm),
            pop: n.pop,
            miles: n.miles,
            countySlug: nc ? nc.slug : null,
          };
        }),
        stateName: state.name,
        stateSlug: state.slug,
        stateAbbrev: county.stateAbbrev,
      });
      cache.set(key, siblings);
    }
  }

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

export function getCitiesForState(stateSlug: string): CityRecord[] {
  const out: CityRecord[] = [];
  for (const [key, list] of load()) {
    if (key.startsWith(`${stateSlug}/`)) out.push(...list);
  }
  return out.sort((a, b) => b.pop - a.pop);
}

export function getAllCities(): CityRecord[] {
  const out: CityRecord[] = [];
  for (const list of load().values()) out.push(...list);
  return out;
}

/** Every {state, county, city} triple — for sitemaps. */
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
 * The params prerendered at build time. The long tail renders on demand and
 * is cached — 10,255 pages is the right amount of coverage and the wrong
 * amount of build output, so the biggest places ship static and the rest
 * are generated on first request.
 */
export function getPrerenderedCityParams(perState = 30): {
  state: string;
  county: string;
  city: string;
}[] {
  const out: { state: string; county: string; city: string }[] = [];
  for (const state of getAllStates()) {
    for (const c of getCitiesForState(state.slug).slice(0, perState)) {
      out.push({ state: state.slug, county: c.county.slug, city: c.slug });
    }
  }
  return out;
}

export function getSiblingCities(city: CityRecord, max = 8): CityRecord[] {
  const inCounty = getCitiesForCounty(city.stateSlug, city.county.slug).filter(
    (c) => c.slug !== city.slug
  );
  if (inCounty.length >= 4) return inCounty.slice(0, max);
  // Sparse county — fall back to the rest of the state so the page still links out.
  const rest = getCitiesForState(city.stateSlug).filter(
    (c) => !(c.slug === city.slug && c.county.slug === city.county.slug)
  );
  return [...inCounty, ...rest].slice(0, max);
}

export type CitySize = "major" | "mid" | "small" | "town" | "village";

export function citySize(pop: number): CitySize {
  if (pop >= 250_000) return "major";
  if (pop >= 100_000) return "mid";
  if (pop >= 40_000) return "small";
  if (pop >= 10_000) return "town";
  return "village";
}

export type Reach = "in-hub" | "close" | "moderate" | "far";

/**
 * How dense in-person coverage realistically is here.
 *
 * We deliver in the home, in schools and daycares, and by telehealth — not in
 * centers — so this isn't about a building a family drives to. It's about
 * clinician supply: near a population centre there are more technicians
 * covering more routes, which means more scheduling flexibility and a shorter
 * wait. Far out, the same care happens, it just gets planned differently.
 */
export function reachFor(city: CityRecord): Reach {
  if (city.isHub) return "in-hub";
  const m = city.hub?.miles ?? 999;
  if (m <= 20) return "close";
  if (m <= 45) return "moderate";
  return "far";
}

export function shareOfCounty(city: CityRecord): number {
  if (!city.county.pop) return 0;
  return Math.round((city.pop / city.county.pop) * 100);
}

/**
 * Real population change since the 2020 census base, as a rounded percent.
 * Null when there's no 2020 figure or the change is inside the noise floor —
 * a 0.4% move on a town of 1,100 is not a trend worth a sentence.
 */
export function growthSince2020(
  city: CityRecord
): { pct: number; direction: "grown" | "shrunk" } | null {
  if (!city.pop2020 || city.pop2020 < 200) return null;
  const pct = ((city.pop - city.pop2020) / city.pop2020) * 100;
  if (Math.abs(pct) < 1.5) return null;
  return { pct: Math.round(Math.abs(pct)), direction: pct > 0 ? "grown" : "shrunk" };
}

/** "1,234" */
export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
