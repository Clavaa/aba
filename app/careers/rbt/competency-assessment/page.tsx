import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * The RBT Initial Competency Assessment — the step that stalls people, and
 * the one almost nobody writes a real page about.
 *
 * TODO(pre-launch): verify the assessment's structure, who may serve as an
 * assessor, and the renewal-assessment rules against the current BACB RBT
 * Handbook before publishing.
 */

export const metadata: Metadata = {
  title: "The RBT Competency Assessment, Explained",
  description:
    "What the RBT Initial Competency Assessment covers, who can administer it, how it's scored, what to expect on the day, and how the annual renewal assessment differs.",
  alternates: { canonical: "/careers/rbt/competency-assessment/" },
};

const url = `${siteConfig.brand.domain}/careers/rbt/competency-assessment/`;

const faq: AccordionItem[] = [
  {
    title: "Who is allowed to administer it?",
    body: (
      <p>
        A qualified assessor — in practice a certified behavior analyst who
        meets the board&rsquo;s requirements to conduct the assessment. You
        can&rsquo;t self-assess, a fellow RBT can&rsquo;t sign off on you, and
        an online course can&rsquo;t do it for you. This is why most people
        complete it through an employer.
      </p>
    ),
  },
  {
    title: "Can any of it be done over video?",
    body: (
      <p>
        Some tasks may be observed remotely and some must be demonstrated with
        a real client or a role-play partner in person, depending on the
        board&rsquo;s current rules and your assessor&rsquo;s judgment. Ask
        your assessor up front which tasks they intend to observe live, so
        nothing gets scheduled twice.
      </p>
    ),
  },
  {
    title: "What happens if I don't pass a task?",
    body: (
      <p>
        You practice it and get reassessed on that task. It isn&rsquo;t a
        one-shot exam and there&rsquo;s no failing grade attached to your
        record — the point is to confirm you can actually do the work, so a
        retry is a normal part of the process, not a black mark.
      </p>
    ),
  },
  {
    title: "How is this different from the renewal assessment?",
    body: (
      <p>
        The initial assessment establishes competence before you&rsquo;re
        certified. The renewal assessment happens each year with your
        supervisor and confirms you&rsquo;ve maintained it. Same idea, shorter
        conversation, and by then you&rsquo;re demonstrating on your own
        caseload.
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
      q: "Who can administer the RBT competency assessment?",
      a: "A qualified assessor — in practice a certified behavior analyst who meets the board's requirements. You cannot self-assess and another RBT cannot sign off on you, which is why most candidates complete it through an employer.",
    },
    {
      q: "What happens if I don't pass a task on the competency assessment?",
      a: "You practice that task and get reassessed on it. It is not a one-shot exam and a retry is a normal part of the process.",
    },
    {
      q: "How does the renewal competency assessment differ from the initial one?",
      a: "The initial assessment establishes competence before certification. The renewal assessment is completed annually with your supervisor to confirm you have maintained it, demonstrated on your own caseload.",
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
      name: "RBT",
      item: `${siteConfig.brand.domain}/careers/rbt/`,
    },
    { "@type": "ListItem", position: 3, name: "Competency assessment", item: url },
  ],
};

const domains = [
  {
    t: "Measurement",
    d: "Recording data the way the plan asks for it — counting, timing, and interval recording — and doing it accurately while a session is actually happening.",
  },
  {
    t: "Assessment support",
    d: "Running the pieces of an assessment a technician contributes to, including preference assessments that identify what a child will actually work for.",
  },
  {
    t: "Skill acquisition",
    d: "Teaching procedures: discrete trials, teaching in the natural environment, prompting and fading, chaining a multi-step routine, and generalizing a skill beyond the room it was taught in.",
  },
  {
    t: "Behavior reduction",
    d: "Implementing the behavior plan as written — the antecedent strategies, the replacement behavior, and what you do in the moment — plus describing the function of a behavior in plain terms.",
  },
  {
    t: "Documentation and reporting",
    d: "Session notes, objective description, mandatory reporting, and communicating with a supervisor about what changed.",
  },
  {
    t: "Professional conduct",
    d: "Scope of practice, responding to feedback, client dignity, and confidentiality. The ethics items are not filler; they are the ones that end careers when they go wrong.",
  },
];

export default function CompetencyAssessmentPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-peach p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/careers/rbt/"
              className="underline underline-offset-4 hover:text-garden"
            >
              RBT
            </Link>{" "}
            / Competency assessment
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            The step that isn&rsquo;t a test.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            The Initial Competency Assessment is where someone qualified
            watches you do the job and confirms you can do it. No essay, no
            multiple choice — you demonstrate, they observe. Here&rsquo;s
            what&rsquo;s on it and how to walk in ready.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/careers/rbt/certification/" className="btn btn-outline">
              ← The full certification path
            </Link>
            <a
              href="/contact/"
              className="btn btn-primary"
            >
              Ask us about getting assessed
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────── WHAT'S ON IT ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="domains-heading"
      >
        <h2 id="domains-heading" className="display display-h2">
          What you&rsquo;ll be asked to show
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          The assessment follows the board&rsquo;s task list, so nothing on it
          is a surprise if you&rsquo;ve done the 40-hour training. It spans
          roughly these areas:
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach"];
            return (
              <div key={d.t} className={`field-card ${tints[i % 3]} p-6`}>
                <h3 className="display display-h3">{d.t}</h3>
                <p className="mt-2 text-spruce-soft">{d.d}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          {/* TODO(pre-launch): confirm the current task-list structure. */}
          The exact task list and the rules for who may assess you are
          published by the Behavior Analyst Certification Board at{" "}
          <a
            href="https://www.bacb.com/"
            rel="noopener nofollow"
            className="font-semibold text-garden underline underline-offset-4"
          >
            bacb.com
          </a>
          , and they get revised. Work from the current handbook, not a blog
          post — including this one.
        </p>
      </section>

      {/* ───────────────── HOW TO WALK IN READY ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="ready-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="ready-heading" className="display display-h2">
            How to walk in ready
          </h2>
          <ol className="mt-6 space-y-4">
            {[
              {
                t: "Practice out loud, with a person",
                d: "Reading about prompting is not practicing prompting. Grab a friend, a sibling, anyone, and run the procedures until the words come out without you assembling them first.",
              },
              {
                t: "Know your definitions cold, then forget them",
                d: "You'll be asked to describe what you're doing while you do it. If you have to stop and search for the term, both halves fall apart. Say it enough times that it becomes ordinary speech.",
              },
              {
                t: "Ask which tasks are being observed, and in what order",
                d: "Assessors differ in sequence and in what they'll accept as a demonstration. Two minutes of questions beforehand removes most of the nerves.",
              },
              {
                t: "Treat feedback as the point",
                d: "Being corrected mid-assessment is not failing — it's the assessor doing their job. How you take feedback is itself one of the things being evaluated, and it's the single best predictor of whether you'll be good at this work.",
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

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="ca-faq-heading"
      >
        <h2 id="ca-faq-heading" className="display display-h2">
          Assessment questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Stuck without an assessor?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              That&rsquo;s the most common reason this process stalls, and
              it&rsquo;s the easiest one to fix — it&rsquo;s part of
              onboarding here.
            </p>
          </div>
          <a
            href="/contact/"
            className="btn btn-marigold shrink-0"
          >
            Talk to us
          </a>
        </div>
      </section>
    </>
  );
}
