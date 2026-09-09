import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";

/**
 * Terms of service.
 */

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using this website, including what this site is and isn't, and the limits of the information published here.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-peach-100 px-4 py-14 sm:px-10">
          <p className="eyebrow">Legal</p>
          <h1 className="display display-hero mt-5 max-w-3xl">
            Terms of service
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            The rules for using this website, in language you can actually
            read.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16">

        <div className="mt-10 space-y-8 text-lg text-ink-muted">
          <section>
            <h2 className="display display-h3 text-ink">
              This site is information, not medical advice
            </h2>
            <p className="mt-3">
              Everything published here — coverage explanations, guides, the
              parent checklist, state and county pages — is general
              information. It is not a diagnosis, not a treatment
              recommendation, and not a substitute for a qualified
              professional who has met your child. Autism is diagnosed by
              clinicians who observe a child directly.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">
              Coverage information can change
            </h2>
            <p className="mt-3">
              We describe public Medicaid programs and state insurance laws as
              accurately as we can, and those rules change. Nothing on this
              site is a benefits determination or a guarantee of coverage. Your
              health plan&rsquo;s written decision is what counts. Contact us and
              we&rsquo;ll check your specific plan.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">
              No provider relationship is created here
            </h2>
            <p className="mt-3">
              Reading this site, using the checklist, or submitting a form does
              not make us your provider. A clinical relationship begins only
              after intake, eligibility, and a signed agreement.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Using the forms</h2>
            <p className="mt-3">
              Submit your own information, or information you are authorised to
              provide as a parent or legal guardian. Please don&rsquo;t send
              clinical details through these forms — they aren&rsquo;t built
              for it, and we don&rsquo;t need them to answer your question.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Links we don&rsquo;t control</h2>
            <p className="mt-3">
              We link to government programs, certification boards, and
              screening-tool publishers because they&rsquo;re useful. We
              don&rsquo;t control those sites and aren&rsquo;t responsible for
              what they publish.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Our content</h2>
            <p className="mt-3">
              The writing, design, and data compilations on this site belong to{" "}
              {siteConfig.brand.legalName}. Quote us with attribution;
              don&rsquo;t republish pages wholesale.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">In an emergency</h2>
            <p className="mt-3">
              If your child is in danger or in crisis, call 911 or your local
              emergency number. This website is not monitored for emergencies
              and no form here reaches anyone immediately.
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-ink-muted">
          See also our{" "}
          <Link href="/privacy-policy/" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </article>
    </>
  );
}
