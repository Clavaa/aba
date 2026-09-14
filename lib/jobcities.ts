/**
 * Cities we publish RBT/behavior-technician job pages for.
 *
 * Driven by the same Census data as the location pages, and deliberately a
 * SHORT list: the careers-geo keyword cluster is real ("rbt jobs houston",
 * "rbt jobs denver" and ~20 siblings, each ~500/mo) but it is a metro-level
 * query. Publishing one per small town would be doorway pages with nothing
 * local to say.
 */
import { getCitiesForState, type CityRecord } from "@/lib/cities";
import { getAllStates } from "@/lib/states";

export type JobCity = CityRecord & { jobSlug: string };

let cache: JobCity[] | null = null;

/** The largest places nationally, which is where hiring demand actually is. */
export function getJobCities(limit = 150): JobCity[] {
  if (cache) return cache.slice(0, limit);
  const all: CityRecord[] = [];
  for (const s of getAllStates()) all.push(...getCitiesForState(s.slug));
  all.sort((a, b) => b.pop - a.pop);

  const seen = new Set<string>();
  const out: JobCity[] = [];
  for (const c of all) {
    // slug carries the state so Springfield MO and Springfield IL both exist
    const jobSlug = `${c.slug}-${c.stateAbbrev.toLowerCase()}`;
    if (seen.has(jobSlug)) continue;
    seen.add(jobSlug);
    out.push({ ...c, jobSlug });
  }
  cache = out;
  return out.slice(0, limit);
}

export function getJobCity(jobSlug: string): JobCity | undefined {
  return getJobCities(400).find((c) => c.jobSlug === jobSlug);
}
