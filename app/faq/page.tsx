import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import StickyAccordion, { type StickyItem } from "@/components/StickyAccordion";
import FeatureStrip from "@/components/FeatureStrip";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Straight answers about ABA therapy, autism diagnosis, insurance and Medicaid coverage, waitlists, hours, and what happens when you get in touch.",
  alternates: { canonical: "/faq/" },
};

const url = `${siteConfig.brand.domain}/faq/`;

const faqs: { q: string; a: string }[] = [
  {
    q: "Do we need a diagnosis to start ABA therapy?",
    a: "For insurance-funded ABA, almost always yes — it's authorized as treatment for a documented autism diagnosis. But you don't need one to contact us, and you don't need one to start your state's early intervention program if your child is under three. If you're waiting on an evaluation, call anyway and we'll tell you what to do in the meantime.",
  },
  {
    q: "How much does ABA therapy cost us?",
    a: "With Medicaid, most families pay nothing out of pocket. With a private plan it depends on your deductible, coinsurance, and out-of-pocket maximum — real numbers we can read off your specific plan in one phone conversation. Every state also has a cost page on this site.",
  },
  {
    q: "How long is the wait to start?",
    a: `${siteConfig.intake.startTimeframe}. That depends on your state, your plan's authorization speed, and which setting you need — in-home routes usually open soonest. If it isn't true for your address on the day you call, we'll say so rather than put you on a list and go quiet.`,
  },
  {
    q: "How many hours a week will my child do?",
    a: "That's a clinical decision your BCBA writes into the treatment plan and your insurer authorizes — not a number a website should give you. It ranges widely, from a focused program targeting a few specific skills to a comprehensive early-childhood program. Your state page lists whatever your state publishes about authorized hours.",
  },
  {
    q: "What if I have a very full daily schedule?",
    a: "Then say so when you get in touch, because it changes what we'd recommend. In-home sessions remove the commute, telehealth coaching can happen during the routine that's actually hard, and a focused program targeting two or three goals is a legitimate choice — not a lesser one.",
  },
  {
    q: "Can therapy happen at my child's school?",
    a: "Sometimes, and it needs two separate yes-answers: your health plan has to cover services during school hours, and the district has to allow an outside clinician in the building. Both vary a lot. We check the plan language first, because that one we can answer quickly.",
  },
  {
    q: "Do you take my insurance?",
    a: "Network status varies by plan and by state, and we'd rather tell you the truth when you get in touch than post a blanket claim. Send us your plan details and we'll check it while you wait — and if the answer is no, we'll tell you what your options are anyway.",
  },
  {
    q: "Is ABA the right choice for my child?",
    a: "Honestly, not always — and any provider who says otherwise is selling. ABA is well-supported for teaching skills, especially communication and daily-living routines. If what your child needs most is speech therapy, an OT, or a different evaluation first, we'll say that.",
  },
  {
    q: "What happens when you get in touch?",
    a: `One ${siteConfig.intake.callLength} conversation. You tell us about your child and your insurance; we tell you what's covered, what the honest timeline is, and what the next step is. No script and no pressure, and it costs nothing.`,
  },
  {
    q: "What is the ABA therapy age range?",
    a: "There is no upper or lower age limit in the method itself — ABA is used from toddlers through adulthood. What has limits is funding: most insurance coverage and state mandates are written around children and adolescents, and some plans set an explicit age cap. The evidence for early intensive intervention is strongest under five, but 'started later' is not the same as 'too late', and plenty of useful work happens with school-age children and teenagers on entirely different goals.",
  },
  {
    q: "Can we get ABA therapy without a diagnosis?",
    a: "Almost never through insurance — a current diagnostic evaluation from a qualified clinician is what authorizes the benefit, and payers ask for it by name. The exception worth knowing is that you do not need a diagnosis to start elsewhere: early intervention will evaluate a child under three for free without one, and a school district evaluation needs no diagnosis either. If you are waiting on a diagnostic appointment, start those in parallel rather than waiting.",
  },
  {
    q: "How does ABA prior authorization work?",
    a: "Your provider submits the diagnostic evaluation, an assessment and a proposed treatment plan with requested hours; the plan reviews it and approves a number of hours for a set period, usually six months. Then it repeats. Two things go wrong most often: a diagnostic report older than the plan's recency limit, and requested hours that arrive without the assessment data to justify them. Both are avoidable, and both cost weeks when they are not.",
  },
  {
    q: "How many hours of ABA therapy does a child need?",
    a: "It is set by assessment, not by a standard package. Focused programmes targeting a few specific skills typically run in the low tens of hours a month; comprehensive early intervention programmes run far higher. Be sceptical in both directions — a provider who recommends the maximum for every child is not assessing, and one that offers only a couple of hours a week may not be able to move goals that matter. Ask what the recommended hours are based on and what would change them.",
  },
  {
    q: "Do I need an ABA therapy referral?",
    a: "Sometimes — whether an ABA therapy referral is required depends on your plan, not on us. Plans that require a referral usually want one from your child's pediatrician or the diagnosing clinician. What every plan wants regardless is the diagnostic evaluation. When you contact us we check both requirements against your specific plan before anything is scheduled, so you are not sent back to square one after an appointment.",
  },
  {
    q: "Does ABA therapy telehealth actually work?",
    a: "ABA therapy telehealth splits in two. For parent coaching and BCBA supervision it works genuinely well — and for many families it is the part of the programme that changes the most, because it puts a clinician in the room at the actual difficult moment rather than in a clinic afterwards. Direct one-to-one work with a young child over video is harder and depends on the child. In practice we use telehealth ABA therapy alongside in-person sessions rather than instead of them, and how the mix is set depends on your child and how far you are from a clinician.",
  },
  {
    q: "What does an ABA session look like?",
    a: "Mostly like play, to an outside eye. A technician arrives with materials, follows the plan the BCBA wrote, and works on a handful of goals across two or three hours — embedded in games, snacks, getting dressed, whatever the goal actually requires. They take data as they go. A parent is usually nearby and often pulled in directly. What it should not look like is a child at a table doing drills for hours; that is one method, not the whole of it.",
  },
  {
    q: "How much does ABA therapy cost with insurance?",
    a: "Your plan's normal cost-sharing — deductible, then copay or coinsurance, up to your out-of-pocket maximum — and not the eye-watering annual figures published online, which are full-price billing that insurers negotiate against. With Medicaid, most families pay nothing. The number that actually matters is your out-of-pocket maximum, because a programme running weekly for a year will usually reach it.",
  },
];

const items: StickyItem[] = faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }));

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-16 text-center sm:px-10 sm:py-20">
          <p className="eyebrow">Questions, answered plainly</p>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-4xl">
            Ask us the awkward ones.
          </h1>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg text-ink-muted">
            The questions families actually ask when you get in touch — including
            the ones where the honest answer isn&rsquo;t the one that gets us a
            client.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <CallCta className="btn btn-outline" fallbackLabel="Talk to a person" />
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "clock", text: "A real person, not a phone tree" },
          { icon: "shield", text: "No cost and no obligation" },
          { icon: "map", text: "Answers specific to your state" },
        ]}
      />

      <StickyAccordion
        eyebrow="Frequently asked"
        heading="The questions we get most."
        items={items}
        cta={{ href: "/getting-started/", label: "Check my coverage" }}
      />
    </>
  );
}
