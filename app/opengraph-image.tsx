import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

/**
 * Default social card for every route.
 *
 * Until now no page on the site emitted og:image, so all 13,550 URLs shared
 * as a bare text card. A segment-level opengraph-image is inherited by every
 * nested route, so this one file covers the whole site; individual segments
 * can still override it.
 *
 * Drawn rather than photographed: a photo of somebody's child is the wrong
 * thing to attach to an arbitrary shared link, and the brand mark travels
 * better at thumbnail size anyway.
 */

export const alt = `${siteConfig.brand.name} — ABA therapy for children in all 50 states`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CORAL = "#F04E23";
const INK = "#16303A";
const CREAM = "#FFF9F2";
const TEAL = "#DFF0EE";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          padding: 72,
        }}
      >
        {/* soft field block, echoing the site's pastel sections */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: TEAL,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: CORAL,
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 800,
              color: INK,
              letterSpacing: -0.5,
            }}
          >
            <span>{siteConfig.brand.shortName}</span>
            <span style={{ color: CORAL, marginLeft: 8 }}>ABA</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: CORAL,
              lineHeight: 1.02,
              letterSpacing: -1.5,
              maxWidth: 940,
              textTransform: "uppercase",
            }}
          >
            ABA therapy for kids, backup for parents.
          </div>
          <div style={{ fontSize: 30, color: INK, marginTop: 26, maxWidth: 860 }}>
            At home, at school, in daycare, or online — in all 50 states and DC.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, zIndex: 1 }}>
          {["Medicaid & most plans", "All 50 states", "A real person answers"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 24,
                color: INK,
                background: "#fff",
                border: "2px solid rgba(22,48,58,0.12)",
                borderRadius: 9999,
                padding: "12px 26px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
