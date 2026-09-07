import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import { PhoneIcon } from "@/components/TopBar";

/**
 * Head terms: "level 2 autism", "level 3 autism", "levels of autism".
 *
 * The thing this page does that most don't: explain that the level is
 * assigned separately for two domains, that it isn't fixed, and that it
 * mostly doesn't determine what services a child gets — medical necessity
 * does. Parents arrive here frightened by a number on a report.
 */

export const metadata: Metadata = {
  title: "Autism Levels 1, 2 and 3: What They Actually Mean",
  description:
    "What level 1, level 2, and level 3 autism mean, why your child can be two levels at once, whether the level can change, and what it does and doesn't decide about services.",
  alternates: { canonical: "/resources/autism-levels/" },
};

const url = `${siteConfig.brand.domain}/resources/autism-levels/`;

const levels = [
  {
    n: "Level 1",
    label: "Requiring support",
    tint: "bg-mint",
    social:
      "Can speak in full sentences and wants connection, but conversations go sideways — trouble with back-and-forth, unusual responses, difficulty making friendships stick without help.",
    rrb: "Inflexibility gets in the way. Switching activities is hard, organizing and planning is hard, and independence is harder than it looks from outside.",
    life: "Often identified later, sometimes not until school demands outpace the coping. Support here is real support, not a lesser version of it.",
  },
  {
    n: "Level 2",
    label: "Requiring substantial support",
    tint: "bg-butter",
    social:
      "Marked difficulty even with supports in place. Speech may be present but limited to simple sentences, interaction is often narrow or focused on specific interests, and responses to others' approaches are reduced or unusual.",
    rrb: "Inflexibility is obvious to anyone watching. Changes cause distress, repetitive behaviors appear frequently enough to interfere with functioning across settings.",
    life: "This is the most-searched level, usually because a parent just read it on a report. It describes the amount of support a person needs — nothing about their intelligence, their future, or how much they will grow.",
  },
  {
    n: "Level 3",
    label: "Requiring very substantial support",
    tint: "bg-peach",
    social:
      "Severe difficulty. Speech may be very limited or absent, initiation of interaction is rare, and responses are limited to very direct approaches.",
    rrb: "Extreme difficulty with change, and repetitive behaviors that markedly interfere with functioning in all areas. Distress when routines are interrupted can be intense.",
    life: "Communication is almost always the first target, and augmentative communication — devices, pictures, signs — matters enormously. A child who cannot speak is not a child with nothing to say.",
  },
];

const faq: AccordionItem[] = [
  {
    title: "Can my child be different levels in different areas?",
    body: (
      <p>
        Yes, and this is the part most articles skip. The level is assigned
        separately for two domains: social communication, and restricted or
        repetitive behaviors. A child can be Level 1 in one and Level 2 in the
        other, and a good report says both. If yours gives a single number, ask
        the clinician to break it down — it changes what you prioritize.
      </p>
    ),
  },
  {
    title: "Can the level change over time?",
    body: (
      <p>
        Yes. The level describes support needed right now, not a permanent
        category. It can change with development, with skills, with a change in
        environment, and with support. It can also move in the other direction
        when demands increase — a child who managed in a small classroom may
        need more support in a bigger one. Re-evaluation exists for a reason.
      </p>
    ),
  },
  {
    title: "Does the level determine what therapy my child gets?",
    body: (
      <p>
        Usually not directly. Insurance authorizes ABA based on medical
        necessity — an assessment, a treatment plan, and specific goals — not
        on a level number. Schools decide eligibility and services through
        their own process. The level is useful shorthand for clinicians; it is
        rarely the thing that opens or closes a door.
      </p>
    ),
  },
  {
    title: "Is level 2 autism 'moderate' autism?",
    body: (
      <p>
        People use it that way, but the older categories — mild, moderate,
        severe, and diagnoses like Asperger&rsquo;s — aren&rsquo;t how autism
        is classified now. Everything folded into one diagnosis with support
        levels precisely because the old buckets didn&rsquo;t describe people
        well. Translating back into &ldquo;moderate&rdquo; loses the thing the
        levels were built to capture.
      </p>
    ),
  },
  {
    title: "Does a higher level mean lower intelligence?",
    body: (
      <p>
        No. Levels describe support needs, not cognitive ability, and they
        travel together far less often than people assume. Plenty of Level 3
        children have abilities that only became visible once they had a
        reliable way to communicate — which is exactly why communication comes
        first.
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
      q: "What does level 2 autism mean?",
      a: "Level 2 means requiring substantial support: marked difficulty with social communication even when supports are in place, and inflexibility or repetitive behaviors that interfere with functioning across settings. It describes support needs, not intelligence or prognosis.",
    },
    {
      q: "Can a child be different autism levels in different areas?",
      a: "Yes. Levels are assigned separately for social communication and for restricted or repetitive behaviors, so a child can be level 1 in one domain and level 2 in the other.",
    },
    {
      q: "Can an autism level change over time?",
      a: "Yes. The level describes current support needs, not a permanent category, and it can change with development, skills, environment, and support.",
    },
    {
      q: "Does the autism level determine what therapy is covered?",
      a: "Usually not directly. Insurers authorize ABA based on medical necessity — an assessment, treatment plan, and specific goals — rather than on a level number.",
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
      name: "Resources",
      item: `${siteConfig.brand.domain}/resources/`,
    },
    { "@type": "ListItem", position: 2, name: "Autism levels", item: url },
  ],
};

export default function AutismLevelsPage() {
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
              href="/resources/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Resources
            </Link>{" "}
            / Autism levels
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            The level is a support estimate. Not a ceiling.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            If you just read &ldquo;Level 2&rdquo; on a report and your stomach
            dropped, start here. The levels describe how much help a person
            needs right now, in two separate areas, and they are the most
            misread line in the whole document.
          </p>
        </div>
      </section>

      {/* ───────────────── THE TWO DOMAINS ───────────────── */}
      <section
        className="mx-auto max-w-3xl px-4 py-12 sm:py-16"
        aria-labelledby="domains-heading"
      >
        <h2 id="domains-heading" className="display display-h2">
          First, the thing most articles get wrong
        </h2>
        <div className="mt-5 space-y-4 text-lg text-spruce-soft">
          <p>
            There isn&rsquo;t one level. There are two, assigned separately:
            one for <strong className="text-spruce">social communication</strong>{" "}
            and one for{" "}
            <strong className="text-spruce">
              restricted and repetitive behaviors
            </strong>
            . A child can need substantial support to hold a conversation and
            comparatively little support around routines and flexibility — that
            child is Level 2 in one column and Level 1 in the other, and
            flattening it to &ldquo;Level 2 autism&rdquo; throws away the
            useful half of the information.
          </p>
          <p>
            So if your child&rsquo;s report gives one number, ask the clinician
            which domain drove it. The answer changes what you work on first
            and what supports you ask a school for.
          </p>
        </div>
      </section>

      {/* ───────────────── THE THREE LEVELS ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="levels-heading">
        <h2 id="levels-heading" className="display display-h2">
          The three levels
        </h2>
        <div className="mt-8 space-y-4">
          {levels.map((l) => (
            <article key={l.n} className={`field-card ${l.tint} p-6 sm:p-8`}>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="display display-h3">{l.n}</h3>
                <p className="display text-sm tracking-wide text-garden">
                  {l.label.toUpperCase()}
                </p>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-white/80 p-5">
                  <h4 className="font-bold">Social communication</h4>
                  <p className="mt-1 text-spruce-soft">{l.social}</p>
                </div>
                <div className="rounded-3xl bg-white/80 p-5">
                  <h4 className="font-bold">
                    Restricted &amp; repetitive behaviors
                  </h4>
                  <p className="mt-1 text-spruce-soft">{l.rrb}</p>
                </div>
              </div>
              <p className="mt-4 text-spruce-soft">{l.life}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          These descriptions are a plain-language summary of the support levels
          used in current diagnostic criteria, written for parents. They are not
          diagnostic criteria themselves, and only a qualified clinician can
          assign or change a level.
        </p>
      </section>

      {/* ───────────────── WHAT IT DOESN'T MEAN ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="not-heading"
      >
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="not-heading" className="display display-h2">
            What the level does not tell you
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "It isn't an intelligence score",
                d: "Support needs and cognitive ability are different things and they diverge constantly. The most common story in this field is a child whose abilities became visible only after they got a reliable way to communicate.",
              },
              {
                t: "It isn't a prediction",
                d: "It describes now. Children develop, skills change, and levels are reassessed. Nobody can tell you from a level what your child's life will look like at twenty.",
              },
              {
                t: "It usually isn't what unlocks services",
                d: "Insurers authorize therapy on medical necessity — assessment, treatment plan, goals. Schools run their own eligibility process. The level rarely opens or closes either door by itself.",
              },
              {
                t: "It isn't a personality",
                d: "Two Level 2 children can be nothing alike. The level is one line in a report; it is not a description of who your kid is, what they love, or what they're good at.",
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

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20"
        aria-labelledby="levels-faq-heading"
      >
        <h2 id="levels-faq-heading" className="display display-h2">
          Level questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Just got the report?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Call and we&rsquo;ll walk through what it means for coverage and
              next steps where you live. No cost, no obligation.
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
