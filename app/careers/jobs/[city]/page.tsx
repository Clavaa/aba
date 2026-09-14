import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getState } from "@/lib/states";
import { approxPop, formatPop } from "@/lib/counties";
import { getJobCities, getJobCity } from "@/lib/jobcities";
import { fmt } from "@/lib/cities";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import FeatureStrip from "@/components/FeatureStrip";
import ImageSlot from "@/components/ImageSlot";
import CallCta from "@/components/CallCta";

/**
 * RBT / behavior-technician job pages for the 150 largest cities.
 *
 * Targets a real keyword cluster — "rbt jobs houston", "rbt jobs denver" and
 * ~20 siblings at roughly 500/mo each, plus "behavior technician jobs" at
 * 50,000/mo nationally.
 *
 * What keeps these from being doorway pages is the state licensure field: RBT
 * certification is national, but whether a state ALSO licenses behavior
 * analysts differs, and that genuinely changes what a candidate has to do.
 * That text is per-state research, not a template with the city swapped.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getJobCities(150).map((c) => ({ city: c.jobSlug }));
}

export async function generateMetadata(props: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await props.params;
  const c = getJobCity(slug);
  if (!c) return {};
  return {
    title: `RBT & BCBA Jobs in ${c.name}, ${c.stateAbbrev}`,
    description: `RBT, behavior technician and BCBA jobs in ${c.name}, ${c.stateAbbrev} — what each role involves, how ${c.stateName} licenses behavior analysts, and how to get certified.`,
    alternates: { canonical: `/careers/jobs/${c.jobSlug}/` },
  };
}

export default async function JobCityPage(props: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await props.params;
  const c = getJobCity(slug);
  if (!c) notFound();
  const state = getState(c.stateSlug);
  if (!state) notFound();

  const url = `${siteConfig.brand.domain}/careers/jobs/${c.jobSlug}/`;
  const nearby = getJobCities(150)
    .filter((x) => x.stateSlug === c.stateSlug && x.jobSlug !== c.jobSlug)
    .slice(0, 6);

  const licensed = !/^no\b/i.test(state.licensure);

  const faqs = [
    {
      q: `What do behavior technician jobs in ${c.name} actually involve?`,
      a: `You work one-to-one with a child, running the teaching programmes a BCBA designed and recording what happens so the plan can be adjusted. In ${c.name} that mostly means sessions in family homes, and in schools or daycares where the setting allows it. The day is play-led far more than it is clinical.`,
    },
    {
      q: `Do I need a degree to get an RBT job in ${c.name}?`,
      a: `No. RBT certification asks for a high-school diploma or equivalent, being at least 18, a background check, a 40-hour training, a competency assessment and one exam. Most people get certified through an employer, because the competency assessment needs a qualified assessor.`,
    },
    {
      q: `Does ${state.name} license behavior analysts?`,
      a: licensed
        ? `Yes — ${state.licensure} That sits on top of national RBT certification, so check the current state requirement before you plan a timeline.`
        : `${state.licensure} National RBT certification is still what employers hire on.`,
    },
    {
      q: `What does an RBT earn in ${c.name}?`,
      a: `We don't publish a number we can't source. What matters more than the hourly rate is how many hours you actually get paid for — guaranteed hours, drive time, documentation and the benefits threshold routinely separate two jobs advertising the same rate by thousands a year. Ask us for a real range for this market and we'll give you one.`,
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
            { "@type": "ListItem", position: 2, name: "Jobs", item: `${siteConfig.brand.domain}/careers/openings/` },
            { "@type": "ListItem", position: 3, name: `${c.name}, ${c.stateAbbrev}`, item: url },
          ],
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-14 sm:px-10 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-muted">
                <Link href="/careers/" className="underline underline-offset-4 hover:text-coral">
                  Careers
                </Link>{" "}
                / {c.name}
              </nav>
              <h1 className="display display-hero mt-5">
                RBT jobs in {c.name}, {c.stateAbbrev}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">
                We hire behavior technicians and RBTs across {c.name} — a city
                of about {approxPop(c.pop)} — and across {state.name}. No
                degree required, certification in weeks, and supervision built
                into the schedule rather than chased.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact/" className="btn btn-primary">
                  Apply in 5 minutes
                </Link>
                <Link href="/careers/rbt/certification/" className="btn btn-outline">
                  How to get certified
                </Link>
              </div>
            </div>
            <ImageSlot
              intent="Behavior technician in a navy polo walking to a car with a session bag, early morning light"
              src="/photos/session-bag.jpg"
              alt="A behavior technician in a navy polo walking to her car carrying a tote of picture books and wooden blocks"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="field-card aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "ages", text: "No degree required" },
          { icon: "clock", text: "Certified in weeks, not years" },
          { icon: "shield", text: licensed ? `${state.name} licenses analysts` : "National RBT certification" },
        ]}
      />

      <section className="mx-auto max-w-[1400px] px-4 py-10" aria-labelledby="local-heading">
        <p className="eyebrow">Working in {c.name}</p>
        <h2 id="local-heading" className="display display-h2 mt-4 text-coral">
          What the job looks like here
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-ink-muted">
          {c.name} has roughly {formatPop(c.pop)} residents across {c.sqmi}{" "}
          square miles, at about {fmt(c.density)} people per square mile
          {c.isHub
            ? " — dense enough that a technician's day is several short visits rather than long drives between them."
            : c.hub
            ? `, and the nearest larger city is ${c.hub.name}, about ${c.hub.miles} miles away. That shapes a route: fewer, longer sessions rather than many short ones.`
            : "."}{" "}
          Sessions run in family homes and, where districts allow it, in
          schools and daycares.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/careers/pay/" className="btn btn-outline">
            How ABA pay actually works
          </Link>
          <Link href="/careers/bcba/supervision/" className="btn btn-outline">
            Supervision toward BCBA
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-3 pb-4" aria-labelledby="roles-heading">
        <div className="field-card bg-peach-100 px-6 py-12 sm:px-12">
          <h2 id="roles-heading" className="display display-h2">
            Both roles, in {c.name}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[30px] bg-white/80 p-7">
              <p className="eyebrow text-coral">Entry level · no degree</p>
              <h3 className="display-round display-round-md mt-2">
                RBT and behavior technician jobs
              </h3>
              <p className="mt-3 text-ink-muted">
                One-to-one sessions with a child, running the plan a BCBA
                designed. Certification takes weeks, and we run the competency
                assessment as part of onboarding rather than leaving you to
                find an assessor.
              </p>
              <Link href="/careers/rbt/" className="btn btn-outline mt-6 !py-2.5">
                The RBT path
              </Link>
            </div>
            <div className="rounded-[30px] bg-white/80 p-7">
              <p className="eyebrow text-coral">Clinical leadership · master&rsquo;s</p>
              <h3 className="display-round display-round-md mt-2">
                BCBA jobs in {c.name}
              </h3>
              <p className="mt-3 text-ink-muted">
                You assess, write the treatment plans, supervise the
                technicians running them and coach families. Reasonable
                caseloads and real clinical autonomy — and if you are still
                accruing fieldwork hours, we will tell you honestly whether we
                can get you there faster.
              </p>
              <Link href="/careers/bcba/" className="btn btn-outline mt-6 !py-2.5">
                The BCBA path
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-10" aria-labelledby="jobs-faq">
        <h2 id="jobs-faq" className="display display-h2 display-mega">
          {c.name} job questions, straight answers
        </h2>
        <div className="mx-auto mt-10 max-w-4xl">
          <Accordion items={items} defaultOpen={-1} />
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 pb-20" aria-labelledby="nearby-jobs">
          <h2 id="nearby-jobs" className="display display-h3">
            RBT jobs elsewhere in {state.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.jobSlug}>
                <Link href={`/careers/jobs/${n.jobSlug}/`} className="chip">
                  {n.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/careers/openings/" className="chip chip-solid">
                All open roles →
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <CallCta className="btn btn-primary" fallbackLabel="Talk to us about a role" />
          </div>
        </section>
      )}
    </>
  );
}
