import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getAllStates, getState, usd, type StateRecord } from "@/lib/states";
import { getCountiesForState } from "@/lib/counties";
import CallCta from "@/components/CallCta";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import TriageTrio from "@/components/TriageTrio";
import JsonLd from "@/components/JsonLd";
import ModalityChips from "@/components/ModalityChips";
import { getCitiesForState } from "@/lib/cities";
import Sprout from "@/components/Sprout";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) return {};
  const title = `ABA Therapy in ${state.name}`;
  const description = `How ABA coverage really works in ${state.name}: the Medicaid pathway, prior authorization in plain English, the autism insurance law, and how to start.`;
  const canonical = `/locations/${state.slug}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

/* ------------------------------------------------------------------ */
/* Graceful fallbacks for unpublished data — no "(verify)" ever ships  */
/* ------------------------------------------------------------------ */

function hoursCopy(state: StateRecord): string {
  if (state.hoursUnpublished) {
    return `${state.name} doesn't publish a fixed weekly-hours number. Hours are set child by child: your BCBA writes a treatment plan, and the reviewer approves the hours that plan supports. We'll tell you what to expect for your child on the first call.`;
  }
  // "Not published — {useful detail}" → keep the detail, drop the research lead-in
  const m = state.hours.match(
    /^not\s+(?:state-)?published[^;—–]*[;—–]\s*(.+)$/i
  );
  if (m) {
    const detail = m[1].charAt(0).toUpperCase() + m[1].slice(1);
    return `${state.name} doesn't set one fixed number — hours are approved child by child. ${detail}.`.replace(/\.\.$/, ".");
  }
  return state.hours;
}

function rateCopy(state: StateRecord): string {
  if (state.rateUnpublished) {
    return `${state.name} doesn't publish one simple, current hourly rate for ABA — payment runs through its own model behind the scenes. What matters for your wallet: with Medicaid, most families pay nothing out of pocket.`;
  }
  const r = state.hourlyRate!;
  const range =
    r.min === r.max ? usd(r.min) : `${usd(r.min)}–${usd(r.max)}`;
  return `${state.name} Medicaid reimburses ABA providers roughly ${range} per hour for one-on-one therapy (rates differ by clinician credential and setting). That's what the state pays us — with Medicaid, most families pay nothing out of pocket.`;
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const pageUrl = `${siteConfig.brand.domain}/locations/${state.slug}/`;

  /* ---------------- FAQ (rendered + FAQPage JSON-LD) ---------------- */
  const faqPlain: { q: string; a: string }[] = [
    {
      q: `Does Medicaid cover ABA therapy in ${state.name}?`,
      a: `Yes. ${state.pathway}`,
    },
    {
      q: `Do we need prior authorization for ABA in ${state.name}?`,
      a: state.priorAuth,
    },
    {
      q: `How many hours of ABA per week will my child get in ${state.name}?`,
      a: hoursCopy(state),
    },
    {
      q: `Does private insurance in ${state.name} have to cover ABA?`,
      a: state.mandate,
    },
    {
      q: `What Medicaid waiver programs exist in ${state.name}?`,
      a: state.waivers,
    },
    {
      q: `Are behavior analysts licensed in ${state.name}?`,
      a: state.licensure,
    },
  ];

  const faqItems: AccordionItem[] = faqPlain.map(({ q, a }) => ({
    title: q,
    body: <p>{a}</p>,
  }));

  const clinicJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${pageUrl}#clinic`,
    name: `${siteConfig.brand.name} — ${state.name}`,
    url: pageUrl,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    medicalSpecialty: "Psychiatric",
    parentOrganization: {
      "@id": `${siteConfig.brand.domain}/#organization`,
    },
    areaServed: {
      "@type": "State",
      name: state.name,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqPlain.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const otherStates = getAllStates().filter((s) => s.slug !== state.slug);
  const counties = getCountiesForState(state.slug);
  const allCities = getCitiesForState(state.slug);
  // Texas alone has 800+ places; a chip list that long helps nobody. Show the
  // largest, and let the county pages carry the rest.
  const cities = allCities.slice(0, 60);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Where we work",
        item: `${siteConfig.brand.domain}/locations/`,
      },
      { "@type": "ListItem", position: 2, name: state.name, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={clinicJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/locations/" className="underline underline-offset-4 hover:text-garden">
              Where we work
            </Link>{" "}
            / {state.name}
          </nav>
          <h1 className="display display-hero mt-3">
            ABA therapy in {state.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            {state.name} Medicaid covers ABA for eligible kids
            {state.mandateYear
              ? `, and the state has required private insurance to cover autism care since ${state.mandateYear}`
              : ", and state insurance law addresses autism coverage for private plans too"}
            . Here&rsquo;s how it actually works — and how we handle the messy
            parts for you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <CallCta className="btn btn-outline" fallbackLabel="Talk to a person" />
          </div>
          <ModalityChips />
        </div>
      </section>

      {/* ─────────────── MEDICAID COVERAGE PATHWAY ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
        aria-labelledby="medicaid-heading"
      >
        <h2 id="medicaid-heading" className="display display-h2 max-w-3xl">
          Does Medicaid cover ABA in {state.name}? Yes.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-[3fr_2fr]">
          <div className="field-card bg-white p-6 shadow-lift sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              THE COVERAGE PATHWAY
            </p>
            <p className="mt-2 text-spruce-soft">{state.pathway}</p>
          </div>
          <div className="field-card bg-butter p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              WHO RUNS IT
            </p>
            <p className="mt-2 text-spruce-soft">{state.agency}</p>
            <p className="mt-4 text-sm text-spruce-soft">
              You don&rsquo;t have to memorize any of this — we work with{" "}
              {state.name}&rsquo;s system every day.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── PRIOR AUTH AS 3 PARENT STEPS ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="pa-heading">
        <div className="field-card bg-peach p-6 sm:p-10">
          <h2 id="pa-heading" className="display display-h2">
            Getting approved, in three steps
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            {state.name} requires paperwork before therapy is covered. Here&rsquo;s
            the whole process from your side of the table — we do the rest.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="rounded-3xl bg-white/80 p-6">
              <p className="display text-3xl text-garden">1</p>
              <h3 className="display display-h3 mt-1">
                Round up the diagnosis paperwork
              </h3>
              <p className="mt-2 text-spruce-soft">
                An autism diagnosis from a qualified provider is the key that
                opens coverage. Already have it? You&rsquo;re ahead. If not,
                we&rsquo;ll help you find an evaluation.
              </p>
            </li>
            <li className="rounded-3xl bg-white/80 p-6">
              <p className="display text-3xl text-garden">2</p>
              <h3 className="display display-h3 mt-1">
                We build and submit the plan
              </h3>
              <p className="mt-2 text-spruce-soft">
                Your BCBA assesses your child and writes the treatment plan.
                Then we file it with the right reviewer in {state.name} — forms,
                follow-ups, and all.
              </p>
            </li>
            <li className="rounded-3xl bg-white/80 p-6">
              <p className="display text-3xl text-garden">3</p>
              <h3 className="display display-h3 mt-1">
                Coverage confirmed. Therapy starts.
              </h3>
              <p className="mt-2 text-spruce-soft">
                Once the plan signs off, sessions begin.{" "}
                {siteConfig.intake.startTimeframe}. Approvals renew on a
                schedule — we track it so you never think about it.
              </p>
            </li>
          </ol>
          <details className="group mt-6 rounded-3xl bg-white/60 p-5">
            <summary className="cursor-pointer list-none font-bold text-spruce">
              <span
                aria-hidden="true"
                className="mr-2 inline-block transition-transform group-open:rotate-90"
              >
                ▸
              </span>
              The fine print, if you want it ({state.name}&rsquo;s exact rules)
            </summary>
            <p className="mt-3 text-spruce-soft">{state.priorAuth}</p>
          </details>
        </div>
      </section>

      {/* ─────────────── HOURS + MANDATE + WAIVERS ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
        aria-labelledby="details-heading"
      >
        <h2 id="details-heading" className="sr-only">
          Coverage details in {state.name}
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">How many hours a week?</h3>
            <p className="mt-3 text-spruce-soft">{hoursCopy(state)}</p>
          </div>
          <div className="field-card bg-butter p-6 sm:p-8">
            <h3 className="display display-h3">
              Private insurance has to help too
            </h3>
            <p className="mt-3 text-spruce-soft">
              Not on Medicaid? {state.name}&rsquo;s autism insurance law makes
              state-regulated private plans cover autism care — you&rsquo;d pay
              your plan&rsquo;s normal deductible and copays. The rule on the
              books: {state.mandate}
            </p>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">Waiver programs worth knowing</h3>
            <p className="mt-3 text-spruce-soft">
              Waivers can add services or open Medicaid eligibility even when
              family income is too high. In {state.name}: {state.waivers}
            </p>
          </div>
        </div>

        <div className="mt-6 field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="display display-h3 text-ivory">
              What does ABA actually cost in {state.name}?
            </h3>
            <p className="mt-2 max-w-xl text-ivory/80">{rateCopy(state)}</p>
          </div>
          <Link
            href={`/cost-of-aba-therapy/${state.slug}/`}
            className="btn btn-marigold shrink-0"
          >
            See {state.name} costs
          </Link>
        </div>
      </section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="faq-heading">
        <div className="flex items-end gap-4">
          <h2 id="faq-heading" className="display display-h2">
            {state.name} questions, answered
          </h2>
          <Sprout className="hidden h-14 w-14 shrink-0 text-garden sm:block" />
        </div>
        <div className="mt-8">
          <Accordion items={faqItems} defaultOpen={-1} />
        </div>
        <p className="mt-4 text-sm text-spruce-soft">
          Program rules change; this page describes {state.name}&rsquo;s public
          coverage rules in plain English and isn&rsquo;t legal or benefits
          advice. Send us your details and we&rsquo;ll check your exact plan.
        </p>
      </section>

      {/* ─────────────────────── TRIAGE + COUNTIES + OTHER STATES ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <TriageTrio heading={`READY WHEN YOU ARE, ${state.name.toUpperCase()}.`} />
      </section>

      {cities.length > 0 && (
        <section
          className="mx-auto max-w-6xl px-4 pb-14 sm:pb-16"
          aria-labelledby="cities-heading"
        >
          <div className="field-card bg-butter p-6 sm:p-10">
            <h2 id="cities-heading" className="display display-h2">
              Biggest cities in {state.name}
            </h2>
            <p className="mt-3 max-w-2xl text-spruce-soft">
              Local pages for {state.name}&rsquo;s largest communities — what
              settings are realistically available in each, how far the nearest
              city is, and which county&rsquo;s rules apply to you.
              {allCities.length > cities.length && (
                <>
                  {" "}
                  We cover {allCities.length.toLocaleString("en-US")} towns and
                  cities across {state.name}; the rest are listed on their
                  county pages.
                </>
              )}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={`${c.county.slug}-${c.slug}`}>
                  <Link
                    href={`/locations/${state.slug}/${c.county.slug}/${c.slug}/`}
                    className="chip bg-white/80"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {counties.length > 0 && (
        <section
          className="mx-auto max-w-6xl px-4 pb-14 sm:pb-16"
          aria-labelledby="counties-heading"
        >
          <div className="field-card bg-mint p-6 sm:p-10">
            <h2 id="counties-heading" className="display display-h2">
              Counties we serve in {state.name}
            </h2>
            <p className="mt-3 max-w-2xl text-spruce-soft">
              Every corner of {state.name} — pick your county for local answers
              on coverage, in-home care, and how to start.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {counties.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/locations/${state.slug}/${c.slug}/`}
                    className="chip bg-white/80 text-sm"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24" aria-labelledby="other-states">
        <h2 id="other-states" className="display display-h3">
          Looking for a different state?
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {otherStates.map((s) => (
            <li key={s.slug}>
              <Link href={`/locations/${s.slug}/`} className="chip text-sm">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
