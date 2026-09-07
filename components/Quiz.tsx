"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";
import { PhoneIcon } from "@/components/TopBar";

/**
 * Multi-step insurance-check quiz (Shared CRO spine: quiz funnels convert
 * 30–40% of starters vs ~6.6% flat forms; contact info LAST; start with a
 * zero-commitment question; 3–5 fields visible per step).
 *
 * Order: state → insurance type → child's age → contact.
 * Posts PHI-light fields to /api/lead with a honeypot.
 */

const INSURANCE_TYPES = [
  "Medicaid or CHIP",
  "Insurance through work",
  "Plan I bought myself",
  "TRICARE / military",
  "I'm not sure",
] as const;

const AGE_RANGES = ["Under 3", "3–5", "6–9", "10–13", "14 or older"] as const;

type QuizData = {
  state: string;
  insuranceType: string;
  childAge: string;
  parentName: string;
  phone: string;
  email: string;
  company: string; // honeypot — humans never see or fill this
};

export default function Quiz({
  states,
  defaultState = "",
}: {
  states: { name: string; slug: string }[];
  defaultState?: string;
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [data, setData] = useState<QuizData>({
    state: defaultState,
    insuranceType: "",
    childAge: "",
    parentName: "",
    phone: "",
    email: "",
    company: "",
  });

  const totalSteps = 4;
  const set = (patch: Partial<QuizData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.parentName.trim() || !data.phone.trim()) return;
    setStatus("sending");
    try {
      // trailing slash matters: next.config sets trailingSlash and a POST
      // through the 308 redirect is avoidable noise
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "coverage-quiz" }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="field-card bg-mint p-6 text-center sm:p-10">
        <p className="display display-h3">You&rsquo;re on the list — nice work.</p>
        <p className="mx-auto mt-3 max-w-md text-spruce-soft">
          A real person from our intake team will call you to finish the
          coverage check. Want the answer even faster?
        </p>
        <a href={siteConfig.contact.phoneHref} className="btn btn-primary mt-5">
          <PhoneIcon />
          Call {siteConfig.contact.phone}
        </a>
      </div>
    );
  }

  const chipClass = (selected: boolean) =>
    `chip min-h-12 w-full justify-center text-base sm:w-auto ${
      selected ? "chip-solid" : ""
    }`;

  return (
    <form
      onSubmit={submit}
      className="field-card bg-white p-5 shadow-lift sm:p-8"
      aria-label="Insurance coverage check"
    >
      {/* Progress */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-spruce-soft">
          Step {step + 1} of {totalSteps} · about a minute total
        </p>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-mint"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={step + 1}
          aria-label="Quiz progress"
        >
          <div
            className="h-full rounded-full bg-garden transition-all"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="display display-h3">
            Where does your family live?
          </legend>
          <p className="mt-1 text-spruce-soft">
            Coverage rules are set state by state — this is the question that
            decides everything else.
          </p>
          <label htmlFor="quiz-state" className="sr-only">
            State
          </label>
          <select
            id="quiz-state"
            value={data.state}
            onChange={(e) => set({ state: e.target.value })}
            className="mt-4 w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3 font-semibold"
          >
            <option value="">Choose your state ▾</option>
            {states.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!data.state}
              onClick={next}
            >
              That&rsquo;s my state →
            </button>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="display display-h3">
            How is your child insured?
          </legend>
          <p className="mt-1 text-spruce-soft">
            A best guess is fine — checking is our job, not yours.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {INSURANCE_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={chipClass(data.insuranceType === t)}
                aria-pressed={data.insuranceType === t}
                onClick={() => {
                  set({ insuranceType: t });
                  next();
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-between">
            <button type="button" className="btn btn-outline" onClick={back}>
              ← Back
            </button>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="display display-h3">How old is your child?</legend>
          <p className="mt-1 text-spruce-soft">
            ABA helps at every age — this just shapes the plan we&rsquo;d build.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {AGE_RANGES.map((a) => (
              <button
                key={a}
                type="button"
                className={chipClass(data.childAge === a)}
                aria-pressed={data.childAge === a}
                onClick={() => {
                  set({ childAge: a });
                  next();
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-between">
            <button type="button" className="btn btn-outline" onClick={back}>
              ← Back
            </button>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="display display-h3">
            Where should we send your answer?
          </legend>
          <p className="mt-1 text-spruce-soft">
            A real person checks your plan and calls you with what&rsquo;s
            covered.
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="quiz-name" className="mb-1 block font-semibold">
                Your first name
              </label>
              <input
                id="quiz-name"
                type="text"
                autoComplete="given-name"
                required
                value={data.parentName}
                onChange={(e) => set({ parentName: e.target.value })}
                className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3"
              />
            </div>
            <div>
              <label htmlFor="quiz-phone" className="mb-1 block font-semibold">
                Phone number
              </label>
              <input
                id="quiz-phone"
                type="tel"
                autoComplete="tel"
                required
                value={data.phone}
                onChange={(e) => set({ phone: e.target.value })}
                className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3"
              />
            </div>
            <div>
              <label htmlFor="quiz-email" className="mb-1 block font-semibold">
                Email <span className="font-normal text-spruce-soft">(optional)</span>
              </label>
              <input
                id="quiz-email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => set({ email: e.target.value })}
                className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3"
              />
            </div>
            {/* Honeypot — hidden from real users, tempting to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="quiz-company">Company</label>
              <input
                id="quiz-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={data.company}
                onChange={(e) => set({ company: e.target.value })}
              />
            </div>
          </div>

          {status === "error" && (
            <p role="alert" className="mt-3 font-semibold text-err">
              Something went wrong on our end. Please try again — or just call{" "}
              {siteConfig.contact.phone}.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button type="button" className="btn btn-outline" onClick={back}>
              ← Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Checking…" : siteConfig.cta.checkCoverage}
            </button>
          </div>
          <p className="mt-3 text-sm text-spruce-soft">
            Your answers are confidential and HIPAA-protected. We use them only
            to check your coverage and call you back.
          </p>
        </fieldset>
      )}
    </form>
  );
}
