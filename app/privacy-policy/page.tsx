import type { Metadata } from "next";
import Link from "next/link";

/**
 * Privacy policy.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information this site collects, why, how long we keep it, and who it is shared with.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-14 sm:px-10">
          <p className="eyebrow">Legal</p>
          <h1 className="display display-hero mt-5 max-w-3xl">Privacy policy</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Plain language about what we collect and why. If anything here
            isn&rsquo;t clear, get in touch and ask.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16">

        <div className="mt-10 space-y-8 text-lg text-ink-muted">
          <section>
            <h2 className="display display-h3 text-ink">What we collect</h2>
            <p className="mt-3">
              Only what you type into a form on this site: your name, a phone
              number and/or an email address, your state, and — on the intake
              forms — your child&rsquo;s age band. That is the entire list.
            </p>
            <p className="mt-3">
              We do not ask for, and the forms do not accept, your
              child&rsquo;s diagnosis, clinical history, member ID, or any
              other health detail. That is deliberate: our forms are built to
              stay light on health information rather than collect it and
              promise to guard it.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">
              What the autism checklist does
            </h2>
            <p className="mt-3">
              The{" "}
              <Link
                href="/autism-evaluation/screener/"
                className="font-semibold text-coral underline underline-offset-4"
              >
                parent checklist
              </Link>{" "}
              scores entirely inside your browser. Your answers are never sent
              to us and never leave your device. If you choose to ask for a
              call at the end, we receive your contact details and your
              child&rsquo;s age band — never the answers, and never the result.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Why we collect it</h2>
            <p className="mt-3">
              To call you back, to check your insurance coverage, and to answer
              the question you asked. We do not sell your information, and we
              do not share it with advertisers or data brokers.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Who else sees it</h2>
            <p className="mt-3">
              Form submissions are delivered to our intake inbox through an
              email service provider. Our hosting provider processes ordinary
              web-server request data in the course of serving these pages.
              The visit counts described above are stored in our own cloud
              project; the cloud provider holds them on our behalf as a
              processor and does not receive them as an advertising signal.
              {/* TODO(legal): name each processor explicitly and confirm the
                  contractual basis before this page is reviewed by counsel. */}
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Tracking</h2>
            <p className="mt-3">
              This site does not run advertising trackers or third-party
              analytics, and nothing here is shared with an ad network. Some
              pages remember small preferences in your browser&rsquo;s own
              storage; that information stays on your device.
            </p>
            <p className="mt-3">
              We do count visits, using our own software rather than a third
              party&rsquo;s. When you open a page we record which page it was,
              roughly how long it stayed on your screen, how far down it you
              scrolled, which site or search engine you arrived from, your
              device type, and the country and region your connection reports.
              No cookie is set for this.
            </p>
            <p className="mt-3">
              We do not store your IP address. It is combined with your
              browser&rsquo;s user-agent string and a secret value that changes
              every day, then turned into a one-way code. That lets us count
              how many separate people visited on a given day, and makes it
              impossible for us to recognise you tomorrow or to work backwards
              to your address. None of it is linked to a form you submit.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Children</h2>
            <p className="mt-3">
              These forms are for parents and caregivers to complete. We do not
              knowingly collect information directly from children.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">Your choices</h2>
            <p className="mt-3">
              You can ask us what we hold about you, ask us to correct it, or
              ask us to delete it. Send the request through our{" "}
              <Link
                href="/contact/"
                className="font-semibold text-coral underline underline-offset-4"
              >
                contact form
              </Link>{" "}
              and we&rsquo;ll action it.
            </p>
          </section>

          <section>
            <h2 className="display display-h3 text-ink">
              Clinical records are different
            </h2>
            <p className="mt-3">
              Once your family becomes a client, the records created in the
              course of care are protected health information and are governed
              by our clinical privacy practices, not by this website policy.
              You receive those separately at intake.
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-ink-muted">
          Questions about this policy? Read our{" "}
          <Link href="/terms/" className="underline underline-offset-4">
            terms of service
          </Link>
          .
        </p>
      </article>
    </>
  );
}
