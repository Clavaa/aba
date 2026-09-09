import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * Supervised fieldwork — the bridge page between the RBT hub and the BCBA
 * hub, and the single most useful page you can write for an RBT deciding
 * where to work. It is also, not coincidentally, the best recruiting page on
 * the site: people choose employers over exactly these questions.
 *
 * TODO(pre-launch): verify hour totals, supervision percentages, the
 * restricted/unrestricted split, and contact requirements against the current
 * BACB fieldwork standards. The board has revised these before and has
 * announced future changes.
 */

export const metadata: Metadata = {
  title: "BCBA Supervised Fieldwork Hours, Explained",
  description:
    "How supervised fieldwork toward BCBA certification works: the hour totals, restricted vs unrestricted activities, supervision contacts, and what to ask an employer before you sign.",
  alternates: { canonical: "/careers/bcba/supervision/" },
};

const url = `${siteConfig.brand.domain}/careers/bcba/supervision/`;

const faq: AccordionItem[] = [
  {
    title: "Do my RBT hours count toward BCBA fieldwork?",
    body: (
      <p>
        Time spent doing qualifying activities under a qualified supervisor,
        documented properly, counts. Time spent doing the same work without a
        supervision agreement in place counts for nothing — and you cannot go
        back and retroactively make it count. That&rsquo;s the single most
        expensive mistake in this field: people work for a year, then discover
        none of it was ever being logged.
      </p>
    ),
  },
  {
    title: "What's the difference between restricted and unrestricted hours?",
    body: (
      <p>
        Restricted activities are direct implementation — essentially the RBT
        work. Unrestricted activities are the analyst work: assessment, program
        design, writing plans, training caregivers and staff, analyzing data.
        Only a limited share of your total may be restricted, which means a job
        that keeps you in direct sessions all day will not, on its own, get you
        to a BCBA. Ask how you&rsquo;ll get unrestricted hours before you take
        the role.
      </p>
    ),
  },
  {
    title: "How much supervision do I actually get?",
    body: (
      <p>
        The board sets a minimum share of your fieldwork hours that must be
        supervised each month, plus a required number of contacts with your
        supervisor, at least some of them individual rather than group. Those
        are floors, not targets. A supervisor who hits the floor exactly and
        schedules everything at 7pm on the last day of the month is telling you
        something.
      </p>
    ),
  },
  {
    title: "Can I be supervised by someone outside my employer?",
    body: (
      <p>
        Often yes, and some candidates pay an outside supervisor. It works, but
        it&rsquo;s expensive and it disconnects your supervision from your
        actual caseload. Employer-provided supervision that&rsquo;s genuinely
        good is worth real money — frequently more than a dollar or two an hour
        of difference in pay.
      </p>
    ),
  },
  {
    title: "What happens if my supervisor leaves?",
    body: (
      <p>
        Your accrued, properly documented hours stay yours. What you need is a
        new supervision agreement in place quickly so you don&rsquo;t
        accumulate unclaimable time in the gap. Ask any employer what their
        plan is when a supervisor leaves — the ones who have thought about it
        will answer immediately.
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
      q: "Do RBT hours count toward BCBA supervised fieldwork?",
      a: "Qualifying activities performed under a qualified supervisor with a supervision agreement in place and documented properly count. Work done without an agreement in place does not count and cannot be credited retroactively.",
    },
    {
      q: "What is the difference between restricted and unrestricted fieldwork hours?",
      a: "Restricted activities are direct implementation of behavior plans. Unrestricted activities are analyst-level work such as assessment, program design, caregiver and staff training, and data analysis. Only a limited portion of total fieldwork may be restricted.",
    },
    {
      q: "Can I use a supervisor outside my employer?",
      a: "Often yes, and some candidates pay for outside supervision. It works but costs money and separates supervision from your actual caseload.",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "BCBA",
      item: `${siteConfig.brand.domain}/careers/bcba/`,
    },
    { "@type": "ListItem", position: 3, name: "Supervised fieldwork", item: url },
  ],
};

const asks = [
  "Who would my supervisor be, and how many candidates are they currently supervising?",
  "How do I get unrestricted hours here — specifically, which activities and starting when?",
  "Is supervision scheduled on the clock, or expected on my own time?",
  "Is individual supervision actually individual, or is it a group call that counts?",
  "Who covers the cost of supervision, and is any of it deducted from my pay?",
  "What happens to my hours if my supervisor leaves or my caseload changes?",
  "Can I see the documentation template you use before I start?",
];

export default function SupervisionPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/careers/bcba/"
              className="underline underline-offset-4 hover:text-garden"
            >
              BCBA
            </Link>{" "}
            / Supervised fieldwork
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            The hours are the hard part. Not the exam.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Almost nobody fails out of the BCBA path on the test. They stall on
            fieldwork — hours that didn&rsquo;t count, a supervisor who
            vanished, a job that never let them do analyst work. Here is how
            the system works and what to ask before you take a job that
            promises supervision.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/contact/"
              className="btn btn-primary"
            >
              Ask how supervision works here
            </a>
            <Link href="/careers/rbt/" className="btn btn-outline">
              Still an RBT? Start here
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="how-heading"
      >
        <h2 id="how-heading" className="display display-h2">
          How fieldwork actually works
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">A total number of hours</h3>
            <p className="mt-3 text-spruce-soft">
              You accrue a set total of supervised fieldwork hours alongside
              your graduate coursework. There is a standard track and a more
              concentrated track with a lower total and heavier supervision
              requirements. Your program and supervisor will tell you which
              you&rsquo;re on — know the answer, because the monthly rules
              differ.
            </p>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">A cap on restricted work</h3>
            <p className="mt-3 text-spruce-soft">
              Only part of those hours can be direct implementation. The rest
              has to be analyst-level work. This is the rule that decides
              whether a job moves your career or just pays you: an employer who
              needs bodies in sessions has a structural reason to keep you in
              restricted hours.
            </p>
          </div>
          <div className="field-card bg-butter p-6 sm:p-8">
            <h3 className="display display-h3">Supervision, every month</h3>
            <p className="mt-3 text-spruce-soft">
              A minimum share of your hours each month must be supervised, with
              a required number of contacts, including individual ones. Miss a
              month&rsquo;s requirements and that month&rsquo;s hours are at
              risk — this is tracked month by month, not averaged over a year.
            </p>
          </div>
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">Documentation, contemporaneous</h3>
            <p className="mt-3 text-spruce-soft">
              Hours are logged as you go, on the board&rsquo;s forms, signed by
              your supervisor. Reconstructing six months of logs from memory is
              both miserable and a problem if you&rsquo;re ever audited. Keep
              your own copies — not just your employer&rsquo;s.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          {/* TODO(pre-launch): verify totals, percentages and contact counts. */}
          Hour totals, percentages, and contact requirements are set by the
          Behavior Analyst Certification Board and have changed more than once.
          Confirm the current standards at{" "}
          <a
            href="https://www.bacb.com/"
            rel="noopener nofollow"
            className="font-semibold text-garden underline underline-offset-4"
          >
            bacb.com
          </a>{" "}
          before making decisions based on any number you read anywhere.
        </p>
      </section>

      {/* ───────────────── QUESTIONS TO ASK ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="asks-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="asks-heading" className="display display-h2">
            Seven questions to ask before you take the job
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Ask them of us too. An employer who gets uncomfortable at question
            three is answering the whole list.
          </p>
          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {asks.map((q, i) => (
              <li
                key={q}
                className="flex gap-3 rounded-3xl border-2 border-spruce/15 p-5"
              >
                <span className="display shrink-0 text-2xl text-garden">
                  {i + 1}
                </span>
                <span className="text-spruce-soft">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="sup-faq-heading"
      >
        <h2 id="sup-faq-heading" className="display display-h2">
          Fieldwork questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Working toward the credential?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Tell us where you are — coursework, hours accrued, what&rsquo;s
              blocking you — and we&rsquo;ll tell you honestly whether we can
              get you there faster than where you are now.
            </p>
          </div>
          <a
            href="/contact/"
            className="btn btn-marigold shrink-0"
          >
            Start the conversation
          </a>
        </div>
      </section>
    </>
  );
}
