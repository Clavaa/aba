"use client";

import { useState } from "react";
import CallCta from "@/components/CallCta";

/**
 * The white intake card that floats in the hero on the target's service
 * pages — the highest-intent form on the site, above the fold.
 *
 * PHI-light like every other form here: contact details, state, and an age
 * band. Nothing about the child's diagnosis or clinical situation.
 */

const AGES = ["Under 3", "3–5", "6–9", "10–13", "14 or older"] as const;

export default function HeroIntakeForm({
  heading = "Get help today",
  states,
}: {
  heading?: string;
  states: { name: string; slug: string }[];
}) {
  const [d, setD] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    childAge: "",
    state: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (patch: Partial<typeof d>) => setD((v) => ({ ...v, ...patch }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!d.first.trim() || !d.phone.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: `${d.first} ${d.last}`.trim(),
          phone: d.phone,
          email: d.email,
          childAge: d.childAge,
          state: d.state,
          company: d.company,
          source: "hero-intake",
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="overlap-panel bg-white p-8 text-center">
        <p className="display-round display-round-lg">Got it.</p>
        <p className="mt-3 text-ink-muted">
          A real person from our intake team will call you. Want to talk sooner?
        </p>
        <CallCta className="btn btn-primary mt-6" fallbackLabel="Talk to a person" />
      </div>
    );
  }

  const field =
    "w-full rounded-full border border-ink/15 bg-beige-80 px-5 py-3.5 placeholder:text-ink/45";

  return (
    <form onSubmit={submit} className="overlap-panel bg-white p-6 sm:p-8" aria-label={heading}>
      <h2 className="display-round display-round-lg">{heading}</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hi-first" className="sr-only">First name</label>
          <input id="hi-first" required autoComplete="given-name" placeholder="First name*"
            className={field} value={d.first} onChange={(e) => set({ first: e.target.value })} />
        </div>
        <div>
          <label htmlFor="hi-last" className="sr-only">Last name</label>
          <input id="hi-last" autoComplete="family-name" placeholder="Last name"
            className={field} value={d.last} onChange={(e) => set({ last: e.target.value })} />
        </div>
        <div>
          <label htmlFor="hi-email" className="sr-only">Email address</label>
          <input id="hi-email" type="email" autoComplete="email" placeholder="Email address"
            className={field} value={d.email} onChange={(e) => set({ email: e.target.value })} />
        </div>
        <div>
          <label htmlFor="hi-phone" className="sr-only">Phone number</label>
          <input id="hi-phone" type="tel" required autoComplete="tel" placeholder="Phone number*"
            className={field} value={d.phone} onChange={(e) => set({ phone: e.target.value })} />
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        <div>
          <label htmlFor="hi-age" className="sr-only">Your child&rsquo;s age</label>
          <select id="hi-age" className={field} value={d.childAge}
            onChange={(e) => set({ childAge: e.target.value })}>
            <option value="">Your child&rsquo;s age</option>
            {AGES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hi-state" className="sr-only">Where are you located?</label>
          <select id="hi-state" className={field} value={d.state}
            onChange={(e) => set({ state: e.target.value })}>
            <option value="">Where are you located?</option>
            {states.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          </select>
        </div>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hi-company">Company</label>
        <input id="hi-company" tabIndex={-1} autoComplete="off" value={d.company}
          onChange={(e) => set({ company: e.target.value })} />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 font-semibold text-err">
          Something went wrong on our end. Please try again in a moment.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-6 w-full">
        {status === "sending" ? "Sending…" : "Get in touch with our team"}
      </button>

      <p className="mt-4 text-center text-sm text-ink-muted">
        Prefer to reach us another way?{" "}
        <CallCta
          className="font-bold underline underline-offset-4"
          fallbackLabel="Other ways to reach us"
          icon={false}
        />
      </p>
      <p className="mt-3 text-center text-sm text-ink-muted">
        Confidential and HIPAA-protected.
      </p>
    </form>
  );
}
