import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { services } from "@/lib/services";
import JsonLd from "@/components/JsonLd";
import TriageTrio from "@/components/TriageTrio";
import Sprout from "@/components/Sprout";
import PhoneIcon from "@/components/PhoneIcon";

export const metadata: Metadata = {
  title: "ABA Therapy Services — At Home, In Center, At School, Online",
  description:
    "In-home, center-based, school-based, telehealth, and early intervention ABA — what each setting is good at, what it costs you, and how to pick.",
  alternates: { canonical: "/services/" },
};

/**
 * The picker table. Written as "if this is your goal, start here" because
 * that's the question parents actually arrive with — not "list your services".
 */
const picker: { goal: string; setting: string; slug: string; why: string }[] = [
  {
    goal: "Mornings, meals, and bedtime are the war",
    setting: "At home",
    slug: "in-home",
    why: "The routine gets taught inside the routine, so nothing has to transfer later.",
  },
  {
    goal: "My child needs to be ready for a classroom",
    setting: "In center",
    slug: "center-based",
    why: "A day with a shape, and peers to practice on deliberately.",
  },
  {
    goal: "Everything falls apart at school",
    setting: "In school",
    slug: "school",
    why: "The adults in that building need one plan, and you need classroom data.",
  },
  {
    goal: "The nearest provider is two hours away",
    setting: "Telehealth",
    slug: "telehealth",
    why: "A BCBA coaches you live through the routine that's hard.",
  },
  {
    goal: "My toddler isn't talking and I'm scared",
    setting: "Early intervention",
    slug: "early-intervention",
    why: "Play-based teaching aimed at communication first, with you coached hardest.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.brand.domain}/services/#list`,
  name: "ABA therapy services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${siteConfig.brand.domain}/services/${s.slug}/`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <h1 className="display display-hero max-w-4xl">
            Same therapy. Very different rooms.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            ABA works at your kitchen table, in a center built for it, in your
            child&rsquo;s classroom, and over a video call at 5:45pm. The
            question isn&rsquo;t which one is best — it&rsquo;s which one
            matches the thing you&rsquo;re trying to fix first.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              {siteConfig.cta.talk} · {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────────── THE PICKER TABLE ───────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="picker-heading"
      >
        <h2 id="picker-heading" className="display display-h2 max-w-3xl">
          Start with what&rsquo;s hardest right now
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Most families end up using more than one of these over time. This is
          just where to start.
        </p>

        <ul className="mt-8 space-y-3">
          {picker.map((p, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach"];
            return (
              <li key={p.slug} className={`field-card ${tints[i % 3]} p-5 sm:p-7`}>
                <div className="grid items-center gap-4 sm:grid-cols-[1.2fr_1fr_auto]">
                  <p className="display text-lg sm:text-xl">
                    &ldquo;{p.goal}&rdquo;
                  </p>
                  <p className="text-spruce-soft">{p.why}</p>
                  <Link
                    href={`/services/${p.slug}/`}
                    className="btn btn-outline shrink-0 !py-2.5"
                  >
                    {p.setting} →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ─────────────────────── SERVICE CARDS ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="all-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="all-heading" className="display display-h2">
                Every way we work
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
                Each page includes the part nobody publishes: what that setting
                is bad at.
              </p>
            </div>
            <Sprout className="hidden h-20 w-20 shrink-0 text-garden sm:block" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.slug}
                className={`field-card ${s.tint} flex flex-col p-6`}
              >
                <h3 className="display display-h3">{s.name}</h3>
                <p className="mt-2 flex-1 text-spruce-soft">{s.lede}</p>
                <Link
                  href={`/services/${s.slug}/`}
                  className="btn btn-outline mt-5 self-start !py-2.5"
                >
                  How {s.navLabel.toLowerCase()} works
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── MIXING SETTINGS ──────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="mix-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="mix-heading" className="display display-h2">
            You don&rsquo;t have to pick one forever
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            A child can start at home while a center seat opens up, add school
            support the year kindergarten begins, and keep a telehealth
            coaching call through a move or a hard winter. What your plan
            authorizes matters here — some health plans will approve a mix of
            settings in the same period and some won&rsquo;t — so it&rsquo;s
            worth asking before you rearrange your life around one of them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/insurance/" className="btn btn-primary">
              How insurance handles ABA
            </Link>
            <Link href="/cost-of-aba-therapy/" className="btn btn-outline">
              What ABA costs by state
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
