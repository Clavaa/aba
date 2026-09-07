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
import FeatureStrip from "@/components/FeatureStrip";
import Sprout from "@/components/Sprout";
import PhoneIcon from "@/components/PhoneIcon";

export const metadata: Metadata = {
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
      {/* ══════════════════ HERO — inset teal field card ══════════════════ */}
      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 pb-0 pt-16 text-center sm:px-10 sm:pt-20">
          <p className="eyebrow">ABA therapy and backup for your whole family</p>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-5xl">
            Let&rsquo;s get your family some backup.
          </h1>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg text-ink-muted">
            ABA therapy for kids with autism — at home, in a center, at school,
            or online. Covered by Medicaid and most insurance plans in all 50
            states and DC. With Medicaid, most families pay nothing out of
            pocket.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.primary}
            </Link>
            <Link href="/resources/what-is-aba/" className="btn btn-outline">
              What is ABA
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <ModalityChips className="flex flex-wrap justify-center gap-2" />
          </div>

          <div className="mx-auto mt-9 max-w-2xl rounded-[30px] bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="Accepted plans in"
              cta="See my state"
              id="hero-state-select"
            />
          </div>

          {/* Mascot anchor, bleeding off the bottom of the field card */}
          <div className="relative mx-auto mt-12 max-w-3xl">
            <ImageSlot
              intent="Golden-hour photo: parent and child laughing together on the porch of a real home"
              tint="bg-white/60"
              className="aspect-[16/8] rounded-t-[40px]"
            />
            <Sprout className="absolute -top-8 right-6 h-20 w-20 rotate-[8deg] text-coral" />
          </div>
        </div>
      </section>

      {/* ══════════════════ REASSURANCE STRIP ══════════════════ */}
      <FeatureStrip
        features={[
          { icon: "map", text: "All 50 states and DC" },
          { icon: "shield", text: "Medicaid and most insurance plans" },
          { icon: "ages", text: "Toddlers through teens" },
        ]}
      />

      {/* ══════════ TEXT + IMAGE PAIR — "you've done enough alone" ══════════ */}
      <section className="mx-auto mt-20 max-w-[1400px] px-3">
        <div className="grid overflow-hidden lg:grid-cols-2">
          <div className="pair-left bg-peach-100 px-6 py-14 sm:px-12 lg:py-20">
            <p className="eyebrow">Why am I doing this all alone?</p>
            <p className="display display-h2 mt-7 max-w-lg text-coral">
              You&rsquo;ve done enough alone. Let&rsquo;s do the next part
              together.
            </p>
          </div>
          <ImageSlot
            intent="Close, warm detail: a parent's hand and a child's hand on a knitted blanket, afternoon light"
            tint="bg-beige-80"
            className="pair-right min-h-[22rem]"
          />
        </div>
        <div className="mt-10 text-center">
          <Link href="/getting-started/" className="btn btn-primary">
            Get help today
          </Link>
        </div>
      </section>

      {/* ══════════════ GIANT CENTERED STATEMENT ══════════════ */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:py-28">
        <h2 className="display display-hero display-mega mx-auto max-w-5xl">
          Hi, we&rsquo;re here to help your child. Your family. You.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-ink-muted">
          Your child needs ABA therapy,{" "}
          <strong className="text-ink">but what do you need?</strong> We build
          the plan around the whole household — because when the people around
          a child are steadier, the child is steadier too.
        </p>
      </section>

      {/* ═══════ OVERLAP MODULE — photo with a floating panel on top ═══════ */}
      <section className="mx-auto max-w-[1400px] px-3">
        <div className="relative">
          <ImageSlot
            intent="Clinician and child on a playroom floor, child handing over a toy, natural window light"
            tint="bg-teal-90"
            className="min-h-[26rem] field-card lg:min-h-[34rem]"
          />
          <div className="overlap-panel mx-4 -mt-16 bg-teal-80 p-7 sm:p-10 lg:absolute lg:right-10 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[30rem] lg:-translate-y-1/2">
            <p className="eyebrow">ABA therapy</p>
            <h2 className="display display-h2 mt-4">Our core service.</h2>
            <p className="mt-5 text-ink-muted">
              ABA teaches your child the skills they need to thrive — right now
              and for the rest of their life.{" "}
              <strong className="text-ink">
                We take a real-life-focused approach
              </strong>
              , with daily support for the child and the caregivers both.
            </p>
            <Link href="/services/" className="btn btn-primary mt-7">
              Learn all about ABA
            </Link>
            <p className="chip chip-check mt-6">
              <span aria-hidden="true" className="text-coral">
                ✓
              </span>
              Care at home, in center, at school, or online
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ PAIN / RELIEF — cream band ══════════════ */}
      <section
        className="mx-auto mt-24 max-w-[1400px] px-4 sm:mt-32"
        aria-labelledby="pain-heading"
      >
        <p className="eyebrow text-center">What you&rsquo;re carrying</p>
        <h2 id="pain-heading" className="display display-h2 display-mega mt-5">
          What you&rsquo;re doing / how we help
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-ink-muted">
          You&rsquo;ve been carrying this by yourself. Here&rsquo;s what changes
          when you don&rsquo;t have to.
        </p>
        <div className="mx-auto mt-12 max-w-4xl">
          <Accordion items={painRelief} />
        </div>
      </section>

      {/* ══════════════ FIND YOUR STATE — photo + giant headline ══════════════ */}
      <section className="mt-24 bg-peach-100 py-20 sm:mt-32 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 lg:grid-cols-2">
          <ImageSlot
            intent="Wide shot of a bright therapy room: low tables, swing, climbing wall, soft daylight"
            tint="bg-beige-80"
            className="field-card min-h-[24rem]"
          />
          <div>
            <p className="eyebrow">Discover how coverage works near you</p>
            <h2 className="display display-h2 mt-6 text-left text-coral">
              Find your state.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-ink-muted">
              All 50 states plus DC — each with its own page explaining exactly
              how ABA coverage works where you live, who runs the program, and
              what the paperwork actually asks for.
            </p>
            <div className="mt-8 rounded-[30px] bg-white/70 p-4 sm:p-5">
              <StateSelect
                states={states}
                label="How coverage works in"
                cta={siteConfig.cta.checkState}
                id="insurance-state-select"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-[1400px] px-4">
          <CoverageGrid states={states} />
        </div>
      </section>

      {/* ══════════════ INSURANCE WALL ══════════════ */}
      <section
        className="mx-auto max-w-[1400px] px-3 py-20 sm:py-28"
        aria-labelledby="insurance-heading"
      >
        <div className="field-card bg-teal-80 px-6 py-14 text-center sm:px-12">
          <p className="eyebrow">Insurance and Medicaid</p>
          <h2 id="insurance-heading" className="display display-h2 display-mega mt-5">
            Yes, it&rsquo;s probably covered.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
            Every state Medicaid program covers ABA for eligible kids, and every
            state has an autism insurance law for private plans. The rules just
            look different in each one — and we know them all.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Plans we work with">
            {siteConfig.acceptedPlans.map((plan) => (
              <li
                key={plan}
                className={`chip ${plan.startsWith("TODO") ? "border-dashed text-ink/40" : ""}`}
              >
                {/* TODO(config): payer chips fill in from acceptedPlans */}
                {plan.startsWith("TODO") ? "Your plan here" : plan}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/insurance/" className="btn btn-primary">
              How coverage works
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              {siteConfig.cta.talk} · {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ 4 STEPS ══════════════ */}
      <section className="mx-auto max-w-[1400px] px-4" aria-labelledby="steps-heading">
        <p className="eyebrow text-center">From first call to first session</p>
        <h2 id="steps-heading" className="display display-h2 display-mega mt-5">
          Four steps. We carry all four.
        </h2>
        <div className="mx-auto mt-12 max-w-4xl">
          <Accordion items={steps} tinted={false} />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/getting-started/" className="btn btn-primary">
            {siteConfig.cta.startIntake}
          </Link>
          <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
            <PhoneIcon />
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </section>

      {/* ══════════════ REVIEWS ══════════════ */}
      <section
        className="mx-auto max-w-[1400px] px-4 py-20 sm:py-28"
        aria-labelledby="reviews-heading"
      >
        <p className="eyebrow text-center">In their own words</p>
        <h2 id="reviews-heading" className="display display-h2 display-mega mt-5">
          Families, in their own words
        </h2>
        <div className="mt-12">
          <ReviewCarousel />
        </div>
      </section>

      {/* ══════════════ TRIAGE ══════════════ */}
      <section className="mx-auto max-w-[1400px] px-4 pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
