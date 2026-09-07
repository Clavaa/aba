import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import CoverageGrid from "@/components/CoverageGrid";
import StateSelect from "@/components/StateSelect";
import TriageTrio from "@/components/TriageTrio";

export const metadata: Metadata = {
  title: "Cost of ABA Therapy by State",
  description:
    "What ABA really costs families: usually $0 out of pocket with Medicaid, normal cost-sharing with private insurance. Pick your state for specifics.",
  alternates: { canonical: "/cost-of-aba-therapy/" },
};

export default function CostIndexPage() {
  const states = getStateLinks();
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-peach p-6 sm:p-10 lg:p-14">
          <h1 className="display display-hero max-w-4xl">
            What ABA costs a family: usually far less than you fear.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Sticker prices for ABA look scary online. But almost no family pays
            sticker price: Medicaid covers ABA for eligible kids in every state
            — most families pay nothing out of pocket — and every state
            requires private insurance to cover autism care. Your real cost
            depends on your state and your plan. Pick yours.
          </p>
          <div className="mt-7 max-w-xl rounded-3xl bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              basePath="/cost-of-aba-therapy"
              label="ABA costs in"
              cta="Show my state"
              id="cost-state-select"
            />
          </div>
          <div className="mt-7">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.checkCoverage}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-label="Cost pages by state">
        <h2 className="display display-h2">Every state, spelled out</h2>
        <div className="mt-6">
          <CoverageGrid states={states} basePath="/cost-of-aba-therapy" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <TriageTrio />
      </section>
    </>
  );
}
