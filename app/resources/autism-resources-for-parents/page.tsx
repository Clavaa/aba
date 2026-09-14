import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import Accordion, { type AccordionItem } from "@/components/Accordion";

/**
 * "Autism resources for parents" — a genuine directory, ordered by what a
 * family needs first, and pointing mostly away from us.
 *
 * Every external organisation listed is named because it exists and is free
 * to contact. We do not describe what any of them will decide for a given
 * family, and we link to no resource we would not use ourselves.
 */

export const metadata: Metadata = {
  title: "Autism Resources for Parents",
  description:
    "Where to actually get help after an autism diagnosis: free federal and state programmes, advocacy and legal support, respite, school rights, and what to do in the first month.",
  alternates: { canonical: "/resources/autism-resources-for-parents/" },
};

const url = `${siteConfig.brand.domain}/resources/autism-resources-for-parents/`;

const EXTERNAL = [
  {
    t: "Early Intervention (birth to 3)",
    d: "Every state runs a federally mandated programme under Part C of IDEA. Evaluation is free, you do not need a diagnosis or a doctor's referral, and you can refer your own child. If your child is under three and you take one action this week, make it this one.",
    how: "Search your state's name plus \"Early Intervention\" — every state has a single point of entry.",
  },
  {
    t: "School district evaluation (age 3+)",
    d: "Once a child turns three, the obligation moves to your local school district under Part B. A written request for an evaluation starts a legal timeline. This is separate from, and does not replace, a medical diagnosis.",
    how: "Write to the district's special education office. Put the request in writing and keep a copy — the clock starts from the written request.",
  },
  {
    t: "Parent Training and Information Centers",
    d: "Federally funded, free, and in every state. They help parents understand special education rights, prepare for IEP meetings, and push back when a district says no. Wildly under-used.",
    how: "One PTI serves each state; several states also have Community Parent Resource Centers.",
  },
  {
    t: "Protection & Advocacy agencies",
    d: "Every state and territory has one, federally mandated, providing free legal advocacy for people with disabilities — including disputes over services, school placement and Medicaid denials.",
    how: "One designated agency per state. Free to contact regardless of income.",
  },
  {
    t: "Medicaid waivers",
    d: "Most states run home- and community-based services waivers that can cover respite, support workers and equipment, and in many states a child can qualify on their own disability regardless of family income. Waitlists are often long, which is exactly why applying early matters.",
    how: "Apply as soon as you have a diagnosis, even if you expect to wait. Our state pages note each state's programme.",
  },
  {
    t: "Your state's Family-to-Family Health Information Center",
    d: "Staffed by parents of children with disabilities who have already navigated the same systems. The most practical source of state-specific answers we know of, and free.",
    how: "One per state, federally funded.",
  },
];

const faq: AccordionItem[] = [
  {
    title: "What should I do in the first month after a diagnosis?",
    body: (
      <>
        <p>
          Four things, in this order. Refer to Early Intervention or request a
          school evaluation in writing, depending on your child&rsquo;s age
          &mdash; both are free and both have waitlists. Ask the diagnosing
          clinician for the full written report, because every programme and
          insurer will ask for it. Call your insurer and ask what ABA, speech
          and OT coverage your plan carries and what prior authorization
          requires. Apply for your state&rsquo;s Medicaid waiver even if you
          think you won&rsquo;t qualify.
        </p>
        <p className="mt-3">
          Everything else &mdash; reading, support groups, choosing providers
          &mdash; can wait a few weeks. Those four all have queues, so they
          are the ones that benefit from being started today.
        </p>
      </>
    ),
  },
  {
    title: "Are there free autism resources for parents?",
    body: (
      <p>
        Yes, and they are the most substantial ones. Early Intervention,
        school district evaluations, Parent Training and Information Centers,
        Protection &amp; Advocacy agencies and Family-to-Family centers are all
        federally funded and free to you. None of them require a referral from
        a provider, and none of them require you to have chosen a therapy yet.
      </p>
    ),
  },
  {
    title: "Where can I find other parents going through this?",
    body: (
      <p>
        Your state&rsquo;s Family-to-Family Health Information Center is
        staffed by parents of disabled children and is the most reliable
        starting point. Local parent groups run through hospitals, school
        districts and disability councils tend to be more useful than national
        online groups, because the questions that matter most &mdash; which
        district will fight you, which clinic has a real waitlist &mdash; are
        local.
      </p>
    ),
  },
  {
    title: "Do I need a diagnosis before I can get any help?",
    body: (
      <p>
        Not for everything. Early Intervention evaluates on developmental
        concern alone, with no diagnosis and no referral needed, and a school
        district evaluation works the same way. What does generally require a
        diagnosis is insurance coverage for ABA. So the two tracks are worth
        running in parallel: start the free evaluation now, and pursue the
        medical diagnosis alongside it.{" "}
        <Link href="/find-a-diagnostician/" className="font-semibold text-coral underline underline-offset-4">
          How to find a diagnostician
        </Link>{" "}
        covers the second track.
      </p>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: [
    {
      q: "What should parents do first after an autism diagnosis?",
      a: "Refer to Early Intervention if the child is under three, or request a school district evaluation in writing if they are three or older; obtain the full written diagnostic report; call the insurer about ABA, speech and occupational therapy coverage and prior authorization; and apply for the state's Medicaid waiver. All four have waiting lists, so they benefit most from being started immediately.",
    },
    {
      q: "Are there free autism resources for parents?",
      a: "Yes. Early Intervention, school district evaluations, Parent Training and Information Centers, Protection and Advocacy agencies, and Family-to-Family Health Information Centers are federally funded, free, and available in every state without a provider referral.",
    },
    {
      q: "Do parents need a diagnosis before getting help for autism?",
      a: "Not for everything. Early Intervention and school district evaluations proceed on developmental concern alone, with no diagnosis or referral required. Insurance coverage for ABA generally does require a diagnosis, so the two tracks are best pursued in parallel.",
    },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumbs`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Resources", item: `${siteConfig.brand.domain}/resources/` },
    { "@type": "ListItem", position: 2, name: "Autism resources for parents", item: url },
  ],
};

const related = [
  {
    href: "/autism-evaluation/",
    label: "Getting an evaluation",
    note: "The medical track, running in parallel with the free ones.",
  },
  {
    href: "/resources/autism-therapy-types/",
    label: "Types of autism therapy",
    note: "What the options actually are, once you have a diagnosis.",
  },
  {
    href: "/insurance/",
    label: "Insurance and Medicaid",
    note: "Turning a diagnosis into authorized therapy hours.",
  },
  {
    href: "/cost-of-aba-therapy/",
    label: "What ABA costs",
    note: "Published state rates, waivers and what families really pay.",
  },
  {
    href: "/support-services/",
    label: "Support beyond ABA",
    note: "IEPs, referrals and the paperwork nobody warns you about.",
  },
  {
    href: "/locations/",
    label: "Find your state",
    note: "Coverage rules, waivers and the pathway where you live.",
  },
];

export default function AutismResourcesPage() {
  const tints = ["bg-mint", "bg-butter", "bg-peach"];
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-spruce-soft">
            <Link href="/resources/" className="underline underline-offset-4 hover:text-garden">
              Resources
            </Link>{" "}
            / Autism resources for parents
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            Most of the help available to you is free, and almost nobody tells
            you about it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Six programmes exist in every state, cost nothing, and need no
            referral from us or anyone else. Start them before you start
            choosing a therapy provider &mdash; they all have queues.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="ext-heading">
        <h2 id="ext-heading" className="display display-h2">
          Six free programmes, in every state
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          None of these are ours, none of them pay us, and all of them will
          talk to you without a provider in the room.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {EXTERNAL.map((x, i) => (
            <li key={x.t} className={`rounded-[30px] ${tints[i % 3]} p-7`}>
              <h3 className="display-round display-round-md">{x.t}</h3>
              <p className="mt-3 text-spruce-soft">{x.d}</p>
              <p className="mt-4 text-sm font-semibold text-coral">{x.how}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10" aria-labelledby="ours-heading">
        <h2 id="ours-heading" className="display display-h2">
          Our own guides, if they help
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {[
            ["/resources/signs-of-autism-by-age/", "Signs of autism by age"],
            ["/autism-evaluation/", "What an evaluation involves"],
            ["/find-a-diagnostician/", "Finding a diagnostician"],
            ["/resources/autism-levels/", "Autism levels explained"],
            ["/resources/autism-therapy-types/", "Types of autism therapy"],
            ["/resources/what-is-aba/", "What ABA actually is"],
            ["/insurance/", "Insurance and Medicaid"],
            ["/cost-of-aba-therapy/", "What ABA costs by state"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="chip">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:pb-20" aria-labelledby="res-faq">
        <h2 id="res-faq" className="display display-h2">
          The first-month questions
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={0} />
        </div>
      </section>
      <RelatedLinks links={related} />
    </>
  );
}
