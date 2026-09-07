"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * The hero state-selector (Style Bible: "Accepted plans in [Your State ▼]" —
 * 50-state scale is the differentiator, say it above the fold).
 * Navigates to the matching state or cost page.
 */
export default function StateSelect({
  states,
  basePath = "/locations",
  label = "Accepted plans in",
  cta = "See my state",
  id = "state-select",
}: {
  states: { name: string; slug: string }[];
  basePath?: string;
  label?: string;
  cta?: string;
  id?: string;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (slug) router.push(`${basePath}/${slug}/`);
      }}
    >
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <div className="flex gap-2">
        <select
          id={id}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full min-w-44 rounded-full border border-ink/20 bg-white px-4 py-2.5 font-semibold text-spruce sm:w-auto"
        >
          <option value="">Your state ▾</option>
          {states.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary !py-2.5" disabled={!slug}>
          {cta}
        </button>
      </div>
    </form>
  );
}
