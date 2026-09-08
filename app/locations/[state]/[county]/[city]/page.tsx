import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getState, getStateLinks, type StateRecord } from "@/lib/states";
import {
  approxPop,
  formatPop,
  medicaidProgramName,
  type CountyRecord,
} from "@/lib/counties";
import {
  getPrerenderedCityParams,
  getCity,
  getSiblingCities,
  getCitiesForState,
  citySize,
  reachFor,
  shareOfCounty,
  growthSince2020,
  fmt,
  type CityRecord,
  type CitySize,
  type Reach,
} from "@/lib/cities";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import ModalityChips from "@/components/ModalityChips";
import FeatureStrip from "@/components/FeatureStrip";
import Quiz from "@/components/Quiz";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * City pages — 10,255 places of 1,000+ residents nationwide.
 *
 * The biggest 30 per state prerender at build time; the long tail renders on
 * first request and is then cached. That keeps national coverage without
 * shipping a six-figure file count in every deployment.
 *
 * Every page is driven by six real variables — population, land area, density,
 * distance to the nearest place of 50,000+, position within its county, and
 * its state's Medicaid rules — so no two read the same. The distance figure in
 * particular is not decoration: it decides which setting we actually
 * recommend, and the page says so.
 */

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return getPrerenderedCityParams(30);
}

/* ------------------------------------------------------------------ */
/* Copy helpers — all interpolate measured data                        */
/* ------------------------------------------------------------------ */

function densityWord(d: number): string {
  if (d >= 6000) return "densely built";
  if (d >= 2500) return "compact";
  if (d >= 1000) return "moderately spread out";
  return "spread out";
}

/** The recommendation, driven by real distance to the nearest hub. */
function reachCopy(
  city: CityRecord,
  reach: Reach
): { lead: string; detail: string; strip: string } {
  const hub = city.hub;
  switch (reach) {
    case "in-hub":
      return {
        lead: "Every setting is realistic here",
        detail: `${city.name} is itself a city of ${approxPop(
          city.pop
        )}, which means centers, in-home routes, school collaboration and telehealth are all live options rather than theoretical ones. In a place this size the constraint is almost never whether a service exists — it's capacity at any given moment, and that's exactly what we check on the first call.`,
        strip: "All four settings realistic",
      };
    case "close":
      return {
        lead: "A center is a normal commute from here",
        detail: `${hub!.name} is about ${hub!.miles} miles away, which is a school-run sort of distance rather than an expedition. Families in ${city.name} can realistically use a center for peer and classroom-readiness goals while keeping in-home sessions for the routines that only happen at home.`,
        strip: `${hub!.miles} mi to ${hub!.name}`,
      };
    case "moderate":
      return {
        lead: "In-home usually starts sooner than the drive is worth",
        detail: `The nearest city of any size is ${hub!.name}, roughly ${hub!.miles} miles away. That's a real trip twice a day, and for most families in ${city.name} it means in-home ABA starts sooner and sticks better — with a center added later only if peer goals become the priority.`,
        strip: `${hub!.miles} mi to ${hub!.name}`,
      };
    case "far":
      return {
        lead: "In-home and telehealth aren't a compromise here",
        detail: `The nearest city of 50,000 or more is ${hub!.name}, about ${hub!.miles} miles from ${city.name}. Nobody should relocate or spend three hours a day in a car to get their child autism care. A plan built around your home — with telehealth carrying the parent coaching between visits — is the right answer here, not the fallback.`,
        strip: `${hub!.miles} mi to the nearest city`,
      };
  }
}

function countyContext(city: CityRecord): string {
  const share = shareOfCounty(city);
  const c = city.county;
  if (city.spansCounties > 1) {
    return `${city.name} spreads across ${city.spansCounties} counties, and most of it sits in ${c.name}. That matters more than it sounds: county lines can decide which offices, school district, and local Medicaid contacts you deal with, so it's worth confirming which county your address actually falls in.`;
  }
  if (share >= 60) {
    return `${city.name} is most of ${c.name} — roughly ${share}% of the county's ${formatPop(
      c.pop
    )} residents live inside the city limits. In practice, the county's coverage picture is your coverage picture.`;
  }
  if (share >= 20) {
    return `About ${share}% of ${c.name}'s ${formatPop(
      c.pop
    )} residents live in ${city.name}, one of ${fmt(
      city.placesInCounty
    )} incorporated places in the county. The county's rules govern you; the county page has the full coverage detail.`;
  }
  return `${city.name} is one of ${fmt(
    city.placesInCounty
  )} incorporated places in ${c.name}, a county of about ${approxPop(
    c.pop
  )} people. ${
    city.countyBiggest.same
      ? "It is the county's largest community."
      : `The county's largest is ${city.countyBiggest.name}, about ${city.countyBiggest.miles} miles away.`
  }`;
}

function metaDescription(city: CityRecord, state: StateRecord, reach: Reach): string {
  const program = medicaidProgramName(state);
  const base = `ABA therapy for children in ${city.name}, ${city.stateAbbrev} (pop. ${formatPop(
    city.pop
  )})`;
  switch (reach) {
    case "in-hub":
      return `${base} — at home, in a center, at school or online. How ${program} and private plans cover it.`;
    case "close":
      return `${base}. In-home and center-based options, and what ${program} covers for autism care.`;
    case "moderate":
      return `${base}. In-home ABA and telehealth built for the distance, plus how ${program} covers it.`;
    case "far":
      return `${base} — your clinician travels to you. How ${program} covers autism therapy this far from a city.`;
  }
}

function cityFaqs(
  city: CityRecord,
  county: CountyRecord,
  state: StateRecord,
  reach: Reach,
  size: CitySize
): { q: string; a: string }[] {
  const program = medicaidProgramName(state);
  const out: { q: string; a: string }[] = [
    {
      q: `Do you serve families in ${city.name}?`,
      a: `Yes — ${city.name} is in ${county.name}, and we work with families across ${state.name}. What varies is which settings can reach a specific address and how quickly. One call tells you what's actually open for you right now instead of a general promise.`,
    },
    {
      q: `Does ${program} cover ABA therapy in ${city.name}?`,
      a: `${state.name}'s Medicaid program covers medically necessary ABA for eligible children, and where you live inside the state doesn't change your eligibility — those rules are statewide. The ${county.name} page walks through the pathway, the prior authorization, and what the state publishes about authorized hours.`,
    },
  ];

  if (reach === "far" || reach === "moderate") {
    out.push({
      q: `Do we have to drive to ${city.hub?.name} for therapy?`,
      a: `No. In-home ABA means the clinician travels, not your family, and telehealth covers parent coaching between visits. The ${city.hub?.miles}-mile distance changes how a plan is built and scheduled — it does not change whether your child can get care.`,
    });
  } else {
    out.push({
      q: `How long is the wait to start in ${city.name}?`,
      a: `It depends on the setting and the moment — in-home routes usually open sooner than center seats, and capacity moves week to week. ${siteConfig.intake.startTimeframe}, and if that isn't true for your address on the day you call, we'll say so rather than put you on a list and go quiet.`,
    });
  }

  if (size === "village" || size === "town") {
    out.push({
      q: `Is a town this size too small for an ABA provider?`,
      a: `No. About ${approxPop(city.pop)} people live in ${city.name}, and small communities are exactly why in-home and telehealth ABA exist. Your state's coverage rules are the same here as in its biggest city.`,
    });
  } else {
    out.push({
      q: `Can therapy happen at my child's school in ${city.name}?`,
      a: `Sometimes, and it needs two separate yes-answers: your health plan has to cover services during school hours, and the district has to allow an outside clinician in the building. Both vary. We check the plan language first, because that's the one that can be settled on a phone call.`,
    });
  }

  return out;
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
    description: metaDescription(city, state, reachFor(city)),
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
  const reach = reachFor(city);
  const access = reachCopy(city, reach);
  const program = medicaidProgramName(state);
  const siblings = getSiblingCities(city);
  const growth = growthSince2020(city);
  const stateCityCount = getCitiesForState(state.slug).length;
  const faqs = cityFaqs(city, county, state, reach, size);

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
      { "@type": "ListItem", position: 1, name: "Locations", item: `${base}/locations/` },
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
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lon,
      },
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
      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-14 sm:px-10 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-muted">
            <Link href={`/locations/${state.slug}/`} className="underline underline-offset-4 hover:text-coral">
              {state.name}
            </Link>{" "}
            /{" "}
            <Link href={`/locations/${state.slug}/${county.slug}/`} className="underline underline-offset-4 hover:text-coral">
              {county.name}
            </Link>{" "}
            / {city.name}
          </nav>
          <h1 className="display display-hero mt-5 max-w-4xl">
            ABA therapy in {city.name}, {city.stateAbbrev}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            About {approxPop(city.pop)} people live in {city.name}, across{" "}
            {city.sqmi} square miles — {densityWord(city.density)}, at roughly{" "}
            {fmt(city.density)} people per square mile. Families here hit the
            same two questions: what&rsquo;s actually available, and who pays
            for it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              {siteConfig.contact.phone}
            </a>
          </div>
          <ModalityChips />
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "map", text: access.strip },
          { icon: "shield", text: `${program} covers eligible children` },
          { icon: "clock", text: "In-home visits come to you" },
        ]}
      />

      {/* ─────────────── WHAT'S REALISTIC HERE ─────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:py-14" aria-labelledby="access-heading">
        <p className="eyebrow">What&rsquo;s available in {city.name}</p>
        <h2 id="access-heading" className="display display-h2 mt-4 text-coral">
          {access.lead}
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-ink-muted">{access.detail}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services/" className="btn btn-outline">
            Compare the settings honestly
          </Link>
          {reach === "far" || reach === "moderate" ? (
            <Link href="/services/telehealth/" className="btn btn-outline">
              How telehealth coaching works
            </Link>
          ) : (
            <Link href="/services/center-based/" className="btn btn-outline">
              What a center adds
            </Link>
          )}
        </div>
      </section>

      {/* ─────────────── BY THE NUMBERS — all measured ─────────────── */}
      <section
        className="mx-auto max-w-[1400px] px-4 pb-6"
        aria-labelledby="numbers-heading"
      >
        <h2 id="numbers-heading" className="eyebrow">
          {city.name} by the numbers
        </h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Population", v: fmt(city.pop), n: `2024 census estimate` },
            {
              k: "Land area",
              v: `${city.sqmi} sq mi`,
              n: `${fmt(city.density)} people per square mile`,
            },
            {
              k: `Size in ${state.name}`,
              v: `#${city.stateRank}`,
              n: `of ${fmt(stateCityCount)} communities we cover`,
            },
            {
              k: `Size in ${county.name}`,
              v: `#${city.countyRank}`,
              n:
                city.citiesInCountyPublished > 1
                  ? `of ${fmt(city.citiesInCountyPublished)} towns in the county`
                  : "the county's only incorporated place this size",
            },
          ].map((s2) => (
            <div key={s2.k} className="rounded-[24px] bg-beige-80 p-6">
              <dt className="eyebrow text-ink-muted">{s2.k}</dt>
              <dd className="display-round display-round-lg mt-2">{s2.v}</dd>
              <dd className="mt-1 text-sm text-ink-muted">{s2.n}</dd>
            </div>
          ))}
        </dl>
        {growth && (
          <p className="mt-5 max-w-3xl text-lg text-ink-muted">
            {city.name} has{" "}
            <strong className="text-ink">
              {growth.direction} about {growth.pct}%
            </strong>{" "}
            since the 2020 census
            {growth.direction === "grown"
              ? " — a growing town usually means more families arriving than local services have caught up with, and waitlists follow that curve."
              : " — where population is falling, in-person provider coverage tends to thin out first, which is exactly when in-home and telehealth matter most."}
          </p>
        )}
      </section>

      {/* ─────────────── COUNTY + COVERAGE LAYER ─────────────── */}
      <section className="mx-auto max-w-[1400px] px-3" aria-labelledby="rules-heading">
        <div className="field-card bg-peach-100 px-6 py-14 sm:px-12">
          <h2 id="rules-heading" className="display display-h2">
            Which rules apply to you
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-ink-muted">{countyContext(city)}</p>
          <p className="mt-5 max-w-3xl text-lg text-ink-muted">
            Coverage itself is set statewide, not locally. {program} covers
            medically necessary ABA for eligible children anywhere in{" "}
            {state.name}, and {state.name}&rsquo;s autism insurance law reaches
            private plans issued in the state. Your address changes which
            providers can reach you — it doesn&rsquo;t change whether
            you&rsquo;re covered.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/locations/${state.slug}/${county.slug}/`} className="btn btn-primary">
              {county.name} coverage detail
            </Link>
            <Link href={`/locations/${state.slug}/`} className="btn btn-outline">
              How {state.name} works
            </Link>
            <Link href={`/cost-of-aba-therapy/${state.slug}/`} className="btn btn-outline">
              What it costs in {state.name}
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:py-20" aria-labelledby="city-faq-heading">
        <h2 id="city-faq-heading" className="display display-h2 display-mega">
          {city.name} questions, straight answers
        </h2>
        <div className="mx-auto mt-10 max-w-4xl">
          <Accordion items={faqItems} defaultOpen={-1} />
        </div>
      </section>

      {/* ─────────────────────── QUIZ ─────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-3" aria-labelledby="city-quiz-heading">
        <div className="field-card bg-ink px-6 py-14 sm:px-12">
          <h2 id="city-quiz-heading" className="display display-h2 text-cream">
            Check your coverage in about a minute
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-cream/80">
            Four questions. A real person calls you back with what your plan
            covers in {city.name}.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <Quiz states={getStateLinks()} defaultState={state.name} />
          </div>
        </div>
      </section>

      {/* ─────────────── NEARBY, WITH REAL DISTANCES ─────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:py-20" aria-labelledby="nearby-cities-heading">
        <h2 id="nearby-cities-heading" className="display display-h2">
          ABA therapy near {city.name}
        </h2>
        {city.nearby.length > 0 && (
          <>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted">
              The closest communities we cover, with the real distance from{" "}
              {city.name}:
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {city.nearby.map((n) =>
                n.countySlug ? (
                  <li key={`${n.countySlug}-${n.slug}`}>
                    <Link
                      href={`/locations/${state.slug}/${n.countySlug}/${n.slug}/`}
                      className="flex h-full flex-col rounded-[24px] bg-teal-80 p-6 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="display-round display-round-md">{n.name}</span>
                      <span className="mt-2 text-ink-muted">
                        {n.miles} miles · {fmt(n.pop)} people
                      </span>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </>
        )}
        {siblings.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={`${s.county.slug}-${s.slug}`}>
                <Link href={`/locations/${state.slug}/${s.county.slug}/${s.slug}/`} className="chip">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/locations/${state.slug}/`} className="chip chip-solid">
                All of {state.name} →
              </Link>
            </li>
          </ul>
        )}
      </section>
    </>
  );
}
