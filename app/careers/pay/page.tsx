import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { payBands, hasPayData } from "@/lib/careers";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * RBT and BCBA pay — the honest version.
 *
 * Competitors publish "the average RBT salary is $X" pages scraped from
 * aggregator data. We publish the thing that actually decides your income:
 * the gap between your hourly rate and your paid hours. No figure appears on
 * this page unless it's loaded into lib/careers.ts with a source and a date.
 */

export const metadata: Metadata = {
  title: "RBT & BCBA Pay: How the Number Actually Works",
  description:
    "Why the hourly rate in an ABA job ad isn't what you take home: billable vs paid hours, cancellations, drive time, and how to compare two offers properly.",
  alternates: { canonical: "/careers/pay/" },
};

const url = `${siteConfig.brand.domain}/careers/pay/`;

const faq: AccordionItem[] = [
  {
    title: "Why is ABA pay quoted hourly instead of as a salary?",
    body: (
      <p>
        Because most direct therapy is billed to insurance in units of time
        that a client actually receives. When a session cancels, the visit
        wasn&rsquo;t delivered and can&rsquo;t be billed — so employers that
        pay strictly per delivered hour pass that risk to you. Employers who
        offer guaranteed hours are absorbing it themselves, which is worth real
        money.
      </p>
    ),
  },
  {
    title: "What are guaranteed hours and why do they matter so much?",
    body: (
      <p>
        A guarantee means you&rsquo;re paid for a set number of hours a week
        whether or not clients cancel. Without one, a slow February can cut
        your income by a fifth while your rent stays the same. When you compare
        two offers, the guarantee is often worth more than the difference in
        the hourly rate — and it&rsquo;s the first thing to ask about, not the
        last.
      </p>
    ),
  },
  {
    title: "Should I be paid for drive time and documentation?",
    body: (
      <p>
        Between-client travel during your workday and required documentation
        are work, and wage-and-hour law generally treats compensable time as
        compensable regardless of whether it&rsquo;s billable to a payer. Some
        employers pay a lower &ldquo;non-billable&rdquo; rate for it, which is
        legal and common; some quietly expect it for free, which is neither
        okay nor a good sign about the rest of the operation. Ask exactly how
        drive time, notes, and required meetings are paid, and get the answer
        in writing.
      </p>
    ),
  },
  {
    title: "Does certification automatically raise my pay?",
    body: (
      <p>
        Certification is the entry ticket, not a raise. The real jumps come
        from experience, from taking on responsibility a plain technician
        role doesn&rsquo;t carry, and above all from the next credential. In
        this field the largest income change most people ever see is BCBA
        certification — which is why how an employer handles your{" "}
        <Link
          href="/careers/bcba/supervision/"
          className="font-semibold text-garden underline underline-offset-4"
        >
          supervised fieldwork
        </Link>{" "}
        is a compensation question, not a perk.
      </p>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: [
    {
      q: "Why is ABA pay quoted hourly instead of as a salary?",
      a: "Direct therapy is billed to payers for time actually delivered. When a session cancels it cannot be billed, so employers paying strictly per delivered hour pass that risk to the employee. Guaranteed hours mean the employer absorbs it instead.",
    },
    {
      q: "What are guaranteed hours in an ABA job?",
      a: "A guarantee means you are paid for a set number of hours per week regardless of client cancellations. It is often worth more than a higher hourly rate without one.",
    },
    {
      q: "Should RBTs be paid for drive time and documentation?",
      a: "Between-client travel during the workday and required documentation are work. Some employers pay a lower non-billable rate for them, which is common; expecting them unpaid is not acceptable. Ask how they are paid and get it in writing.",
    },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Careers",
      item: `${siteConfig.brand.domain}/careers/`,
    },
    { "@type": "ListItem", position: 2, name: "How pay works", item: url },
  ],
};

export default function CareersPayPage() {
  const rbtBands = payBands.filter((b) => b.role === "RBT");
  const bcbaBands = payBands.filter((b) => b.role === "BCBA");

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/careers/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Careers
            </Link>{" "}
            / How pay works
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            The rate in the ad is not the number in your account.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Two ABA jobs can advertise the same hourly rate and pay you
            thousands of dollars apart over a year. The difference is almost
            never the rate — it&rsquo;s how many hours you actually get paid
            for. Here&rsquo;s how to read an offer properly.
          </p>
        </div>
      </section>

      {/* ───────────────── THE GAP ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="gap-heading"
      >
        <h2 id="gap-heading" className="display display-h2 max-w-3xl">
          Where the money leaks out
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Five things stand between an advertised rate and your paycheck. Ask
          about every one of them before you accept anything.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Cancellations",
              d: "Kids get sick. Families travel. If you're only paid for delivered sessions, every cancellation is money gone. Ask what percentage of scheduled hours their technicians actually worked last quarter — a good employer knows the number.",
            },
            {
              t: "Guaranteed hours",
              d: "The single most valuable clause in an ABA offer. Paid for 30 hours whether or not the week cooperates beats a higher rate on a schedule that keeps collapsing.",
            },
            {
              t: "Drive time and mileage",
              d: "In-home routes can eat an hour a day. Ask whether between-client travel is paid, at what rate, and whether mileage is reimbursed on top.",
            },
            {
              t: "Documentation and meetings",
              d: "Session notes, supervision, team meetings, and training are all real time. Ask whether they're paid at your full rate, a lower non-billable rate, or — the wrong answer — not at all.",
            },
            {
              t: "The benefits threshold",
              d: "Health coverage, PTO, and retirement usually kick in at an hours-per-week line. A schedule that hovers just under it is a pay cut that never appears on the offer letter.",
            },
            {
              t: "The credential ladder",
              d: "If you intend to become a BCBA, an employer's supervision structure is worth more than a couple of dollars an hour. Getting there a year sooner dwarfs the difference.",
            },
          ].map((c, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach"];
            return (
              <div key={c.t} className={`field-card ${tints[i % 3]} p-6`}>
                <h3 className="display display-h3">{c.t}</h3>
                <p className="mt-2 text-spruce-soft">{c.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────────────── HOW TO COMPARE TWO OFFERS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="compare-heading"
      >
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="compare-heading" className="display display-h2">
            Do this math before you decide
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Use your own numbers. It takes five minutes and it changes people&rsquo;s
            minds regularly.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              {
                t: "Start with paid hours, not scheduled hours",
                d: "Take the hours they'll actually pay you in a typical week — guaranteed hours if there's a guarantee, otherwise the realistic number after cancellations, which is always lower than the number in the job ad.",
              },
              {
                t: "Add the paid non-billable time",
                d: "Drive time, documentation, meetings, and supervision, at whatever rate each is paid. If any of it is unpaid, it doesn't add income — but it still costs you hours you can't work elsewhere.",
              },
              {
                t: "Multiply out to a year, then subtract the unpaid gaps",
                d: "School-year-only caseloads, holiday closures, and the weeks between clients are real. Annualize honestly rather than multiplying a good week by 52.",
              },
              {
                t: "Add the value of what you don't pay for",
                d: "Employer-covered certification, supervision toward a credential, health coverage, and mileage are all income you don't get taxed on the same way. If one employer's supervision gets you certified a year earlier, put a number on that year.",
              },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="display shrink-0 text-3xl text-garden">
                  {i + 1}
                </span>
                <div>
                  <h3 className="display display-h3">{s.t}</h3>
                  <p className="mt-1 text-spruce-soft">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────── PAY BANDS (data-driven, honest empty state) ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="bands-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="bands-heading" className="display display-h2">
            Pay by state
          </h2>

          {hasPayData("RBT") || hasPayData("BCBA") ? (
            <div className="mt-6 space-y-8">
              {[
                { label: "RBT", bands: rbtBands },
                { label: "BCBA", bands: bcbaBands },
              ]
                .filter((g) => g.bands.length > 0)
                .map((g) => (
                  <div key={g.label}>
                    <h3 className="display display-h3">{g.label}</h3>
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full min-w-[36rem] border-collapse text-left">
                        <thead>
                          <tr className="border-b-2 border-spruce/20">
                            <th className="py-2 pr-4 font-bold">State</th>
                            <th className="py-2 pr-4 font-bold">Low</th>
                            <th className="py-2 pr-4 font-bold">Median</th>
                            <th className="py-2 pr-4 font-bold">High</th>
                            <th className="py-2 font-bold">Source</th>
                          </tr>
                        </thead>
                        <tbody>
                          {g.bands.map((b) => (
                            <tr
                              key={`${b.role}-${b.state}`}
                              className="border-b border-spruce/10"
                            >
                              <td className="py-2 pr-4 font-semibold">
                                {b.state}
                              </td>
                              <td className="py-2 pr-4">
                                ${b.low.toLocaleString()}/{b.unit}
                              </td>
                              <td className="py-2 pr-4">
                                ${b.median.toLocaleString()}/{b.unit}
                              </td>
                              <td className="py-2 pr-4">
                                ${b.high.toLocaleString()}/{b.unit}
                              </td>
                              <td className="py-2 text-sm text-spruce-soft">
                                {b.source} · {b.asOf}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl bg-white/80 p-6">
              {/* TODO(pay-data): load sourced bands into lib/careers.ts and this
                  section fills itself in, sources and dates included. */}
              <p className="text-lg text-spruce-soft">
                We haven&rsquo;t published state-by-state pay tables yet, and we
                aren&rsquo;t going to guess. Most of the &ldquo;average
                salary&rdquo; numbers you&rsquo;ll find for this field are
                scraped from self-reported aggregator data, mixed across roles
                and settings, and years out of date — which is exactly why two
                sites can be $8 an hour apart about the same job.
              </p>
              <p className="mt-3 text-lg text-spruce-soft">
                What we&rsquo;ll do instead: tell you a real range for your
                market, on the phone, in the first conversation. Ask us
                directly and we&rsquo;ll answer directly.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Pay%20range%20question`}
                className="btn btn-primary mt-5"
              >
                Ask for a real range
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20"
        aria-labelledby="pay-faq-heading"
      >
        <h2 id="pay-faq-heading" className="display display-h2">
          Pay questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Ask us the awkward questions.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Guarantees, drive time, what happens in a slow week. If an
              employer won&rsquo;t answer those plainly, that is the answer.
            </p>
          </div>
          <Link href="/careers/openings/" className="btn btn-marigold shrink-0">
            See how to apply
          </Link>
        </div>
      </section>
    </>
  );
}
