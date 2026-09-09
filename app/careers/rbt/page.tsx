import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

export const metadata: Metadata = {
  title: "How to Become an RBT — Guide & Salary",
  description:
    "The Registered Behavior Technician guide: what RBTs do, the 4 certification steps, how long it takes, and how pay works.",
  alternates: { canonical: "/careers/rbt/" },
};

const faq: AccordionItem[] = [
  {
    title: "Do I need a college degree to become an RBT?",
    body: (
      <p>
        No. The requirements are: be at least 18, have a high school diploma or
        equivalent, pass a background check, finish the 40-hour training,
        complete a competency assessment, and pass the RBT exam.
      </p>
    ),
  },
  {
    title: "How long does RBT certification take?",
    body: (
      <p>
        Many people finish in four to eight weeks: the 40-hour training can be
        done in one to two weeks, then the competency assessment and exam
        scheduling take a few more. Working for a provider like us during the
        process means you&rsquo;re earning while you certify.
      </p>
    ),
  },
  {
    title: "What does an RBT actually do all day?",
    body: (
      <p>
        You work one-on-one with a child, running teaching programs and play-based
        sessions a BCBA designed — building communication, daily-living
        skills, and easier ways through hard moments. You collect data as you
        go, and that data steers the plan.
      </p>
    ),
  },
  {
    title: "Is RBT a dead-end job?",
    body: (
      <p>
        The opposite — it&rsquo;s the standard first rung of a clinical career.
        RBT experience counts toward the supervised fieldwork you need to
        become a BCaBA or BCBA, and we structure supervision so your job hours
        move you forward.
      </p>
    ),
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteConfig.brand.domain}/careers/rbt/#breadcrumbs`,
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
      name: "How to become an RBT",
      item: `${siteConfig.brand.domain}/careers/rbt/`,
    },
  ],
};

export default function RbtPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/careers/" className="underline underline-offset-4 hover:text-garden">
              Careers
            </Link>{" "}
            / RBT
          </nav>
          <h1 className="display display-hero mt-3">
            Become an RBT. Start a career that counts.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Registered Behavior Technician is the fastest legitimate door into
            a clinical career: no degree required, certification in weeks, and
            work where you watch a child gain skills you helped build.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/contact/"
              className="btn btn-primary"
            >
              Apply in 5 minutes
            </a>
            <Link href="/careers/rbt/certification/" className="btn btn-outline">
              The full certification path
            </Link>
            <Link href="/careers/bcba/" className="btn btn-outline">
              Already past RBT? The BCBA path
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── CERTIFICATION STEPS ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="cert-heading"
      >
        <h2 id="cert-heading" className="display display-h2">
          RBT certification in four steps
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "1",
              t: "40-hour training",
              d: "An online or in-person course covering the RBT Task List — ethics, measurement, skill acquisition, behavior reduction. Doable in 1–2 focused weeks.",
            },
            {
              n: "2",
              t: "Competency assessment",
              d: "A BCBA watches you demonstrate the core skills, live or by video. When you work with us, your supervisor runs this with you — it's part of the job, not an extra hurdle.",
            },
            {
              n: "3",
              t: "Apply + background check",
              d: "Submit your application to the certification board with your training certificate and assessment, and clear a standard background check.",
            },
            {
              n: "4",
              t: "Pass the RBT exam",
              d: "85 questions at a testing center or online. Pass it and you're a Registered Behavior Technician — credentialed and hire-ready nationwide.",
            },
          ].map((step, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach", "bg-mint"];
            return (
              <li key={step.n} className={`field-card ${tints[i]} p-6`}>
                <p className="display text-3xl text-garden">{step.n}</p>
                <h3 className="display display-h3 mt-1">{step.t}</h3>
                <p className="mt-2 text-spruce-soft">{step.d}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ─────────────── SALARY GUIDE STRUCTURE ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="salary-heading">
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="salary-heading" className="display display-h2">
            How RBT pay works
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">What moves the number</h3>
              <p className="mt-2 text-spruce-soft">
                Four things, in order: your state and metro, your experience,
                your setting (in-home routes often pay differently than
                centers), and your hours mix. Certification itself is the entry
                ticket — experience compounds from there.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">Typical pay in your state</h3>
              <p className="mt-2 text-spruce-soft">
                {/* TODO(salary-data): insert current, sourced RBT pay ranges
                    (BLS / verified market data) per state before launch —
                    no invented figures ship on this page. */}
                We&rsquo;re assembling verified, state-by-state pay data for
                this section — no made-up numbers, ever. In the meantime,{" "}
                <Link
                  href="/careers/pay/"
                  className="font-semibold text-garden underline underline-offset-4"
                >
                  read how ABA pay actually works
                </Link>{" "}
                — the hourly rate matters far less than how many hours you get
                paid for.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">The raise built into the job</h3>
              <p className="mt-2 text-spruce-soft">
                RBT hours count toward BCaBA and BCBA fieldwork requirements.
                The biggest raise in this field isn&rsquo;t a negotiation —
                it&rsquo;s the next credential, and your work here moves you
                toward it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ + APPLY ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="rbt-faq-heading"
      >
        <h2 id="rbt-faq-heading" className="display display-h2">
          RBT questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Start certified. Start here.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Tell us your state and where you are in the process — even if
              that&rsquo;s &ldquo;step zero.&rdquo;
            </p>
          </div>
          <a
            href="/contact/"
            className="btn btn-marigold shrink-0"
          >
            Apply in 5 minutes
          </a>
        </div>
      </section>
    </>
  );
}
