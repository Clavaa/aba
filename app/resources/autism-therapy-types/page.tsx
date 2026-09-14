import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * "Types of therapy for autism" / "best therapy for autism".
 *
 * We are an ABA provider writing an honest comparison that includes the
 * therapies we don't sell, and says plainly that there is no single best
 * therapy for autism. That is the entire value of the page — a parent
 * comparing options can tell within a paragraph whether they are reading a
 * guide or a sales pitch.
 */

export const metadata: Metadata = {
  title: "Types of Autism Therapy, Compared",
  description:
    "ABA, speech, occupational therapy, developmental approaches, social skills groups and parent training — what each one is actually for, and why there is no single best therapy for autism.",
  alternates: { canonical: "/resources/autism-therapy-types/" },
};

const url = `${siteConfig.brand.domain}/resources/autism-therapy-types/`;

const THERAPIES = [
  {
    t: "Applied behavior analysis (ABA)",
    f: "Learning new skills and reducing behaviours that are unsafe or block learning",
    d: "Breaks skills into teachable pieces, teaches them deliberately, reinforces progress and measures whether it is working. Strongest evidence base of the options here, and the most commonly covered by insurance. Fair criticism: it can be delivered rigidly or at too many hours by providers who aren't watching the child's tolerance.",
  },
  {
    t: "Speech and language therapy",
    f: "Communication — spoken, signed, or via a device",
    d: "A speech-language pathologist works on expressive and receptive language, articulation, and alternative communication including AAC devices. For a non-speaking child this is often the single highest-value service, and it runs alongside ABA rather than instead of it.",
  },
  {
    t: "Occupational therapy (OT)",
    f: "Daily living, motor skills and sensory needs",
    d: "Dressing, feeding, handwriting, coordination, and how a child responds to noise, texture and movement. If the barrier is a fine-motor skill or a sensory environment rather than a learning one, OT is the right room to be in.",
  },
  {
    t: "Developmental / relationship-based approaches",
    f: "Social and emotional connection, led by the child's interests",
    d: "DIR/Floortime and similar models build on what the child is already doing rather than setting an adult agenda. Evidence is thinner than for ABA and quality varies widely by practitioner, but many families combine it with other services and value what it adds.",
  },
  {
    t: "Social skills groups",
    f: "Peer interaction with other children",
    d: "Structured practice at conversation, play and reading social cues, with actual peers present. Most useful once a child already has some communication in place — which is why it is often a later step rather than a first one.",
  },
  {
    t: "Parent-mediated intervention",
    f: "Teaching the parent to run the strategies",
    d: "The therapy hours a child gets are always fewer than the waking hours they live. Coaching parents in the same strategies extends the reach of everything else, and it is the component with the best ratio of results to cost. Any good ABA programme has this built in.",
  },
  {
    t: "Medication",
    f: "Specific co-occurring symptoms — not autism itself",
    d: "No medication treats autism. A prescriber may treat co-occurring ADHD, anxiety, sleep problems or severe irritability, which can make everything else more workable. That is a conversation with a physician, not a therapy provider.",
  },
];

const faq: AccordionItem[] = [
  {
    title: "What is the best therapy for autism?",
    body: (
      <>
        <p>
          There isn&rsquo;t one, and any provider who names their own service
          as the answer is selling. The right question is narrower: what is the
          specific barrier right now? If a child has no reliable way to
          communicate, speech and language therapy is urgent. If they are
          unsafe or cannot access learning, ABA is where to start. If dressing
          and mealtimes are the daily crisis, that is OT.
        </p>
        <p className="mt-3">
          What the evidence does support consistently is starting early,
          running enough hours to matter, and involving parents directly. Those
          three hold across approaches.
        </p>
      </>
    ),
  },
  {
    title: "Can my child do more than one therapy at once?",
    body: (
      <p>
        Yes, and most do. ABA, speech and OT routinely run in parallel and
        should be talking to each other &mdash; ask whether your providers
        actually share goals, because when they don&rsquo;t you get three teams
        working on the same skill three different ways. The real limit is your
        child&rsquo;s stamina and your family&rsquo;s week, not a clinical rule.
      </p>
    ),
  },
  {
    title: "Is ABA controversial?",
    body: (
      <p>
        Parts of its history genuinely are, and some autistic adults describe
        harm from how it was practised decades ago &mdash; particularly
        compliance-focused programmes and the use of aversives, which are not
        part of responsible modern practice. The criticisms worth taking
        seriously today are about delivery: too many hours, goals set for adult
        convenience rather than the child&rsquo;s benefit, and suppressing
        harmless stimming. Those are all things you can ask a provider about
        directly, and the answer tells you a lot.
      </p>
    ),
  },
  {
    title: "What therapy is covered by insurance?",
    body: (
      <p>
        ABA has the broadest mandated coverage &mdash; every state requires
        some form of it under state-regulated plans, and Medicaid covers
        medically necessary ABA for eligible children. Speech and OT are
        commonly covered but often with visit limits. Developmental approaches
        and social skills groups are the least reliably covered. Our{" "}
        <Link href="/insurance/" className="font-semibold text-coral underline underline-offset-4">
          insurance pages
        </Link>{" "}
        walk through what to check.
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
      q: "What is the best therapy for autism?",
      a: "There is no single best therapy for autism. The right starting point depends on the child's most pressing barrier: speech and language therapy when communication is the issue, ABA when safety or learning access is, occupational therapy for daily living and sensory needs. Starting early, sufficient hours, and parent involvement are supported across approaches.",
    },
    {
      q: "What types of therapy are used for autism?",
      a: "Applied behavior analysis, speech and language therapy, occupational therapy, developmental and relationship-based approaches such as DIR/Floortime, social skills groups, parent-mediated intervention, and medication for co-occurring conditions rather than for autism itself.",
    },
    {
      q: "Can a child receive more than one autism therapy at the same time?",
      a: "Yes. ABA, speech therapy and occupational therapy commonly run in parallel. The practical limits are the child's stamina and the family's schedule, and providers should be coordinating goals with each other.",
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
    { "@type": "ListItem", position: 2, name: "Types of autism therapy", item: url },
  ],
};

const related = [
  {
    href: "/resources/what-is-aba/",
    label: "What is ABA therapy?",
    note: "The one on this list we provide, including the criticism answered.",
  },
  {
    href: "/resources/autism-resources-for-parents/",
    label: "Autism resources for parents",
    note: "Six free programmes in every state, and the first-month checklist.",
  },
  {
    href: "/resources/autism-levels/",
    label: "Autism levels 1, 2 and 3",
    note: "What the diagnostic report means for which therapies to pursue.",
  },
  {
    href: "/autism-evaluation/",
    label: "Getting an evaluation",
    note: "The appointment that has to come before most of this.",
  },
  {
    href: "/insurance/",
    label: "Insurance and Medicaid",
    note: "Which of these therapies is actually covered, and how reliably.",
  },
  {
    href: "/cost-of-aba-therapy/",
    label: "What ABA costs",
    note: "Published Medicaid rates by state, and what families really pay.",
  },
];

export default function AutismTherapyTypesPage() {
  const tints = ["bg-mint", "bg-butter", "bg-peach"];
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-peach p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/resources/" className="underline underline-offset-4 hover:text-garden">
              Resources
            </Link>{" "}
            / Types of autism therapy
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            Seven kinds of autism therapy, and what each is actually for.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            We provide one of these. Here is the honest version of all seven,
            including the ones we don&rsquo;t sell &mdash; because the useful
            question is not which therapy is best, it is which barrier you are
            trying to get past right now.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="types-heading">
        <h2 id="types-heading" className="display display-h2">
          Autism therapy types, compared
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Each of these answers a different question. Several of them belong in
          the same week.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {THERAPIES.map((x, i) => (
            <li key={x.t} className={`rounded-[30px] ${tints[i % 3]} p-7`}>
              <h3 className="display-round display-round-md">{x.t}</h3>
              <p className="eyebrow mt-3 text-coral">Best for: {x.f}</p>
              <p className="mt-3 text-spruce-soft">{x.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20" aria-labelledby="types-faq">
        <h2 id="types-faq" className="display display-h2">
          The questions underneath the comparison
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={0} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/resources/what-is-aba/" className="btn btn-outline">
            What ABA actually is
          </Link>
          <Link href="/autism-evaluation/" className="btn btn-outline">
            Getting an evaluation first
          </Link>
          <Link href="/getting-started/" className="btn btn-primary">
            Check what&rsquo;s covered
          </Link>
        </div>
      </section>
      <RelatedLinks links={related} />
    </>
  );
}
