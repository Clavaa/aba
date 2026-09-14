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
    return cityRedirects;
  },
};

export default nextConfig;
