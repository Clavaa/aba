import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import ReviewCarousel from "@/components/ReviewCarousel";
import StateSelect from "@/components/StateSelect";
import CoverageGrid from "@/components/CoverageGrid";
import TriageTrio from "@/components/TriageTrio";
import ImageSlot from "@/components/ImageSlot";
import ModalityChips from "@/components/ModalityChips";
import Sprout from "@/components/Sprout";
import PhoneIcon from "@/components/PhoneIcon";

export const metadata: Metadata = {
  // Title + description come from the root layout defaults; the homepage
  // just pins its canonical.
  alternates: { canonical: "/", languages: { en: "/", es: "/es/" } },
};

/* ------------------------------------------------------------------ */
/* Copy: pain/relief accordion — 5th–7th grade reading level           */
/* ------------------------------------------------------------------ */

const painRelief: AccordionItem[] = [
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Calling clinics that never call back",
    body: (
      <p>
        You&rsquo;re on three waitlists. You leave voicemails at nap time. You
        refresh your email at midnight hoping someone, anyone, has an opening.
        Months go by and your child is still waiting.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          You call once. A real person answers, checks your coverage, and tells
          you the honest timeline for your state.{" "}
          {siteConfig.intake.startTimeframe.toLowerCase()}.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Translating your own child to the world",
    body: (
      <p>
        You know what every sound, point, and hand-flap means. Teachers
        don&rsquo;t. Grandparents don&rsquo;t. You spend all day being the only
        interpreter your child has — and it&rsquo;s exhausting.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          Communication is where we start. Your child&rsquo;s plan is built
          around how they connect today — words, pictures, gestures, a device —
          and grows from there, at their pace.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Planning your whole life around meltdowns",
    body: (
      <p>
        You skip the grocery store at busy hours. You carry the exact right
        snack. You brace yourself every time plans change, because you know
        what a hard moment in public costs both of you.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          Behavior is communication. We figure out what the hard moments are
          saying, then teach easier ways to say it — so outings stop feeling
          like a gamble.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Fighting the insurance maze alone",
    body: (
      <p>
        Prior authorizations. Diagnostic paperwork. Letters that say
        &ldquo;denied&rdquo; without saying why. You didn&rsquo;t sign up to be
        a benefits specialist, but here you are, on hold again.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          We do the insurance legwork for you — Medicaid or private plan, in
          every state. We handle the paperwork and the follow-up calls, and we
          tell you what&rsquo;s covered in plain English.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Running on empty and calling it normal",
    body: (
      <p>
        You&rsquo;re the therapist, the advocate, the researcher, and the
        parent — on four hours of sleep. Everyone says &ldquo;take care of
        yourself&rdquo; and nobody says how.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          Backup means you&rsquo;re not the only one anymore. Sessions can
          happen in your home, and parent coaching is part of every plan — so
          the wins keep coming when we&rsquo;re not in the room.
        </p>
      ),
    },
  },
];

/* ------------------------------------------------------------------ */
/* Copy: 4-step get-started accordion                                  */
/* ------------------------------------------------------------------ */

const steps: AccordionItem[] = [
  {
    kicker: "STEP 1",
    title: "Talk to a real person",
    body: (
      <p>
        One {siteConfig.intake.callLength} call. Tell us about your child and
        your insurance. No script, no pressure — if we&rsquo;re not the right
        fit, we&rsquo;ll say so and point you somewhere good.
      </p>
    ),
  },
  {
    kicker: "STEP 2",
    title: "We check your coverage for you",
    body: (
      <p>
        We verify your Medicaid or insurance benefits and handle the prior
        authorization paperwork. You get a plain-English answer about
        what&rsquo;s covered — with Medicaid, most families pay nothing out of
        pocket.
      </p>
    ),
  },
  {
    kicker: "STEP 3",
    title: "Meet your BCBA",
    body: (
      <p>
        A Board Certified Behavior Analyst gets to know your child — what they
        love, what&rsquo;s hard, what you want life to look like — and builds a
        plan around your family, not a template.
      </p>
    ),
  },
  {
    kicker: "STEP 4",
    title: "Start therapy — and see the plan work",
    body: (
      <p>
        Sessions start at home, in a center, at school, or by telehealth.{" "}
        {siteConfig.intake.startTimeframe}. You see goals, progress, and data
        the whole way — no black box.
      </p>
    ),
  },
];

export default function HomePage() {
  const states = getStateLinks();

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <h1 className="display display-hero">
                Let&rsquo;s get your family some backup.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                ABA therapy for kids with autism — at home, in a center, at
                school, or online. Covered by Medicaid and most insurance plans
                in all 50 states and DC. With Medicaid, most families pay
                nothing out of pocket.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/getting-started/" className="btn btn-primary">
                  {siteConfig.cta.primary}
                </Link>
                <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
                  <PhoneIcon />
                  {siteConfig.cta.talk} · {siteConfig.contact.phone}
                </a>
              </div>

              {/* Modality chip strip — each chip links to its service page */}
              <ModalityChips />

              {/* State-selector insurance dropdown — the 50-state differentiator */}
              <div className="mt-7 rounded-3xl bg-white/70 p-4 sm:p-5">
                <StateSelect
                  states={states}
                  label="Accepted plans in"
                  cta="See my state"
                  id="hero-state-select"
                />
              </div>
            </div>

            <div className="relative hidden lg:block">
              <ImageSlot
                intent="Golden-hour photo: parent and child laughing together on the porch of a real home"
                tint="bg-butter"
                className="aspect-[4/5]"
              />
              <Sprout className="absolute -bottom-4 -left-4 h-16 w-16 rotate-[-8deg] text-garden" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── PAIN / RELIEF ACCORDION ─────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="pain-heading">
        <h2 id="pain-heading" className="display display-h2 max-w-3xl">
          What you&rsquo;re doing / how we help
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          You&rsquo;ve been carrying this by yourself. Here&rsquo;s what changes
          when you don&rsquo;t have to.
        </p>
        <div className="mt-8">
          <Accordion items={painRelief} />
        </div>
      </section>

      {/* ─────────────────── INSURANCE / STATE WALL ─────────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="insurance-heading">
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="insurance-heading" className="display display-h2">
            Yes, it&rsquo;s probably covered.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Every state Medicaid program covers ABA for eligible kids, and
            every state has an autism insurance law for private plans. The
            rules just look different in each one — and we know them all.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Plans we work with">
            {siteConfig.acceptedPlans.map((plan) => (
              <li
                key={plan}
                className={`chip bg-white ${
                  plan.startsWith("TODO") ? "border-dashed text-spruce/40" : ""
                }`}
              >
                {/* TODO(config): payer chips fill in from acceptedPlans */}
                {plan.startsWith("TODO") ? "Your plan here" : plan}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-3xl bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="How coverage works in"
              cta={siteConfig.cta.checkState}
              id="insurance-state-select"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────── REVIEWS ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="display display-h2">
          Families, in their own words
        </h2>
        <div className="mt-8">
          <ReviewCarousel />
        </div>
      </section>

      {/* ─────────────────── 4-STEP GET STARTED ─────────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="steps-heading">
        <div className="field-card bg-peach p-6 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="steps-heading" className="display display-h2">
                From first call to first session
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
                Four steps. We do the heavy lifting on every one of them.
              </p>
            </div>
            <Sprout className="hidden h-20 w-20 shrink-0 text-garden sm:block" />
          </div>
          <div className="mt-8">
            <Accordion items={steps} tinted={false} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.startIntake}
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────── 50-STATE COVERAGE GRID ─────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="coverage-heading">
        <h2 id="coverage-heading" className="display display-h2">
          Wherever you are, we&rsquo;re there.
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          All 50 states plus DC — each with its own page explaining exactly how
          ABA coverage works where you live.
        </p>
        <div className="mt-8">
          <CoverageGrid states={states} />
        </div>
      </section>

      {/* ─────────────────────── TRIAGE TRIO ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
