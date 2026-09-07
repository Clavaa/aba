import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { openings } from "@/lib/careers";
import JsonLd from "@/components/JsonLd";
import { PhoneIcon } from "@/components/TopBar";

/**
 * Open roles.
 *
 * JobPosting structured data is emitted ONLY for entries in lib/careers.ts.
 * With none loaded, the page renders an honest always-open state and emits no
 * job schema at all — stale or invented JobPosting markup is a Google penalty
 * risk and a lie to the person reading it.
 */

export const metadata: Metadata = {
  title: "Open RBT & BCBA Roles",
  description:
    "Current openings for RBTs, behavior technicians, and BCBAs — and how to apply when the role you want isn't listed yet.",
  alternates: { canonical: "/careers/openings/" },
};

const url = `${siteConfig.brand.domain}/careers/openings/`;

export default function OpeningsPage() {
  const applyHref = `mailto:${siteConfig.contact.email}?subject=Application%20—%20ABA%20role`;

  return (
    <>
      {openings.map((o) => (
        <JsonLd
          key={o.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "@id": `${url}#${o.slug}`,
            title: o.title,
            description: o.description,
            datePosted: o.datePosted,
            validThrough: o.validThrough,
            employmentType: o.employmentType,
            hiringOrganization: {
              "@id": `${siteConfig.brand.domain}/#organization`,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: o.location,
                addressRegion: o.stateCode,
                addressCountry: "US",
              },
            },
            ...(o.pay
              ? {
                  baseSalary: {
                    "@type": "MonetaryAmount",
                    currency: "USD",
                    value: {
                      "@type": "QuantitativeValue",
                      minValue: o.pay.min,
                      maxValue: o.pay.max,
                      unitText: o.pay.unit,
                    },
                  },
                }
              : {}),
          }}
        />
      ))}

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/careers/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Careers
            </Link>{" "}
            / Open roles
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            Open roles, in all 50 states.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            We hire behavior technicians, RBTs, and BCBAs. If you&rsquo;re
            certified, tell us where you are. If you&rsquo;re not certified
            yet, tell us anyway — that&rsquo;s a normal way to start here.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={applyHref} className="btn btn-primary">
              Apply in 5 minutes
            </a>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="roles-heading"
      >
        <h2 id="roles-heading" className="display display-h2">
          {openings.length > 0 ? "Currently hiring" : "How hiring works here"}
        </h2>

        {openings.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {openings.map((o, i) => {
              const tints = ["bg-mint", "bg-butter", "bg-peach"];
              return (
                <li
                  key={o.slug}
                  className={`field-card ${tints[i % 3]} p-6 sm:p-8`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="display display-h3">{o.title}</h3>
                    <p className="font-semibold text-spruce-soft">
                      {o.location} ·{" "}
                      {o.employmentType.toLowerCase().replace("_", "-")}
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl text-spruce-soft">
                    {o.description}
                  </p>
                  {o.pay && (
                    <p className="mt-3 font-bold">
                      ${o.pay.min.toLocaleString()}–$
                      {o.pay.max.toLocaleString()} per{" "}
                      {o.pay.unit.toLowerCase()}
                    </p>
                  )}
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-bold">What you&rsquo;d do</h4>
                      <ul className="mt-2 space-y-1 text-spruce-soft">
                        {o.responsibilities.map((r) => (
                          <li key={r}>· {r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold">What we need</h4>
                      <ul className="mt-2 space-y-1 text-spruce-soft">
                        {o.qualifications.map((q) => (
                          <li key={q}>· {q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=Application%20—%20${encodeURIComponent(
                      o.title
                    )}%20(${encodeURIComponent(o.location)})`}
                    className="btn btn-primary mt-5"
                  >
                    Apply for this role
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            {/* TODO(openings): add real, currently-open roles to lib/careers.ts.
                Until then no JobPosting schema is emitted — deliberately. */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="field-card bg-mint p-6">
                <h3 className="display display-h3">
                  We&rsquo;re always reading applications
                </h3>
                <p className="mt-2 text-spruce-soft">
                  Rather than post roles we can&rsquo;t fill in your area,
                  we&rsquo;d rather know you exist. Tell us your state and your
                  certification status and we&rsquo;ll tell you honestly
                  what&rsquo;s available near you.
                </p>
              </div>
              <div className="field-card bg-butter p-6">
                <h3 className="display display-h3">Not certified? Still write.</h3>
                <p className="mt-2 text-spruce-soft">
                  Most RBTs get certified through an employer, because the
                  competency assessment needs a qualified assessor.{" "}
                  <Link
                    href="/careers/rbt/certification/"
                    className="font-semibold text-garden underline underline-offset-4"
                  >
                    Here&rsquo;s the whole path
                  </Link>{" "}
                  — start the conversation before you spend money on it.
                </p>
              </div>
              <div className="field-card bg-peach p-6">
                <h3 className="display display-h3">
                  Ask the pay questions first
                </h3>
                <p className="mt-2 text-spruce-soft">
                  Guaranteed hours, drive time, supervision. We&rsquo;d rather
                  answer those in the first email than the fifth.{" "}
                  <Link
                    href="/careers/pay/"
                    className="font-semibold text-garden underline underline-offset-4"
                  >
                    Here&rsquo;s how ABA pay actually works
                  </Link>
                  .
                </p>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Tell us where you are.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Your state, your certification status, and what you want next.
              That&rsquo;s the whole application to start.
            </p>
          </div>
          <a href={applyHref} className="btn btn-marigold shrink-0">
            Apply in 5 minutes
          </a>
        </div>
      </section>
    </>
  );
}
