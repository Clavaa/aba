import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { services, getService } from "@/lib/services";
import { getStateLinks } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import ImageSlot from "@/components/ImageSlot";
import StateSelect from "@/components/StateSelect";
import Sprout from "@/components/Sprout";
import PhoneIcon from "@/components/PhoneIcon";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServicePage(props: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${siteConfig.brand.domain}/services/${service.slug}/`;
  const others = services.filter((s) => s.slug !== service.slug);
  const states = getStateLinks();

  const faqItems: AccordionItem[] = service.faqs.map((f) => ({
    title: f.q,
    body: <p>{f.a}</p>,
  }));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${url}#service`,
    name: service.name,
    description: service.metaDescription,
    url,
    medicineSystem: "https://schema.org/WesternConventional",
    relevantSpecialty: "Psychiatric",
    provider: { "@id": `${siteConfig.brand.domain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: service.faqs.map((f) => ({
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
        name: "Services",
        item: `${siteConfig.brand.domain}/services/`,
      },
      { "@type": "ListItem", position: 2, name: service.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className={`field-card ${service.tint} p-6 sm:p-10 lg:p-14`}>
          <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="text-sm font-semibold text-spruce-soft"
              >
                <Link
                  href="/services/"
                  className="underline underline-offset-4 hover:text-garden"
                >
                  Services
                </Link>{" "}
                / {service.navLabel}
              </nav>
              <h1 className="display display-hero mt-3">{service.h1}</h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                {service.lede}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/getting-started/" className="btn btn-primary">
                  {siteConfig.cta.checkCoverage}
                </Link>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="btn btn-outline"
                >
                  <PhoneIcon />
                  {siteConfig.cta.talk} · {siteConfig.contact.phone}
                </a>
              </div>
              <ul
                className="mt-7 flex flex-wrap gap-2"
                aria-label="Other ways therapy happens"
              >
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}/`} className="chip">
                      {o.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative hidden lg:block">
              <ImageSlot
                intent={service.photoIntent}
                tint="bg-white/70"
                className="aspect-[4/5]"
              />
              <Sprout className="absolute -bottom-4 -left-4 h-16 w-16 rotate-[-8deg] text-garden" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── BEST FOR ─────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="fit-heading"
      >
        <h2 id="fit-heading" className="display display-h2 max-w-3xl">
          This is probably your fit if&hellip;
        </h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {service.bestFor.map((b) => (
            <li
              key={b}
              className="flex gap-3 rounded-3xl border-2 border-spruce/15 bg-white p-5"
            >
              <span aria-hidden="true" className="text-xl leading-none text-garden">
                ✓
              </span>
              <span className="text-spruce-soft">{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-spruce-soft">
          None of this quite describes you?{" "}
          <Link
            href="/services/"
            className="font-semibold text-garden underline underline-offset-4"
          >
            Compare every setting side by side
          </Link>{" "}
          — or call and describe your week to a person who does this every day.
        </p>
      </section>

      {/* ───────────────── WHAT IT ACTUALLY LOOKS LIKE ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="looks-heading">
        <div className="field-card bg-white p-6 shadow-lift sm:p-10 ring-2 ring-spruce/10">
          <h2 id="looks-heading" className="display display-h2">
            What it actually looks like
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.whatItLooksLike.map((c, i) => {
              const tints = ["bg-mint", "bg-butter", "bg-peach", "bg-mint"];
              return (
                <div key={c.t} className={`field-card ${tints[i % 4]} p-6`}>
                  <h3 className="display display-h3">{c.t}</h3>
                  <p className="mt-2 text-spruce-soft">{c.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── STRENGTHS / TRADE-OFFS (candor) ──────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="honest-heading"
      >
        <h2 id="honest-heading" className="display display-h2">
          The honest version
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
          Every setting is good at some things and bad at others. You deserve
          both lists before you rearrange your family&rsquo;s week.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">What it&rsquo;s genuinely good at</h3>
            <ul className="mt-4 space-y-3">
              {service.strengths.map((s) => (
                <li key={s} className="flex gap-3 text-spruce-soft">
                  <span aria-hidden="true" className="text-garden">
                    +
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">What it costs you</h3>
            <ul className="mt-4 space-y-3">
              {service.tradeoffs.map((t) => (
                <li key={t} className="flex gap-3 text-spruce-soft">
                  <span aria-hidden="true" className="text-err">
                    −
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────── COVERAGE ─────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4"
        aria-labelledby="service-coverage-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="service-coverage-heading" className="display display-h2">
            How it gets paid for
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            {service.coverage}
          </p>
          <div className="mt-6 rounded-3xl bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="How coverage works in"
              cta={siteConfig.cta.checkState}
              id={`service-${service.slug}-state`}
            />
          </div>
          <p className="mt-4 text-sm text-spruce-soft">
            General information about public programs and insurance law, not a
            benefits determination. We&rsquo;ll check your exact plan on the
            phone.
          </p>
        </div>
      </section>

      {/* ─────────────────────────── FAQ ─────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="service-faq-heading"
      >
        <h2 id="service-faq-heading" className="display display-h2">
          {service.navLabel} questions, straight answers
        </h2>
        <div className="mt-8">
          <Accordion items={faqItems} defaultOpen={-1} />
        </div>
      </section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Not sure this is the right setting?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              That&rsquo;s a good reason to call. One{" "}
              {siteConfig.intake.callLength} conversation about your actual week
              usually settles it.
            </p>
          </div>
          <a
            href={siteConfig.contact.phoneHref}
            className="btn btn-marigold shrink-0"
          >
            <PhoneIcon />
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
