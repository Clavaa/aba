import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import ScreenerQuiz from "@/components/ScreenerQuiz";
import { PhoneIcon } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Autism Signs Checklist for Parents (Free, 2 Minutes)",
  description:
    "Age-specific questions about what you're seeing at home, and a straight answer about what to do next. Not a diagnosis or a medical test — a decision aid for worried parents.",
  alternates: { canonical: "/autism-evaluation/screener/" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteConfig.brand.domain}/autism-evaluation/screener/#breadcrumbs`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Autism evaluation",
      item: `${siteConfig.brand.domain}/autism-evaluation/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Parent checklist",
      item: `${siteConfig.brand.domain}/autism-evaluation/screener/`,
    },
  ],
};

export default function ScreenerPage() {
  const states = getStateLinks();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-12">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/autism-evaluation/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Autism evaluation
            </Link>{" "}
            / Parent checklist
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            What are you actually seeing?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Ten questions about your child, written for the age they are right
            now. At the end you get a plain recommendation about what to do
            next — not a score, not a label, and nothing you have to sign up
            for.
          </p>
        </div>
      </section>

      {/* ───────────────── HONESTY BLOCK, BEFORE THE QUIZ ───────────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-10">
        <div className="rounded-3xl border-2 border-spruce/15 bg-white p-5 sm:p-6">
          <h2 className="display display-h3">Read this first</h2>
          <ul className="mt-3 space-y-2 text-spruce-soft">
            <li>
              <strong className="text-spruce">This is not a test.</strong> It
              is not a medical screening instrument and it produces no
              diagnosis. Autism is diagnosed by qualified professionals who
              observe your child directly.
            </li>
            <li>
              <strong className="text-spruce">It is not the M-CHAT.</strong>{" "}
              That&rsquo;s a real, validated screening questionnaire your
              pediatrician may use, and it belongs with a clinician who can do
              the structured follow-up it requires.{" "}
              <Link
                href="/autism-evaluation/m-chat/"
                className="font-semibold text-garden underline underline-offset-4"
              >
                Here&rsquo;s what it is and how it&rsquo;s scored
              </Link>
              .
            </li>
            <li>
              <strong className="text-spruce">Your answers stay here.</strong>{" "}
              Nothing you tap is sent to us. If you decide at the end that you
              want a call, you tell us your name and number then — and only
              that.
            </li>
          </ul>
        </div>
      </section>

      {/* ─────────────────────────── THE QUIZ ─────────────────────────── */}
      <section
        className="mx-auto max-w-3xl px-4 py-10"
        aria-label="Parent developmental checklist"
      >
        <ScreenerQuiz states={states} />
      </section>

      {/* ───────────────── SUPPORTING CONTENT ───────────────── */}
      <section
        className="mx-auto max-w-3xl px-4 pb-14"
        aria-labelledby="why-heading"
      >
        <h2 id="why-heading" className="display display-h2">
          Why these questions, and not others
        </h2>
        <div className="mt-5 space-y-4 text-lg text-spruce-soft">
          <p>
            Most of what clinicians look at early on isn&rsquo;t dramatic. It
            lives in small social moments: whether a child looks up when their
            name is called, whether they point at a dog just to make sure you
            saw the dog too, whether they bring you things for no reason except
            to share them. Those moments are called joint attention, and their
            absence is one of the earliest and most consistent things
            professionals notice.
          </p>
          <p>
            That&rsquo;s why the questions change with age. At two, the
            question is whether pointing and pretending have shown up. At six,
            those are long settled and the questions become about friendships
            that survive without an adult arranging them, about whether a joke
            lands, about what happens at 4pm when the effort of holding it
            together all day finally runs out.
          </p>
          <p>
            One more thing worth saying plainly: none of these traits is bad. A
            deep interest is a gift. A child who notices every texture is
            noticing real things. The reason to get an evaluation isn&rsquo;t
            that something is wrong with your child — it&rsquo;s that a
            diagnosis is what unlocks support, and support is easier to get
            early than late.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/autism-evaluation/" className="btn btn-primary">
            How to get an evaluation
          </Link>
          <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
            <PhoneIcon />
            {siteConfig.cta.talk} · {siteConfig.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
