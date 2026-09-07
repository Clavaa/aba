import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getState, type StateRecord } from "@/lib/states";
import {
  approxPop,
  formatPop,
  medicaidProgramName,
  type CountyRecord,
} from "@/lib/counties";
import {
  getAllCityParams,
  getCity,
  getSiblingCities,
  citySize,
  shareOfCounty,
  type CityRecord,
  type CitySize,
} from "@/lib/cities";
import { getStateLinks } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import ModalityChips from "@/components/ModalityChips";
import Quiz from "@/components/Quiz";
import PhoneIcon from "@/components/PhoneIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCityParams();
}

/* ------------------------------------------------------------------ */
/* Copy helpers — a city page has to say something its county page     */
/* doesn't, so the angle here is scale and access, not policy detail.  */
/* The policy lives on the county and state pages and is linked, not   */
/* restated.                                                           */
/* ------------------------------------------------------------------ */

/** What's realistically available in a place this size. */
function accessCopy(city: CityRecord, size: CitySize): { lead: string; detail: string } {
  switch (size) {
    case "major":
      return {
        lead: "Every setting is on the table here",
        detail: `${city.name} is one of ${city.stateName}'s largest cities, which means centers, in-home routes, school collaboration, and telehealth are all realistic options rather than theoretical ones. The constraint in a city this size is rarely whether a service exists — it's capacity and waitlists at any given moment, which is exactly what we check on the first call.`,
      };
    case "mid":
      return {
        lead: "In-home first, with center options nearby",
        detail: `A city the size of ${city.name} usually supports both in-home routes and at least some center-based programming, though center seats can be the scarcer of the two. Starting at home is often the faster path, with center time added later if peer and classroom goals become the priority.`,
      };
    case "small":
      return {
        lead: "In-home is usually the fastest way to start",
        detail: `In ${city.name}, in-home ABA typically starts sooner than a center seat opens — your clinician travels to you, and therapy happens in the rooms where the hard parts of the day actually happen. Telehealth keeps parent coaching consistent between visits, which matters more when the nearest center is a drive.`,
      };
    case "town":
      return {
        lead: "We come to you",
        detail: `Towns like ${city.name} are the reason in-home and telehealth ABA exist. Nobody should have to relocate or spend two hours a day in a car to get their child autism care, and a plan built around your home avoids both.`,
      };
  }
}

/** Honest sentence about how the city sits inside its county. */
function countyContext(city: CityRecord): string {
  const share = shareOfCounty(city);
  const county = city.county;
  if (city.spansCounties > 1) {
    return `${city.name} spreads across ${city.spansCounties} counties, and most of it sits in ${county.name}. That matters more than it sounds: county lines can decide which offices, school districts, and local Medicaid contacts you deal with, so it's worth confirming which county your address is actually in.`;
  }
  if (share >= 60) {
    return `${city.name} is most of ${county.name} — roughly ${share}% of the county's ${formatPop(county.pop)} residents live inside the city. In practice, the county's coverage picture is your coverage picture.`;
  }
  if (share >= 25) {
    return `About ${share}% of ${county.name}'s ${formatPop(county.pop)} residents live in ${city.name}. The county's rules govern you, and the county page has the full coverage detail.`;
  }
  return `${city.name} is one of several communities in ${county.name}, which is home to about ${approxPop(county.pop)} people in total. The county sets the local picture; the state sets the rules.`;
}

function metaDescription(city: CityRecord, state: StateRecord, size: CitySize): string {
  const program = medicaidProgramName(state);
  switch (size) {
    case "major":
      return `ABA therapy for children in ${city.name}, ${city.stateAbbrev} (pop. ${formatPop(city.pop)}) — at home, in a center, at school, or online. How ${program} and private plans cover it.`;
    case "mid":
      return `In-home and center-based ABA therapy in ${city.name}, ${city.stateAbbrev}. What ${program} covers for autism care, and how to start.`;
    case "small":
      return `In-home ABA therapy in ${city.name}, ${city.stateAbbrev} — your clinician comes to you. How ${program} covers autism therapy for local families.`;
    case "town":
      return `ABA therapy that comes to your home in ${city.name}, ${city.stateAbbrev}. ${program} coverage explained, and how families here get started.`;
  }
}

function cityFaqs(
  city: CityRecord,
  county: CountyRecord,
  state: StateRecord,
  size: CitySize
): { q: string; a: string }[] {
  const program = medicaidProgramName(state);
  return [
    {
      q: `Do you serve families in ${city.name}?`,
      a: `Yes — ${city.name} is in ${county.name}, and we work with families across ${state.name}. What varies is which settings are available near a specific address at a specific moment, and how quickly. One call tells you exactly what's open for you right now instead of a general promise.`,
    },
    {
      q: `Does ${program} cover ABA therapy in ${city.name}?`,
      a: `${state.name}'s Medicaid program covers medically necessary ABA for eligible children, and where you live inside the state doesn't change your eligibility — the rules are statewide. The ${county.name} page walks through the pathway, prior authorization, and what the state publishes about authorized hours.`,
    },
    size === "town" || size === "small"
      ? {
          q: `Do we have to drive to a bigger city for therapy?`,
          a: `No. In-home ABA means the clinician travels, not your family, and telehealth covers parent coaching between visits. Distance changes scheduling and it changes how a plan is built — it does not change whether your child can get care.`,
        }
      : {
          q: `How long is the wait to start in ${city.name}?`,
          a: `It depends on the setting and the moment: in-home routes usually open sooner than center seats, and capacity moves week to week. ${siteConfig.intake.startTimeframe} — and if that isn't true for your address on the day you call, we'll say so rather than put you on a list and go quiet.`,
        },
    {
      q: `Can therapy happen at my child's school in ${city.name}?`,
      a: `Sometimes, and it depends on two separate yes-answers: your health plan has to cover services during school hours, and the district has to allow an outside clinician in the building. Both vary. We check the plan language first, because that's the one that can be answered in a phone call.`,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; county: string; city: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, county: countySlug, city: citySlug } = await params;
  const state = getState(stateSlug);
  const city = getCity(stateSlug, countySlug, citySlug);
  if (!state || !city) return {};

  return {
    title: `ABA Therapy in ${city.name}, ${city.stateAbbrev}`,
    description: metaDescription(city, state, citySize(city.pop)),
    alternates: {
      canonical: `/locations/${state.slug}/${city.county.slug}/${city.slug}/`,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; county: string; city: string }>;
}) {
  const { state: stateSlug, county: countySlug, city: citySlug } = await params;
  const state = getState(stateSlug);
  const city = getCity(stateSlug, countySlug, citySlug);
  if (!state || !city) notFound();

  const county = city.county;
  const size = citySize(city.pop);
  const access = accessCopy(city, size);
  const program = medicaidProgramName(state);
  const siblings = getSiblingCities(city);
  const faqs = cityFaqs(city, county, state, size);

  const base = siteConfig.brand.domain;
  const countyUrl = `${base}/locations/${state.slug}/${county.slug}/`;
  const stateUrl = `${base}/locations/${state.slug}/`;
  const pageUrl = `${countyUrl}${city.slug}/`;

  const faqItems: AccordionItem[] = faqs.map((f) => ({
    title: f.q,
    body: <p>{f.a}</p>,
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Locations",
        item: `${base}/locations/`,
      },
      { "@type": "ListItem", position: 2, name: state.name, item: stateUrl },
      { "@type": "ListItem", position: 3, name: county.name, item: countyUrl },
      { "@type": "ListItem", position: 4, name: city.name, item: pageUrl },
    ],
  };

  const clinicJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${pageUrl}#clinic`,
    name: `${siteConfig.brand.name} — ABA therapy in ${city.name}, ${city.stateAbbrev}`,
    url: pageUrl,
    telephone: siteConfig.contact.phone,
    medicalSpecialty: "Psychiatric",
    parentOrganization: { "@id": `${base}/#organization` },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: county.name,
        containedInPlace: { "@type": "State", name: state.name },
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={clinicJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href={`/locations/${state.slug}/`}
              className="underline underline-offset-4 hover:text-garden"
            >
              {state.name}
            </Link>{" "}
            /{" "}
            <Link
              href={`/locations/${state.slug}/${county.slug}/`}
              className="underline underline-offset-4 hover:text-garden"
            >
              {county.name}
            </Link>{" "}
            / {city.name}
          </nav>
          <h1 className="display display-hero mt-3">
            ABA therapy in {city.name}, {city.stateAbbrev}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            About {approxPop(city.pop)} people live in {city.name}, and the
            families among them who are looking for autism care all hit the
            same two questions: what&rsquo;s actually available here, and who
            pays for it. Here are both answers.
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
          <ModalityChips />
        </div>
      </section>

      {/* ─────────────── WHAT'S REALISTIC HERE ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="access-heading"
      >
        <p className="display text-xs tracking-wide text-garden">
          WHAT&rsquo;S AVAILABLE IN {city.name.toUpperCase()}
        </p>
        <h2 id="access-heading" className="display display-h2 mt-2">
          {access.lead}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
          {access.detail}
        </p>
        <div className="mt-6">
          <Link href="/services/" className="btn btn-outline">
            Compare the settings honestly
          </Link>
        </div>
      </section>

      {/* ─────────────── COUNTY + COVERAGE LAYER ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="rules-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="rules-heading" className="display display-h2">
            Which rules apply to you
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            {countyContext(city)}
          </p>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            Coverage itself is set at the state level, not locally.{" "}
            {program} covers medically necessary ABA for eligible children
            anywhere in {state.name}, and {state.name}&rsquo;s autism insurance
            law reaches private plans issued in the state. Your address changes
            which providers can reach you — it doesn&rsquo;t change whether
            you&rsquo;re covered.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/locations/${state.slug}/${county.slug}/`}
              className="btn btn-primary"
            >
              {county.name} coverage detail
            </Link>
            <Link
              href={`/locations/${state.slug}/`}
              className="btn btn-outline"
            >
              How {state.name} works
            </Link>
            <Link
              href={`/cost-of-aba-therapy/${state.slug}/`}
              className="btn btn-outline"
            >
              What it costs in {state.name}
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="city-faq-heading"
      >
        <h2 id="city-faq-heading" className="display display-h2">
          {city.name} questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faqItems} defaultOpen={-1} />
        </div>
      </section>

      {/* ─────────────────────── QUIZ ─────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="city-quiz-heading"
      >
        <div className="field-card bg-spruce p-6 sm:p-10">
          <h2 id="city-quiz-heading" className="display display-h2 text-ivory">
            Check your coverage in about a minute
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ivory/80">
            Four questions. A real person calls you back with what your plan
            covers in {city.name}.
          </p>
          <div className="mt-8">
            <Quiz states={getStateLinks()} defaultState={state.name} />
          </div>
        </div>
      </section>

      {/* ─────────────── NEARBY CITIES ─────────────── */}
      {siblings.length > 0 && (
        <section
          className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
          aria-labelledby="nearby-cities-heading"
        >
          <h2 id="nearby-cities-heading" className="display display-h2">
            Other {state.name} cities
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={`${s.county.slug}-${s.slug}`}>
                <Link
                  href={`/locations/${state.slug}/${s.county.slug}/${s.slug}/`}
                  className="chip"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/locations/${state.slug}/`} className="chip">
                All of {state.name} →
              </Link>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
