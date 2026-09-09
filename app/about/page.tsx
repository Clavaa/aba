import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import CallCta from "@/components/CallCta";
import CareStructure from "@/components/CareStructure";
import ImageSlot from "@/components/ImageSlot";
import Sprout from "@/components/Sprout";

export const metadata: Metadata = {
  title: "About Us — Who We Are & How We're Built",
  description:
    "Sproutwell ABA is built parent-first: clinician-led care, local teams in all 50 states, and a support office that handles the insurance fight for you.",
  alternates: { canonical: "/about/" },
};

/* ------------------------------------------------------------------ */
/* Copy: values — 5th–7th grade reading level, house voice             */
/* ------------------------------------------------------------------ */

const values: { title: string; body: string }[] = [
  {
    title: "Parents first",
    body: "You know your child better than anyone. Every plan starts with what you want life to look like, and parent coaching is part of every plan — not an add-on.",
  },
  {
    title: "Clinicians decide care",
    body: "Treatment decisions are made by the clinicians treating your child — never by a spreadsheet, a quota, or a billing target.",
  },
  {
    title: "Plain English, always",
    body: "Coverage, costs, goals, progress — we explain all of it in words you don't need a dictionary for. If we can't explain it simply, we haven't earned your yes.",
  },
  {
    title: "Show the work",
    body: "You see your child's goals and the data behind them the whole way. No black box, no \"trust us.\"",
  },
  {
    title: "Meet families where they are",
    body: "Home, school, daycare, or telehealth — care fits your family's life, not the other way around.",
  },
  {
    title: "Honest about fit",
    body: "If we're not the right answer for your child, we say so and point you somewhere good. Backup means help, even when it isn't us.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <h1 className="display display-hero">
                Built to be your backup.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                Sproutwell ABA is a national ABA therapy organization with one
                job: make great care easy for families to reach. Local teams do
                the caring. A national office does the fighting — insurance,
                paperwork, logistics — so parents don&rsquo;t have to.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about/leadership/" className="btn btn-primary">
                  Meet our leadership
                </Link>
                <CallCta className="btn btn-outline" />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <ImageSlot
                intent="Golden-hour photo: parent and child watering a small garden together outside a real home"
                src="/photos/garden-watering.jpg"
                alt="A mother helping her young son water a raised vegetable bed with a green watering can, evening sun behind them"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/5]"
              />
              <Sprout className="absolute -bottom-4 -left-4 h-16 w-16 rotate-[-8deg] text-garden" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── MISSION ───────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="mission-heading"
      >
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <h2 id="mission-heading" className="display display-h2">
            Why we exist
          </h2>
          <div className="space-y-4 text-lg text-spruce-soft">
            <p>
              Getting ABA therapy shouldn&rsquo;t be a second job. But for most
              parents, it is. You call clinics that never call back. You sit on
              waitlists for months. You fight your own insurance company at
              night, after everyone else is asleep.
            </p>
            <p>
              We started Sproutwell to take that job off your plate. Our
              mission is simple:{" "}
              <strong className="text-spruce">
                every child who needs ABA gets it — close to home, covered by
                their family&rsquo;s insurance, and delivered by people who
                genuinely like kids.
              </strong>
            </p>
            <p>
              That&rsquo;s why we work in all 50 states and DC. It&rsquo;s why
              we take Medicaid. And it&rsquo;s why the first thing we do for
              any family is check their coverage for free — even if the answer
              points them somewhere else.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── HOW WE'RE ORGANIZED ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="org-heading">
        <div className="field-card bg-butter p-6 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <h2 id="org-heading" className="display display-h2">
              How we&rsquo;re organized
            </h2>
            <Sprout className="hidden h-16 w-16 shrink-0 text-garden sm:block" />
          </div>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Think of Sproutwell as two teams working on your family&rsquo;s
            behalf at the same time.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white/80 p-6 sm:p-8">
              <p className="display text-xs tracking-wide text-garden">
                NEAR YOU
              </p>
              <h3 className="display display-h3 mt-1">Your local care team</h3>
              <p className="mt-3 text-spruce-soft">
                The people your child actually knows: a BCBA who builds and
                owns the plan, and the technicians who run sessions at home,
                at school, in daycare, or online. They live and work where
                you do, and they answer to clinical leaders — not to a sales
                office.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 sm:p-8">
              <p className="display text-xs tracking-wide text-garden">
                BEHIND THE SCENES
              </p>
              <h3 className="display display-h3 mt-1">
                The national support office
              </h3>
              <p className="mt-3 text-spruce-soft">
                Insurance verification, prior authorizations, scheduling,
                compliance, and technology — handled centrally by specialists
                who do it all day. That&rsquo;s how your BCBA stays focused on
                your child instead of on hold with a payer.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-spruce-soft">
            Between the two sits a regional layer — operations and clinical
            leaders for the East, Central, and West — so every state has
            someone close by who owns quality and can fix problems fast. One
            company, one standard of care, delivered locally.
          </p>
        </div>
      </section>

      {/* ───────────────────────── VALUES ───────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="values-heading"
      >
        <h2 id="values-heading" className="display display-h2">
          What we believe
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Six things we hold ourselves to — in every state, every session,
          every phone conversation.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <li
              key={v.title}
              className={`field-card p-6 sm:p-7 ${
                ["bg-mint", "bg-butter", "bg-peach"][i % 3]
              }`}
            >
              <h3 className="display display-h3">{v.title}</h3>
              <p className="mt-2 text-spruce-soft">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─────────────── CLINICAL LEADERSHIP MODEL ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="clinical-heading"
      >
        <div className="field-card bg-mint p-6 sm:p-10">
          <h2 id="clinical-heading" className="display display-h2">
            Clinicians lead the clinical side. Full stop.
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-lg text-spruce-soft">
              <p>
                In some companies, business managers decide how many hours a
                child gets or how many families one clinician juggles. Not
                here. At Sproutwell, the clinical chain of command runs from
                our Chief Clinical Officer — a Board Certified Behavior
                Analyst — down through clinical directors to your child&rsquo;s
                own BCBA.
              </p>
              <p>
                That structure protects three things we won&rsquo;t bend on:
                your child&rsquo;s hours are set by clinical need, caseloads
                stay small enough for real supervision, and every treatment
                plan gets reviewed by a second set of clinical eyes.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Treatment hours are recommended by your BCBA, based on assessment — never on a revenue target.",
                "Caseload caps are set by the clinical team, so your BCBA has time to actually know your child.",
                "Every plan is quality-reviewed by clinical leadership, and outcomes are measured — not assumed.",
                "Parent training is written into every plan, because progress has to survive when we leave the room.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-3xl bg-white/80 p-5"
                >
                  <span aria-hidden="true" className="font-bold text-garden">
                    ✓
                  </span>
                  <span className="text-spruce-soft">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────── OUR CARE STRUCTURE (layer diagram) ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="structure-heading"
      >
        <div className="text-center">
          <h2 id="structure-heading" className="display display-h2">
            Our care structure
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-spruce-soft">
            Who does what, from regional leadership down to the people who
            answer the phone. Every layer exists to support the ones below it —
            and all of it exists to support your child.
          </p>
        </div>
        <div className="mt-10">
          <CareStructure />
        </div>
      </section>

      {/* ─────────────── LEADERSHIP TEASER ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="leaders-heading"
      >
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-peach p-6 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 id="leaders-heading" className="display display-h2">
              The people accountable for all of this
            </h2>
            <p className="mt-2 max-w-xl text-lg text-spruce-soft">
              Meet the executive team and the leaders who run clinical
              quality, payer relationships, and operations in every region.
            </p>
          </div>
          <Link href="/about/leadership/" className="btn btn-primary shrink-0">
            Meet our leadership
          </Link>
        </div>
      </section>

      {/* ─────────────── CTA BAND ─────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 pb-16 sm:py-20 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Enough about us. Let&rsquo;s talk about your child.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              One {siteConfig.intake.callLength} conversation with a real person.
              We&rsquo;ll check your coverage for free and tell you the honest
              next step — even if it isn&rsquo;t us.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <Link href="/getting-started/" className="btn btn-marigold">
              {siteConfig.cta.primary}
            </Link>
            <CallCta className="font-semibold text-ivory underline decoration-marigold decoration-2 underline-offset-4 hover:text-marigold" fallbackLabel="Talk to a person" icon={false} />
          </div>
        </div>
      </section>
    </>
  );
}
