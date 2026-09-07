/**
 * TODO: replace with actual hires before launch — payers and licensure bodies
 * verify named executives; BCBA titles are checkable on the public BACB
 * registry.
 *
 * Config-driven leadership roster. The /about/leadership/ page renders
 * entirely from this file — edit names, titles, and bios here and the page
 * updates everywhere. Bios are ROLE-SCOPED on purpose: they describe what the
 * role does at Sproutwell, never personal history, schools, past employers,
 * or years of experience (nothing a payer or journalist could fact-check
 * against a placeholder person).
 */

/** Pastel field tints available for the initials avatar background */
export type AvatarTint = "bg-mint" | "bg-butter" | "bg-peach";

export type Leader = {
  /** Display name, credentials included (e.g. "Sarah Klein, BCBA") */
  name: string;
  title: string;
  /** "executive" renders in the larger C-suite tier; "leadership" in the SVP/VP tier */
  tier: "executive" | "leadership";
  /** Leaders sharing a group render under a subheading within their tier */
  group?: "regional-operations";
  /** 2–3 sentences describing what the ROLE does at Sproutwell */
  bio: string;
};

/** "Sarah Klein, BCBA" → "SK" (credentials after a comma are ignored) */
export function leaderInitials(name: string): string {
  const words = name.split(",")[0].trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

/** Rotate the pastel tints so avatars alternate like the accordion cards */
const tints: AvatarTint[] = ["bg-mint", "bg-butter", "bg-peach"];
export function leaderTint(index: number): AvatarTint {
  return tints[index % tints.length];
}

export const leadership: Leader[] = [
  {
    name: "David Rosen",
    title: "Chief Executive Officer",
    tier: "executive",
    bio: "Sets the direction for the whole company and holds every decision to one test: does this make good care easier for a family to reach? Every team at Sproutwell — clinical, operations, and finance — ultimately answers to this desk.",
  },
  {
    name: "Michael Adler",
    title: "President",
    tier: "executive",
    bio: "Turns the company's plans into programs that actually run, state by state. Works day to day with regional and clinical leaders so that what we promise families on this website is what happens in real living rooms and centers.",
  },
  {
    name: "Sarah Klein, BCBA",
    title: "Chief Clinical Officer",
    tier: "executive",
    bio: "Owns the clinical standard of care in every state we serve — how treatment plans are built, how BCBAs are supervised, and how big caseloads are allowed to get. A Board Certified Behavior Analyst leads this seat on purpose: clinical decisions at Sproutwell are made by clinicians.",
  },
  {
    name: "Jason Feldman",
    title: "Chief Operating Officer",
    tier: "executive",
    bio: "Keeps the daily machinery running: staffing, scheduling, centers, and in-home services across every region. The three regional operations VPs report here, so a problem in any state has a short path to someone who can fix it.",
  },
  {
    name: "Rachel Stein",
    title: "Chief Financial Officer",
    tier: "executive",
    bio: "Manages the company's finances and makes sure the business side never gets in the way of care. That includes keeping billing honest, predictable, and explained in plain English before a family ever commits.",
  },
  {
    name: "Amanda Levin",
    title: "Chief People Officer",
    tier: "executive",
    bio: "Leads hiring, training, and retention for the people who deliver care — RBTs, BCBAs, and the teams behind them. Stable, well-supported clinicians are the foundation of consistent therapy, and building that stability is this role's whole job.",
  },
  {
    name: "Eric Cohen",
    title: "Chief Technology Officer",
    tier: "executive",
    bio: "Builds and runs the systems behind the care: scheduling, session data collection, telehealth, and the tools families use to see progress. Responsible for keeping every piece of health information private and secure.",
  },
  {
    name: "Melissa Green",
    title: "Chief Compliance Officer",
    tier: "executive",
    bio: "Makes sure Sproutwell meets the rules in every state — licensure, HIPAA privacy, payer requirements, and audit readiness. When regulations change anywhere we operate, this team catches it and updates how we work.",
  },
  {
    name: "Jonathan Weiss",
    title: "General Counsel",
    tier: "executive",
    bio: "Leads the legal team: contracts, state healthcare regulations, and the agreements that let us serve families in all 50 states. Also the internal advocate for families' rights in everything we sign.",
  },
  {
    name: "Rebecca Hart",
    title: "SVP, Revenue Cycle",
    tier: "leadership",
    bio: "Runs the insurance journey from first benefits check to final claim — verification, prior authorizations, and follow-up. This is the team that does the paperwork fight so parents don't have to.",
  },
  {
    name: "Daniel Brooks",
    title: "SVP, Growth & Development",
    tier: "leadership",
    bio: "Decides where Sproutwell grows next: new centers, new service areas, and new states. Growth plans start with one question — where are families waiting longest for care?",
  },
  {
    name: "Nicole Price",
    title: "VP, Payer Contracting",
    tier: "leadership",
    bio: "Negotiates the in-network agreements with Medicaid programs and private insurance plans that make care affordable. Every payer we can name on our insurance pages came through this team.",
  },
  {
    name: "Lauren Miller, BCBA",
    title: "VP, Clinical Quality",
    tier: "leadership",
    bio: "Measures whether therapy is actually working — auditing treatment plans, tracking child outcomes, and running clinical training. Partners with the Chief Clinical Officer so the standard of care is the same in every state.",
  },
  {
    name: "Adam Schwartz",
    title: "VP, Operations — East",
    tier: "leadership",
    group: "regional-operations",
    bio: "Runs day-to-day operations for our eastern states: the care teams, schedules, and centers families rely on. The local escalation point when something in the region needs fixing fast.",
  },
  {
    name: "Kevin Morgan",
    title: "VP, Operations — Central",
    tier: "leadership",
    group: "regional-operations",
    bio: "Runs day-to-day operations for our central states: the care teams, schedules, and centers families rely on. The local escalation point when something in the region needs fixing fast.",
  },
  {
    name: "Michelle Grant",
    title: "VP, Operations — West",
    tier: "leadership",
    group: "regional-operations",
    bio: "Runs day-to-day operations for our western states: the care teams, schedules, and centers families rely on. The local escalation point when something in the region needs fixing fast.",
  },
];

export const executives = leadership.filter((l) => l.tier === "executive");
export const seniorLeaders = leadership.filter(
  (l) => l.tier === "leadership" && l.group !== "regional-operations"
);
export const regionalOpsLeaders = leadership.filter(
  (l) => l.group === "regional-operations"
);
