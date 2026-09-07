import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import ImageSlot from "@/components/ImageSlot";
import Sprout from "@/components/Sprout";

export const metadata: Metadata = {
  title: "Careers — RBT & BCBA Jobs in All 50 States",
  description:
    "Build a career that grows people — including you. RBT and BCBA roles nationwide, certification guides, supervision, and a real technician-to-analyst path.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <h1 className="display display-hero">
                Grow kids. Grow your career.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                ABA is one of the few fields where you can start with a high
                school diploma, get certified in weeks, and build toward a
                clinical career — while doing work that visibly matters every
                single day. We hire in all 50 states.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/careers/rbt/" className="btn btn-primary">
                  I&rsquo;m starting out (RBT)
                </Link>
                <Link href="/careers/bcba/" className="btn btn-outline">
                  I&rsquo;m a clinician (BCBA)
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <ImageSlot
                intent="Bright daylight photo: behavior technician and child playing a matching game at a center table, both mid-laugh"
                tint="bg-mint"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── ROLE CARDS ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="roles-heading"
      >
        <h2 id="roles-heading" className="display display-h2">
          Two doors into the field
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="field-card flex flex-col bg-mint p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              ENTRY LEVEL · NO DEGREE REQUIRED
            </p>
            <h3 className="display display-h3 mt-1">
              Registered Behavior Technician (RBT)
            </h3>
            <p className="mt-3 flex-1 text-spruce-soft">
              You work one-on-one with kids, running the plans a BCBA designs.
              Certification takes a 40-hour training course, a competency
              assessment, and one exam — many people go from zero to certified
              in about a month. Our guide walks you through every step.
            </p>
            <Link href="/careers/rbt/" className="btn btn-outline mt-5 self-start">
              Read the RBT guide
            </Link>
          </div>
          <div className="field-card flex flex-col bg-peach p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              CLINICAL LEADERSHIP · MASTER&rsquo;S LEVEL
            </p>
            <h3 className="display display-h3 mt-1">
              Board Certified Behavior Analyst (BCBA)
            </h3>
            <p className="mt-3 flex-1 text-spruce-soft">
              You assess, design treatment plans, supervise technicians, and
              coach families. Reasonable caseloads and real clinical autonomy —
              because burned-out BCBAs help no one, including kids.
            </p>
            <Link href="/careers/bcba/" className="btn btn-outline mt-5 self-start">
              Read the BCBA guide
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── WHY HERE ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="why-heading">
        <div className="field-card bg-mint p-6 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <h2 id="why-heading" className="display display-h2">
              What working here looks like
            </h2>
            <Sprout className="hidden h-16 w-16 shrink-0 text-garden sm:block" />
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">A ladder, not a treadmill</h3>
              <p className="mt-2 text-spruce-soft">
                RBT → supervised fieldwork → BCBA. If you want to climb, we
                structure supervision hours so your day job counts toward your
                next credential.
              </p>
            </li>
            <li className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">Support you can feel</h3>
              <p className="mt-2 text-spruce-soft">
                Real onboarding, real supervision, and a clinical team you can
                actually reach when a session goes sideways.
              </p>
            </li>
            <li className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">Work near home</h3>
              <p className="mt-2 text-spruce-soft">
                In-home, in-center, school, and telehealth roles across all 50
                states — which means schedules that can flex around your life.
              </p>
            </li>
          </ul>
          {/* TODO(careers): add real benefits, pay ranges, and open-role listings
              (JobPosting schema) once compensation bands are finalized. */}
        </div>
      </section>

      {/* ─────────────── APPLY BAND ─────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 pb-16 sm:py-20 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Five minutes to raise your hand
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Send a note with your state and the role you&rsquo;re interested
              in. A human reads every one.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Careers%20—%20I%27m%20interested`}
            className="btn btn-marigold shrink-0"
          >
            Introduce myself
          </a>
        </div>
      </section>
    </>
  );
}
