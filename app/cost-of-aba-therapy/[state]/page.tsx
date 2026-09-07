import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getAllStates, getState, usd } from "@/lib/states";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import TriageTrio from "@/components/TriageTrio";
import JsonLd from "@/components/JsonLd";
import { PhoneIcon } from "@/components/TopBar";

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
  const title = `Cost of ABA Therapy in ${state.name}`;
  const description = `What ABA really costs in ${state.name}: Medicaid usually means $0 out of pocket; private plans mean normal cost-sharing under the state autism law.`;
  const canonical = `/cost-of-aba-therapy/${state.slug}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function CostStatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const pageUrl = `${siteConfig.brand.domain}/cost-of-aba-therapy/${state.slug}/`;
  const r = state.hourlyRate;
  const rateRange = r
    ? r.min === r.max
      ? `about ${usd(r.min)} per hour`
      : `roughly ${usd(r.min)} to ${usd(r.max)} per hour`
    : null;

  const faqPlain: { q: string; a: string }[] = [
    {
      q: `How much does ABA therapy cost with Medicaid in ${state.name}?`,
      a: `For most Medicaid families, nothing out of pocket. ${state.name} Medicaid covers ABA for eligible children as a medical benefit, and the state pays the provider directly. ${
        rateRange
          ? `Behind the scenes, ${state.name} Medicaid reimburses providers ${rateRange} for one-on-one ABA, depending on the clinician's credential level and setting — but that is the state's bill, not yours.`
          : `${state.name} doesn't publish one simple, current hourly rate — payment runs through the state's own model — but that's the state's side of the ledger, not your bill.`
      }`,
    },
    {
      q: `How much does ABA cost with private insurance in ${state.name}?`,
      a: `Your plan's normal cost-sharing — deductible, copays or coinsurance, up to your out-of-pocket maximum. The reason coverage exists at all: ${state.mandate}`,
    },
    {
      q: `Why do the "cost of ABA" numbers online look so huge?`,
      a: `Those figures are full-price provider billing across many weekly hours — the amount insurers negotiate against, not what covered families pay. Once Medicaid or a covered private plan is in place, your cost is your plan's cost-sharing, which is a completely different number.`,
    },
    {
      q: `What if we don't have coverage yet?`,
      a: `Ask about waivers before assuming you'll pay cash. In ${state.name}: ${state.waivers}`,
    },
  ];

  const faqItems: AccordionItem[] = faqPlain.map(({ q, a }) => ({
    title: q,
    body: <p>{a}</p>,
  }));

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Cost of ABA",
        item: `${siteConfig.brand.domain}/cost-of-aba-therapy/`,
      },
      { "@type": "ListItem", position: 2, name: state.name, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link
              href="/cost-of-aba-therapy/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Cost of ABA
            </Link>{" "}
            / {state.name}
          </nav>
          <h1 className="display display-hero mt-3">
            Cost of ABA therapy in {state.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            The honest version: with {state.name} Medicaid, most families pay
            nothing out of pocket. With private insurance, you pay your
            plan&rsquo;s normal cost-sharing. Here are the real numbers and
            where they come from.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────── THE NUMBERS ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
        aria-labelledby="numbers-heading"
      >
        <h2 id="numbers-heading" className="sr-only">
          The numbers in {state.name}
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Medicaid card */}
          <div className="field-card bg-mint p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              WITH MEDICAID
            </p>
            <p className="display mt-2 text-5xl">$0</p>
            <p className="mt-1 font-semibold">
              out of pocket for most families
            </p>
            <p className="mt-3 text-spruce-soft">
              {state.name} Medicaid covers ABA for eligible kids under 21 and
              pays providers directly. Your job is the paperwork — and we do
              that part with you.
            </p>
          </div>

          {/* Rate card */}
          <div className="field-card bg-white p-6 shadow-lift sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              WHAT THE STATE PAYS PROVIDERS
            </p>
            {r ? (
              <>
                <p className="display mt-2 text-5xl">
                  {usd(r.min)}
                  {r.min !== r.max && (
                    <span className="text-3xl">–{usd(r.max)}</span>
                  )}
                  <span className="text-2xl">/hr</span>
                </p>
                <p className="mt-1 font-semibold">
                  for one-on-one ABA (97153-type services)
                </p>
                <p className="mt-3 text-spruce-soft">
                  Published rates vary by clinician credential (technician vs.
                  BCBA) and setting, which is why this is a range — never one
                  magic number. Source: {state.name}&rsquo;s published Medicaid
                  fee information. This is the state&rsquo;s bill, not yours.
                </p>
              </>
            ) : (
              <>
                <p className="display mt-2 text-3xl">Set behind the scenes</p>
                <p className="mt-3 text-spruce-soft">
                  {state.name} doesn&rsquo;t publish one simple, current hourly
                  rate for ABA — payment runs through the state&rsquo;s own
                  model. It doesn&rsquo;t change your side of the math: with
                  Medicaid, most families pay nothing out of pocket.
                </p>
              </>
            )}
          </div>

          {/* Private insurance card */}
          <div className="field-card bg-peach p-6 sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              WITH PRIVATE INSURANCE
            </p>
            <p className="display mt-2 text-3xl">
              Your plan&rsquo;s normal cost-sharing
            </p>
            <p className="mt-3 text-spruce-soft">
              {state.name} law requires state-regulated plans to cover autism
              care{state.mandateYear ? ` (on the books since ${state.mandateYear})` : ""}
              . You pay deductibles and copays like any other medical care —
              and we tell you the exact number for your plan before you start.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          Rates and rules change on the state&rsquo;s schedule, not ours — we
          keep this page current, but your plan&rsquo;s written verification is
          the number that counts. That&rsquo;s why the coverage check comes
          first, free.
        </p>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="cost-faq-heading">
        <h2 id="cost-faq-heading" className="display display-h2">
          {state.name} cost questions
        </h2>
        <div className="mt-8">
          <Accordion items={faqItems} defaultOpen={-1} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/locations/${state.slug}/`} className="btn btn-outline">
            How coverage works in {state.name}
          </Link>
          <Link href="/getting-started/" className="btn btn-primary">
            {siteConfig.cta.checkCoverage}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 pb-16 sm:py-20 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
