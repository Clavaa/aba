import type { NextConfig } from "next";
import cityRedirects from "./lib/city-redirects.json";

const nextConfig: NextConfig = {
  /**
   * All marketing pages are fully static (generateStaticParams everywhere).
   * `output: "export"` is intentionally NOT set because /api/lead needs a
   * server runtime — everything else prerenders at build time.
   */
  trailingSlash: true,

  /**
   * 322 city URLs moved when the Census name cleaner was fixed: a double
   * suffix strip had been turning "Oklahoma City city" into "Oklahoma", so
   * those pages were live at the wrong slug. These 301s point the old URLs at
   * the corrected ones. See cleanPlaceName() in lib/cities.ts.
   */
  async redirects() {
    return [
      /**
       * One hostname, not two. Both www and the apex were serving 200, and
       * Search Console shows Google indexing URLs under both — the canonical
       * tag pointed at the apex from either host, which limits the damage,
       * but a 301 removes the ambiguity instead of relying on Google to
       * resolve it. Kept here rather than in the Vercel dashboard so it is
       * reviewable and travels with the code.
       */
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.sproutwellaba.com" }],
        destination: "https://sproutwellaba.com/:path*",
        permanent: true,
      },
      ...cityRedirects,
    ];
  },
};

export default nextConfig;
