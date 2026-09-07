import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Discrete Trial Training (DTT), Explained for Parents",
  description:
    "What discrete trial training is, the four parts of a trial, how it differs from natural environment teaching, when each is the right tool, and the fair criticisms of DTT.",
  alternates: { canonical: "/resources/discrete-trial-training/" },
};

const url = `${siteConfig.brand.domain}/resources/discrete-trial-training/`;

const faq: AccordionItem[] = [
  {
    title: "Is DTT the same thing as ABA?",
    body: (
      <p>
        No — it&rsquo;s one teaching method inside a much larger field. People
        conflate them because DTT is the most recognizable image of ABA: a
        child and an adult at a small table. A modern program usually uses
        several methods, and for many children most of the day looks nothing
        like a table.
      </p>
    ),
  },
  {
    title: "Why do people criticize DTT?",
    body: (
      <p>
        Three fair criticisms. It can be repetitive in a way that&rsquo;s
        unpleasant for a child. Skills learned at a table don&rsquo;t
        automatically show up in real life unless someone deliberately plans
        for that. And it&rsquo;s adult-led by design, which makes it easy to
        run past a child&rsquo;s tolerance if nobody is watching for that. All
        three are avoidable, and all three happen in badly-run programs.
      </p>
    ),
  },
  {
    title: "How many trials is normal?",
    body: (
      <p>
        There&rsquo;s no universal number, and a number by itself is a bad
        measure of a program. What matters is whether a child is learning and
        whether they&rsquo;re still willing to participate. Ask your BCBA how
        they decide when to stop a teaching block — a good answer involves the
        child&rsquo;s behavior, not a quota.
      </p>
    ),
  },
  {
    title: "What is errorless teaching?",
    body: (
      <p>
        Prompting immediately so the child gets it right the first time, then
        fading the prompt across trials until they&rsquo;re doing it alone. It
        avoids letting a child practice a mistake, and it keeps early learning
        from being an exercise in failing repeatedly. Most modern programs lean
        on it heavily.
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
      q: "Is discrete trial training the same as ABA?",
      a: "No. DTT is one teaching method within applied behavior analysis. Modern programs typically combine it with natural environment teaching and other methods.",
    },
    {
      q: "What are the parts of a discrete trial?",
      a: "An instruction or cue, an optional prompt, the child's response, and a consequence — reinforcement for a correct response or a correction procedure — followed by a brief pause before the next trial.",
    },
    {
      q: "Why is discrete trial training criticized?",
      a: "Because it can be repetitive, because skills taught at a table do not automatically generalize to real life without planning, and because it is adult-led and can be run past a child's tolerance in poorly supervised programs.",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Discrete trial training",
      item: url,
    },
  ],
};

export default function DttPage() {
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
              href="/resources/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Resources
            </Link>{" "}
            / Discrete trial training
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            One skill, broken into pieces small enough to win.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Discrete trial training is the method people picture when they
            picture ABA. It is a real tool with real strengths and real
            failure modes — and it is one method among several, not the whole
            of therapy.
          </p>
        </div>
      </section>

      {/* ───────────────── ANATOMY OF A TRIAL ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="trial-heading"
      >
        <h2 id="trial-heading" className="display display-h2">
          What one trial is
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          A trial takes a few seconds and has four parts. Then a short pause,
          and the next one begins.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "1",
              t: "The cue",
              d: "A short, clear instruction or presentation — “Touch red,” or two cards placed on the table. Short on purpose: extra words are extra work.",
            },
            {
              n: "2",
              t: "The prompt",
              d: "Help, given immediately if needed, so the child succeeds rather than guesses. Prompts are faded deliberately across trials until they're gone.",
            },
            {
              n: "3",
              t: "The response",
              d: "What the child does. Correct, incorrect, or no response — all three are information, and all three get recorded.",
            },
            {
              n: "4",
              t: "The consequence",
              d: "Reinforcement for a correct response — something the child actually values, which is why preference assessments matter — or a brief, matter-of-fact correction.",
            },
          ].map((s, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach", "bg-mint"];
            return (
              <li key={s.n} className={`field-card ${tints[i]} p-6`}>
                <p className="display text-3xl text-garden">{s.n}</p>
                <h3 className="display display-h3 mt-1">{s.t}</h3>
                <p className="mt-2 text-spruce-soft">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ───────────────── DTT vs NET ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="net-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="net-heading" className="display display-h2">
            DTT and natural environment teaching
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-spruce-soft">
            The other main method teaches inside play and daily routines,
            following the child&rsquo;s lead. Most good programs use both, and
            the interesting question isn&rsquo;t which is better — it&rsquo;s
            which one a particular skill needs today.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="field-card bg-mint p-6 sm:p-8">
              <h3 className="display display-h3">DTT is better at</h3>
              <ul className="mt-3 space-y-2 text-spruce-soft">
                <li>· Building a brand-new skill from nothing</li>
                <li>· Lots of practice in a short window</li>
                <li>· Skills that need precision, like discriminating between similar things</li>
                <li>· Clean data, because the conditions are controlled</li>
              </ul>
            </div>
            <div className="field-card bg-butter p-6 sm:p-8">
              <h3 className="display display-h3">
                Natural environment teaching is better at
              </h3>
              <ul className="mt-3 space-y-2 text-spruce-soft">
                <li>· Skills actually showing up in real life</li>
                <li>· Motivation, because the child chose the activity</li>
                <li>· Communication that has an immediate real payoff</li>
                <li>· Staying pleasant, which matters more than people admit</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-spruce-soft">
            A common pattern: teach it at the table until it&rsquo;s solid,
            then move it into play, snack, and the rest of the day on purpose.
            The moving part is not optional — a skill that only exists at a
            table isn&rsquo;t a skill yet.
          </p>
        </div>
      </section>

      {/* ───────────────── WHAT TO WATCH FOR ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="watch-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="watch-heading" className="display display-h2">
            What to watch for as a parent
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Is your child willing? Reluctance that gets steamrolled is the warning sign that matters most.",
              "Are prompts fading, or has your child learned to wait for help?",
              "Is anyone moving these skills off the table and into the day?",
              "Are the reinforcers things your child actually likes, checked regularly, or the same sticker from six months ago?",
              "Does the program stop things that aren't working, and can your BCBA show you the data that decided it?",
              "Does your child get to say no anywhere in this, and does the plan respond when they do?",
            ].map((q) => (
              <li key={q} className="flex gap-3 rounded-3xl bg-white/80 p-5">
                <span aria-hidden="true" className="text-xl leading-none text-garden">
                  ?
                </span>
                <span className="text-spruce-soft">{q}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-spruce-soft">
            You are allowed to ask all of these, of us or anyone else, and to
            keep asking until the answers are specific.{" "}
            <Link
              href="/resources/what-is-aba/"
              className="font-semibold text-garden underline underline-offset-4"
            >
              More on how to judge a program
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24"
        aria-labelledby="dtt-faq-heading"
      >
        <h2 id="dtt-faq-heading" className="display display-h2">
          DTT questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>
    </>
  );
}
