import Link from "next/link";
import TriageTrio from "@/components/TriageTrio";
import Sprout from "@/components/Sprout";
import { siteConfig } from "@/site.config";

/**
 * A 404 that converts: acknowledge the miss, then open all three
 * capture lanes (triage trio) instead of a dead end.
 */
export default function NotFound() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 text-center sm:p-10 lg:p-14">
          <Sprout className="mx-auto h-20 w-20 text-garden" />
          <h1 className="display display-hero mt-4">
            That page wandered off.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-spruce-soft">
            Happens to the best of us — kids move things. What you came for is
            probably one click away, and a real person is one call away.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              Take me home
            </Link>
            <Link href="/locations/" className="btn btn-outline">
              Find my state
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 pb-16 sm:py-20 sm:pb-24">
        <TriageTrio heading="OR START WHERE YOU MEANT TO:" />
      </section>
    </>
  );
}
