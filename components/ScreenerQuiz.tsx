"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { PhoneIcon } from "@/components/TopBar";

/**
 * Parent developmental checklist — OUR OWN plain-language items.
 *
 * Deliberately NOT the M-CHAT-R/F. That instrument is copyrighted, its
 * validity depends on unaltered administration plus the structured follow-up
 * interview, and it is scored by a clinician — reproducing it on a marketing
 * site would be both a licensing problem and a clinical one. We explain it
 * honestly at /autism-evaluation/m-chat/ and send parents to the real thing.
 *
 * What this is: age-banded questions about things parents can actually
 * observe, producing a "here's what I'd do next" answer — never a score
 * presented as a verdict, never the word "risk", never a diagnosis.
 *
 * Result shows BEFORE any contact capture (Style Bible / CRO spine).
 * The lead POST carries contact + state + age band only — no answers, no
 * result band. The /api/lead allowlist drops anything else anyway; this
 * keeps the funnel PHI-light on purpose.
 */

type AgeBand = "under-3" | "3-5" | "6-plus";

type Item = {
  id: string;
  /** The question, in parent language */
  q: string;
  /** Small clarifier under the question */
  hint?: string;
  /**
   * "absent"  → a concern when the child does NOT do this
   * "present" → a concern when the child DOES do this
   */
  concernWhen: "absent" | "present";
};

const AGE_BANDS: { id: AgeBand; label: string; note: string }[] = [
  { id: "under-3", label: "Under 3", note: "Toddler milestones" },
  { id: "3-5", label: "3 to 5", note: "Preschool years" },
  { id: "6-plus", label: "6 or older", note: "School age" },
];

const ITEMS: Record<AgeBand, Item[]> = {
  "under-3": [
    {
      id: "name",
      q: "Does your child look at you when you say their name?",
      hint: "From across the room, when they're not already looking.",
      concernWhen: "absent",
    },
    {
      id: "point",
      q: "Does your child point at things to show you?",
      hint: "Not pointing to ask for something — pointing just to share, like at a dog.",
      concernWhen: "absent",
    },
    {
      id: "follow",
      q: "If you point at something across the room, does your child look at it?",
      concernWhen: "absent",
    },
    {
      id: "bring",
      q: "Does your child bring you things just to show you?",
      concernWhen: "absent",
    },
    {
      id: "pretend",
      q: "Does your child pretend?",
      hint: "Feeding a doll, talking on a toy phone, making a block into a car.",
      concernWhen: "absent",
    },
    {
      id: "words",
      q: "Is your child using words, and adding new ones?",
      hint: "Any words at all — and whether the list is growing.",
      concernWhen: "absent",
    },
    {
      id: "smile",
      q: "Does your child smile back when you smile at them?",
      concernWhen: "absent",
    },
    {
      id: "repeat",
      q: "Does your child repeat the same movement over and over?",
      hint: "Hand-flapping, rocking, spinning, lining things up in the same order.",
      concernWhen: "present",
    },
    {
      id: "upset",
      q: "Do small changes in routine cause very big upset?",
      hint: "A different route, a different cup, the wrong door.",
      concernWhen: "present",
    },
    {
      id: "lost",
      q: "Has your child lost words or skills they used to have?",
      hint: "Any loss of language or social skills is worth a call to your doctor, on its own.",
      concernWhen: "present",
    },
  ],
  "3-5": [
    {
      id: "back-forth",
      q: "Can your child hold a back-and-forth conversation?",
      hint: "A few turns each way, not just answering questions or reciting.",
      concernWhen: "absent",
    },
    {
      id: "peers",
      q: "Does your child play with other children?",
      hint: "Playing with them — not next to them, and not only with adults.",
      concernWhen: "absent",
    },
    {
      id: "pretend-5",
      q: "Does your child do pretend play with other people?",
      hint: "Playing house, being the dragon, taking a role someone else gave them.",
      concernWhen: "absent",
    },
    {
      id: "share",
      q: "Does your child come tell you about things that happened?",
      hint: "Sharing news, showing you a drawing, reporting on their day.",
      concernWhen: "absent",
    },
    {
      id: "gestures",
      q: "Does your child use gestures and expressions along with words?",
      hint: "Nodding, shrugging, pointing, faces that match what they're saying.",
      concernWhen: "absent",
    },
    {
      id: "interest",
      q: "Does one topic take over most of their play and talk?",
      hint: "Deep interests are wonderful. This is about one crowding out everything else.",
      concernWhen: "present",
    },
    {
      id: "routine-5",
      q: "Do changes in plans cause meltdowns that are hard to recover from?",
      concernWhen: "present",
    },
    {
      id: "sensory",
      q: "Are sounds, textures, tags, or lights a daily battle?",
      hint: "Covering ears, refusing clothes or foods by texture, seeking crashes and pressure.",
      concernWhen: "present",
    },
    {
      id: "scripts",
      q: "Does your child repeat phrases from shows or from you, out of context?",
      concernWhen: "present",
    },
    {
      id: "school-flag",
      q: "Has a teacher or daycare raised a concern to you?",
      hint: "The people who see many children this age often notice patterns first.",
      concernWhen: "present",
    },
  ],
  "6-plus": [
    {
      id: "friends",
      q: "Does your child have friendships they keep up on their own?",
      hint: "Not just classmates — kids they seek out and stay connected to.",
      concernWhen: "absent",
    },
    {
      id: "read-room",
      q: "Does your child pick up on how other people are feeling?",
      hint: "Noticing someone is upset or joking without being told.",
      concernWhen: "absent",
    },
    {
      id: "conversation",
      q: "Can your child have a conversation about something that isn't their favorite subject?",
      concernWhen: "absent",
    },
    {
      id: "flexible",
      q: "Can your child handle a plan changing without the day being over?",
      concernWhen: "absent",
    },
    {
      id: "independent",
      q: "Is your child managing age-typical daily routines?",
      hint: "Dressing, hygiene, getting ready, homework — with the usual reminders, not constant help.",
      concernWhen: "absent",
    },
    {
      id: "literal",
      q: "Does your child take things very literally?",
      hint: "Sarcasm, jokes, and figures of speech land wrong or not at all.",
      concernWhen: "present",
    },
    {
      id: "meltdown",
      q: "Do hard moments end in meltdowns or shutdowns that last a long time?",
      hint: "Especially at the end of a school day, when the effort of holding it together runs out.",
      concernWhen: "present",
    },
    {
      id: "sensory-6",
      q: "Do noise, crowds, or specific textures make ordinary places unbearable?",
      concernWhen: "present",
    },
    {
      id: "rigid",
      q: "Do rules and routines have to be exactly right?",
      hint: "Distress when someone else breaks a rule, or when steps happen out of order.",
      concernWhen: "present",
    },
    {
      id: "school-6",
      q: "Is school raising concerns about behavior or social skills?",
      concernWhen: "present",
    },
  ],
};

const ANSWERS = [
  { id: "yes", label: "Yes, regularly" },
  { id: "sometimes", label: "Sometimes" },
  { id: "no", label: "Not that I've seen" },
] as const;

type AnswerId = (typeof ANSWERS)[number]["id"];

/** Concern weight for one item: 1 = full flag, 0.5 = partial, 0 = none. */
function weight(item: Item, answer: AnswerId): number {
  if (answer === "sometimes") return 0.5;
  const isYes = answer === "yes";
  const flag = item.concernWhen === "present" ? isYes : !isYes;
  return flag ? 1 : 0;
}

type Band = "few" | "some" | "many";

function bandFor(score: number, max: number): Band {
  const share = score / max;
  if (share < 0.2) return "few";
  if (share < 0.5) return "some";
  return "many";
}

const BAND_COPY: Record<
  Band,
  { kicker: string; title: string; body: string; tint: string }
> = {
  few: {
    kicker: "WHAT YOU TOLD US",
    title: "Not much here is raising a flag today.",
    body: "Most of what you described is in the range people expect at this age. That is genuinely good news — and it does not cancel out your own gut. Parents notice things checklists miss, and nothing on this page has met your child.",
    tint: "bg-mint",
  },
  some: {
    kicker: "WHAT YOU TOLD US",
    title: "There are a few things worth asking a professional about.",
    body: "You flagged some things that are common reasons families get an evaluation. That is not a diagnosis and it is not a prediction — it is a reason to get a real opinion from someone who can watch your child, rather than keep wondering.",
    tint: "bg-butter",
  },
  many: {
    kicker: "WHAT YOU TOLD US",
    title: "This is worth starting an evaluation now, not later.",
    body: "You described several of the things clinicians look at closely. Only a qualified professional can say what it means — but waiting rarely makes an evaluation easier, and the wait for an appointment is usually the longest part of the whole process. Start the clock today.",
    tint: "bg-peach",
  },
};

export default function ScreenerQuiz({
  states,
}: {
  states: { name: string; slug: string }[];
}) {
  const [age, setAge] = useState<AgeBand | null>(null);
  const [page, setPage] = useState(0); // 0 = age, 1 = items A, 2 = items B, 3 = result
  const [answers, setAnswers] = useState<Record<string, AnswerId>>({});
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [lead, setLead] = useState({
    parentName: "",
    phone: "",
    email: "",
    state: "",
    company: "",
  });

  const items = age ? ITEMS[age] : [];
  const half = Math.ceil(items.length / 2);
  const pageItems = page === 1 ? items.slice(0, half) : items.slice(half);
  const pageComplete = pageItems.every((i) => answers[i.id]);
  const totalSteps = 4;

  function restart() {
    setAge(null);
    setAnswers({});
    setPage(0);
    setShowForm(false);
    setStatus("idle");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.parentName.trim() || !lead.phone.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: lead.parentName,
          phone: lead.phone,
          email: lead.email,
          state: lead.state,
          company: lead.company,
          // Age band only — never the answers or the result.
          childAge: AGE_BANDS.find((b) => b.id === age)?.label ?? "",
          source: "autism-screener",
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  /* ─────────────────────────── RESULT ─────────────────────────── */
  if (page === 3 && age) {
    const max = items.length;
    const score = items.reduce(
      (sum, i) => sum + weight(i, answers[i.id] ?? "no"),
      0
    );
    const band = bandFor(score, max);
    const copy = BAND_COPY[band];

    return (
      <div className="space-y-4">
        <div className={`field-card ${copy.tint} p-6 sm:p-10`}>
          <p className="display text-xs tracking-wide text-garden">
            {copy.kicker}
          </p>
          <h2 className="display display-h2 mt-1">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-spruce-soft">{copy.body}</p>

          <div className="mt-6 rounded-3xl bg-white/80 p-5">
            <p className="font-bold">
              This is not a diagnosis, a test, or a medical screening tool.
            </p>
            <p className="mt-2 text-spruce-soft">
              It is a set of questions to help you decide whether to make a
              phone call. Autism is diagnosed by qualified professionals — a
              developmental pediatrician, a child psychologist, a psychiatrist,
              or a neurologist — after watching your child directly. No set of
              questions answered by a parent on a website can do that, and any
              site that tells you otherwise is not being straight with you.
            </p>
          </div>
        </div>

        {/* Next steps — same three doors, ordered by band */}
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-8">
          <h3 className="display display-h3">What to actually do next</h3>
          <ol className="mt-4 space-y-4">
            <li>
              <p className="font-bold">1. Call your child&rsquo;s doctor and use the word &ldquo;evaluation.&rdquo;</p>
              <p className="mt-1 text-spruce-soft">
                {band === "few"
                  ? "Even now — if something is nagging at you, say it at the next well visit. Bring specifics: what you see, how often, since when."
                  : "Ask directly for a developmental evaluation and a referral. Bring specifics and a couple of phone videos of the moments that worry you. Vague worry gets a wait-and-see; concrete examples get a referral."}
              </p>
            </li>
            <li>
              <p className="font-bold">
                2. Refer your child yourself — you don&rsquo;t need a doctor&rsquo;s permission.
              </p>
              <p className="mt-1 text-spruce-soft">
                Under three, every state runs a free early intervention program
                you can refer your own child to, and it generally does not
                require a diagnosis. Three or older, you can request a free
                evaluation in writing from your local public school district
                even if your child doesn&rsquo;t attend yet. Both run in
                parallel with a medical evaluation — do them at the same time,
                not one after the other.
              </p>
            </li>
            <li>
              <p className="font-bold">3. Get in line now, ask questions while you wait.</p>
              <p className="mt-1 text-spruce-soft">
                Evaluation waits are measured in months in a lot of places. Put
                your name on lists first and sort out the rest afterward.{" "}
                {band === "few"
                  ? "If your worry doesn't go away, that itself is worth acting on."
                  : "If you want, we'll tell you what the path looks like where you live — including when the answer is that you don't need us."}
              </p>
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/autism-evaluation/" className="btn btn-outline">
              How an evaluation works
            </Link>
            <Link href="/autism-evaluation/m-chat/" className="btn btn-outline">
              About the M-CHAT
            </Link>
            <button type="button" className="btn btn-outline" onClick={restart}>
              Start over
            </button>
          </div>
        </div>

        {/* Contact capture — AFTER the answer, never before */}
        {status === "done" ? (
          <div className="field-card bg-mint p-6 text-center sm:p-10">
            <p className="display display-h3">Got it — someone will call you.</p>
            <p className="mx-auto mt-3 max-w-md text-spruce-soft">
              A real person from our intake team will walk you through the next
              step for your state. Want to talk sooner?
            </p>
            <a
              href={siteConfig.contact.phoneHref}
              className="btn btn-primary mt-5"
            >
              <PhoneIcon />
              Call {siteConfig.contact.phone}
            </a>
          </div>
        ) : showForm ? (
          <form
            onSubmit={submit}
            className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-8"
            aria-label="Talk to someone about next steps"
          >
            <h3 className="display display-h3">
              Want a person to walk you through it?
            </h3>
            <p className="mt-1 text-spruce-soft">
              We&rsquo;ll tell you how evaluations and coverage work where you
              live — even if the honest answer is that we&rsquo;re not who you
              need.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="sc-name" className="mb-1 block font-semibold">
                  Your first name
                </label>
                <input
                  id="sc-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={lead.parentName}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, parentName: e.target.value }))
                  }
                  className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="sc-phone" className="mb-1 block font-semibold">
                  Phone number
                </label>
                <input
                  id="sc-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={lead.phone}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, phone: e.target.value }))
                  }
                  className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="sc-email" className="mb-1 block font-semibold">
                  Email{" "}
                  <span className="font-normal text-spruce-soft">(optional)</span>
                </label>
                <input
                  id="sc-email"
                  type="email"
                  autoComplete="email"
                  value={lead.email}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, email: e.target.value }))
                  }
                  className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="sc-state" className="mb-1 block font-semibold">
                  State
                </label>
                <select
                  id="sc-state"
                  value={lead.state}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, state: e.target.value }))
                  }
                  className="w-full rounded-full border-2 border-spruce/30 bg-white px-4 py-3 font-semibold"
                >
                  <option value="">Choose your state ▾</option>
                  {states.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="sc-company">Company</label>
                <input
                  id="sc-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={lead.company}
                  onChange={(e) =>
                    setLead((l) => ({ ...l, company: e.target.value }))
                  }
                />
              </div>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-3 font-semibold text-err">
                Something went wrong on our end. Please try again — or just call{" "}
                {siteConfig.contact.phone}.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-5"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Have someone call me"}
            </button>
            <p className="mt-3 text-sm text-spruce-soft">
              Your answers above stay on your device — we never receive them.
              Your contact details are confidential and HIPAA-protected.
            </p>
          </form>
        ) : (
          <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-8">
            <p className="max-w-xl text-ivory/90">
              Want a person to walk you through what happens next where you
              live? No cost, no obligation.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-marigold"
                onClick={() => setShowForm(true)}
              >
                Have someone call me
              </button>
              <a
                href={siteConfig.contact.phoneHref}
                className="btn btn-outline !border-ivory !text-ivory hover:!bg-ivory hover:!text-spruce"
              >
                <PhoneIcon />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────── QUESTIONS ─────────────────────────── */
  return (
    <div className="field-card bg-white p-5 shadow-lift ring-2 ring-spruce/10 sm:p-8">
      <div className="mb-5">
        <p className="text-sm font-semibold text-spruce-soft">
          Step {page + 1} of {totalSteps} · about two minutes
        </p>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-mint"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={page + 1}
          aria-label="Checklist progress"
        >
          <div
            className="h-full rounded-full bg-garden transition-all"
            style={{ width: `${((page + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {page === 0 && (
        <fieldset>
          <legend className="display display-h3">How old is your child?</legend>
          <p className="mt-1 text-spruce-soft">
            The questions change with age — what matters at two isn&rsquo;t what
            matters at seven.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {AGE_BANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`field-card border-2 p-5 text-left transition-colors ${
                  age === b.id
                    ? "border-garden bg-mint"
                    : "border-spruce/20 bg-white hover:bg-mint"
                }`}
                aria-pressed={age === b.id}
                onClick={() => {
                  setAge(b.id);
                  setAnswers({});
                  setPage(1);
                }}
              >
                <span className="display display-h3 block">{b.label}</span>
                <span className="mt-1 block text-sm text-spruce-soft">
                  {b.note}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {(page === 1 || page === 2) && age && (
        <fieldset>
          <legend className="display display-h3">
            {page === 1
              ? "Think about the last month or so."
              : "A few more, then you're done."}
          </legend>
          <p className="mt-1 text-spruce-soft">
            There are no wrong answers, and nobody sees these but you.
          </p>

          <ul className="mt-5 space-y-4">
            {pageItems.map((item) => (
              <li
                key={item.id}
                className="rounded-3xl border-2 border-spruce/15 p-4 sm:p-5"
              >
                <p className="font-bold" id={`q-${item.id}`}>
                  {item.q}
                </p>
                {item.hint && (
                  <p className="mt-1 text-sm text-spruce-soft">{item.hint}</p>
                )}
                <div
                  className="mt-3 flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby={`q-${item.id}`}
                >
                  {ANSWERS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      className={`chip min-h-12 ${
                        answers[item.id] === a.id ? "chip-solid" : ""
                      }`}
                      aria-pressed={answers[item.id] === a.id}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [item.id]: a.id }))
                      }
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setPage((p) => p - 1)}
            >
              ← Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!pageComplete}
              onClick={() => setPage((p) => p + 1)}
            >
              {page === 1 ? "Next →" : "See what to do next →"}
            </button>
          </div>
          {!pageComplete && (
            <p className="mt-3 text-sm text-spruce-soft">
              Answer each one to keep going — a best guess is fine.
            </p>
          )}
        </fieldset>
      )}
    </div>
  );
}
