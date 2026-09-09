import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import HeroIntakeForm from "@/components/HeroIntakeForm";
import FeatureStrip from "@/components/FeatureStrip";
import StickyAccordion, { type StickyItem } from "@/components/StickyAccordion";
import ImageTextSection from "@/components/ImageTextSection";

export const metadata: Metadata = {
  title: "Find Someone Who Can Diagnose Autism",
  description:
    "Who can actually diagnose autism, how to find one near you, what to say when you call, how long the wait really is, and the two free evaluations you can request yourself.",
  alternates: { canonical: "/find-a-diagnostician/" },
};

const url = `${siteConfig.brand.domain}/find-a-diagnostician/`;

const who = [
  {
    t: "Developmental-behavioral pediatrician",
    d: "The specialist most associated with autism diagnosis in children. Longest waits, and worth getting on the list first.",
  },
  {
    t: "Child psychologist or neuropsychologist",
    d: "Often the fastest route to a thorough evaluation, and frequently the one that produces the most useful written report for schools.",
  },
  {
    t: "Child psychiatrist",
    d: "Can diagnose and can also manage co-occurring conditions and medication where those become relevant.",
  },
  {
    t: "Pediatric neurologist",
    d: "Common where seizures, regression, or other neurological questions sit alongside the developmental ones.",
  },
  {
    t: "Your own pediatrician",
    d: "Some diagnose straightforward cases directly. Always worth asking whether yours does before you wait months for a specialist.",
  },
  {
    t: "An early intervention or school team",
    d: "These determine eligibility for services, which is not the same as a medical diagnosis — but they are free, fast by comparison, and you can start them yourself.",
  },
];

const faqs: StickyItem[] = [
  {
    q: "How do I actually find one near me?",
    a: (
      <>
        <p>Four places, in the order that tends to work:</p>
        <ol className="mt-3 space-y-2">
          <li>
            <strong className="text-ink">Your pediatrician&rsquo;s referral.</strong>{" "}
            Ask for the referral to be sent today, then call the clinic
            yourself to confirm it arrived — referrals get lost constantly.
          </li>
          <li>
            <strong className="text-ink">Your insurer&rsquo;s directory.</strong>{" "}
            Filter for developmental pediatrics or child psychology. It will be
            partly out of date; call before you count on any entry.
          </li>
          <li>
            <strong className="text-ink">Your state&rsquo;s university hospital.</strong>{" "}
            Academic medical centers usually run the largest developmental
            clinics, and often the longest waitlists — which is why you get on
            them early.
          </li>
          <li>
            <strong className="text-ink">Your early intervention program or school district.</strong>{" "}
            Free, self-referred, and running in parallel with everything above.
          </li>
        </ol>
      </>
    ),
  },
  {
    q: "What do I say when I call?",
    a: (
      <p>
        Use the words <strong className="text-ink">&ldquo;I would like a
        developmental evaluation for possible autism.&rdquo;</strong> Then give
        two or three concrete examples of what you see and when it started.
        Vague worry gets a wait-and-see; specifics get an appointment. Ask to
        be put on the cancellation list at every practice you call — that is
        how people get seen months early.
      </p>
    ),
  },
  {
    q: "How long is the wait, honestly?",
    a: (
      <p>
        Often several months, and closer to a year in some regions. That is the
        single most important fact to plan around, and it is why the order
        matters: get on lists first, sort out the details while you wait. If
        somebody offers you an appointment next week, ask what kind of
        clinician it is with and what the evaluation involves.
      </p>
    ),
  },
  {
    q: "Can I skip the wait with a private evaluation?",
    a: (
      <p>
        Sometimes, at private cost, and the shorter wait is real. Before paying,
        ask two questions: will my insurer accept this evaluation for
        authorizing therapy, and will my school district accept it. An
        evaluation that nobody downstream accepts is an expensive second
        opinion.
      </p>
    ),
  },
  {
    q: "Do I need a diagnosis before calling you?",
    a: (
      <p>
        No. Plenty of families contact us while the evaluation is still pending,
        and we&rsquo;ll tell you what the path looks like in your state and
        what to do in the meantime. Insurance-funded ABA generally does require
        a diagnosis — but the free doors don&rsquo;t, and those you can open
        today.
      </p>
    ),
  },
];

export default function FindADiagnosticianPage() {
  const states = getStateLinks();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: [
            {
              q: "Who can diagnose autism?",
              a: "A developmental-behavioral pediatrician, a child psychologist or neuropsychologist, a child psychiatrist, or a pediatric neurologist. Some general pediatricians diagnose straightforward cases. Early intervention and school teams determine service eligibility, which is not the same as a medical diagnosis.",
            },
            {
              q: "How long is the wait for an autism evaluation?",
              a: "Often several months and closer to a year in some regions. Get on waitlists first and ask to be added to cancellation lists at every practice you call.",
            },
            {
              q: "What should I say when I call to request an evaluation?",
              a: "Say 'I would like a developmental evaluation for possible autism' and give two or three concrete examples of what you see and when it started. Specific examples get appointments; vague concern gets wait-and-see.",
            },
          ].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-14 sm:px-10 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="eyebrow">Does my child have autism?</p>
              <h1 className="display display-hero mt-5">
                Find someone who can actually tell you.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">
                Only a qualified clinician can diagnose autism — not a website,
                and not a checklist. Here is exactly who those clinicians are,
                how to find one near you, and what to say when you call so you
                get an appointment instead of a shrug.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/autism-evaluation/screener/" className="btn btn-outline">
                  Answer a few questions first
                </Link>
              </div>
            </div>
            <div className="lg:pl-6">
              <HeroIntakeForm heading="Not sure where to start?" states={states} />
            </div>
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "clock", text: "Waits are months — get on lists first" },
          { icon: "shield", text: "Two free evaluations you can request yourself" },
          { icon: "map", text: "We know the path in all 50 states" },
        ]}
      />

      <section className="mx-auto max-w-[1400px] px-4 py-8" aria-labelledby="who-heading">
        <p className="eyebrow text-center">Who diagnoses autism</p>
        <h2
          id="who-heading"
          className="display-round display-round-xl mx-auto mt-5 max-w-3xl text-center text-coral"
        >
          Six people who can help, and what each one is for.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {who.map((w, i) => {
            const tints = ["bg-teal-80", "bg-peach-100", "bg-beige-80"];
            return (
              <div key={w.t} className={`rounded-[30px] ${tints[i % 3]} p-7`}>
                <h3 className="display-round display-round-md">{w.t}</h3>
                <p className="mt-3 text-ink-muted">{w.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <ImageTextSection
        eyebrow="Do these at the same time"
        heading="Two of the three doors are free."
        body={
          <>
            <p>
              Under three, every state runs an early intervention program you
              can refer your own child to — no doctor, no diagnosis, no cost.
              From three up, your local public school district must evaluate a
              child suspected of having a disability, including one who
              doesn&rsquo;t attend that school yet.
            </p>
            <p className="mt-4">
              Neither waits on the medical evaluation, and neither closes it.
              The most common expensive mistake is doing these one at a time.
            </p>
          </>
        }
        cta={{ href: "/autism-evaluation/", label: "How the three doors work" }}
        photoIntent="Parent at a kitchen table with a notebook and phone, making the call, morning light"
        photo="/photos/parent-on-phone.jpg"
        photoAlt="A father on the phone at his kitchen counter with a laptop and notepad open, his toddler eating behind him"
        tint="bg-peach-100"
      />

      <StickyAccordion
        eyebrow="Getting seen"
        heading="The practical questions."
        items={faqs}
        cta={{ href: "/getting-started/", label: "Talk it through with us" }}
      />
    </>
  );
}
