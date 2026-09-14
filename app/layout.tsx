import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { siteConfig, isProvisionalHost } from "@/site.config";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FooterSignup from "@/components/FooterSignup";
import StickyCallBar from "@/components/StickyCallBar";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { Suspense } from "react";
import type { FooterGroup, FooterLink } from "@/components/FooterSitemap";
import { getStateLinks } from "@/lib/states";
import { payers } from "@/lib/payers";

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
    "In-home, school-based, daycare, and telehealth ABA therapy for kids with autism — covered by Medicaid and most insurance plans in all 50 states and DC.",
  openGraph: {
    siteName: siteConfig.brand.name,
    type: "website",
    // Flat path on purpose — see app/og.png/route.tsx.
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.brand.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  medicalSpecialty: "Psychiatric",
  description:
    "Applied Behavior Analysis (ABA) therapy provider for children with autism, serving families in all 50 U.S. states and the District of Columbia.",
  areaServed: { "@type": "Country", name: "United States" },
};

/**
 * Footer sitemap data. Built here because lib/states.ts and lib/payers.ts read
 * the dataset from disk at build time and the footer itself is a client
 * component — these arrays are plain strings by the time they cross over.
 */
const footerGroups: FooterGroup[] = [
  {
    heading: "Where therapy happens",
    links: [
      /* Descriptive anchor text, not the short nav chips ("At home"): the
         footer is the main internal link surface for these pages. */
      { href: "/services/in-home/", label: "In-home ABA therapy" },
      { href: "/services/school/", label: "School-based ABA and IEP support" },
      { href: "/services/daycare/", label: "ABA therapy in daycare" },
      { href: "/services/telehealth/", label: "Telehealth and parent coaching" },
      { href: "/services/early-intervention/", label: "Early intervention ABA" },
      { href: "/services/", label: "Compare every setting" },
      { href: "/support-services/", label: "Support beyond ABA" },
      { href: "/getting-started/", label: "Check your coverage" },
    ],
  },
  {
    heading: "Guides for parents",
    links: [
      { href: "/resources/what-is-aba/", label: "What is ABA therapy?" },
      { href: "/resources/autism-levels/", label: "Autism levels 1, 2 and 3" },
      { href: "/resources/signs-of-autism-by-age/", label: "Signs of autism by age" },
      { href: "/resources/autism-therapy-types/", label: "Types of autism therapy" },
      { href: "/resources/positive-reinforcement/", label: "Positive reinforcement" },
      { href: "/resources/discrete-trial-training/", label: "Discrete trial training" },
      { href: "/resources/aba-therapy-examples/", label: "ABA therapy examples" },
      { href: "/resources/aba-therapy-for-adhd/", label: "ABA therapy for ADHD" },
      { href: "/resources/autism-resources-for-parents/", label: "Autism resources for parents" },
      { href: "/autism-evaluation/", label: "Getting an autism evaluation" },
      { href: "/autism-evaluation/m-chat/", label: "The M-CHAT screener" },
      { href: "/find-a-diagnostician/", label: "Find a diagnostician" },
    ],
  },
  {
    heading: "Insurance and cost",
    links: [
      { href: "/insurance/", label: "Insurance and Medicaid" },
      ...payers.map((p) => ({ href: `/insurance/${p.slug}/`, label: p.name })),
      { href: "/cost-of-aba-therapy/", label: "What ABA costs by state" },
      { href: "/faq/", label: "Questions families ask" },
    ],
  },
  {
    heading: "Careers in ABA",
    links: [
      { href: "/careers/", label: "Work with us" },
      { href: "/careers/openings/", label: "Open roles" },
      { href: "/careers/rbt/", label: "Become an RBT" },
      { href: "/careers/rbt/certification/", label: "RBT certification" },
      { href: "/careers/rbt/competency-assessment/", label: "RBT competency assessment" },
      { href: "/careers/bcba/", label: "BCBA careers" },
      { href: "/careers/bcba/supervision/", label: "BCBA supervision" },
      { href: "/careers/pay/", label: "How ABA pay works" },
      { href: "/about/", label: "About Sproutwell" },
      { href: "/about/leadership/", label: "Our leadership" },
      { href: "/events/", label: "Sensory-friendly events" },
      { href: "/contact/", label: "Contact us" },
    ],
  },
];

const footerStates: FooterLink[] = getStateLinks().map((st) => ({
  href: `/locations/${st.slug}/`,
  label: st.name,
}));

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
        <FooterSignup />
        <SiteFooter sitemapGroups={footerGroups} sitemapStates={footerStates} />
        <StickyCallBar />
        {/* useSearchParams needs a boundary or every page opts out of static
            rendering. The beacon renders nothing, so the fallback is null. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
