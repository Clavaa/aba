"use client";

import { useState } from "react";
import CallCta from "@/components/CallCta";

/**
 * Multi-step insurance-check quiz (Shared CRO spine: quiz funnels convert
 * 30–40% of starters vs ~6.6% flat forms; contact info LAST; start with a
 * zero-commitment question; 3–5 fields visible per step).
 *
 * Order: state → insurance type → child's age → contact.
 * Posts PHI-light fields to /api/lead with a honeypot.
 */

/**
 * Copy tables. The Spanish set is a real translation of the funnel, not a
 * machine pass over the English — the /es/ pages use it end to end so a
 * Spanish-speaking parent never lands mid-flow in English.
 */
const COPY = {
  en: {
    insuranceTypes: [
      "Medicaid or CHIP",
      "Insurance through work",
      "Plan I bought myself",
      "TRICARE / military",
      "I'm not sure",
    ],
    ageRanges: ["Under 3", "3–5", "6–9", "10–13", "14 or older"],
    formLabel: "Insurance coverage check",
    step: (n: number, total: number) => `Step ${n} of ${total} · about a minute total`,
    progress: "Quiz progress",
    q1: "Where does your family live?",
    q1sub: "Coverage rules are set state by state — this is the question that decides everything else.",
    stateLabel: "State",
    statePlaceholder: "Choose your state ▾",
    q1cta: "That’s my state →",
    q2: "How is your child insured?",
    q2sub: "A best guess is fine — checking is our job, not yours.",
    q3: "How old is your child?",
    q3sub: "ABA helps at every age — this just shapes the plan we’d build.",
    q4: "Where should we send your answer?",
    q4sub: "A real person checks your plan and calls you with what’s covered.",
    name: "Your first name",
    phone: "Phone number",
    email: "Email",
    optional: "(optional)",
    back: "← Back",
    sending: "Checking…",
    submit: "Check my coverage",
    error: "Something went wrong on our end. Please try again — or just call",
    privacy:
      "Your answers are confidential and HIPAA-protected. We use them only to check your coverage and call you back.",
    doneTitle: "You’re on the list — nice work.",
    doneBody:
      "A real person from our intake team will call you to finish the coverage check. Want the answer even faster?",
    doneCall: "Call",
  },
  es: {
    insuranceTypes: [
      "Medicaid o CHIP",
      "Seguro por el trabajo",
      "Un plan que compré yo",
      "TRICARE / militar",
      "No estoy seguro",
    ],
    ageRanges: ["Menor de 3", "3–5", "6–9", "10–13", "14 o más"],
    formLabel: "Revisión de cobertura del seguro",
    step: (n: number, total: number) => `Paso ${n} de ${total} · un minuto en total`,
    progress: "Progreso del cuestionario",
    q1: "¿Dónde vive su familia?",
    q1sub: "Las reglas de cobertura las fija cada estado — esta pregunta define todo lo demás.",
    stateLabel: "Estado",
    statePlaceholder: "Elija su estado ▾",
    q1cta: "Ese es mi estado →",
    q2: "¿Qué seguro tiene su hijo?",
    q2sub: "Con que nos dé una idea basta — averiguarlo es nuestro trabajo, no el suyo.",
    q3: "¿Qué edad tiene su hijo?",
    q3sub: "La terapia ABA ayuda a cualquier edad — esto solo define cómo sería el plan.",
    q4: "¿A dónde le enviamos la respuesta?",
    q4sub: "Una persona real revisa su plan y le llama para decirle qué cubre.",
    name: "Su nombre",
    phone: "Número de teléfono",
    email: "Correo electrónico",
    optional: "(opcional)",
    back: "← Atrás",
    sending: "Revisando…",
    submit: "Revisar mi cobertura",
    error: "Algo falló de nuestro lado. Inténtelo otra vez — o simplemente llame al",
    privacy:
      "Sus respuestas son confidenciales y están protegidas por HIPAA. Solo las usamos para revisar su cobertura y devolverle la llamada.",
    doneTitle: "Listo — ya está en la lista.",
    doneBody:
      "Una persona real de nuestro equipo le llamará para terminar de revisar la cobertura. ¿Prefiere la respuesta ahora mismo?",
    doneCall: "Llame al",
  },
} as const;

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
  lang = "en",
}: {
  states: { name: string; slug: string }[];
  defaultState?: string;
  lang?: "en" | "es";
}) {
  const c = COPY[lang];
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
        body: JSON.stringify({
          ...data,
          source: lang === "es" ? "coverage-quiz-es" : "coverage-quiz",
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[30px] bg-teal-80 p-8 text-center sm:p-12">
        <p className="display display-h3">{c.doneTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-spruce-soft">{c.doneBody}</p>
        <CallCta className="btn btn-primary mt-5" fallbackLabel="Talk to a person" />
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
      className="rounded-[30px] border border-ink/10 bg-white p-6 sm:p-8"
      aria-label={c.formLabel}
    >
      {/* Progress */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-spruce-soft">
          {c.step(step + 1, totalSteps)}
        </p>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-teal-80"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={step + 1}
          aria-label={c.progress}
        >
          <div
            className="h-full rounded-full bg-coral transition-all"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="display display-h3">{c.q1}</legend>
          <p className="mt-1 text-spruce-soft">{c.q1sub}</p>
          <label htmlFor="quiz-state" className="sr-only">
            {c.stateLabel}
          </label>
          <select
            id="quiz-state"
            value={data.state}
            onChange={(e) => set({ state: e.target.value })}
            className="mt-4 w-full rounded-full border border-ink/20 bg-white px-4 py-3 font-semibold"
          >
            <option value="">{c.statePlaceholder}</option>
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
              {c.q1cta}
            </button>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="display display-h3">{c.q2}</legend>
          <p className="mt-1 text-spruce-soft">{c.q2sub}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.insuranceTypes.map((t) => (
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
              {c.back}
            </button>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="display display-h3">{c.q3}</legend>
          <p className="mt-1 text-spruce-soft">{c.q3sub}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.ageRanges.map((a) => (
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
              {c.back}
            </button>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="display display-h3">{c.q4}</legend>
          <p className="mt-1 text-spruce-soft">{c.q4sub}</p>

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="quiz-name" className="mb-1 block font-semibold">
                {c.name}
              </label>
              <input
                id="quiz-name"
                type="text"
                autoComplete="given-name"
                required
                value={data.parentName}
                onChange={(e) => set({ parentName: e.target.value })}
                className="w-full rounded-full border border-ink/20 bg-white px-4 py-3"
              />
            </div>
            <div>
              <label htmlFor="quiz-phone" className="mb-1 block font-semibold">
                {c.phone}
              </label>
              <input
                id="quiz-phone"
                type="tel"
                autoComplete="tel"
                required
                value={data.phone}
                onChange={(e) => set({ phone: e.target.value })}
                className="w-full rounded-full border border-ink/20 bg-white px-4 py-3"
              />
            </div>
            <div>
              <label htmlFor="quiz-email" className="mb-1 block font-semibold">
                {c.email}{" "}
                <span className="font-normal text-spruce-soft">{c.optional}</span>
              </label>
              <input
                id="quiz-email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => set({ email: e.target.value })}
                className="w-full rounded-full border border-ink/20 bg-white px-4 py-3"
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
              {c.error}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button type="button" className="btn btn-outline" onClick={back}>
              {c.back}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? c.sending : c.submit}
            </button>
          </div>
          <p className="mt-3 text-sm text-spruce-soft">
            {c.privacy}
          </p>
        </fieldset>
      )}
    </form>
  );
}
