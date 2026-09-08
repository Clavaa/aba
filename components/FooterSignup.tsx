"use client";

import { useState } from "react";
import Sprout from "@/components/Sprout";

/**
 * `footer-form` — the signup band above the footer proper. Name + email,
 * pill inputs, one dark pill submit.
 *
 * Posts to /api/lead like every other form here, tagged so intake can tell a
 * newsletter signup from someone who needs a call back today. PHI-light: we
 * ask for a name and an email and nothing about the child.
 */
export default function FooterSignup() {
  const [state, setState] = useState({ first: "", last: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.first.trim() || !state.email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: `${state.first} ${state.last}`.trim(),
          email: state.email,
          company: state.company,
          source: "footer-signup",
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-[1400px] px-3 pb-4" aria-labelledby="signup-heading">
      <div className="field-card grid items-center gap-10 bg-peach-100 px-6 py-14 sm:px-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Something useful, occasionally</p>
          <h2 id="signup-heading" className="display display-h2 mt-5">
            Backup in your inbox.
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink-muted">
            Plain-language guides on coverage, evaluations, and getting through
            your week. No spam-y frequency, and you can leave whenever you like.
          </p>

          {status === "done" ? (
            <p className="mt-8 rounded-[24px] bg-white/80 p-6 text-lg font-bold">
              You&rsquo;re on the list. Thanks — we&rsquo;ll keep it useful.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 max-w-lg">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="fs-first" className="sr-only">
                    First name
                  </label>
                  <input
                    id="fs-first"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="First name*"
                    value={state.first}
                    onChange={(e) => setState((s) => ({ ...s, first: e.target.value }))}
                    className="w-full rounded-full border border-ink/15 bg-white px-6 py-4"
                  />
                </div>
                <div>
                  <label htmlFor="fs-last" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="fs-last"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    value={state.last}
                    onChange={(e) => setState((s) => ({ ...s, last: e.target.value }))}
                    className="w-full rounded-full border border-ink/15 bg-white px-6 py-4"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="fs-email" className="sr-only">
                  Email
                </label>
                <input
                  id="fs-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email*"
                  value={state.email}
                  onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-full border border-ink/15 bg-white px-6 py-4"
                />
              </div>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="fs-company">Company</label>
                <input
                  id="fs-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={state.company}
                  onChange={(e) => setState((s) => ({ ...s, company: e.target.value }))}
                />
              </div>

              {status === "error" && (
                <p role="alert" className="mt-3 font-semibold text-err">
                  That didn&rsquo;t go through. Please try again in a moment.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn mt-6 w-full bg-ink text-cream hover:bg-ink-90 sm:w-auto sm:px-16"
              >
                {status === "sending" ? "Signing up…" : "Sign up"}
              </button>
              <p className="mt-4 text-sm text-ink-muted">
                Confidential and HIPAA-protected. We never sell your details.
              </p>
            </form>
          )}
        </div>

        <div className="relative hidden justify-self-center lg:block">
          <div className="grid h-72 w-72 place-items-center rounded-full bg-peach-120">
            <Sprout className="h-40 w-40 text-coral" strokeWidth={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
