import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * Signs by age. Two things here that most versions of this page lack:
 * the section on how autism is missed in girls and in kids who mask, and
 * the explicit note that any loss of skills is its own referral trigger.
 */

export const metadata: Metadata = {
  title: "Signs of Autism by Age: 12 Months to Teens",
  description:
    "Early signs of autism at 12 months, 18 months, 2, 3–4, and school age — what they look like in real life, why autism is missed in girls, and when to act.",
  alternates: { canonical: "/resources/signs-of-autism-by-age/" },
};

const url = `${siteConfig.brand.domain}/resources/signs-of-autism-by-age/`;

const ages = [
  {
    age: "Around 12 months",
    tint: "bg-mint",
    signs: [
      "Doesn't turn when you say their name, even though hearing seems fine",
      "Doesn't babble back and forth with you",
      "Doesn't wave, reach up, or use gestures",
      "Rarely makes eye contact during play or feeding",
      "Doesn't look where you point",
    ],
    note: "At this age the picture is often subtle, and one item on its own means very little. What clinicians look for is a pattern across several.",
  },
  {
    age: "Around 18 months",
    tint: "bg-butter",
    signs: [
      "No pointing to show you things — pointing to ask is different from pointing to share",
      "Few or no single words, or words that came and went",
      "Doesn't bring you objects just to show them",
      "No pretend play — no feeding the doll, no toy phone to the ear",
      "Lines things up or repeats the same action for long stretches",
    ],
    note: "This is when routine screening usually happens at well visits, and it's the age the M-CHAT was built for.",
  },
  {
    age: "Around 2 years",
    tint: "bg-peach",
    signs: [
      "Not putting two words together",
      "Repeats phrases from shows or from you rather than using words to ask",
      "Limited interest in other children",
      "Strong reactions to sound, texture, or light",
      "Big distress when a routine changes",
    ],
    note: "A two-year-old with strong receptive understanding but no expressive words still warrants a look — comprehension doesn't rule anything out.",
  },
  {
    age: "3 to 4 years",
    tint: "bg-mint",
    signs: [
      "Plays near other children rather than with them",
      "Conversations don't go back and forth — mostly reciting, questioning, or one topic",
      "Play is repetitive and follows the same script each time",
      "Transitions between activities regularly end in meltdowns",
      "Preschool or daycare has raised a concern",
    ],
    note: "Teachers who see dozens of children this age often notice patterns before parents do. Take that call seriously even if it stings.",
  },
  {
    age: "School age and older",
    tint: "bg-butter",
    signs: [
      "Friendships are hard to start and harder to keep without adult scaffolding",
      "Jokes, sarcasm, and social rules land wrong or not at all",
      "Rules and routines must be exactly right, and violations are genuinely distressing",
      "The school day goes fine and the after-school hours fall apart",
      "Sensory environments — cafeterias, assemblies, gym — are unbearable rather than annoying",
    ],
    note: "Later identification is common, especially for kids who coped well until school demands outgrew their strategies. An older child is not a missed window.",
  },
];

const faq: AccordionItem[] = [
  {
    title: "My child does some of these but not others. What does that mean?",
    body: (
      <p>
        Almost nothing on its own — and that&rsquo;s not a brush-off. Autism is
        identified by a pattern across social communication and behavior, seen
        by someone trained to weigh them together. Any list you read on a
        website, including this one, exists to help you decide whether to make
        a call, not to give you an answer.
      </p>
    ),
  },
  {
    title: "My child makes eye contact and is affectionate. Can it still be autism?",
    body: (
      <p>
        Yes. The idea that autistic children avoid eye contact and don&rsquo;t
        want affection is one of the most persistent and most wrong ideas out
        there. Many autistic children are deeply affectionate, make eye contact
        with people they&rsquo;re comfortable with, and still have significant
        differences in social communication.
      </p>
    ),
  },
  {
    title: "Could this be something else?",
    body: (
      <p>
        Absolutely, and finding that out is valuable in itself. Hearing loss,
        speech and language disorders, ADHD, anxiety, and developmental delays
        all overlap with parts of this list. A hearing test is a reasonable
        early step for any child not responding to their name. Every one of
        those alternatives has its own path forward.
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
      q: "What are the early signs of autism at 18 months?",
      a: "Not pointing to show you things, few or no single words, not bringing objects to share, no pretend play, and repetitive actions such as lining objects up. A pattern across several matters more than any single item.",
    },
    {
      q: "Can a child be autistic if they make eye contact and are affectionate?",
      a: "Yes. Many autistic children are affectionate and make eye contact with familiar people while still having significant differences in social communication.",
    },
    {
      q: "Could the signs of autism be something else?",
      a: "Yes. Hearing loss, speech and language disorders, ADHD, anxiety, and developmental delays overlap with many of these signs, which is one reason an evaluation is worth doing.",
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
    { "@type": "ListItem", position: 2, name: "Signs of autism by age", item: url },
  ],
};

export default function SignsByAgePage() {
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
              href="/resources/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Resources
            </Link>{" "}
            / Signs by age
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            What it looks like, age by age.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Written the way you&rsquo;d actually notice it — at the dinner
            table, in the parking lot, at pickup — rather than in clinical
            language. No single item here means anything on its own. Patterns
            mean something.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/autism-evaluation/screener/"
              className="btn btn-primary"
            >
              Answer the parent checklist
            </Link>
            <Link href="/autism-evaluation/" className="btn btn-outline">
              How to get an evaluation
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── THE RED FLAG THAT STANDS ALONE ───────────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-12">
        <div className="field-card border-2 border-err/40 bg-white p-6">
          <h2 className="display display-h3 text-err">
            One thing that doesn&rsquo;t wait for a pattern
          </h2>
          <p className="mt-2 text-spruce-soft">
            Any loss of speech, babbling, or social skills at any age is a
            reason to call your child&rsquo;s doctor now, on its own. Skills
            that appear and then disappear are worth an urgent conversation,
            not a wait-and-see.
          </p>
        </div>
      </section>

      {/* ───────────────── AGE SECTIONS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-12 sm:py-16"
        aria-labelledby="ages-heading"
      >
        <h2 id="ages-heading" className="display display-h2">
          By age
        </h2>
        <div className="mt-8 space-y-4">
          {ages.map((a) => (
            <article key={a.age} className={`field-card ${a.tint} p-6 sm:p-8`}>
              <h3 className="display display-h3">{a.age}</h3>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {a.signs.map((s) => (
                  <li key={s} className="flex gap-3 rounded-2xl bg-white/70 p-4">
                    <span aria-hidden="true" className="text-garden">
                      ·
                    </span>
                    <span className="text-spruce-soft">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-spruce-soft">{a.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────────── MISSED KIDS ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="missed-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="missed-heading" className="display display-h2">
            The children this list misses
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="field-card bg-peach p-6">
              <h3 className="display display-h3">Girls, often</h3>
              <p className="mt-2 text-spruce-soft">
                Autism is identified later in girls on average, partly because
                the picture can look different — intense interests in socially
                ordinary topics, friendships that are copied rather than felt,
                and distress that turns inward instead of outward. A quiet,
                cooperative child who falls apart at home is not a child
                without a problem.
              </p>
            </div>
            <div className="field-card bg-butter p-6">
              <h3 className="display display-h3">Kids who mask</h3>
              <p className="mt-2 text-spruce-soft">
                Some children hold everything together all day by watching
                other people and copying, then collapse the moment they get in
                the car. If school says your child is fine and your evenings
                are unbearable, both can be true — and the second one is the
                one you should describe to a clinician.
              </p>
            </div>
            <div className="field-card bg-mint p-6">
              <h3 className="display display-h3">Kids who talk early</h3>
              <p className="mt-2 text-spruce-soft">
                Early and advanced speech doesn&rsquo;t rule anything out.
                Plenty of autistic children are highly verbal; the difference
                shows up in the back-and-forth of conversation, not in
                vocabulary size.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="signs-faq-heading"
      >
        <h2 id="signs-faq-heading" className="display display-h2">
          Questions parents ask about this list
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Recognize your kid in any of this?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Then the next step is a phone conversation, not more reading. We&rsquo;ll
              tell you how it works where you live.
            </p>
          </div>
          <CallCta className="btn btn-marigold shrink-0" fallbackLabel="Talk to a person" />
        </div>
      </section>
    </>
  );
}
