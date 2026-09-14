import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import FeatureStrip from "@/components/FeatureStrip";
import CallCta from "@/components/CallCta";

/**
 * Target: "aba therapy for adhd" — 5,000/mo, $17.61 top-of-page bid, no page
 * anywhere on the site until now.
 *
 * The honest answer here is complicated, and saying so IS the content: ABA is
 * funded as an autism benefit, so a family searching this usually hits a
 * coverage wall rather than a clinical one. Most competing pages sell instead
 * of explaining that.
 */

export const metadata: Metadata = {
  title: "ABA Therapy for ADHD: Does It Work?",
  description:
    "Whether ABA therapy helps ADHD, what the evidence supports, why insurance usually funds it only for autism, and what parent training offers instead.",
  alternates: { canonical: "/resources/aba-therapy-for-adhd/" },
};

const url = `${siteConfig.brand.domain}/resources/aba-therapy-for-adhd/`;

const faqs = [
  {
    q: "Does ABA therapy work for ADHD?",
    a: "The behavioural methods underneath ABA — reinforcement, clear antecedents, structured routines, parent-delivered strategies — are well supported for ADHD, and behaviour therapy is a first-line recommendation for young children with ADHD. What is usually not available is ABA billed as ABA: insurers fund it as an autism benefit. So the techniques help; the funding label often doesn't fit.",
  },
  {
    q: "Will insurance cover ABA therapy for ADHD?",
    a: "Usually not. State autism insurance mandates and Medicaid ABA pathways are written around an autism diagnosis, so a child with ADHD alone will typically be denied ABA and directed to behaviour therapy, parent training, or mental-health benefits instead. If your child has both diagnoses, the autism diagnosis is what opens the ABA door.",
  },
  {
    q: "What's actually recommended for a young child with ADHD?",
    a: "Behaviour therapy delivered through the parent — often called parent training in behaviour management — is the recommended first step for young children, generally before medication is considered. It teaches you the same mechanics an ABA program would use: what to reinforce, how to set up the moment before, and how to respond consistently.",
  },
  {
    q: "My child has autism and ADHD. Does that change the plan?",
    a: "It changes the plan, not the eligibility. Co-occurring ADHD is common, and a good BCBA builds around it — shorter teaching blocks, more movement, attention supports designed into the session rather than fought against. The autism diagnosis is what funds the program.",
  },
  {
    q: "Is ABA the same as behaviour therapy for ADHD?",
    a: "They share a toolkit and differ in packaging. ABA is a comprehensive, data-driven program run by a certified analyst with an assessment and a written treatment plan. ADHD behaviour therapy is usually briefer, more parent-delivered, and structured around home and school routines.",
  },
];

const items: AccordionItem[] = faqs.map((f) => ({ title: f.q, body: <p>{f.a}</p> }));

const related = [
  {
    href: "/resources/what-is-aba/",
    label: "What is ABA therapy?",
    note: "The methods underneath, and what the evidence supports.",
  },
  {
    href: "/resources/autism-therapy-types/",
    label: "Types of autism therapy",
    note: "The fuller menu, including what's funded and what isn't.",
  },
  {
    href: "/insurance/",
    label: "Insurance and Medicaid",
    note: "Why funding usually follows the diagnosis rather than the method.",
  },
  {
    href: "/support-services/",
    label: "Support beyond ABA",
    note: "School paperwork, referrals and the things that aren't therapy.",
  },
  {
    href: "/faq/",
    label: "Questions families ask",
    note: "Hours, referrals, authorization and cost.",
  },
  {
    href: "/contact/",
    label: "Talk to someone",
    note: "Tell us the situation and we'll say plainly whether we can help.",
  },
];

export default function AbaForAdhdPage() {
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

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-16 text-center sm:px-10 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-muted">
            <Link href="/resources/" className="underline underline-offset-4 hover:text-coral">
              Resources
            </Link>{" "}
            / ABA therapy for ADHD
          </nav>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-4xl">
            ABA therapy for ADHD: the honest answer.
          </h1>
          <p className="mx-auto mt-7 max-w-[40rem] text-lg text-ink-muted">
            The methods help. The funding usually doesn&rsquo;t follow. Here is
            the difference, and what to ask for instead — including when the
            answer is that you don&rsquo;t need us.
          </p>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "shield", text: "ABA is funded as an autism benefit" },
          { icon: "ages", text: "Behaviour therapy is first-line for young children" },
          { icon: "clock", text: "Parent training starts fastest" },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 py-10" aria-labelledby="short-heading">
        <h2 id="short-heading" className="display display-h2">
          The short version
        </h2>
        <div className="mt-5 space-y-4 text-lg text-ink-muted">
          <p>
            <strong className="text-ink">The techniques work.</strong>{" "}
            Reinforcement, structured routines, changing what happens before a
            behaviour rather than only after it, and coaching the adults who
            are there all day — that is the core of ABA, and it is also the
            core of what is recommended for ADHD in young children.
          </p>
          <p>
            <strong className="text-ink">
              The billing code usually doesn&rsquo;t.
            </strong>{" "}
            Every state&rsquo;s autism insurance law and every state Medicaid
            ABA pathway is written around an autism diagnosis. A child with
            ADHD alone is generally not eligible for ABA as a covered benefit,
            however well the methods would suit them.
          </p>
          <p>
            So the useful question is rarely &ldquo;does ABA work for
            ADHD&rdquo; — it is{" "}
            <strong className="text-ink">
              &ldquo;what gets my child the same mechanics, under a benefit I
              can actually access?&rdquo;
            </strong>{" "}
            For most families that is parent-delivered behaviour therapy,
            school supports, and a conversation with your paediatrician.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/autism-evaluation/" className="btn btn-primary">
            If autism is also a question
          </Link>
          <CallCta className="btn btn-outline" fallbackLabel="Ask us what applies to you" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-20" aria-labelledby="adhd-faq">
        <h2 id="adhd-faq" className="display display-h2 display-mega">
          ADHD and ABA, straight answers
        </h2>
        <div className="mx-auto mt-10 max-w-4xl">
          <Accordion items={items} defaultOpen={-1} />
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-muted">
          General information, not a diagnosis or a benefits determination.
          Your child&rsquo;s clinician and your plan&rsquo;s written terms are
          what decide.
        </p>
      </section>
      <RelatedLinks links={related} />
    </>
  );
}
