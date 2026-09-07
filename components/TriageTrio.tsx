import Link from "next/link";
import { siteConfig } from "@/site.config";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * Next-step triage trio (Style Bible signature #5): diagnose / learn /
 * call-now with the phone number inside the button.
 */
export default function TriageTrio({ heading = "NOT SURE WHERE TO START?" }: { heading?: string }) {
  return (
    <section aria-labelledby="triage-heading">
      <h2 id="triage-heading" className="display display-h2 display-mega">
        {heading}
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="flex flex-col rounded-[30px] bg-teal-80 p-7 sm:p-9">
          <h3 className="display display-h3">
            &ldquo;I&rsquo;m worried, but there&rsquo;s no diagnosis yet.&rdquo;
          </h3>
          <p className="mt-3 flex-1 text-spruce-soft">
            That&rsquo;s where most families begin. Tell us what you&rsquo;re
            seeing and we&rsquo;ll help you figure out the next step — even if
            it isn&rsquo;t us.
          </p>
          <Link href="/autism-evaluation/" className="btn btn-outline mt-5 self-start">
            Help me figure it out
          </Link>
        </div>

        <div className="flex flex-col rounded-[30px] bg-peach-100 p-7 sm:p-9">
          <h3 className="display display-h3">
            &ldquo;We have a diagnosis. What does ABA cost?&rdquo;
          </h3>
          <p className="mt-3 flex-1 text-spruce-soft">
            For most families it&rsquo;s covered — Medicaid in every state, and
            every state has an autism insurance law. See exactly how yours
            works.
          </p>
          <Link href="/cost-of-aba-therapy/" className="btn btn-outline mt-5 self-start">
            {siteConfig.cta.checkState}
          </Link>
        </div>

        <div className="flex flex-col rounded-[30px] bg-beige-80 p-7 sm:p-9">
          <h3 className="display display-h3">
            &ldquo;I just want to talk to a person.&rdquo;
          </h3>
          <p className="mt-3 flex-1 text-spruce-soft">
            One {siteConfig.intake.callLength} call. A real human who does this
            every day, no pressure and no obligation.
          </p>
          <a href={siteConfig.contact.phoneHref} className="btn btn-primary mt-5 self-start">
            <PhoneIcon />
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
