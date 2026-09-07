import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import Quiz from "@/components/Quiz";
import FeatureStrip from "@/components/FeatureStrip";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import TriageTrio from "@/components/TriageTrio";
import ImageSlot from "@/components/ImageSlot";
import PhoneIcon from "@/components/PhoneIcon";

export const metadata: Metadata = {
  title: "Getting Started — Check My Coverage",
  description:
    "Start ABA therapy the easy way: a one-minute coverage check, one 15-minute call, and we handle the insurance paperwork. Confidential and HIPAA-protected.",
  alternates: {
    canonical: "/getting-started/",
    languages: { en: "/getting-started/", es: "/es/como-empezar/" },
  },
};

const worried: AccordionItem[] = [
  {
    title: "What if my child doesn't have a diagnosis yet?",
    body: (
      <p>
        Start anyway. Tell us what you&rsquo;re seeing — a diagnosis is the key
        that unlocks coverage, and we&rsquo;ll point you to evaluation options
        in your state so you&rsquo;re not googling alone at 1am.
      </p>
    ),
  },
  {
    title: "What happens on the first call?",
    body: (
      <p>
        A real person asks about your child, your state, and your insurance —
        about {siteConfig.intake.callLength.replace("-", " ")}s of talking, zero
        pressure. You&rsquo;ll leave the call knowing your next step, even if
        that step isn&rsquo;t us.
      </p>
    ),
  },
  {
    title: "How fast can therapy actually start?",
    body: (
      <p>
        {siteConfig.intake.startTimeframe} — the slow part is usually insurance
        approval, and we push that paperwork for you. Compare that with the
        months-long waitlists many families are sitting on right now.
      </p>
    ),
  },
  {
    title: "What does it cost us?",
    body: (
      <p>
        The coverage check and the intake call are free, always. With Medicaid,
        most families pay nothing out of pocket for therapy itself; with
        private insurance you pay your plan&rsquo;s normal deductible and
        copays — and we tell you that number before you commit.
      </p>
    ),
  },
];

export default function GettingStartedPage() {
  const states = getStateLinks();

  return (
    <>
      {/* ───────────────── HERO + QUIZ ───────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <h1 className="display display-hero">
                One minute now. Real backup after.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                Answer three quick questions and a real person checks your
                insurance for you — Medicaid or private, in any state. No
                commitment, no jargon, and your answers are confidential and
                HIPAA-protected.
              </p>
              <p className="mt-4 flex items-center gap-2 font-semibold">
                <span aria-hidden="true" className="text-garden">
                  ✓
                </span>
                {siteConfig.intake.startTimeframe}
              </p>
              <p className="mt-2 flex items-center gap-2 font-semibold">
                <span aria-hidden="true" className="text-garden">
                  ✓
                </span>
                With Medicaid, most families pay $0 out of pocket
              </p>
              <p className="mt-2 flex items-center gap-2 font-semibold">
                <span aria-hidden="true" className="text-garden">
                  ✓
                </span>
                Rather talk? Call{" "}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="underline decoration-marigold decoration-2 underline-offset-4 hover:text-garden"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <div className="mt-8 hidden lg:block">
                <ImageSlot
                  intent="Golden-hour photo: caregiver and child building a block tower on the living-room floor of a real home"
                  tint="bg-butter"
                  className="aspect-[16/10]"
                />
              </div>
            </div>

            <div id="quiz" className="scroll-mt-24">
              <Quiz states={states} />
            </div>
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "clock", text: "About a minute to check" },
          { icon: "shield", text: "Confidential and HIPAA-protected" },
          { icon: "ages", text: "A real person calls you back" },
        ]}
      />

      {/* ───────────────── WHAT HAPPENS NEXT ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="next-heading"
      >
        <h2 id="next-heading" className="display display-h2">
          The questions every parent asks first
        </h2>
        <div className="mt-8">
          <Accordion items={worried} defaultOpen={0} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={siteConfig.contact.phoneHref} className="btn btn-primary">
            <PhoneIcon />
            {siteConfig.cta.startIntake} · {siteConfig.contact.phone}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
