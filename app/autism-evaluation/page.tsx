import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import ImageSlot from "@/components/ImageSlot";
import Sprout from "@/components/Sprout";
import PhoneIcon from "@/components/PhoneIcon";

export const metadata: Metadata = {
  title: "Autism Evaluation: How to Get One, and What Happens",
  description:
    "How an autism evaluation actually works: who can diagnose, the two free referrals you can make yourself today, what to bring, how long the wait is, and what comes after.",
  alternates: { canonical: "/autism-evaluation/" },
};

const faq: AccordionItem[] = [
  {
    title: "Who can actually diagnose autism?",
    body: (
      <p>
        In most places: a developmental-behavioral pediatrician, a child
        psychologist or neuropsychologist, a child psychiatrist, or a
        pediatric neurologist. Some general pediatricians diagnose
        straightforward cases themselves. A school evaluation is a different
        thing — it can qualify your child for services at school, but a school
        team&rsquo;s educational determination is not the same as a medical
        diagnosis, and insurers usually want the medical one.
      </p>
    ),
  },
  {
    title: "How long is the wait for an evaluation?",
    body: (
      <p>
        Often months, and in some regions closer to a year. That&rsquo;s the
        single most important thing to know, because it changes what you should
        do first: get on lists now and sort out the details while you wait. Ask
        to be put on cancellation lists, and ask every practice you call
        whether they have a shorter path for younger children.
      </p>
    ),
  },
  {
    title: "Do I need a referral from my pediatrician?",
    body: (
      <p>
        For the medical evaluation, often yes — many specialty clinics and many
        insurance plans require one. For the other two doors, no: you can refer
        your own child to your state&rsquo;s early intervention program if
        they&rsquo;re under three, and you can request a school evaluation in
        writing at any age from three up. Neither of those needs a doctor to
        start.
      </p>
    ),
  },
  {
    title: "What does an evaluation cost?",
    body: (
      <p>
        A medical diagnostic evaluation is billed to your health plan like any
        other specialist visit, so your deductible and copay rules apply. The
        early intervention and school evaluations are free — that&rsquo;s
        federal law, not a promotion. If cost is the thing stopping you, start
        with the free doors today.
      </p>
    ),
  },
  {
    title: "What if the evaluation says it isn't autism?",
    body: (
      <p>
        Then you&rsquo;ve learned something real, and usually you&rsquo;ve
        learned what it is instead — a language delay, a hearing issue, ADHD,
        anxiety, a motor difference. Every one of those has its own path
        forward. An evaluation is not a test you can fail; it&rsquo;s how you
        stop guessing.
      </p>
    ),
  },
  {
    title: "Does a diagnosis follow my child forever?",
    body: (
      <p>
        A diagnosis is health information, protected like the rest of your
        child&rsquo;s medical record. What it mostly does day to day is unlock
        things: insurance coverage for therapy, school supports, and a shared
        language for the adults in your child&rsquo;s life. Plenty of parents
        describe the diagnosis as the moment help finally became available.
      </p>
    ),
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteConfig.brand.domain}/autism-evaluation/#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Autism evaluation",
      item: `${siteConfig.brand.domain}/autism-evaluation/`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.brand.domain}/autism-evaluation/#faq`,
  mainEntity: [
    {
      q: "Who can actually diagnose autism?",
      a: "A developmental-behavioral pediatrician, a child psychologist or neuropsychologist, a child psychiatrist, or a pediatric neurologist. Some general pediatricians diagnose straightforward cases. A school evaluation determines eligibility for educational services and is not the same as a medical diagnosis.",
    },
    {
      q: "How long is the wait for an autism evaluation?",
      a: "Often months, and in some regions closer to a year. Get on waitlists first and sort out details while you wait, and ask about cancellation lists.",
    },
    {
      q: "Do I need a referral from my pediatrician?",
      a: "For a medical evaluation, often yes. But you can refer your own child to your state's early intervention program if they are under three, and you can request a school district evaluation in writing from age three up, without a doctor's referral.",
    },
    {
      q: "What does an autism evaluation cost?",
      a: "A medical diagnostic evaluation is billed to your health plan like any specialist visit. Early intervention and school district evaluations are free under federal law.",
    },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AutismEvaluationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-peach p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <h1 className="display display-hero">
                You don&rsquo;t have to be sure to start.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                Waiting for certainty is the most expensive thing a worried
                parent can do, because the appointment itself takes months to
                get. Here&rsquo;s exactly how an autism evaluation works, and
                the three phone calls that start it — two of which are free and
                need nobody&rsquo;s permission.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/autism-evaluation/screener/"
                  className="btn btn-primary"
                >
                  Answer a few questions first
                </Link>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="btn btn-outline"
                >
                  <PhoneIcon />
                  {siteConfig.cta.talk} · {siteConfig.contact.phone}
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <ImageSlot
                intent="Parent on the phone at a kitchen counter, toddler visible playing on the floor behind, morning light"
                tint="bg-white/70"
                className="aspect-[4/5]"
              />
              <Sprout className="absolute -bottom-4 -left-4 h-16 w-16 rotate-[-8deg] text-garden" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── THE THREE PARALLEL TRACKS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="tracks-heading"
      >
        <h2 id="tracks-heading" className="display display-h2 max-w-3xl">
          Three doors. Open them all at once.
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          The most common mistake is doing these one at a time. They&rsquo;re
          run by different systems, they don&rsquo;t wait on each other, and
          nothing about starting one closes another.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="field-card flex flex-col bg-mint p-6 sm:p-8">
            <p className="display text-3xl text-garden">1</p>
            <h3 className="display display-h3 mt-1">The medical evaluation</h3>
            <p className="mt-2 flex-1 text-spruce-soft">
              This is the one that produces a diagnosis insurers accept. Call
              your pediatrician, say &ldquo;I would like a referral for a
              developmental evaluation,&rdquo; and ask them to send it today.
              Then call the specialty clinic yourself to confirm they got it —
              referrals get lost constantly.
            </p>
            <p className="mt-3 text-sm font-semibold text-spruce">
              Cost: billed to your plan · Wait: often months
            </p>
          </article>

          <article className="field-card flex flex-col bg-butter p-6 sm:p-8">
            <p className="display text-3xl text-garden">2</p>
            <h3 className="display display-h3 mt-1">
              Early intervention (under 3)
            </h3>
            <p className="mt-2 flex-1 text-spruce-soft">
              Every state runs a birth-to-three program under federal law. You
              can refer your own child — no doctor, no diagnosis required — and
              the evaluation is free. If they qualify, services usually start
              long before a specialty clinic could see you.
            </p>
            <p className="mt-3 text-sm font-semibold text-spruce">
              Cost: free evaluation · You can start it today
            </p>
          </article>

          <article className="field-card flex flex-col bg-peach p-6 sm:p-8">
            <p className="display text-3xl text-garden">3</p>
            <h3 className="display display-h3 mt-1">
              The school district (3 and up)
            </h3>
            <p className="mt-2 flex-1 text-spruce-soft">
              From age three, your local public school district must evaluate a
              child suspected of having a disability — including children who
              don&rsquo;t attend that school yet. Put the request in writing and
              date it; the clock on the district&rsquo;s response starts when
              they receive it.
            </p>
            <p className="mt-3 text-sm font-semibold text-spruce">
              Cost: free · Request it in writing
            </p>
          </article>
        </div>
      </section>

      {/* ───────────────── WHAT HAPPENS IN THE ROOM ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="room-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="room-heading" className="display display-h2">
            What actually happens at the appointment
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            It is not a blood test and there is no scan. An autism evaluation is
            structured observation plus your history — which is why what you
            bring matters so much.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "A long conversation with you",
                d: "Your child's history: pregnancy and birth, milestones, when you first worried, what a hard day looks like. You are the primary source of evidence here, and nobody knows this child like you do.",
              },
              {
                t: "Structured play with your child",
                d: "The clinician sets up specific social situations — offering a toy, pausing a fun game, calling their name — and watches how your child responds. To your child it should mostly feel like playing with a friendly stranger.",
              },
              {
                t: "Questionnaires, sometimes several",
                d: "You and often a teacher fill out standardized forms. These are inputs, not verdicts; the clinician weighs them against what they observe directly.",
              },
              {
                t: "A conversation about what it means",
                d: "Results may come the same day or in a written report weeks later. Ask, before you leave: when do I get the report, who explains it to me, and what do I do on Monday?",
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
        </div>
      </section>

      {/* ───────────────── WHAT TO BRING ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="bring-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="bring-heading" className="display display-h2">
            Bring these. They change the outcome.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Clinicians see your child for a couple of hours on one unusual day.
            You&rsquo;ve seen every other day. Make that count.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Two or three short phone videos of the moments that worry you — the real ones, not the good days",
              "A written list of what you see, how often, and when it started; specifics beat adjectives",
              "Anything a teacher, daycare, or relative has said, in their words",
              "Your child's milestone history, including anything they used to do and stopped doing",
              "Any prior evaluations, hearing tests, or school paperwork",
              "Your list of questions — write it down, because you will not remember it in the room",
            ].map((b) => (
              <li key={b} className="flex gap-3 rounded-3xl bg-white/80 p-5">
                <span aria-hidden="true" className="text-xl leading-none text-garden">
                  ✓
                </span>
                <span className="text-spruce-soft">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── AFTER THE DIAGNOSIS ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="after-heading">
        <h2 id="after-heading" className="display display-h2">
          If it is autism, here&rsquo;s what opens up
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          A diagnosis is a key, not a label. It&rsquo;s what turns the lock on
          most of the help that exists.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="field-card bg-mint p-6">
            <h3 className="display display-h3">Therapy gets covered</h3>
            <p className="mt-2 text-spruce-soft">
              Medicaid covers medically necessary ABA for eligible children in
              every state, and every state has an autism insurance law for
              private plans. The diagnosis is what starts that process.
            </p>
            <Link
              href="/insurance/"
              className="btn btn-outline mt-4 !py-2.5"
            >
              How coverage works
            </Link>
          </div>
          <div className="field-card bg-butter p-6">
            <h3 className="display display-h3">School has to respond</h3>
            <p className="mt-2 text-spruce-soft">
              An eligible child gets an individualized plan, services, and
              accommodations — and you get a legal seat at the table where
              those are decided.
            </p>
            <Link href="/services/school/" className="btn btn-outline mt-4 !py-2.5">
              Support at school
            </Link>
          </div>
          <div className="field-card bg-peach p-6">
            <h3 className="display display-h3">You stop guessing</h3>
            <p className="mt-2 text-spruce-soft">
              The single most common thing parents say after a diagnosis is
              that the hard parts finally made sense — and that they wished
              they&rsquo;d started sooner.
            </p>
            <Link href="/getting-started/" className="btn btn-outline mt-4 !py-2.5">
              Start with us
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── SCREENER + M-CHAT CROSSLINKS ───────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h2 className="display display-h3">
              Not sure it&rsquo;s worth a call yet?
            </h2>
            <p className="mt-2 text-spruce-soft">
              Answer a few age-specific questions about what you&rsquo;re
              seeing, and get a straight recommendation about what to do next.
              Two minutes, nothing to sign up for.
            </p>
            <Link
              href="/autism-evaluation/screener/"
              className="btn btn-primary mt-5"
            >
              Start the questions
            </Link>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h2 className="display display-h3">
              Your doctor mentioned the M-CHAT?
            </h2>
            <p className="mt-2 text-spruce-soft">
              It&rsquo;s the standard toddler screening questionnaire, and its
              results are widely misunderstood — including the part where a
              &ldquo;positive&rdquo; screen usually isn&rsquo;t what parents
              think it is.
            </p>
            <Link
              href="/autism-evaluation/m-chat/"
              className="btn btn-outline mt-5"
            >
              What the M-CHAT means
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FAQ ─────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20"
        aria-labelledby="eval-faq-heading"
      >
        <h2 id="eval-faq-heading" className="display display-h2">
          Evaluation questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Talk it through with a person.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              We&rsquo;ll tell you how evaluations work where you live and what
              to say when you call — even if you never become a client.
            </p>
          </div>
          <a
            href={siteConfig.contact.phoneHref}
            className="btn btn-marigold shrink-0"
          >
            <PhoneIcon />
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
