import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllStates, getState } from "@/lib/states";
import { getCountiesForState } from "@/lib/counties";
import { getCitiesForCounty } from "@/lib/cities";

/**
 * Sharded location sitemaps — one per state (Next 16 `generateSitemaps`),
 * served at /locations/sitemap/{state-slug}.xml. Each shard carries the
 * state page plus all of its county pages, so no single sitemap file is
 * ever huge and each state's URL set ships in one crawlable unit.
 *
 * Core (non-location) pages stay in the root app/sitemap.ts.
 */
export async function generateSitemaps(): Promise<{ id: string }[]> {
  return getAllStates().map((s) => ({ id: s.slug }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const base = siteConfig.brand.domain;
  const state = getState(id);
  if (!state) return [];

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/locations/${state.slug}/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  for (const county of getCountiesForState(state.slug)) {
    entries.push({
      url: `${base}/locations/${state.slug}/${county.slug}/`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
    for (const city of getCitiesForCounty(state.slug, county.slug)) {
      entries.push({
        url: `${base}/locations/${state.slug}/${county.slug}/${city.slug}/`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
