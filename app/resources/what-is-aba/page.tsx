import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import TriageTrio from "@/components/TriageTrio";

/**
 * Head term: "what is applied behavior analysis" / "what is ABA therapy".
 *
 * The section that makes this page different from every provider page on the
 * internet is "The criticism, taken seriously". Parents research the critique
 * — it is one of the first things they find — and a provider that pretends it
 * doesn't exist loses trust with the exact people who read carefully.
 */

export const metadata: Metadata = {
  title: "What Is ABA Therapy? A Straight Answer for Parents",
  description:
    "What applied behavior analysis actually is, what a session looks like, what the evidence says, how modern ABA differs from its history, and the criticism — answered honestly.",
  alternates: { canonical: "/resources/what-is-aba/" },
};

const url = `${siteConfig.brand.domain}/resources/what-is-aba/`;

const faq: AccordionItem[] = [
  {
    title: "Is ABA only for autistic children?",
    body: (
      <p>
        No — applied behavior analysis is a field, and its methods are used in
        education, brain-injury rehabilitation, organizational safety, and
        more. But autism is where insurance coverage and most public funding
        sit, so in everyday use &ldquo;ABA therapy&rdquo; almost always means
        autism services.
      </p>
    ),
  },
  {
    title: "Is ABA the same as behavior modification or discipline?",
    body: (
      <p>
        No. Discipline is about consequences for misbehavior. ABA is about
        figuring out what a behavior is accomplishing for a child and teaching
        a better way to accomplish it. If a child screams because screaming is
        the only reliable way to end a task they can&rsquo;t do, the answer is
        teaching them to ask for a break — not punishing the scream.
      </p>
    ),
  },
  {
    title: "How long does a child stay in ABA?",
    body: (
      <p>
        It varies enormously — months for a focused program targeting a few
        specific skills, years for a comprehensive early-childhood program. A
        good program is always working toward needing less of itself. Ask any
        provider what their discharge criteria are; if they don&rsquo;t have an
        answer, that tells you something.
      </p>
    ),
  },
  {
    title: "Does ABA try to make autistic kids seem non-autistic?",
    body: (
      <p>
        It shouldn&rsquo;t, and a good program doesn&rsquo;t. Goals should be
        about capability and safety and being understood — communicating,
        managing a hard moment, staying safe near a road, joining in when they
        want to. Goals aimed at suppressing harmless autistic behavior, like
        stopping hand-flapping because it looks unusual, are not defensible.
        You are allowed to ask why any goal is on the plan, and to say no.
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
      q: "What is ABA therapy?",
      a: "Applied behavior analysis is a therapy that treats behavior as learned and purposeful. A behavior analyst identifies what a behavior accomplishes for a child, teaches skills that accomplish the same thing more effectively, and measures whether it is working.",
    },
    {
      q: "Is ABA the same as discipline or behavior modification?",
      a: "No. Discipline responds to misbehavior with consequences. ABA identifies the function a behavior serves and teaches a more effective replacement skill.",
    },
    {
      q: "How long does a child stay in ABA therapy?",
      a: "It ranges from months for a focused program targeting specific skills to years for a comprehensive early-childhood program. A good program works toward needing less of itself and has explicit discharge criteria.",
    },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${url}#article`,
  headline: "What is ABA therapy? A straight answer for parents",
  description:
    "What applied behavior analysis is, what a session looks like, what the evidence says, and how to judge whether a program is being run ethically.",
  publisher: { "@id": `${siteConfig.brand.domain}/#organization` },
  mainEntityOfPage: url,
  /* TODO(authorship): attribute to a named, credentialed BCBA with a review
     date once clinical leadership is in place — E-E-A-T on a page like this
     is worth more than any other single change. */
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Resources",
      item: `${siteConfig.brand.domain}/resources/`,
    },
    { "@type": "ListItem", position: 2, name: "What is ABA therapy?", item: url },
  ],
};

export default function WhatIsAbaPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/resources/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Resources
            </Link>{" "}
            / What is ABA?
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            Behavior is a message. ABA is learning to read it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Applied behavior analysis starts from one idea: children do things
            for reasons, and if you understand the reason you can teach a
            better way to get the same result. Everything else — the data, the
            plans, the jargon — is machinery built on top of that.
          </p>
        </div>
      </section>

      {/* ───────────────── THE CORE IDEA ───────────────── */}
      <section
        className="mx-auto max-w-3xl px-4 py-12 sm:py-16"
        aria-labelledby="core-heading"
      >
        <h2 id="core-heading" className="display display-h2">
          The core idea, in one example
        </h2>
        <div className="mt-5 space-y-4 text-lg text-spruce-soft">
          <p>
            A four-year-old throws his plate at dinner most nights. The
            instinct is to treat the throwing as the problem and stop it.
            A behavior analyst asks a different question first: what does
            throwing the plate accomplish? Watch closely enough and it turns
            out that every single time he throws it, dinner ends. He is not
            being defiant. He is communicating &ldquo;I&rsquo;m done&rdquo; in
            the only way that has ever reliably worked.
          </p>
          <p>
            That reason is called the <em>function</em> of the behavior, and
            finding it is most of the job. Once you know it, the plan writes
            itself: teach him a way to say &ldquo;all done&rdquo; that works
            faster and more reliably than throwing — a word, a sign, a card, a
            button — and make sure it works every time at first. The throwing
            usually fades not because it was punished, but because it became
            the slower option.
          </p>
          <p>
            Scale that up and you have ABA: identify what a child is trying to
            accomplish, teach skills that accomplish it better, arrange the
            environment so the new skill wins, and measure whether any of it is
            actually working.
          </p>
        </div>
      </section>

      {/* ───────────────── WHAT A SESSION LOOKS LIKE ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="session-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="session-heading" className="display display-h2">
            What it actually looks like
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Mostly, it looks like playing",
                d: "Modern programs teach inside activities a child already likes, following their lead and building small demands into motivated moments. If a program looks like a child being drilled at a table all day, that is a specific and increasingly dated way of doing this — ask why.",
              },
              {
                t: "Someone is taking data",
                d: "Counting, timing, noting what happened before and after. It looks clerical and it's the thing that separates ABA from opinion: if a strategy isn't working, the data says so within weeks instead of months.",
              },
              {
                t: "A BCBA writes and revises the plan",
                d: "A Board Certified Behavior Analyst assesses, sets goals with you, trains the technicians, reads the data, and changes what isn't working. A technician runs sessions; the analyst owns the plan.",
              },
              {
                t: "You're in it",
                d: "Parent coaching isn't a bonus feature. Your child spends far more hours with you than with any therapist, and the skills that stick are the ones that keep getting practiced after everyone leaves.",
              },
            ].map((c, i) => {
              const tints = ["bg-mint", "bg-butter", "bg-peach", "bg-mint"];
              return (
                <div key={c.t} className={`field-card ${tints[i]} p-6`}>
                  <h3 className="display display-h3">{c.t}</h3>
                  <p className="mt-2 text-spruce-soft">{c.d}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services/" className="btn btn-outline">
              Where sessions happen
            </Link>
            <Link
              href="/resources/discrete-trial-training/"
              className="btn btn-outline"
            >
              The teaching methods, explained
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── THE EVIDENCE ───────────────── */}
      <section
        className="mx-auto max-w-3xl px-4 py-12 sm:py-16"
        aria-labelledby="evidence-heading"
      >
        <h2 id="evidence-heading" className="display display-h2">
          What the evidence actually supports
        </h2>
        <div className="mt-5 space-y-4 text-lg text-spruce-soft">
          <p>
            Behavior-analytic intervention is the most-studied approach to
            autism support and it is the one insurers, state Medicaid programs,
            and most major clinical bodies fund — that&rsquo;s why coverage
            exists at all. The research base is genuinely large, and it is
            strongest for teaching specific skills: communication, daily-living
            routines, and reducing behavior that is dangerous or that blocks
            learning.
          </p>
          <p>
            It is also fair to say the research base has real limits. Studies
            vary a lot in quality, intensive-hours claims rest on a small
            number of older studies, and long-term outcome research is thinner
            than the marketing on most provider websites suggests. Anyone
            promising you a particular outcome at a particular number of hours
            is going past what the evidence can carry.
          </p>
          <p className="font-semibold text-spruce">
            The honest summary: ABA is well-supported for teaching skills, the
            quality of the individual program matters more than the label on
            it, and outcomes are measured in progress, not cures. Autism
            isn&rsquo;t something ABA cures, and any provider using that word
            should worry you.
          </p>
        </div>
      </section>

      {/* ───────────────── THE CRITICISM ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="crit-heading">
        <div className="field-card bg-peach p-6 sm:p-10">
          <h2 id="crit-heading" className="display display-h2">
            The criticism, taken seriously
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            If you search this topic for more than an hour you will find
            autistic adults who are critical of ABA, sometimes very. You should
            read them. Here is what they&rsquo;re saying and what we think
            about it, without the defensiveness.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">Its history is real</h3>
              <p className="mt-2 text-spruce-soft">
                Early behavioral programs in the 1960s and 70s used aversives
                — including punishment that would be indefensible today — and
                aimed at making children &ldquo;indistinguishable from
                peers.&rdquo; That happened. It is not a smear, and it is a
                fair thing for people who lived through it to be angry about.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">
                Compliance is a real failure mode
              </h3>
              <p className="mt-2 text-spruce-soft">
                A program can teach a child to comply with adults, tolerate
                distress silently, and mask discomfort. Those are outcomes a
                badly-run program produces, and calling them progress is the
                central thing critics warn about. A child who has learned that
                &ldquo;no&rdquo; is never honored has learned something
                dangerous.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">What we do about it</h3>
              <p className="mt-2 text-spruce-soft">
                Goals aimed at your child&rsquo;s life, not at appearances.
                Assent taken seriously — a child&rsquo;s &ldquo;no,&rdquo;
                including a non-verbal one, is information the plan has to
                respond to. Stimming left alone unless it&rsquo;s hurting
                them. And a parent who can question any goal and get a real
                answer.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-spruce-soft">
            What we won&rsquo;t tell you is that these concerns apply to
            everyone else and not to us. The right response is to give you
            questions to ask any provider, including this one:{" "}
            <span className="font-semibold text-spruce">
              Why is this goal on the plan? What happens when my child refuses?
              What does the data have to show for you to stop something?
            </span>
          </p>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="aba-faq-heading"
      >
        <h2 id="aba-faq-heading" className="display display-h2">
          Questions parents ask first
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
