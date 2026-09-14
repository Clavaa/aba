import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * "Positive reinforcement in ABA" — the single most misunderstood term in the
 * field, including by people who use it daily. The page leads with the
 * technical definition (reinforcement is defined by its effect, not by
 * whether the child enjoyed it) because everything else follows from that.
 */

export const metadata: Metadata = {
  title: "Positive Reinforcement in ABA, Explained",
  description:
    "What positive reinforcement actually means in ABA, how it differs from bribery and from negative reinforcement, why reinforcers stop working, and how to fade them.",
  alternates: { canonical: "/resources/positive-reinforcement/" },
};

const url = `${siteConfig.brand.domain}/resources/positive-reinforcement/`;

const faq: AccordionItem[] = [
  {
    title: "What is positive reinforcement in ABA?",
    body: (
      <>
        <p>
          Adding something after a behaviour that makes that behaviour more
          likely to happen again. The word &ldquo;positive&rdquo; is
          arithmetic, not a value judgement &mdash; it means something was
          <em> added</em>, not that it was pleasant.
        </p>
        <p className="mt-3">
          The definition is circular on purpose, and this is the part people
          miss: something only counts as a reinforcer if the behaviour actually
          increases. Praise a child lavishly and watch the behaviour drop, and
          your praise was not a reinforcer, however well-intentioned. It is
          measured, not assumed.
        </p>
      </>
    ),
  },
  {
    title: "What is the difference between positive and negative reinforcement?",
    body: (
      <p>
        Both <em>increase</em> a behaviour. Positive reinforcement adds
        something; negative reinforcement removes something. A child who asks
        for a break and gets one is being negatively reinforced for asking
        &mdash; the demand was taken away &mdash; and that is a good thing to
        teach. Negative reinforcement is not punishment, which is the mix-up
        almost everyone makes. Punishment decreases behaviour; both kinds of
        reinforcement increase it.
      </p>
    ),
  },
  {
    title: "Isn't positive reinforcement just bribery?",
    body: (
      <p>
        The difference is timing. A bribe comes first and is offered to stop
        something that is already happening &mdash; a sweet handed over
        mid-tantrum. Reinforcement comes after the behaviour you want, on a
        plan set in advance. Confusing the two is understandable, and the
        practical test is simple: if the reward is being negotiated during a
        difficult moment, that is a bribe, and it teaches the difficult moment.
      </p>
    ),
  },
  {
    title: "Why did the reinforcer stop working?",
    body: (
      <p>
        Usually satiation &mdash; a child who has had unlimited access to
        something all morning has no reason to work for it at eleven. It can
        also be that the schedule got too thin too fast, or that the effort
        being asked for went up without the payoff going up. This is why
        preference assessments get repeated rather than done once, and why a
        good programme rotates reinforcers.
      </p>
    ),
  },
  {
    title: "Will my child need rewards forever?",
    body: (
      <p>
        No, and a programme that has no plan to fade them is badly run. The
        sequence is deliberate: reinforce nearly every response while a skill
        is new, then thin the schedule, then move from artificial reinforcers
        to the natural consequences of the skill itself &mdash; a child who
        learns to ask for juice gets juice, and eventually that is the whole
        point. Ask your BCBA what the fading plan is. There should be one.
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
      q: "What is positive reinforcement in ABA?",
      a: "Adding something immediately after a behaviour so that the behaviour becomes more likely to happen again. In ABA a consequence only counts as reinforcement if the behaviour actually increases — it is defined by its measured effect, not by whether the child appeared to enjoy it.",
    },
    {
      q: "What is the difference between positive and negative reinforcement?",
      a: "Both increase a behaviour. Positive reinforcement adds something after the behaviour; negative reinforcement removes something, such as ending a demand when a child appropriately asks for a break. Neither is punishment, which decreases behaviour.",
    },
    {
      q: "Is positive reinforcement the same as bribery?",
      a: "No. A bribe is offered during a difficult moment to make it stop, which teaches the difficult moment. Reinforcement is delivered after the desired behaviour according to a plan decided in advance.",
    },
    {
      q: "Will a child on an ABA programme need rewards forever?",
      a: "No. Reinforcement is delivered densely while a skill is new, then thinned on a schedule, then shifted from artificial reinforcers to the natural consequences of the skill itself. A programme should have an explicit fading plan.",
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
    { "@type": "ListItem", position: 1, name: "Resources", item: `${siteConfig.brand.domain}/resources/` },
    { "@type": "ListItem", position: 2, name: "Positive reinforcement", item: url },
  ],
};

const related = [
  {
    href: "/resources/aba-therapy-examples/",
    label: "ABA therapy examples",
    note: "Reinforcement, prompting and chaining in ordinary family moments.",
  },
  {
    href: "/resources/discrete-trial-training/",
    label: "Discrete trial training",
    note: "Where reinforcement sits inside a structured teaching trial.",
  },
  {
    href: "/resources/what-is-aba/",
    label: "What is ABA therapy?",
    note: "The field this term belongs to, explained without jargon.",
  },
  {
    href: "/resources/autism-therapy-types/",
    label: "Types of autism therapy",
    note: "What else belongs in the week beside ABA.",
  },
  {
    href: "/services/telehealth/",
    label: "Parent coaching",
    note: "Learning to run these strategies yourself, between sessions.",
  },
  {
    href: "/faq/",
    label: "Questions families ask",
    note: "What a session looks like, and how hours get decided.",
  },
];

export default function PositiveReinforcementPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/resources/" className="underline underline-offset-4 hover:text-garden">
              Resources
            </Link>{" "}
            / Positive reinforcement
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            The word doesn&rsquo;t mean what almost everyone thinks it means.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            In ABA, &ldquo;positive&rdquo; means something was added &mdash;
            not that it was nice. And nothing counts as reinforcement unless
            the behaviour actually goes up. Everything else on this page
            follows from those two sentences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="four-heading">
        <h2 id="four-heading" className="display display-h2">
          The four quadrants, without the jargon
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Two questions: is something being added or removed, and does the
          behaviour go up or down? That is the whole grid.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["Positive reinforcement", "Add something → behaviour increases", "Your child hands you a picture card for juice, and gets juice. Asking goes up.", "bg-mint"],
            ["Negative reinforcement", "Remove something → behaviour increases", "Your child signs “break”, and the demand is paused. Asking for a break goes up — and that is a skill worth teaching.", "bg-butter"],
            ["Positive punishment", "Add something → behaviour decreases", "A reprimand after a behaviour. Rarely used in responsible modern practice, and never as a first-line plan.", "bg-peach"],
            ["Negative punishment", "Remove something → behaviour decreases", "Losing access to a toy after throwing it. Common in everyday parenting; used sparingly and with a plan in good programmes.", "bg-mint"],
          ].map(([t, s, d, tint]) => (
            <li key={t} className={`rounded-[30px] ${tint} p-7`}>
              <h3 className="display-round display-round-md">{t}</h3>
              <p className="eyebrow mt-3 text-coral">{s}</p>
              <p className="mt-3 text-spruce-soft">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-spruce-soft">
          A well-run programme lives almost entirely in the first two boxes.
          If you are told a plan relies on the bottom two, that is a
          conversation to have in detail before you agree to it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20" aria-labelledby="pr-faq">
        <h2 id="pr-faq" className="display display-h2">
          What parents actually ask about reinforcement
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={0} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/resources/what-is-aba/" className="btn btn-outline">
            What ABA actually is
          </Link>
          <Link href="/resources/aba-therapy-examples/" className="btn btn-outline">
            Examples from real sessions
          </Link>
        </div>
      </section>
      <RelatedLinks links={related} />
    </>
  );
}
