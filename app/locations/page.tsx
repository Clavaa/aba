import type { Metadata } from "next";
import { getStateLinks } from "@/lib/states";
import CoverageGrid from "@/components/CoverageGrid";
import StateSelect from "@/components/StateSelect";
import TriageTrio from "@/components/TriageTrio";

export const metadata: Metadata = {
  title: "ABA Therapy in All 50 States + DC",
  description:
    "Pick your state to see how ABA therapy coverage works where you live — Medicaid pathway, prior authorization, insurance law, and waiver programs.",
  alternates: { canonical: "/locations/" },
};

export default function LocationsIndexPage() {
  const states = getStateLinks();
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <h1 className="display display-hero">Where we work: everywhere.</h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            ABA coverage is decided state by state — different Medicaid rules,
            different insurance laws, different paperwork. Pick your state and
            we&rsquo;ll show you exactly how yours works.
          </p>
          <div className="mt-7 max-w-xl rounded-3xl bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="Take me to"
              cta="See my state"
              id="locations-state-select"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-label="All states">
        <CoverageGrid states={states} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
