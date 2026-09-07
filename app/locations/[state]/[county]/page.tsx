import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getState, getStateLinks, usd, type StateRecord } from "@/lib/states";
import {
  approxPop,
  countySize,
  formatPop,
  getAllCountyParams,
  getCounty,
  getNeighborCounties,
  medicaidProgramName,
  type CountyRecord,
  type CountySize,
} from "@/lib/counties";
import Quiz from "@/components/Quiz";
import JsonLd from "@/components/JsonLd";
import ModalityChips from "@/components/ModalityChips";
import { getCitiesForCounty } from "@/lib/cities";
import Sprout from "@/components/Sprout";
import { PhoneIcon } from "@/components/TopBar";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCountyParams();
}

/* ------------------------------------------------------------------ */
/* Copy helpers — every one interpolates REAL data so no two county    */
/* pages read the same.                                                */
/* ------------------------------------------------------------------ */

/** First sentence-ish chunk of a long research field, for condensed cards. */
function firstChunk(text: string, max = 180): string {
  const cut = text.split(/(?<=\.)\s+|;\s+/)[0] ?? text;
  let out = cut.length > max ? `${cut.slice(0, max).replace(/[,;\s]+\S*$/, "")}…` : cut;
  out = out.replace(/[;,\s]+$/, "");
  return /[.!?…]$/.test(out) ? out : `${out}.`;
}

function familiesPhrase(size: CountySize): string {
  switch (size) {
    case "metro":
      return "hundreds of thousands of families";
    case "large":
      return "tens of thousands of families";
    case "mid":
      return "thousands of families";
    case "small":
      return "a close-knit community of families";
  }
}

/** In-home vs. center framing, varied by county size. */
function settingCopy(county: CountyRecord, size: CountySize): { lead: string; detail: string } {
  switch (size) {
    case "metro":
      return {
        lead: "In-home, in-center, school, and telehealth",
        detail: `${county.name} is one of ${county.stateName}'s biggest communities, so families here usually have the most setting options: in-home sessions where your child is most comfortable, center-based programs, school collaboration, and telehealth parent coaching. On the first call we'll tell you exactly which options are open near you right now.`,
      };
    case "large":
      return {
        lead: "In-home first, with center and school options",
        detail: `For most families in ${county.name}, therapy starts in the home — it's where young kids learn fastest and where parents see the plan work day to day. Center-based and school-based sessions are often available around the county's larger towns, and telehealth keeps parent coaching consistent between visits.`,
      };
    case "mid":
      return {
        lead: "In-home and telehealth, built for real schedules",
        detail: `In a county the size of ${county.name}, in-home ABA is usually the fastest way to start — your clinician comes to you, so there's no waitlist for a center seat and no daily drive. Telehealth parent coaching fills the gaps between in-person sessions, and school-based support is possible where districts allow it.`,
      };
    case "small":
      return {
        lead: "We come to you",
        detail: `Smaller communities like ${county.name} are exactly why in-home ABA exists: your child's therapist travels to your home, therapy happens where life actually happens, and telehealth keeps sessions and parent coaching consistent even when distances are long. You shouldn't have to move counties to get autism care.`,
      };
  }
}

function hoursShort(state: StateRecord): string {
  if (state.hoursUnpublished) {
    return `${state.name} sets hours child by child — your BCBA's treatment plan drives what's approved.`;
  }
  // "Not published — {useful detail}" → keep the detail, drop the research
  // lead-in (same policy as the state page).
  const m = state.hours.match(/^not\s+(?:state-)?published[^;—–]*[;—–]\s*(.+)$/i);
  if (m) return `No fixed statewide number — ${firstChunk(m[1], 140)}`;
  return firstChunk(state.hours, 160);
}

function rateShort(state: StateRecord): string {
  if (state.rateUnpublished || !state.hourlyRate) {
    return "With Medicaid, most families pay nothing out of pocket.";
  }
  const r = state.hourlyRate;
  const range = r.min === r.max ? usd(r.min) : `${usd(r.min)}–${usd(r.max)}`;
  return `The state pays providers roughly ${range}/hour — with Medicaid, most families pay nothing out of pocket.`;
}

function descriptionFor(county: CountyRecord, state: StateRecord, size: CountySize): string {
  const program = medicaidProgramName(state);
  switch (size) {
    case "metro":
      return `In-home and center-based ABA therapy across ${county.name}, ${county.stateAbbrev} (pop. ${formatPop(county.pop)}). How ${program} covers ABA — and how to start.`;
    case "large":
      return `ABA therapy for children in ${county.name}, ${county.stateAbbrev} — home to ${formatPop(county.pop)} people. ${program} coverage, in-home care, and how to start.`;
    case "mid":
      return `In-home ABA therapy in ${county.name}, ${county.stateAbbrev} (pop. ${formatPop(county.pop)}). What ${program} covers, real answers for parents, and how to begin.`;
    case "small":
      return `ABA therapy that comes to you in ${county.name}, ${county.stateAbbrev}. How ${program} covers autism care for local families — no move to the city required.`;
  }
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; county: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, county: countySlug } = await params;
  const state = getState(stateSlug);
  const county = getCounty(stateSlug, countySlug);
  if (!state || !county) return {};
  const title = `ABA Therapy in ${county.name}, ${county.stateAbbrev}`;
  const description = descriptionFor(county, state, countySize(county.pop));
  const canonical = `/locations/${state.slug}/${county.slug}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function CountyPage({
  params,
}: {
  params: Promise<{ state: string; county: string }>;
}) {
  const { state: stateSlug, county: countySlug } = await params;
  const state = getState(stateSlug);
  const county = getCounty(stateSlug, countySlug);
  if (!state || !county) notFound();

  const size = countySize(county.pop);
  const program = medicaidProgramName(state);
  const setting = settingCopy(county, size);
  const neighbors = getNeighborCounties(county);
  const cities = getCitiesForCounty(stateSlug, countySlug);
  const pageUrl = `${siteConfig.brand.domain}/locations/${state.slug}/${county.slug}/`;
  const statePageUrl = `${siteConfig.brand.domain}/locations/${state.slug}/`;

  /* ---------------- FAQ (rendered + FAQPage JSON-LD) ---------------- */
  const faqs: { q: string; a: string }[] = [
    {
      q: `Does Medicaid cover ABA therapy in ${county.name}?`,
      a: `Yes. ${program} covers ABA statewide for eligible children — coverage doesn't change from county to county, so families in ${county.name} get the same benefit as anywhere else in ${state.name}. ${firstChunk(state.pathway, 200)}`,
    },
    {
      q: `Can my child get in-home ABA therapy in ${county.name}?`,
      a:
        size === "metro"
          ? `Yes — in ${county.name} families can usually choose between in-home sessions, center-based programs, school collaboration, and telehealth parent coaching. We'll confirm what's open near your part of the county on the first call.`
          : `Yes — in-home is the most common way families in ${county.name} receive ABA. Your child's therapist comes to you, and telehealth parent coaching keeps progress moving between visits. We'll confirm current availability for your address on the first call.`,
    },
    {
      q: `How many hours of ABA per week will my child get in ${county.name}?`,
      a: `Hours follow ${state.name}'s statewide rules, not county lines. ${hoursShort(state)} Your BCBA recommends hours based on your child's assessment, and we handle the approval paperwork.`,
    },
    {
      q: `How do we start ABA therapy in ${county.name}?`,
      a: `Two ways: take the one-minute coverage check on this page, or call ${siteConfig.contact.phone}. A real person confirms your ${state.name} coverage, answers your questions, and maps the next step. ${siteConfig.intake.startTimeframe}.`,
    },
  ];

  /* ---------------------------- JSON-LD ----------------------------- */
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
      {
        "@type": "ListItem",
        position: 2,
        name: state.name,
        item: statePageUrl,
      },
      { "@type": "ListItem", position: 3, name: county.name, item: pageUrl },
    ],
  };

  const clinicJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${pageUrl}#clinic`,
    name: `${siteConfig.brand.name} — ${county.name}, ${state.name}`,
    url: pageUrl,
    telephone: siteConfig.contact.phone,
    medicalSpecialty: "Psychiatric",
    parentOrganization: { "@id": `${siteConfig.brand.domain}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: county.name,
      containedInPlace: { "@type": "State", name: state.name },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={clinicJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/locations/" className="underline underline-offset-4 hover:text-garden">
              Where we work
            </Link>{" "}
            /{" "}
            <Link
              href={`/locations/${state.slug}/`}
              className="underline underline-offset-4 hover:text-garden"
            >
              {state.name}
            </Link>{" "}
            / {county.name}
          </nav>
          <h1 className="display display-hero mt-3">
            ABA therapy in {county.name}
            <span className="mt-2 block text-[0.4em] tracking-wide text-garden">
              {state.name}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            {county.name} is home to about {approxPop(county.pop)} people —{" "}
            {familiesPhrase(size)} raising kids right here. If yours might need
            autism support, you don&rsquo;t have to figure out {state.name}
            &rsquo;s system alone: {program} covers ABA for eligible children,
            and we handle the paperwork side for you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#county-quiz" className="btn btn-primary">
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

      {/* ─────────── SETTINGS: in-home vs center, sized honestly ─────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
        aria-labelledby="setting-heading"
      >
        <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
          <div className="field-card bg-mint p-6 sm:p-10">
            <p className="display text-xs tracking-wide text-garden">
              HOW THERAPY HAPPENS HERE
            </p>
            <h2 id="setting-heading" className="display display-h2 mt-2">
              {setting.lead}
            </h2>
            <p className="mt-4 max-w-2xl text-spruce-soft">{setting.detail}</p>
          </div>

          {/* Condensed state-coverage card — the county page's cheat sheet,
              not a copy of the state page. */}
          <div className="field-card bg-white p-6 shadow-lift sm:p-8">
            <p className="display text-xs tracking-wide text-garden">
              WHAT {state.name.toUpperCase()} COVERS
            </p>
            <ul className="mt-4 space-y-3 text-[15px] text-spruce-soft">
              <li className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-garden">✓</span>
                <span>
                  <strong className="text-spruce">Medicaid:</strong> {program}{" "}
                  covers medically necessary ABA for eligible kids statewide.
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-garden">✓</span>
                <span>
                  <strong className="text-spruce">Private plans:</strong>{" "}
                  {state.mandateYear
                    ? `state law has required autism coverage since ${state.mandateYear}.`
                    : `state insurance law addresses autism coverage too.`}
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-garden">✓</span>
                <span>
                  <strong className="text-spruce">Hours:</strong>{" "}
                  {hoursShort(state)}
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-garden">✓</span>
                <span>
                  <strong className="text-spruce">Cost to you:</strong>{" "}
                  {rateShort(state)}
                </span>
              </li>
            </ul>
            <Link
              href={`/locations/${state.slug}/`}
              className="mt-5 inline-block font-bold text-garden underline underline-offset-4 hover:text-garden-dark"
            >
              Read the full {state.name} coverage guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="faq-heading">
        <div className="flex items-end gap-4">
          <h2 id="faq-heading" className="display display-h2">
            {county.name} questions, answered
          </h2>
          <Sprout className="hidden h-14 w-14 shrink-0 text-garden sm:block" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className={`field-card p-6 sm:p-8 ${
                ["bg-mint", "bg-butter", "bg-peach", "bg-white shadow-lift"][i % 4]
              }`}
            >
              <h3 className="display display-h3">{f.q}</h3>
              <p className="mt-3 text-spruce-soft">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-spruce-soft">
          Coverage rules are set statewide by {state.name} and can change; this
          page is general information, not legal or benefits advice. Call us
          and we&rsquo;ll check your exact plan.
        </p>
      </section>

      {/* ─────────────────────── QUIZ CTA ─────────────────────── */}
      <section
        id="county-quiz"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:py-20"
        aria-labelledby="quiz-heading"
      >
        <div className="field-card bg-spruce p-6 text-ivory sm:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 id="quiz-heading" className="display display-h2 text-ivory">
                See what your plan covers in {county.name}
              </h2>
              <p className="mt-4 max-w-lg text-ivory/80">
                One minute, four questions, no commitment. We&rsquo;ll check
                your {state.name} coverage — Medicaid or private — and call you
                back with a real answer, not a runaround.
              </p>
              <p className="mt-4 max-w-lg text-ivory/80">
                Rather just talk?{" "}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-bold text-marigold underline underline-offset-4"
                >
                  Call {siteConfig.contact.phone}
                </a>{" "}
                — a real person, {siteConfig.intake.callLength} of your time.
              </p>
            </div>
            <div className="rounded-3xl bg-ivory p-5 text-spruce sm:p-7">
              <Quiz states={getStateLinks()} defaultState={state.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── CITIES IN THIS COUNTY ────────────────── */}
      {cities.length > 0 && (
        <section
          className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
          aria-labelledby="cities-heading"
        >
          <div className="field-card bg-mint p-6 sm:p-10">
            <h2 id="cities-heading" className="display display-h2">
              Cities in {county.name}
            </h2>
            <p className="mt-3 max-w-2xl text-spruce-soft">
              Local pages for the biggest communities here — what&rsquo;s
              realistically available in each, and who pays for it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/locations/${state.slug}/${county.slug}/${c.slug}/`}
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

      {/* ────────────────── NEIGHBORING COUNTIES + STATE ────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24"
        aria-labelledby="nearby-heading"
      >
        <h2 id="nearby-heading" className="display display-h3">
          ABA therapy near {county.name}
        </h2>
        <p className="mt-2 max-w-2xl text-spruce-soft">
          We serve families across {state.name}
          {neighbors.length > 0 ? " — including these communities:" : "."}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {neighbors.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/locations/${state.slug}/${n.slug}/`}
                className="chip text-sm"
              >
                {n.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={`/locations/${state.slug}/`}
              className="chip chip-solid text-sm"
            >
              All of {state.name} →
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
