import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllStates } from "@/lib/states";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.brand.domain;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    // Root sitemap (core + cost pages) plus one location shard per state.
    sitemap: [
      `${base}/sitemap.xml`,
      ...getAllStates().map(
        (s) => `${base}/locations/sitemap/${s.slug}.xml`
      ),
    ],
  };
}
