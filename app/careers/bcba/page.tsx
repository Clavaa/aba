import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

export const metadata: Metadata = {
  title: "BCBA Jobs & Salary Guide",
  description:
    "BCBA roles in all 50 states with reasonable caseloads and real clinical autonomy — plus an honest guide to certification, salary factors, and career paths.",
  alternates: { canonical: "/careers/bcba/" },
};

const faq: AccordionItem[] = [
  {
    title: "What does it take to become a BCBA?",
    body: (
      <p>
        A qualifying graduate degree, behavior-analytic coursework that meets
        the certification board&rsquo;s requirements, supervised fieldwork
        hours, and a passing score on the BCBA exam. Many states then add
        their own license on top — our state pages note which ones.
      </p>
    ),
  },
  {
    title: "What's the caseload like here?",
    body: (
      <p>
        Sized so you can actually do clinical work — assessment, plan design,
        supervision, and parent coaching — instead of living in billing
        software. We staff intake and authorization support so paperwork
        doesn&rsquo;t eat your calendar.
      </p>
    ),
  },
  {
    title: "Can I supervise fieldwork candidates?",
    body: (
      <p>
        Yes, and we hope you will. Growing RBTs into analysts is how this field
        gets better — supervision time is scheduled and counted as real work,
        not squeezed into your evenings.
      </p>
    ),
  },
  {
    title: "Remote or in person?",
    body: (
      <p>
        Both exist here. Telehealth supervision and parent coaching are part of
        our model, and in-home and center roles are open across all 50 states —
        tell us what your life needs.
      </p>
    ),
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteConfig.brand.domain}/careers/bcba/#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Careers",
      item: `${siteConfig.brand.domain}/careers/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "BCBA jobs",
      item: `${siteConfig.brand.domain}/careers/bcba/`,
    },
  ],
};

export default function BcbaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-peach p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/careers/" className="underline underline-offset-4 hover:text-garden">
              Careers
            </Link>{" "}
            / BCBA
          </nav>
          <h1 className="display display-hero mt-3">
            BCBAs: do the work you trained for.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            You didn&rsquo;t earn a certification to drown in unbillable admin.
            We build BCBA roles around clinical quality: reasonable caseloads,
            protected supervision time, and a support team that handles the
            insurance machine.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.contact.email}?subject=BCBA%20role%20—%20I%27m%20interested`}
              className="btn btn-primary"
            >
              Talk to our clinical team
            </a>
            <Link href="/careers/rbt/" className="btn btn-outline">
              Not certified yet? Start as an RBT
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── SALARY GUIDE STRUCTURE ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="bcba-salary-heading"
      >
        <h2 id="bcba-salary-heading" className="display display-h2">
          The honest BCBA salary guide
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">What sets BCBA pay</h3>
            <p className="mt-3 text-spruce-soft">
              State and metro first, then years certified, setting, caseload
              model, and whether a role includes clinical leadership. Licensure
              states with fewer BCBAs per family tend to pay a premium —
              exactly the markets where we&rsquo;re growing.
            </p>
          </div>
          <div className="field-card bg-butter p-6 sm:p-8">
            <h3 className="display display-h3">Ranges by state</h3>
            <p className="mt-3 text-spruce-soft">
              {/* TODO(salary-data): insert current, sourced BCBA salary ranges
                  (BLS / verified market data) per state before launch —
                  no invented figures ship on this page. */}
              This section will publish verified state-by-state salary data —
              we don&rsquo;t print numbers we can&rsquo;t stand behind. Want a
              real quote for your market today? Ask us and we&rsquo;ll give you
              the band in the first conversation, and read{" "}
              <Link
                href="/careers/pay/"
                className="font-semibold text-garden underline underline-offset-4"
              >
                how ABA pay actually works
              </Link>{" "}
              before you compare two offers.
            </p>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">Beyond base salary</h3>
            <p className="mt-3 text-spruce-soft">
              Weigh the whole offer: caseload size, admin support, supervision
              expectations, CEU budget, and schedule control. A bigger number
              attached to an unmanageable caseload is a pay cut in disguise.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ + APPLY ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="bcba-faq-heading">
        <h2 id="bcba-faq-heading" className="display display-h2">
          Asked by every BCBA we interview
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 pb-16 sm:py-20 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Bring your clinical standards. We&rsquo;ll match them.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              A conversation with our clinical leadership — not a recruiter
              script.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.contact.email}?subject=BCBA%20role%20—%20I%27m%20interested`}
            className="btn btn-marigold shrink-0"
          >
            Talk to our clinical team
          </a>
        </div>
      </section>
    </>
  );
}
