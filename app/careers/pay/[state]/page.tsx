import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getAllStates, getState, usd, type StateRecord } from "@/lib/states";
import { getJobCities } from "@/lib/jobcities";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import FeatureStrip from "@/components/FeatureStrip";
import CallCta from "@/components/CallCta";

/**
 * "RBT salary in {state}" — 51 pages.
 *
 * This cluster is the one place where the honest answer is genuinely better
 * than the competition's, so it gets its own page set rather than a line on
 * the national pay page.
 *
 * Every other result for "rbt salary texas" publishes a scraped average from
 * self-reported aggregator data. We publish something we can actually source:
 * the rate the state's own Medicaid programme pays per hour of
 * technician-delivered ABA, which is the ceiling every employer in that state
 * prices wages under. We do NOT convert that into a wage — the conversion
 * depends on each agency's supervision load, unbilled time and benefits, and
 * inventing a multiplier would put us back with the scrapers.
 *
 * States that publish no usable rate say so and get the mechanism without the
 * number. No figure appears here that isn't in data/aba_states_ALL.csv.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStates().map((s) => ({ state: s.slug }));
}

/* ------------------------------------------------------------------ */
/* Derived comparisons — all computed from published rates only        */
/* ------------------------------------------------------------------ */

type RateContext = {
  published: number | null;
  /** How many of the 51 jurisdictions publish a usable rate */
  publishing: number;
  /** Median of those published rates */
  median: number;
  /** 1 = highest published rate in the country */
  rank: number | null;
  standing: "well above" | "above" | "close to" | "below" | "well below" | null;
};

/** The low end of a published range is the technician-delivered figure. */
function anchorRate(s: StateRecord): number | null {
  return s.hourlyRate ? s.hourlyRate.min : null;
}

function rateContext(state: StateRecord): RateContext {
  const rates = getAllStates()
    .map(anchorRate)
    .filter((r): r is number => r !== null)
    .sort((a, b) => b - a);
  const mid = Math.floor(rates.length / 2);
  const median =
    rates.length % 2 === 0 ? (rates[mid - 1] + rates[mid]) / 2 : rates[mid];

  const mine = anchorRate(state);
  if (mine === null) {
    return { published: null, publishing: rates.length, median, rank: null, standing: null };
  }
  const rank = rates.findIndex((r) => r === mine) + 1;
  const delta = (mine - median) / median;
  const standing: RateContext["standing"] =
    delta > 0.2 ? "well above" : delta > 0.05 ? "above" : delta > -0.05 ? "close to" : delta > -0.2 ? "below" : "well below";
  return { published: mine, publishing: rates.length, median, rank, standing };
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata(props: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await props.params;
  const state = getState(slug);
  if (!state) return {};
  const r = anchorRate(state);
  return {
    title: `RBT Salary in ${state.name}: What Sets the Ceiling`,
    description: r
      ? `How much do RBTs make in ${state.name}? ${state.name} Medicaid pays ${usd(
          r
        )}/hour for technician-delivered ABA — here's how that rate turns into a wage, and what to compare between two offers.`
      : `How much do RBTs make in ${state.name}? What decides RBT and BCBA pay in ${state.name}, and how to compare two offers on paid hours rather than the advertised rate.`,
    alternates: { canonical: `/careers/pay/${state.slug}/` },
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function StatePayPage(props: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await props.params;
  const state = getState(slug);
  if (!state) notFound();

  const ctx = rateContext(state);
  const url = `${siteConfig.brand.domain}/careers/pay/${state.slug}/`;
  const cities = getJobCities(150).filter((c) => c.stateSlug === state.slug).slice(0, 8);

  const faqs: { q: string; a: string }[] = [
    {
      q: `What is the average RBT salary in ${state.name}?`,
      a: ctx.published
        ? `We don't publish one, because every figure you'll find for the average RBT salary in ${state.name} is scraped from self-reported aggregator data that mixes roles, settings and years. Here is the number we can source instead: ${state.name}'s Medicaid programme reimburses ${usd(
            ctx.published
          )} per hour for technician-delivered ABA. Your wage is paid out of that hour, and so is your BCBA's supervision time, your drive time, documentation, billing and benefits. That's why the advertised rate is always well below the reimbursement rate — and why a state's rate is the ceiling on what any employer there can pay.`
        : `${state.name} doesn't publish a usable ABA reimbursement rate, so anyone quoting an average RBT salary in ${state.name} is quoting scraped self-reported data. What we can tell you is the mechanism: what a payer reimburses per hour sets the ceiling on wages, and your take-home is decided far more by how many hours you're actually paid for than by the advertised rate.`,
    },
    {
      q: `How much do RBTs make in ${state.name} per hour?`,
      a: `The advertised hourly rate is the wrong number to compare. Two ${state.name} employers posting the same rate can be thousands of dollars a year apart once you account for guaranteed hours, whether cancellations are paid, whether drive time between clients is paid, whether documentation is paid, and whether your schedule clears the benefits threshold. Ask us for a real range for your specific market and we'll give you one rather than an average.`,
    },
    {
      q: `Does ${state.name} pay RBTs more than other states?`,
      a: ctx.published
        ? `On the number that sets the ceiling, ${state.name} sits ${ctx.standing} the national middle: its published rate of ${usd(
            ctx.published
          )} per hour ranks ${ctx.rank} of the ${ctx.publishing} jurisdictions that publish one, against a median of ${usd(
            ctx.median
          )}. That doesn't translate one-to-one into wages — cost of living, competition for staff and each agency's overhead all sit in between — but a state with a low reimbursement rate cannot sustain high technician wages for long.`
        : `${state.name} doesn't publish a rate we can compare, so we can't answer that with a source. Across the ${ctx.publishing} jurisdictions that do publish one, the median is ${usd(
            ctx.median
          )} per hour for technician-delivered ABA, and the spread between the highest and lowest is wide enough to move wages materially.`,
    },
    {
      q: `What does a BCBA make in ${state.name}?`,
      a: `More than an RBT, and for different reasons: a BCBA's time is billed under a separate, higher-reimbursing code for assessment and supervision, and the role carries a master's degree, supervised fieldwork and an exam. We won't quote a ${state.name} BCBA salary figure we can't source. What we will tell you in a conversation is the real band for your market, the caseload that comes with it, and how much of your week is direct versus indirect.`,
    },
    {
      q: `Do I need a licence to work as an RBT in ${state.name}?`,
      a: `RBT certification is national, through the BACB. What differs by state is whether behaviour analysts are also licensed: ${state.licensure} Check the current requirement before you plan a timeline — this is the detail that most often surprises people moving between states.`,
    },
  ];

  const items: AccordionItem[] = faqs.map((f) => ({ title: f.q, body: <p>{f.a}</p> }));

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Careers", item: `${siteConfig.brand.domain}/careers/` },
            { "@type": "ListItem", position: 2, name: "Pay", item: `${siteConfig.brand.domain}/careers/pay/` },
            { "@type": "ListItem", position: 3, name: state.name, item: url },
          ],
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-14 sm:px-10 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-muted">
            <Link href="/careers/" className="underline underline-offset-4 hover:text-coral">
              Careers
            </Link>{" "}
            /{" "}
            <Link href="/careers/pay/" className="underline underline-offset-4 hover:text-coral">
              Pay
            </Link>{" "}
            / {state.name}
          </nav>
          <h1 className="display display-hero mt-5 max-w-4xl">
            RBT salary in {state.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            {ctx.published ? (
              <>
                Every other page answering this scrapes an average off
                self-reported data. Here is a number you can actually check:{" "}
                {state.name} Medicaid pays{" "}
                <strong className="text-ink">{usd(ctx.published)} per hour</strong>{" "}
                for technician-delivered ABA. That single figure is the ceiling
                every employer in {state.name} prices wages under &mdash; and
                below, we show exactly what comes out of it before it reaches
                your paycheck.
              </>
            ) : (
              <>
                {state.name} doesn&rsquo;t publish an ABA reimbursement rate we
                can cite, so we won&rsquo;t invent an average RBT salary for it.
                What we can do is show you the mechanism that decides your pay
                here, and the four questions that separate two offers
                advertising the same rate.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact/" className="btn btn-primary">
              Ask for a real range
            </Link>
            <Link href="/careers/rbt/certification/" className="btn btn-outline">
              How to get certified
            </Link>
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          {
            icon: "shield",
            text: ctx.published
              ? `${usd(ctx.published)}/hr published ${state.name} rate`
              : `${state.name} publishes no rate`,
          },
          {
            icon: "map",
            text: ctx.rank
              ? `Ranks ${ctx.rank} of ${ctx.publishing} that publish`
              : `${ctx.publishing} states publish a rate`,
          },
          { icon: "clock", text: "Paid hours beat hourly rate" },
        ]}
      />

      {ctx.published && (
        <section className="mx-auto max-w-[1400px] px-4 py-10 sm:py-14" aria-labelledby="ceiling-heading">
          <p className="eyebrow">Where the money starts</p>
          <h2 id="ceiling-heading" className="display display-h2 mt-4 text-coral">
            What {state.name} Medicaid actually pays per hour
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-ink-muted">
            {usd(ctx.published)} an hour is what the programme reimburses the
            agency for one hour of technician-delivered ABA &mdash; not what the
            technician is paid. {state.name}&rsquo;s rate sits {ctx.standing} the
            middle of the {ctx.publishing} jurisdictions that publish one, where
            the median is {usd(ctx.median)}. Commercial plans usually pay
            somewhat more, but Medicaid rates anchor the market because they set
            the floor an agency has to survive on.
          </p>
          <h3 className="display display-h3 mt-10">
            What comes out of that hour before it reaches your paycheck
          </h3>
          <ul className="mt-6 grid max-w-4xl gap-3 text-ink-muted sm:grid-cols-2">
            <li className="rounded-2xl bg-peach px-5 py-4">
              Your BCBA&rsquo;s supervision time, which is required and only
              partly billable
            </li>
            <li className="rounded-2xl bg-peach px-5 py-4">
              Your drive time between clients, and the gaps a cancellation
              leaves behind
            </li>
            <li className="rounded-2xl bg-peach px-5 py-4">
              Session notes, plan updates and the billing staff who submit them
            </li>
            <li className="rounded-2xl bg-peach px-5 py-4">
              Payroll tax, insurance, training, and the benefits you&rsquo;re
              offered
            </li>
          </ul>
          <p className="mt-6 max-w-3xl text-ink-muted">
            That is the whole reason an advertised RBT rate is far below the
            reimbursement rate, and why we won&rsquo;t publish a multiplier
            between the two: it differs per agency, and a made-up ratio would
            put us right back with the sites scraping averages. For what{" "}
            {state.name} publishes on hours, prior authorization and coverage,
            see{" "}
            <Link
              href={`/cost-of-aba-therapy/${state.slug}/`}
              className="font-semibold text-coral underline underline-offset-4"
            >
              the cost of ABA therapy in {state.name}
            </Link>
            .
          </p>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-3 pb-4" aria-labelledby="compare-heading">
        <div className="field-card bg-peach-100 px-6 py-12 sm:px-12">
          <h2 id="compare-heading" className="display display-h2">
            Comparing two RBT offers in {state.name}
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-ink-muted">
            The advertised rate is the least informative number on the offer
            letter. These four decide what you actually earn in a year.
          </p>
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              ["Guaranteed hours", "Are you paid for a set number of hours a week regardless of cancellations, or only for sessions that happen? This is the single biggest swing."],
              ["Paid drive time", "In-home work means driving between clients. Whether that time is paid can be the difference between a 30-hour and a 40-hour paycheck for the same day."],
              ["Paid documentation", "Notes, graphs and plan updates take real time every day. Some employers pay for it. Some expect it after hours."],
              ["The benefits threshold", "The hours at which you qualify for health insurance and PTO — and whether your schedule reliably clears it."],
            ].map(([h, b]) => (
              <li key={h} className="rounded-[30px] bg-white/80 p-7">
                <h3 className="display-round display-round-md">{h}</h3>
                <p className="mt-3 text-ink-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:py-20" aria-labelledby="pay-faq">
        <h2 id="pay-faq" className="display display-h2 display-mega">
          {state.name} pay questions, answered honestly
        </h2>
        <div className="mx-auto mt-10 max-w-4xl">
          <Accordion items={items} defaultOpen={0} />
        </div>
      </section>

      {cities.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-20" aria-labelledby="pay-cities">
          <h2 id="pay-cities" className="display display-h3">
            RBT and BCBA jobs across {state.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {cities.map((c) => (
              <li key={c.jobSlug}>
                <Link href={`/careers/jobs/${c.jobSlug}/`} className="chip">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/careers/pay/" className="chip chip-solid">
                How ABA pay works →
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <CallCta className="btn btn-primary" fallbackLabel="Ask for a real range" />
          </div>
        </section>
      )}
    </>
  );
}
