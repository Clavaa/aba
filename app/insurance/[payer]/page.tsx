import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { payers, getPayer, SELF_FUNDED_NOTE } from "@/lib/payers";
import { getStateLinks } from "@/lib/states";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import StateSelect from "@/components/StateSelect";

export function generateStaticParams() {
  return payers.map((p) => ({ payer: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ payer: string }>;
}): Promise<Metadata> {
  const { payer: slug } = await props.params;
  const payer = getPayer(slug);
  if (!payer) return {};
  return {
    title: payer.title,
    description: payer.metaDescription,
    alternates: { canonical: `/insurance/${payer.slug}/` },
  };
}

export default async function PayerPage(props: {
  params: Promise<{ payer: string }>;
}) {
  const { payer: slug } = await props.params;
  const payer = getPayer(slug);
  if (!payer) notFound();

  const url = `${siteConfig.brand.domain}/insurance/${payer.slug}/`;
  const others = payers.filter((p) => p.slug !== payer.slug);
  const states = getStateLinks();

  const faqItems: AccordionItem[] = payer.faqs.map((f) => ({
    title: f.q,
    body: <p>{f.a}</p>,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: payer.faqs.map((f) => ({
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Insurance",
        item: `${siteConfig.brand.domain}/insurance/`,
      },
      { "@type": "ListItem", position: 2, name: payer.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className={`field-card ${payer.tint} p-6 sm:p-10 lg:p-14`}>
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/insurance/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Insurance
            </Link>{" "}
            / {payer.name}
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">{payer.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">{payer.lede}</p>
          {payer.administrator && (
            <p className="mt-4 inline-flex rounded-full bg-white/80 px-4 py-2 font-semibold">
              Behavioral health administered by {payer.administrator}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
            <CallCta className="btn btn-outline" />
          </div>
        </div>
      </section>

      {/* ───────────── NETWORK-STATUS HONESTY (never imply a contract) ───────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-10">
        <div className="rounded-3xl border-2 border-spruce/15 bg-white p-5 sm:p-6">
          {/* TODO(config): once real contracts exist, siteConfig.acceptedPlans
              drives an in-network statement here — per payer, per state.
              Until then this page describes how the payer works and makes no
              claim about our network status. */}
          <h2 className="display display-h3">
            Are we in-network with {payer.name}?
          </h2>
          <p className="mt-2 text-spruce-soft">
            That depends on your specific plan and your state, and we&rsquo;d
            rather tell you the truth when you get in touch than post a blanket claim
            here. Send us your plan details and we&rsquo;ll check it
            while you wait — and if the answer is no, we&rsquo;ll tell you what
            your options are anyway.
          </p>
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-12 sm:py-16"
        aria-labelledby="how-heading"
      >
        <h2 id="how-heading" className="display display-h2">
          How {payer.name} generally handles ABA
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {payer.howItWorks.map((s, i) => {
            const tints = ["bg-mint", "bg-butter", "bg-peach", "bg-mint"];
            return (
              <li key={s} className={`field-card ${tints[i % 4]} p-6`}>
                <p className="display text-3xl text-garden">{i + 1}</p>
                <p className="mt-2 text-spruce-soft">{s}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ───────────────── THE SELF-FUNDED POINT ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="self-funded-heading"
      >
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <p className="display text-xs tracking-wide text-garden">
            THE THING NOBODY TELLS YOU
          </p>
          <h2 id="self-funded-heading" className="display display-h2 mt-1">
            Your card&rsquo;s logo may not be who decides
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            {SELF_FUNDED_NOTE}
          </p>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            Self-funded doesn&rsquo;t mean uncovered — plenty of employer plans
            cover ABA generously by choice, and federal mental health parity
            protections still apply. It means the rules you&rsquo;re arguing
            under are different, and knowing which set you&rsquo;re in changes
            how you appeal a denial.
          </p>
        </div>
      </section>

      {/* ───────────────── GOTCHAS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-12 sm:py-16"
        aria-labelledby="gotchas-heading"
      >
        <h2 id="gotchas-heading" className="display display-h2">
          Where families get stuck with {payer.name}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {payer.gotchas.map((g, i) => {
            const tints = ["bg-peach", "bg-butter", "bg-mint"];
            return (
              <div key={g.t} className={`field-card ${tints[i % 3]} p-6`}>
                <h3 className="display display-h3">{g.t}</h3>
                <p className="mt-2 text-spruce-soft">{g.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────────────── WHAT TO ASK ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="ask-heading">
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="ask-heading" className="display display-h2">
            Six questions to ask when you call them
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Write the answers down with the date and the name of the person who
            gave them to you. That record matters if you ever appeal.
          </p>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {payer.askThem.map((q, i) => (
              <li key={q} className="flex gap-3 rounded-3xl bg-white/80 p-5">
                <span className="display shrink-0 text-2xl text-garden">
                  {i + 1}
                </span>
                <span className="text-spruce-soft">{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-spruce-soft">
            Or skip it — this is exactly the call we make for families every
            day, and we&rsquo;re better at it because we do it constantly.
          </p>
          <CallCta className="btn btn-primary mt-5" fallbackLabel="Talk to a person" />
        </div>
      </section>

      {/* ───────────────── STATE LAYER ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-12 sm:py-16"
        aria-labelledby="state-heading"
      >
        <h2 id="state-heading" className="display display-h2">
          Your state is the other half of the answer
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Every state has an autism insurance law and its own Medicaid pathway,
          and those set the floor your plan has to work above. See exactly how
          it works where you live.
        </p>
        <div className="mt-6 rounded-3xl border-2 border-spruce/15 bg-white p-4 sm:p-5">
          <StateSelect
            states={states}
            label="How coverage works in"
            cta={siteConfig.cta.checkState}
            id={`payer-${payer.slug}-state`}
          />
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="payer-faq-heading"
      >
        <h2 id="payer-faq-heading" className="display display-h2">
          {payer.name} questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faqItems} defaultOpen={-1} />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          This page describes how these plans generally work. It is general
          information, not a benefits determination, and plan terms change —
          your plan&rsquo;s written documents and its written decisions are
          what count.
        </p>
      </section>

      {/* ───────────────── OTHER PAYERS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-12 sm:py-16"
        aria-labelledby="others-heading"
      >
        <h2 id="others-heading" className="display display-h3">
          Other plans
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/insurance/${o.slug}/`} className="chip">
                {o.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/insurance/" className="chip">
              Medicaid &amp; all plans
            </Link>
          </li>
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Have the card in your hand?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              One {siteConfig.intake.callLength} get in touch and we&rsquo;ll tell you
              what your plan actually covers — including when the answer
              isn&rsquo;t what you hoped.
            </p>
          </div>
          <CallCta className="btn btn-marigold shrink-0" fallbackLabel="Talk to a person" />
        </div>
      </section>
    </>
  );
}
