import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import FeatureStrip from "@/components/FeatureStrip";
import TriageTrio from "@/components/TriageTrio";
import CtaImageBackground from "@/components/CtaImageBackground";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * The "everything around the therapy" page — their /aba-plus.
 *
 * Careful framing: several of these are things we COORDINATE rather than
 * deliver ourselves, and the page says which is which. Claiming an in-house
 * speech department we don't have would be the easiest lie on this site.
 */

export const metadata: Metadata = {
  title: "Support Beyond ABA Therapy",
  description:
    "The help around the therapy: speech and OT referrals, IEP and school advocacy, caregiver training, and finding the specialists your child needs next.",
  alternates: { canonical: "/support-services/" },
};

const url = `${siteConfig.brand.domain}/support-services/`;

const supports = [
  {
    t: "Speech and OT referrals",
    d: "ABA is one part of a plan, not the whole of it. Most children we work with also need speech therapy, occupational therapy, or both. We help you find them and coordinate so three providers aren't pulling in three directions.",
    kind: "We coordinate",
  },
  {
    t: "IEP and school advocacy",
    d: "Objective data from your child's sessions is the most useful thing you can bring to an IEP meeting. We help you prepare, and where a family invites us, we take part in the conversation with the school team.",
    kind: "We support",
  },
  {
    t: "Caregiver training, one to one",
    d: "Structured sessions for you, a partner, a grandparent, or a babysitter — on your actual routines rather than a curriculum. This is part of the ABA plan and billed as such, not an add-on.",
    kind: "We deliver",
  },
  {
    t: "Finding a diagnostician",
    d: "If you don't have a diagnosis yet, that's the bottleneck. We'll tell you who diagnoses in your state, what to say when you call, and which free evaluations you can request yourself today.",
    kind: "We coordinate",
  },
  {
    t: "Insurance legwork",
    d: "Benefit verification, prior authorization paperwork, reauthorization deadlines, and the appeal when something is denied. You didn't sign up to be a benefits specialist.",
    kind: "We deliver",
  },
  {
    t: "A person who answers the phone",
    d: "Between sessions, when something changes, or when you just need to ask whether what happened last night was normal. Not a portal ticket.",
    kind: "We deliver",
  },
];

export default function SupportServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${url}#list`,
          name: "Support beyond ABA therapy",
          itemListElement: supports.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.t,
          })),
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-peach-100 px-4 py-16 text-center sm:px-10 sm:py-20">
          <p className="eyebrow">Beyond the therapy hours</p>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-4xl">
            The rest of it counts too.
          </h1>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg text-ink-muted">
            Therapy is a few hours a week. The referrals, the school meetings,
            the insurance letters and the 9pm question are the other hundred
            and sixty. Here&rsquo;s what we carry, and what we help you carry.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "shield", text: "Insurance paperwork handled for you" },
          { icon: "ages", text: "Caregiver training in every plan" },
          { icon: "map", text: "Referrals coordinated, not just listed" },
        ]}
      />

      <section className="mx-auto max-w-[1400px] px-4 py-8" aria-labelledby="supports-heading">
        <h2 id="supports-heading" className="sr-only">
          What we deliver and what we coordinate
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supports.map((s, i) => {
            const tints = ["bg-teal-80", "bg-peach-100", "bg-beige-80"];
            return (
              <article key={s.t} className={`rounded-[30px] ${tints[i % 3]} p-7`}>
                <p className="eyebrow text-coral">{s.kind}</p>
                <h3 className="display-round display-round-md mt-2">{s.t}</h3>
                <p className="mt-3 text-ink-muted">{s.d}</p>
              </article>
            );
          })}
        </div>
        <p className="mt-8 max-w-3xl text-ink-muted">
          {/* TODO(config): confirm which of these are in-house vs referral
              once staffing is settled, and update the "We deliver /
              We coordinate" label on each card accordingly. */}
          Each card says whether we do it ourselves or help you get it
          elsewhere. We&rsquo;d rather be plain about that than let you find
          out at the first appointment.
        </p>
      </section>

      <CtaImageBackground
        eyebrow="One number for all of it"
        heading="Ask us anything, even the small stuff."
        body="Families use us for the insurance letter and the school meeting as often as for the therapy itself. That's what backup means."
        primary={{ href: "/contact/", label: "Talk to a person" }}
      />

      <section className="mx-auto max-w-[1400px] px-4 pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
