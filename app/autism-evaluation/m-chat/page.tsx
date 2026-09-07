import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * Explainer for the M-CHAT-R/F™ (Robins, Fein & Barton).
 *
 * We do NOT reproduce the instrument. Its 20 items, scoring key, and the
 * structured Follow-Up interview are a copyrighted package whose validity
 * depends on being administered and scored the way its authors specify —
 * a marketing site hosting a "free M-CHAT" is doing parents a disservice
 * and taking a licensing risk. We explain what it is, what a score means,
 * and send people to the authors' own site for the real thing.
 *
 * TODO(pre-launch): re-verify the scoring bands and the recommended action
 * for each band against mchatscreen.com before publishing. They are stable
 * and published, but nothing on this site ships on memory alone.
 */

export const metadata: Metadata = {
  title: "The M-CHAT Explained: What the Score Actually Means",
  description:
    "What the M-CHAT-R/F is, which ages it's for, how the three scoring bands work, why the Follow-Up interview matters, and what a positive screen does and doesn't mean.",
  alternates: { canonical: "/autism-evaluation/m-chat/" },
};

const faq: AccordionItem[] = [
  {
    title: "Can I take the M-CHAT online by myself?",
    body: (
      <p>
        The questionnaire is published by its authors and free for clinical,
        research, and educational use, so you can read it. But the part that
        makes it useful is the structured Follow-Up interview and the
        clinician&rsquo;s judgment about what to do with the result — and that
        is not something a web form does for you. Sites that hand you a
        &ldquo;result&rdquo; and then a sales pitch are not running the
        instrument as designed.
      </p>
    ),
  },
  {
    title: "My child screened positive. Does that mean they have autism?",
    body: (
      <p>
        No. Screening tools are built to over-identify on purpose — it is far
        safer to send extra children for a look than to miss one. Many children
        who screen positive turn out not to be autistic, and some of those have
        a different developmental difference worth finding. A positive screen
        means one thing: go get an evaluation.
      </p>
    ),
  },
  {
    title: "My child screened negative but I'm still worried.",
    body: (
      <p>
        Then stay worried out loud. No screening questionnaire catches every
        child, and a negative screen at 18 months says nothing about 30 months
        — which is exactly why the standard recommendation is to screen more
        than once. Parent concern is itself a reason for referral. Say the
        words &ldquo;I would like a developmental evaluation&rdquo; and ask for
        it to be documented.
      </p>
    ),
  },
  {
    title: "My child is older than 30 months. What's used instead?",
    body: (
      <p>
        Different tools, chosen by the clinician for the age and the question —
        broader developmental screeners, social-communication questionnaires,
        and for a full evaluation, structured observation instruments. If your
        child is past toddlerhood, the M-CHAT isn&rsquo;t the right form and
        its absence isn&rsquo;t a reason to wait.
      </p>
    ),
  },
];

const url = `${siteConfig.brand.domain}/autism-evaluation/m-chat/`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Autism evaluation",
      item: `${siteConfig.brand.domain}/autism-evaluation/`,
    },
    { "@type": "ListItem", position: 2, name: "The M-CHAT explained", item: url },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: [
    {
      q: "Can I take the M-CHAT online by myself?",
      a: "The questionnaire is published free for clinical, research and educational use, but its value comes from the structured Follow-Up interview and clinician judgment. A web form that returns a result and a sales pitch is not running the instrument as designed.",
    },
    {
      q: "Does a positive M-CHAT screen mean my child has autism?",
      a: "No. Screening tools are designed to over-identify so that fewer children are missed. Many children who screen positive are not autistic. A positive screen means the next step is a diagnostic evaluation.",
    },
    {
      q: "What if my child screened negative but I am still worried?",
      a: "Parent concern is itself a reason for referral. No screener catches every child, and screening is recommended more than once in toddlerhood. Ask for a developmental evaluation and ask for the request to be documented.",
    },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MChatPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/autism-evaluation/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Autism evaluation
            </Link>{" "}
            / The M-CHAT
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            The M-CHAT is a doorbell, not a verdict.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            If your pediatrician handed you a page of yes/no questions at an
            18- or 24-month visit, this was probably it. Here&rsquo;s what it
            is, what the score means, and the part almost every website leaves
            out.
          </p>
        </div>
      </section>

      {/* ───────────────── WHAT IT IS ───────────────── */}
      <section
        className="mx-auto max-w-3xl px-4 py-12 sm:py-16"
        aria-labelledby="what-heading"
      >
        <h2 id="what-heading" className="display display-h2">
          What it is
        </h2>
        <div className="mt-5 space-y-4 text-lg text-spruce-soft">
          <p>
            The M-CHAT-R/F — the Modified Checklist for Autism in Toddlers,
            Revised, with Follow-Up — is a short parent-report questionnaire
            developed by Diana Robins, Deborah Fein, and Marianne Barton. It is
            designed for toddlers roughly 16 to 30 months old, and it is the
            most widely used autism screening tool in American pediatrics.
            Screening at the 18- and 24-month well visits is standard practice.
          </p>
          <p>
            You answer around twenty yes-or-no questions about everyday things:
            whether your child points, whether they look where you point,
            whether they respond to their name, whether they pretend. It takes
            a few minutes. That&rsquo;s the whole design — a fast, cheap net
            cast over every toddler, not a deep look at one.
          </p>
          <p>
            The &ldquo;/F&rdquo; is the part that gets dropped. The instrument
            comes with a structured Follow-Up interview, and for most children
            who screen in the middle band, that interview is what the tool
            actually calls for next. Skipping it is how a screening designed to
            be careful turns into a scary number with nothing attached.
          </p>
        </div>
      </section>

      {/* ───────────────── THE THREE BANDS ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="bands-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="bands-heading" className="display display-h2">
            How the scoring works
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Each answer that points toward a concern adds a point. The total
            lands in one of three bands, and each band has a different
            recommended action — that&rsquo;s the useful part, not the number.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="field-card bg-mint p-6">
              <p className="display text-3xl text-garden">Low</p>
              <h3 className="display display-h3 mt-1">Nothing further now</h3>
              <p className="mt-2 text-spruce-soft">
                A low total means no follow-up is indicated from this screen.
                It does not mean &ldquo;come back never&rdquo; — screening is
                repeated in toddlerhood precisely because children change, and
                your own concern always outranks the form.
              </p>
            </article>
            <article className="field-card bg-butter p-6">
              <p className="display text-3xl text-garden">Medium</p>
              <h3 className="display display-h3 mt-1">Do the Follow-Up</h3>
              <p className="mt-2 text-spruce-soft">
                This is the band most parents land in, and it is the band the
                Follow-Up interview exists for. A clinician walks through the
                flagged items with you in detail. Many children clear the
                concern at this step; those who don&rsquo;t get referred.
              </p>
            </article>
            <article className="field-card bg-peach p-6">
              <p className="display text-3xl text-garden">High</p>
              <h3 className="display display-h3 mt-1">Refer now, skip ahead</h3>
              <p className="mt-2 text-spruce-soft">
                A high total means going straight to a diagnostic evaluation
                and early intervention without waiting on the interview. Given
                how long evaluation waits run, that referral should be made the
                same day.
              </p>
            </article>
          </div>

          <p className="mt-6 text-sm text-spruce-soft">
            The M-CHAT-R/F is © Robins, Fein &amp; Barton. The current
            questionnaire, the scoring instructions, and the Follow-Up
            interview are published by its authors at{" "}
            <a
              href="https://mchatscreen.com/"
              rel="noopener nofollow"
              className="font-semibold text-garden underline underline-offset-4"
            >
              mchatscreen.com
            </a>
            . We deliberately don&rsquo;t host a copy: the tool is meant to be
            scored with the Follow-Up interview by someone who can act on the
            result.
          </p>
        </div>
      </section>

      {/* ───────────────── WHAT PARENTS GET WRONG ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="wrong-heading"
      >
        <h2 id="wrong-heading" className="display display-h2 max-w-3xl">
          The two things everyone gets wrong
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">
              &ldquo;Positive&rdquo; does not mean autistic
            </h3>
            <p className="mt-3 text-spruce-soft">
              A screener&rsquo;s job is to be over-sensitive. It is built to
              flag more children than actually have the condition, because the
              cost of a false alarm is one appointment and the cost of a miss is
              years. So a positive screen is an instruction — go get evaluated
              — and not an answer. Plenty of flagged toddlers are not autistic,
              and some of them turn out to have a language or hearing
              difference worth catching anyway.
            </p>
          </div>
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">
              &ldquo;Negative&rdquo; does not close the question
            </h3>
            <p className="mt-3 text-spruce-soft">
              No screening tool catches everyone, and a form filled out at 18
              months cannot see 30 months. If the questionnaire says one thing
              and your gut says another, your gut is data too — pediatricians
              are specifically taught that parent concern is grounds for
              referral. Ask again, ask louder, and ask for it in the chart.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── WHAT TO DO ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="do-heading">
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="do-heading" className="display display-h2">
            What to do with your result
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-3xl bg-white/80 p-6">
              <p className="display text-3xl text-garden">1</p>
              <h3 className="display display-h3 mt-1">Ask what band you&rsquo;re in</h3>
              <p className="mt-2 text-spruce-soft">
                And ask what the practice does next for that band. If the
                middle band came back and nobody mentioned a follow-up
                interview, ask about it by name.
              </p>
            </li>
            <li className="rounded-3xl bg-white/80 p-6">
              <p className="display text-3xl text-garden">2</p>
              <h3 className="display display-h3 mt-1">Start the free doors anyway</h3>
              <p className="mt-2 text-spruce-soft">
                Early intervention takes your own referral and needs no
                diagnosis. Under three, there is no reason to wait on a
                specialty appointment before making that call.
              </p>
            </li>
            <li className="rounded-3xl bg-white/80 p-6">
              <p className="display text-3xl text-garden">3</p>
              <h3 className="display display-h3 mt-1">Get in the evaluation line</h3>
              <p className="mt-2 text-spruce-soft">
                Waits are the long pole in this whole process. Book first;
                cancel later if you don&rsquo;t need it.
              </p>
            </li>
          </ol>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/autism-evaluation/" className="btn btn-primary">
              How to get an evaluation
            </Link>
            <Link
              href="/autism-evaluation/screener/"
              className="btn btn-outline"
            >
              Answer our parent checklist
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FAQ ─────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="mchat-faq-heading"
      >
        <h2 id="mchat-faq-heading" className="display display-h2">
          M-CHAT questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Got a result and no plan?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Call us and we&rsquo;ll tell you what the next step looks like
              where you live. No cost, no obligation, no pressure.
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
