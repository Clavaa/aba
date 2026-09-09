import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * Head term: "rbt certification". The whole path, end to end, including the
 * parts that trip people up — the 180-day window, who is allowed to sign your
 * competency assessment, and the annual renewal nobody warns you about.
 *
 * TODO(pre-launch): re-verify every requirement, count, and window on this
 * page against the BACB's current RBT Handbook. Board requirements change;
 * nothing here should ship on memory alone.
 */

export const metadata: Metadata = {
  title: "RBT Certification: Every Requirement, Step by Step",
  description:
    "How to get RBT certified: the six requirements, the 40-hour training, the competency assessment, the exam, what it costs, how long it takes, and the annual renewal.",
  alternates: { canonical: "/careers/rbt/certification/" },
};

const url = `${siteConfig.brand.domain}/careers/rbt/certification/`;

const requirements = [
  {
    t: "Be at least 18",
    d: "No exceptions, and no upper limit. Plenty of people come to this work as a second or third career.",
  },
  {
    t: "High school diploma or equivalent",
    d: "That's the whole education requirement. No college degree, no prerequisite coursework, no specific major.",
  },
  {
    t: "Pass a background check",
    d: "A standard criminal background check, dated within the last 180 days when you apply. Employers usually run their own on top of it.",
  },
  {
    t: "Finish a 40-hour training",
    d: "Based on the board's RBT Task List and delivered by a qualified trainer. It has to be completed inside a set window — don't start it a year before you plan to apply.",
  },
  {
    t: "Pass an Initial Competency Assessment",
    d: "A qualified assessor watches you demonstrate the skills in person. This is the step people underestimate.",
  },
  {
    t: "Pass the RBT exam",
    d: "A multiple-choice exam at a testing center or online with a proctor, taken after your application is approved.",
  },
];

const faq: AccordionItem[] = [
  {
    title: "How long does RBT certification take, realistically?",
    body: (
      <p>
        Four to eight weeks is common. The 40-hour training is one to two weeks
        if you push; the competency assessment depends entirely on how fast you
        can get a qualified assessor to sit with you; application review and
        exam scheduling add a couple more weeks. The variable that decides your
        timeline is almost always the assessor, which is why doing this through
        an employer is faster than doing it alone.
      </p>
    ),
  },
  {
    title: "What does it cost?",
    body: (
      <p>
        Three buckets: the 40-hour training course, the board&rsquo;s
        application fee, and the exam fee. Course prices vary a lot between
        providers, and the board publishes its current fees on its own site.
        Many employers — including us — cover some or all of it for people they
        hire, which is worth asking about before you pay out of pocket.{" "}
        <span className="font-semibold text-spruce">
          Ask us before you spend anything.
        </span>
      </p>
    ),
  },
  {
    title: "Can I get certified before I have a job?",
    body: (
      <p>
        You can do the 40-hour training on your own, but you cannot complete
        the competency assessment without a qualified assessor, and most people
        find one through an employer. The usual order is: get hired, then get
        certified with your supervisor running the assessment. Being hired
        first is normal, not a shortcut.
      </p>
    ),
  },
  {
    title: "Is the RBT exam hard?",
    body: (
      <p>
        It&rsquo;s a fair exam that rewards actually knowing the task list
        rather than memorizing definitions. The most common way people fail is
        studying vocabulary instead of practicing application questions — the
        exam asks what you would do in a situation, not what a term means. Do
        practice questions until you can explain why the wrong answers are
        wrong.
      </p>
    ),
  },
  {
    title: "What happens after I'm certified?",
    body: (
      <p>
        You renew every year, and renewal is not a formality. It involves a
        renewal competency assessment and confirmation that you&rsquo;ve been
        receiving ongoing supervision. You also have to be supervised on an
        ongoing basis while you work — a percentage of your service hours each
        month, including direct contact with your supervisor. A good employer
        builds all of that into your schedule; a bad one leaves you to chase
        it.
      </p>
    ),
  },
  {
    title: "Does my RBT certification work in another state?",
    body: (
      <p>
        The certification itself is national. What varies by state is
        licensure: some states license behavior technicians or require
        registration on top of certification. If you&rsquo;re moving, check
        your new state&rsquo;s rules before you assume the card travels
        unchanged.
      </p>
    ),
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${url}#howto`,
  name: "How to become a Registered Behavior Technician (RBT)",
  description:
    "The six requirements for RBT certification, in the order you complete them.",
  step: [
    {
      name: "Meet the basic requirements",
      text: "Be at least 18 with a high school diploma or equivalent, and pass a criminal background check.",
    },
    {
      name: "Complete a 40-hour training",
      text: "Finish a 40-hour training based on the RBT Task List, delivered by a qualified trainer, within the board's required window.",
    },
    {
      name: "Pass the Initial Competency Assessment",
      text: "A qualified assessor observes you demonstrating the required skills.",
    },
    {
      name: "Apply to the certifying board",
      text: "Submit your application with your training certificate, competency assessment, and background check.",
    },
    {
      name: "Pass the RBT exam",
      text: "Take the multiple-choice RBT exam at a testing center or with an online proctor.",
    },
    {
      name: "Keep it current",
      text: "Renew annually with a renewal competency assessment, and receive ongoing supervision while you work.",
    },
  ].map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: [
    {
      q: "How long does RBT certification take?",
      a: "Commonly four to eight weeks: one to two weeks for the 40-hour training, then the competency assessment, application review, and exam scheduling. Access to a qualified assessor is usually what sets the timeline.",
    },
    {
      q: "Do I need a college degree to become an RBT?",
      a: "No. The education requirement is a high school diploma or equivalent.",
    },
    {
      q: "Can I get RBT certified before I have a job?",
      a: "You can complete the 40-hour training independently, but the Initial Competency Assessment requires a qualified assessor, which most people access through an employer. Getting hired first is the normal path.",
    },
    {
      q: "Does RBT certification transfer between states?",
      a: "The certification is national, but some states separately license or register behavior technicians. Check the rules in the state you are moving to.",
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
    { "@type": "ListItem", position: 3, name: "RBT certification", item: url },
  ],
};

export default function RbtCertificationPage() {
  return (
    <>
      <JsonLd data={howToJsonLd} />
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
            /{" "}
            <Link
              href="/careers/rbt/"
              className="underline underline-offset-4 hover:text-garden"
            >
              RBT
            </Link>{" "}
            / Certification
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            RBT certification, without the runaround.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Six requirements, one exam, and a couple of places people get
            stuck. Here is the whole path in order — including the two things
            most guides leave out: the window your training has to fit inside,
            and the annual renewal that starts the day you pass.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/contact/"
              className="btn btn-primary"
            >
              Get certified with us
            </a>
            <Link href="/careers/rbt/" className="btn btn-outline">
              What the job is actually like
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── THE SIX REQUIREMENTS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="req-heading"
      >
        <h2 id="req-heading" className="display display-h2">
          The six requirements
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requirements.map((r, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach"];
            return (
              <li key={r.t} className={`field-card ${tints[i % 3]} p-6`}>
                <p className="display text-3xl text-garden">{i + 1}</p>
                <h3 className="display display-h3 mt-1">{r.t}</h3>
                <p className="mt-2 text-spruce-soft">{r.d}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          {/* TODO(pre-launch): verify against the current BACB RBT Handbook. */}
          Requirements are set by the Behavior Analyst Certification Board and
          do change. Always confirm the current handbook at{" "}
          <a
            href="https://www.bacb.com/"
            rel="noopener nofollow"
            className="font-semibold text-garden underline underline-offset-4"
          >
            bacb.com
          </a>{" "}
          before you pay for anything.
        </p>
      </section>

      {/* ───────────────── WHERE PEOPLE GET STUCK ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="stuck-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="stuck-heading" className="display display-h2">
            The three places people actually get stuck
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="field-card bg-peach p-6">
              <h3 className="display display-h3">Finding an assessor</h3>
              <p className="mt-2 text-spruce-soft">
                The competency assessment has to be conducted by someone
                qualified to run it — in practice, a certified analyst. If
                you&rsquo;re doing this on your own, this is where the process
                stalls for weeks. Through an employer, your supervisor does it
                as part of onboarding.
              </p>
            </div>
            <div className="field-card bg-butter p-6">
              <h3 className="display display-h3">The training window</h3>
              <p className="mt-2 text-spruce-soft">
                Your 40-hour training has to be completed within the
                board&rsquo;s required timeframe, and your competency
                assessment and background check have their own recency rules.
                Start the pieces close together, in the right order, or you
                will redo one of them.
              </p>
            </div>
            <div className="field-card bg-mint p-6">
              <h3 className="display display-h3">Studying the wrong thing</h3>
              <p className="mt-2 text-spruce-soft">
                The exam tests application, not vocabulary. People who memorize
                definitions fail; people who work through scenario questions
                pass. Practice explaining why each wrong answer is wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── AFTER YOU PASS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="after-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="after-heading" className="display display-h2">
            The part that starts after you pass
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            RBT certification is not a diploma you file away. You renew it
            every year, which involves a renewal competency assessment and
            confirmation that you&rsquo;ve been supervised. And while you work,
            a share of your service hours each month has to be supervised,
            including real contact with your supervisor rather than a signature
            at the end of the month.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            This matters more than it sounds when you&rsquo;re choosing an
            employer. Supervision is a requirement of your credential, but
            it&rsquo;s also the entire mechanism by which you get better at
            this job — and it&rsquo;s the same fieldwork structure you&rsquo;ll
            need if you ever go for BCaBA or BCBA. Ask any prospective employer
            how supervision gets scheduled, who does it, and whether it happens
            on the clock.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/careers/rbt/competency-assessment/"
              className="btn btn-primary"
            >
              What&rsquo;s on the competency assessment
            </Link>
            <Link href="/careers/bcba/supervision/" className="btn btn-outline">
              How fieldwork hours work
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20"
        aria-labelledby="cert-faq-heading"
      >
        <h2 id="cert-faq-heading" className="display display-h2">
          Certification questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Don&rsquo;t pay for this alone.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Tell us where you are in the process — even if that&rsquo;s
              nowhere yet — and we&rsquo;ll tell you what we cover and what
              your timeline would look like.
            </p>
          </div>
          <a
            href="/contact/"
            className="btn btn-marigold shrink-0"
          >
            Talk to us first
          </a>
        </div>
      </section>
    </>
  );
}
