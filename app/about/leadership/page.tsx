import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import {
  executives,
  leadership,
  regionalOpsLeaders,
  seniorLeaders,
  leaderTint,
  type Leader,
} from "@/data/leadership";
import InitialsAvatar from "@/components/InitialsAvatar";
import Sprout from "@/components/Sprout";

export const metadata: Metadata = {
  title: "Our Leadership Team",
  description:
    "Meet the Sproutwell ABA leaders responsible for clinical standards, insurance relationships, and operations in all 50 states.",
  alternates: { canonical: "/about/leadership/" },
};

/* NOTE: org-level JSON-LD only (in the root layout). We intentionally do NOT
   emit Person schema for individual leaders on this page. */

/** Tint rotates by position in the full roster so the grid alternates */
const tintFor = (leader: Leader) => leaderTint(leadership.indexOf(leader));

function ExecutiveCard({ leader }: { leader: Leader }) {
  return (
    <li className="field-card flex flex-col bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-8">
      <div className="flex items-center gap-4">
        <InitialsAvatar name={leader.name} tint={tintFor(leader)} size="lg" />
        <div>
          <h3 className="display display-h3">{leader.name}</h3>
          <p className="mt-0.5 font-semibold text-garden">{leader.title}</p>
        </div>
      </div>
      <p className="mt-4 text-spruce-soft">{leader.bio}</p>
    </li>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <li className="rounded-3xl border-2 border-spruce/10 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <InitialsAvatar name={leader.name} tint={tintFor(leader)} size="md" />
        <div>
          <h4 className="display text-lg leading-tight">{leader.name}</h4>
          <p className="mt-0.5 text-sm font-semibold text-garden">
            {leader.title}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[0.99rem] text-spruce-soft">{leader.bio}</p>
    </li>
  );
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteConfig.brand.domain}/about/leadership/#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "About us",
      item: `${siteConfig.brand.domain}/about/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Leadership",
      item: `${siteConfig.brand.domain}/about/leadership/`,
    },
  ],
};

export default function LeadershipPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="display text-sm tracking-wide text-garden">
                <Link href="/about/" className="hover:underline">
                  ABOUT US
                </Link>{" "}
                · LEADERSHIP
              </p>
              <h1 className="display display-hero mt-2">
                The buck stops with these people.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
                Running ABA care in all 50 states takes more than good
                intentions — it takes named people accountable for clinical
                standards, insurance relationships, compliance, and what
                happens in your living room. Here&rsquo;s who owns what.
              </p>
            </div>
            <Sprout className="hidden h-24 w-24 shrink-0 text-garden lg:block" />
          </div>
        </div>
      </section>

      {/* ─────────────── EXECUTIVE TEAM ─────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="exec-heading"
      >
        <h2 id="exec-heading" className="display display-h2">
          Executive team
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          The leaders who set the standard for the whole company — and answer
          for it.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {executives.map((leader) => (
            <ExecutiveCard key={leader.name} leader={leader} />
          ))}
        </ul>
      </section>

      {/* ─────────────── SENIOR LEADERSHIP ─────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24" aria-labelledby="senior-heading">
        <div className="field-card bg-mint p-6 sm:p-10">
          <h2 id="senior-heading" className="display display-h2">
            Senior leadership
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            The people who run the engine room: coverage, growth, payer
            contracts, and clinical quality.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {seniorLeaders.map((leader) => (
              <LeaderCard key={leader.name} leader={leader} />
            ))}
          </ul>

          <h3 className="display display-h3 mt-10">Regional operations</h3>
          <p className="mt-2 max-w-2xl text-spruce-soft">
            Every state reports to one of three regional VPs — so wherever you
            live, someone close by owns how care runs there.
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {regionalOpsLeaders.map((leader) => (
              <LeaderCard key={leader.name} leader={leader} />
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────────── CTA BAND ─────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              The team you&rsquo;ll actually talk to? Yours.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Leadership sets the standard, but your family gets its own BCBA
              and care team. Start with one {siteConfig.intake.callLength}{" "}
              call.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-marigold">
              {siteConfig.cta.primary}
            </Link>
            <CallCta className="btn btn-outline !border-ivory !text-ivory hover:!bg-ivory hover:!text-spruce" fallbackLabel="Talk to a person" />
          </div>
        </div>
      </section>
    </>
  );
}
