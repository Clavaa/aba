import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { siteConfig, isProvisionalHost } from "@/site.config";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyCallBar from "@/components/StickyCallBar";
import JsonLd from "@/components/JsonLd";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["wdth", "opsz"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.domain),
  title: {
    default: `ABA Therapy for Children in All 50 States | ${siteConfig.brand.name}`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description:
    "In-home, in-center, school, and telehealth ABA therapy for kids with autism — covered by Medicaid and most insurance plans in all 50 states and DC.",
  openGraph: {
    siteName: siteConfig.brand.name,
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  // Provisional host → keep it out of the index until the real domain is live.
  ...(isProvisionalHost
    ? { robots: { index: false, follow: false } }
    : {}),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${siteConfig.brand.domain}/#organization`,
  name: siteConfig.brand.name,
  url: `${siteConfig.brand.domain}/`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  medicalSpecialty: "Psychiatric",
  description:
    "Applied Behavior Analysis (ABA) therapy provider for children with autism, serving families in all 50 U.S. states and the District of Columbia.",
  areaServed: { "@type": "Country", name: "United States" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="pb-20 md:pb-0">
        <JsonLd data={organizationJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-marigold focus:px-4 focus:py-2 focus:font-bold focus:text-spruce"
        >
          Skip to content
        </a>
        <TopBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyCallBar />
      </body>
    </html>
  );
}
