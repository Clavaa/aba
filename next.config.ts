import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * All marketing pages are fully static (generateStaticParams everywhere).
   * `output: "export"` is intentionally NOT set because /api/lead needs a
   * server runtime — everything else prerenders at build time.
   */
  trailingSlash: true,
};

export default nextConfig;
