import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import TriageTrio from "@/components/TriageTrio";
import Sprout from "@/components/Sprout";

export const metadata: Metadata = {
  title: "Autism & ABA Resources for Parents",
  description:
    "Plain-language guides for parents: what ABA is (including the criticism), what the autism levels mean, signs by age, and how the teaching methods work.",
  alternates: { canonical: "/resources/" },
};

const guides = [
  {
    href: "/resources/what-is-aba/",
    t: "What is ABA therapy?",
    d: "The core idea in one example, what a session actually looks like, what the evidence supports — and the criticism of ABA, answered without defensiveness.",
    tint: "bg-mint",
  },
  {
    href: "/resources/autism-levels/",
    t: "Autism levels 1, 2 and 3",
    d: "What the level on your child's report means, why there are really two levels and not one, and the four things it does not tell you.",
    tint: "bg-butter",
  },
  {
    href: "/resources/signs-of-autism-by-age/",
    t: "Signs of autism by age",
    d: "From 12 months to the teen years, described the way you'd actually notice it — plus the children this kind of list usually misses.",
    tint: "bg-peach",
  },
  {
    href: "/resources/discrete-trial-training/",
    t: "Discrete trial training",
    d: "The four parts of a trial, how DTT differs from teaching in the natural environment, and six things to watch for as a parent.",
    tint: "bg-mint",
  },
];

const nextSteps = [
  {
    href: "/autism-evaluation/",
    t: "How to get an evaluation",
    d: "Three referral doors, two of them free and open to you today.",
  },
  {
    href: "/autism-evaluation/m-chat/",
    t: "The M-CHAT explained",
    d: "What the screening questionnaire is, and what a positive result really means.",
  },
  {
    href: "/insurance/",
    t: "How coverage works",
    d: "Medicaid, private plans, prior authorization, and the self-funded trap.",
  },
  {
    href: "/services/",
    t: "Where therapy happens",
    d: "Home, center, school, telehealth — with the trade-offs of each.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.brand.domain}/resources/#list`,
  name: "Autism and ABA guides for parents",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.t,
    url: `${siteConfig.brand.domain}${g.href}`,
  })),
};

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="display display-hero max-w-3xl">
                Answers, not a sales pitch.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
                Guides written to be useful to you whether or not you ever
                become a client — including the parts about this field that
                are uncomfortable for a provider to publish.
              </p>
            </div>
            <Sprout className="hidden h-24 w-24 shrink-0 text-garden lg:block" />
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="guides-heading"
      >
        <h2 id="guides-heading" className="display display-h2">
          Start here
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className={`field-card ${g.tint} p-6 transition-transform hover:-translate-y-0.5 sm:p-8`}
            >
              <h3 className="display display-h3">{g.t}</h3>
              <p className="mt-2 text-spruce-soft">{g.d}</p>
              <p className="mt-4 font-bold text-garden">Read it →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4" aria-labelledby="next-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="next-heading" className="display display-h2">
            When you&rsquo;re ready to move
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="field-card border-2 border-spruce/15 p-5 transition-colors hover:bg-mint"
              >
                <h3 className="display display-h3">{s.t}</h3>
                <p className="mt-2 text-spruce-soft">{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-24">
        <TriageTrio />
      </section>
    </>
  );
}
