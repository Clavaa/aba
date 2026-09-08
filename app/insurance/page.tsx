import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { payers, SELF_FUNDED_NOTE } from "@/lib/payers";
import { getStateLinks } from "@/lib/states";
import CallCta from "@/components/CallCta";
import StateSelect from "@/components/StateSelect";
import TriageTrio from "@/components/TriageTrio";
import Sprout from "@/components/Sprout";

export const metadata: Metadata = {
  title: "ABA Therapy Insurance — Medicaid & Private",
  description:
    "Medicaid covers ABA in every state, and every state's autism law binds private plans. How the three coverage lanes work — and how we verify yours free.",
  alternates: {
    canonical: "/insurance/",
    languages: { en: "/insurance/", es: "/es/seguro-y-medicaid/" },
  },
};

export default function InsurancePage() {
  const states = getStateLinks();

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <h1 className="display display-hero max-w-4xl">
            It&rsquo;s probably covered. Let&rsquo;s prove it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Here&rsquo;s the secret insurance companies don&rsquo;t lead with:
            ABA therapy is a covered benefit almost everywhere. Medicaid covers
            it for eligible kids in every state, and every state has an autism
            insurance law for private plans. The hard part is the paperwork —
            and that&rsquo;s our job, not yours.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <CallCta className="btn btn-outline" />
          </div>
          <div className="mt-7 max-w-xl rounded-3xl bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="Accepted plans in"
              cta="See my state"
              id="insurance-page-state-select"
            />
          </div>
        </div>
      </section>

      {/* ─────────────── THE THREE COVERAGE LANES ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="lanes-heading"
      >
        <h2 id="lanes-heading" className="display display-h2">
          Three ways families get ABA covered
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="field-card bg-mint p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">LANE 1</p>
            <h3 className="display display-h3 mt-1">Medicaid &amp; CHIP</h3>
            <p className="mt-3 text-spruce-soft">
              Federal law (a rule called EPSDT) says state Medicaid programs
              must cover medically necessary care for kids under 21 — and every
              state now covers ABA under it. With Medicaid, most families pay
              nothing out of pocket.
            </p>
            <p className="mt-3 text-spruce-soft">
              Each state runs it differently: some pay providers directly, some
              use managed-care plans, some route through review companies. Your
              state page spells out yours.
            </p>
          </div>
          <div className="field-card bg-butter p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">LANE 2</p>
            <h3 className="display display-h3 mt-1">
              Private insurance (the autism mandates)
            </h3>
            <p className="mt-3 text-spruce-soft">
              All 50 states and DC have passed autism insurance laws requiring
              state-regulated plans to cover autism treatment, including ABA.
              Some laws still list old age or dollar caps — but federal mental
              health parity rules make most of those caps unenforceable.
            </p>
            <p className="mt-3 text-spruce-soft">
              You&rsquo;ll usually pay your plan&rsquo;s normal deductible and
              copays — we tell you the real number before you commit to
              anything.
            </p>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">LANE 3</p>
            <h3 className="display display-h3 mt-1">Waivers &amp; extras</h3>
            <p className="mt-3 text-spruce-soft">
              Medicaid waiver programs can open the door even when family
              income is &ldquo;too high&rdquo; — many states count only the
              child&rsquo;s situation, not the parents&rsquo; paycheck. Waivers
              can also add respite care, parent training, and home supports.
            </p>
            <p className="mt-3 text-spruce-soft">
              Waitlists are real in some states, so it pays to get on them
              early. We&rsquo;ll tell you if a waiver is worth pursuing for
              your child.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── PLANS WALL ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="plans-heading">
        <div className="field-card bg-mint p-6 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <h2 id="plans-heading" className="display display-h2">
              Plans we work with
            </h2>
            <Sprout className="hidden h-16 w-16 shrink-0 text-garden sm:block" />
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Accepted plans">
            {siteConfig.acceptedPlans.map((plan) => (
              <li
                key={plan}
                className={`chip bg-white ${
                  plan.startsWith("TODO") ? "border-dashed text-spruce/40" : ""
                }`}
              >
                {/* TODO(config): fill acceptedPlans with real in-network payers */}
                {plan.startsWith("TODO") ? "Your plan here" : plan}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-spruce-soft">
            Don&rsquo;t see your plan? Networks change monthly and we add
            payers all the time. The fastest way to know is to ask — checking
            takes us one phone call.
          </p>
        </div>
      </section>

      {/* ─────────────── PER-PAYER GUIDES ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="payers-heading"
      >
        <h2 id="payers-heading" className="display display-h2">
          How each big plan handles ABA
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          What the process looks like, where families get stuck, and the exact
          questions to ask when you call them.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {payers.map((p) => (
            <Link
              key={p.slug}
              href={`/insurance/${p.slug}/`}
              className={`field-card ${p.tint} p-6 transition-transform hover:-translate-y-0.5`}
            >
              <h3 className="display display-h3">{p.name}</h3>
              <p className="mt-2 text-spruce-soft">{p.lede}</p>
              <p className="mt-3 font-bold text-garden">Read the guide →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── THE SELF-FUNDED POINT ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="hub-self-funded-heading"
      >
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <p className="display text-xs tracking-wide text-garden">
            THE THING NOBODY TELLS YOU
          </p>
          <h2
            id="hub-self-funded-heading"
            className="display display-h2 mt-1"
          >
            Ask HR one question before you fight anyone
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            {SELF_FUNDED_NOTE}
          </p>
        </div>
      </section>

      {/* ─────────────── HOW VERIFICATION WORKS ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="verify-heading"
      >
        <h2 id="verify-heading" className="display display-h2">
          How the free coverage check works
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="field-card bg-white p-6 shadow-lift sm:p-8">
            <p className="display text-3xl text-garden">1</p>
            <h3 className="display display-h3 mt-1">You tell us the basics</h3>
            <p className="mt-2 text-spruce-soft">
              State, insurance type, your child&rsquo;s age. Two minutes,
              online or by phone. Everything you share is confidential and
              HIPAA-protected.
            </p>
          </li>
          <li className="field-card bg-white p-6 shadow-lift sm:p-8">
            <p className="display text-3xl text-garden">2</p>
            <h3 className="display display-h3 mt-1">We call your plan</h3>
            <p className="mt-2 text-spruce-soft">
              Our team verifies your benefits directly with the payer — what&rsquo;s
              covered, what needs authorization, and what (if anything)
              you&rsquo;d owe.
            </p>
          </li>
          <li className="field-card bg-white p-6 shadow-lift sm:p-8">
            <p className="display text-3xl text-garden">3</p>
            <h3 className="display display-h3 mt-1">
              You get a real answer
            </h3>
            <p className="mt-2 text-spruce-soft">
              A plain-English rundown of your coverage, before you commit to
              anything. If we&rsquo;re not the right fit, we say so.
            </p>
          </li>
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/getting-started/" className="btn btn-primary">
            {siteConfig.cta.checkCoverage}
          </Link>
          <Link href="/cost-of-aba-therapy/" className="btn btn-outline">
            What ABA costs, state by state
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
