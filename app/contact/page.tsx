import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import HeroIntakeForm from "@/components/HeroIntakeForm";
import FeatureStrip from "@/components/FeatureStrip";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, email, or send us your details and a real person from the intake team will call you back — about coverage, evaluations, or getting started.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const states = getStateLinks();
  const url = `${siteConfig.brand.domain}/contact/`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${url}#page`,
          name: "Contact",
          url,
          mainEntity: { "@id": `${siteConfig.brand.domain}/#organization` },
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-14 sm:px-10 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="eyebrow">Talk to a person</p>
              <h1 className="display display-hero mt-5 text-coral">
                A real human, on the first call.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">
                Not a phone tree and not a chatbot. Tell us what&rsquo;s going
                on and we&rsquo;ll tell you what your options are — including
                when the honest answer is that you need someone else.
              </p>

              <dl className="mt-9 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/70 p-6">
                  <dt className="eyebrow">Message us</dt>
                  <dd className="mt-2">
                    <CallCta className="display-round display-round-md underline-offset-4 hover:text-coral hover:underline" fallbackLabel="Talk to a person" icon={false} />
                    {/* TODO(config): real call-tracked number before launch */}
                  </dd>
                </div>
                <div className="rounded-[24px] bg-white/70 p-6">
                  <dt className="eyebrow">Email us</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-bold break-all underline-offset-4 hover:text-coral hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:pl-6">
              <HeroIntakeForm heading="Get help today" states={states} />
            </div>
          </div>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "clock", text: "We aim to call back same day" },
          { icon: "shield", text: "Confidential and HIPAA-protected" },
          { icon: "map", text: "All 50 states and DC" },
        ]}
      />

      <section className="mx-auto max-w-[1400px] px-4 pb-20">
        <div className="field-card bg-peach-100 px-6 py-14 text-center sm:px-12">
          <h2 className="display display-h2">Prefer to just call?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-muted">
            One {siteConfig.intake.callLength} conversation usually settles
            more than an hour of reading.
          </p>
          <CallCta className="btn btn-primary mt-8" fallbackLabel="Talk to a person" />
        </div>
      </section>
    </>
  );
}
