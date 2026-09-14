import { siteConfig } from "@/site.config";
import { getAllStates } from "@/lib/states";

/**
 * A real sitemap index at /sitemap-index.xml.
 *
 * Next's generateSitemaps produces the 51 per-state shards but no index tying
 * them together, so until now the only way to discover them was the Sitemap:
 * lines in robots.txt. Google honours those, but an index means ONE submission
 * in Search Console covers all 13,548 URLs and gives per-shard coverage
 * reporting instead of a single aggregate number.
 */
export const dynamic = "force-static";

export function GET() {
  const base = siteConfig.brand.domain;
  const now = new Date().toISOString();

  const maps = [
    `${base}/sitemap.xml`,
    ...getAllStates().map((s) => `${base}/locations/sitemap/${s.slug}.xml`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${maps
  .map((loc) => `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`)
  .join("\n")}
</sitemapindex>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
