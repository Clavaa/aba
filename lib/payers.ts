/**
 * Per-payer insurance content.
 *
 * HARD RULES for everything in this file:
 *
 * 1. NOTHING here claims we are in-network with any payer. Network status is
 *    plan- and state-specific and is not settled; every page says so and
 *    routes the question to a phone call. site.config.acceptedPlans is still
 *    a TODO and must be filled with real contracts before any page names a
 *    payer as accepted.
 * 2. Nothing here quotes a payer's specific dollar amounts, visit limits, or
 *    policy numbers. Those change constantly and being wrong about them hurts
 *    a family making a decision. We describe how these plans generally work
 *    and tell people how to read their own documents.
 * 3. Every page carries the self-funded/ERISA point, because it is the single
 *    most consequential thing a parent can learn about their own coverage and
 *    almost no provider site explains it.
 *
 * TODO(pre-launch): have someone who reads plan documents for a living review
 * every record here, and re-check each payer's current published ABA policy.
 */

export type PayerRecord = {
  slug: string;
  /** Display name, e.g. "UnitedHealthcare" */
  name: string;
  /** Search-friendly title */
  title: string;
  metaDescription: string;
  h1: string;
  lede: string;
  tint: "bg-mint" | "bg-butter" | "bg-peach";
  /** Who administers behavioral health for this payer, when it differs */
  administrator?: string;
  /** How this payer generally handles ABA — process, not prices */
  howItWorks: string[];
  /** What's specific about this payer that trips families up */
  gotchas: { t: string; d: string }[];
  /** What to have in hand when calling them */
  askThem: string[];
  faqs: { q: string; a: string }[];
};

/** Shared: applies to every commercial payer page. */
export const SELF_FUNDED_NOTE =
  "The logo on your card often matters less than who actually pays the claims. If your employer self-funds its health plan, the insurer only administers it — the employer's money pays, and the plan is governed by federal ERISA rules rather than your state's autism insurance mandate. That means a state law requiring ABA coverage may simply not apply to you, even though your neighbor with the same card is covered by it. Roughly half of Americans with employer coverage are in self-funded plans and most have no idea. Ask your HR or benefits department one question: is our plan fully insured or self-funded?";

export const payers: PayerRecord[] = [
  {
    slug: "aetna",
    name: "Aetna",
    title: "Does Aetna Cover ABA Therapy?",
    metaDescription:
      "How Aetna plans generally cover ABA therapy for autism: the clinical policy, prior authorization, what documentation is required, and the self-funded plan trap.",
    h1: "Does Aetna cover ABA therapy?",
    lede:
      "Generally yes, for a documented autism diagnosis where ABA is medically necessary — but the specifics live in your plan, not in Aetna's name, and the difference between two Aetna cards can be enormous.",
    tint: "bg-mint",
    howItWorks: [
      "Aetna publishes clinical policy bulletins that set out when it considers ABA medically necessary. Those bulletins are public, and they are what a reviewer works from.",
      "A diagnostic evaluation from a qualified professional comes first — ABA is authorized to treat a diagnosis, not to investigate one.",
      "A behavior analyst completes an assessment and writes a treatment plan with specific, measurable goals and a requested number of hours.",
      "That plan goes in for prior authorization before therapy starts, and gets reauthorized periodically with progress data attached.",
    ],
    gotchas: [
      {
        t: "Two Aetna cards, two different worlds",
        d: "A fully insured Aetna plan in a state with a strong autism mandate and a self-funded employer plan administered by Aetna can behave completely differently. Same logo, different rulebook.",
      },
      {
        t: "The treatment plan is the application",
        d: "Denials at this stage are frequently about documentation rather than the child — vague goals, missing baseline data, hours that aren't justified by the assessment. A provider who writes these well is worth a lot to you.",
      },
      {
        t: "Reauthorization is not automatic",
        d: "Authorizations run for a set period and then need progress data to continue. A gap in that paperwork is a gap in your child's therapy.",
      },
    ],
    askThem: [
      "Is my plan fully insured or self-funded?",
      "Is ABA a covered benefit under this plan, and under which clinical policy?",
      "Does ABA require prior authorization, and what does the reviewer need to see?",
      "What are my deductible, coinsurance, and out-of-pocket maximum for this service?",
      "Are there visit, hour, age, or dollar limits on this benefit?",
      "What is the appeal process if a request is denied?",
    ],
    faqs: [
      {
        q: "Does Aetna require a diagnosis before covering ABA?",
        a: "Yes. ABA is authorized as treatment for a documented autism diagnosis made by a qualified professional. Get the diagnostic evaluation started first — the wait for it is usually the longest part of the whole process.",
      },
      {
        q: "Will Aetna cover ABA in my home?",
        a: "In-home is a standard place of service for ABA and is commonly covered. Whether your specific plan authorizes home, school, daycare, or a mix is a plan-level question worth asking before you build your week around one setting.",
      },
      {
        q: "What if Aetna denies the request?",
        a: "Denials are frequently about documentation and are frequently overturned. You have appeal rights, including external review in many situations, and your provider should handle the clinical side of the appeal for you. Ask for the denial reason in writing.",
      },
    ],
  },

  {
    slug: "unitedhealthcare",
    name: "UnitedHealthcare",
    title: "Does UnitedHealthcare Cover ABA Therapy?",
    metaDescription:
      "How UnitedHealthcare plans generally cover ABA therapy for autism, why behavioral health runs through Optum, prior authorization, and the self-funded plan trap.",
    h1: "Does UnitedHealthcare cover ABA therapy?",
    lede:
      "Usually yes, with a documented diagnosis and prior authorization — but the phone number on the back of your card is often not the number you need. Behavioral health typically runs through a separate administrator.",
    tint: "bg-butter",
    administrator: "Optum (behavioral health)",
    howItWorks: [
      "Behavioral health benefits for most UnitedHealthcare plans are administered by Optum, which means ABA authorizations, network questions, and appeals generally go there rather than to the general medical line.",
      "Coverage requires a documented autism diagnosis from a qualified professional.",
      "A behavior analyst's assessment and treatment plan — goals, baselines, requested hours — are submitted for prior authorization before services start.",
      "Authorizations are time-limited and renewed with progress data.",
    ],
    gotchas: [
      {
        t: "Call the behavioral health number, not the medical one",
        d: "Families lose weeks bouncing between lines. Look for a separate behavioral health or mental health number on your card, and start there for anything ABA-related.",
      },
      {
        t: "Network status differs between medical and behavioral",
        d: "A provider being in-network for medical services says nothing about behavioral health networks, which are contracted separately.",
      },
      {
        t: "Self-funded employer plans play by different rules",
        d: "UnitedHealthcare administers a very large number of self-funded employer plans. If yours is one, your state's autism mandate may not reach it.",
      },
    ],
    askThem: [
      "Is my behavioral health benefit administered by Optum, and what's the number?",
      "Is my plan fully insured or self-funded?",
      "Is ABA covered, and does it need prior authorization?",
      "Which ABA providers are in-network for behavioral health in my ZIP code?",
      "What are my costs — deductible, coinsurance, out-of-pocket maximum?",
      "What are the limits, and what does an appeal look like?",
    ],
    faqs: [
      {
        q: "Why does UnitedHealthcare send me to Optum for ABA?",
        a: "Optum administers behavioral health benefits for most UnitedHealthcare plans. Authorizations, provider networks, and appeals for ABA generally run through Optum rather than the general medical side.",
      },
      {
        q: "Does UnitedHealthcare cover ABA for adults?",
        a: "Coverage past childhood varies substantially by plan and state. Age limits written into older policies are frequently challenged under federal mental health parity law, so a flat age denial is worth appealing rather than accepting.",
      },
      {
        q: "How long does prior authorization take?",
        a: "It varies by plan and by how complete the submission is. The fastest path is a thorough assessment and treatment plan submitted the first time, which is your provider's job to get right.",
      },
    ],
  },

  {
    slug: "cigna",
    name: "Cigna",
    title: "Does Cigna Cover ABA Therapy?",
    metaDescription:
      "How Cigna plans generally cover ABA therapy for autism, why behavioral health runs through Evernorth, what prior authorization requires, and the self-funded plan trap.",
    h1: "Does Cigna cover ABA therapy?",
    lede:
      "Generally yes with a documented diagnosis and authorization. As with most large carriers, behavioral health is administered separately — and as always, whether your employer self-funds changes which rules apply.",
    tint: "bg-peach",
    administrator: "Evernorth Behavioral Health",
    howItWorks: [
      "Cigna's behavioral health benefits are administered under the Evernorth banner; ABA authorizations and behavioral network questions generally start there.",
      "A documented autism diagnosis from a qualified professional is the entry requirement.",
      "An assessment and a written treatment plan with measurable goals go in for prior authorization.",
      "Continued authorization depends on submitted progress data at set intervals.",
    ],
    gotchas: [
      {
        t: "Two brands, one company",
        d: "Seeing 'Evernorth' on paperwork when your card says Cigna is normal, not a mix-up. It's the behavioral health administrator.",
      },
      {
        t: "Medical necessity criteria are written down",
        d: "Large carriers publish the clinical criteria reviewers apply. Asking for the specific criteria used to deny a request is a reasonable request and a good first move in an appeal.",
      },
      {
        t: "Self-funded plans are common here too",
        d: "Cigna administers many employer-funded plans. Ask HR whether yours is fully insured or self-funded before you assume a state mandate protects you.",
      },
    ],
    askThem: [
      "Is my behavioral health benefit administered by Evernorth?",
      "Is my plan fully insured or self-funded?",
      "Is ABA covered and does it require prior authorization?",
      "What clinical criteria are applied to ABA requests?",
      "What are my deductible, coinsurance, and out-of-pocket maximum?",
      "Which ABA providers are in the behavioral health network near me?",
    ],
    faqs: [
      {
        q: "Is Evernorth the same as Cigna?",
        a: "Evernorth is Cigna's health services organization, and Evernorth Behavioral Health administers behavioral benefits for Cigna plans. If ABA paperwork arrives with that name on it, that is expected.",
      },
      {
        q: "Does Cigna cover ABA delivered at school?",
        a: "Some plans cover services delivered during school hours and some exclude them as educational rather than medical. This is specific plan language and must be checked before anything is scheduled with a school.",
      },
      {
        q: "Can I use an out-of-network ABA provider?",
        a: "Sometimes, at higher cost, and sometimes at in-network rates if there is no adequate in-network option near you. Network adequacy exceptions are worth asking about explicitly when the nearest in-network provider is far away or has no capacity.",
      },
    ],
  },

  {
    slug: "blue-cross-blue-shield",
    name: "Blue Cross Blue Shield",
    title: "Does Blue Cross Blue Shield Cover ABA Therapy?",
    metaDescription:
      "Why 'does Blue Cross cover ABA' has no single answer: independent state licensees, BlueCard for out-of-state care, the federal employee program, and self-funded plans.",
    h1: "Does Blue Cross Blue Shield cover ABA therapy?",
    lede:
      "This is the payer where the honest answer is genuinely “it depends,” and not as a dodge. Blue Cross Blue Shield is dozens of independent companies, each with its own policies in its own states.",
    tint: "bg-mint",
    howItWorks: [
      "Each Blue plan is a separate, independently operated company licensed in its own territory. The plan in one state can cover ABA differently from the plan next door.",
      "Your own plan's medical policy — usually published on its website — is the document that governs your coverage.",
      "As with other carriers: diagnosis first, then an assessment and treatment plan, then prior authorization, then periodic reauthorization with progress data.",
      "Care outside your home plan's territory is generally coordinated through the BlueCard program, with your home plan's benefits following you.",
    ],
    gotchas: [
      {
        t: "'Blue Cross covers it' is not a fact about your plan",
        d: "Something you read about a Blue plan in another state may be irrelevant to yours. Find your own plan's ABA medical policy by name before you rely on anything.",
      },
      {
        t: "The federal employee program is its own thing",
        d: "Federal employee coverage operates under its own benefit structure and its own brochure. If you're a federal employee, read that brochure rather than a general Blue Cross page.",
      },
      {
        t: "Self-funded employer plans, again",
        d: "Many large employers self-fund through a Blue plan. The card looks the same; the governing rules aren't.",
      },
    ],
    askThem: [
      "Which Blue company administers my plan, and in what state?",
      "Where is your published medical policy for applied behavior analysis?",
      "Is my plan fully insured or self-funded?",
      "Does ABA require prior authorization here?",
      "If I get care outside this state, how does BlueCard handle it?",
      "What are my costs and limits for this benefit?",
    ],
    faqs: [
      {
        q: "Why do different websites say different things about Blue Cross and ABA?",
        a: "Because they are describing different companies. Blue Cross Blue Shield plans are independent licensees operating in their own territories with their own medical policies. Only your own plan's policy applies to you.",
      },
      {
        q: "Can I see an ABA provider in another state with my Blue plan?",
        a: "Often, through the BlueCard program, with your home plan's benefits and authorization rules applying. Confirm authorization requirements before starting services across a state line.",
      },
      {
        q: "Does my Blue plan have to follow my state's autism mandate?",
        a: "If it is fully insured in that state, generally yes. If your employer self-funds the plan, the state mandate generally does not apply, though federal mental health parity protections still do.",
      },
    ],
  },

  {
    slug: "tricare",
    name: "TRICARE",
    title: "Does TRICARE Cover ABA Therapy?",
    metaDescription:
      "How TRICARE covers ABA through the Autism Care Demonstration: the referral and diagnosis requirements, required outcome measures, and how it differs from commercial insurance.",
    h1: "Does TRICARE cover ABA therapy?",
    lede:
      "Yes — and through a program that works unlike any commercial plan. Military families get ABA through a dedicated demonstration program with its own referral path, its own paperwork, and its own required assessments.",
    tint: "bg-butter",
    howItWorks: [
      "ABA for TRICARE beneficiaries is delivered through a dedicated autism program rather than as an ordinary medical benefit, with its own rules that get updated periodically.",
      "A diagnosis and a referral from an authorized provider start the process — the referral requirements are specific and are a common stumbling block.",
      "Families enroll in the program and work with an authorized ABA provider; there are required, periodically repeated outcome measures that families complete as a condition of continued authorization.",
      "Because it is a demonstration program, requirements change more often than a typical commercial policy. What was true two years ago may not be true now.",
    ],
    gotchas: [
      {
        t: "The paperwork cadence is real",
        d: "Required assessments and outcome measures come due on a schedule, and missing them can interrupt authorization. Put the dates in a calendar the day you enroll.",
      },
      {
        t: "PCS moves need planning",
        d: "A permanent change of station means a new region, potentially a new contractor, and a new provider search. Start the transfer conversation before you move, not after.",
      },
      {
        t: "Rules change between what you read and today",
        d: "Program requirements have been revised repeatedly. Verify anything you read — here included — against current official TRICARE guidance.",
      },
    ],
    askThem: [
      "What referral do I need, and from whom, to start ABA?",
      "Which contractor covers my region, and who is authorized near me?",
      "What assessments am I required to complete, and how often?",
      "What are my out-of-pocket costs under my plan type?",
      "What happens to our authorization when we PCS?",
      "Where is the current program handbook published?",
    ],
    faqs: [
      {
        q: "Do I need a referral for ABA under TRICARE?",
        a: "Yes. TRICARE's autism program requires a diagnosis and a referral from an authorized provider before ABA can begin, and the referral requirements are specific enough that they are a common source of delay.",
      },
      {
        q: "What happens to our ABA services when we move duty stations?",
        a: "You may change regions and contractors and will generally need to establish care with an authorized provider in the new location. Start that process before the move — provider capacity is the constraint, not the paperwork.",
      },
      {
        q: "Do the program's rules change?",
        a: "Yes, more often than commercial policies. Always confirm current requirements against official TRICARE program guidance rather than any third-party summary.",
      },
    ],
  },

  {
    slug: "kaiser-permanente",
    name: "Kaiser Permanente",
    title: "Does Kaiser Permanente Cover ABA Therapy?",
    metaDescription:
      "How ABA works inside Kaiser Permanente's integrated model: internal referrals, when care is contracted out, and what to do when the wait is long.",
    h1: "Does Kaiser Permanente cover ABA therapy?",
    lede:
      "Generally yes — but Kaiser is an integrated system, not just an insurer, so the path runs through Kaiser itself. That changes how you start, who you ask, and what to do if the wait is long.",
    tint: "bg-peach",
    howItWorks: [
      "Care generally starts inside the system: a Kaiser pediatrician or behavioral health department evaluates and refers, rather than you selecting an outside provider first.",
      "Evaluation and diagnosis are typically handled internally, though this varies by region.",
      "Where Kaiser doesn't deliver ABA directly, it contracts with outside providers — the referral and authorization still come from Kaiser.",
      "Regions operate differently enough that guidance from one state may not describe another.",
    ],
    gotchas: [
      {
        t: "Going outside on your own usually isn't covered",
        d: "In an integrated model, self-referring to an outside ABA provider without Kaiser's authorization typically means paying for it yourself. Start the referral inside the system even if you already know who you want to see.",
      },
      {
        t: "Waits are a coverage issue, not just an inconvenience",
        d: "If internal capacity means a long wait, that is worth raising formally. Timely-access rules exist in some states, and asking about them by name changes conversations.",
      },
      {
        t: "Regions differ",
        d: "Kaiser's regions are run separately enough that a friend's experience in another state may not predict yours.",
      },
    ],
    askThem: [
      "How do I start an autism evaluation referral in this region?",
      "Is ABA delivered internally here or through contracted providers?",
      "What is the current wait, and what are my options if it's long?",
      "Are there timely-access standards that apply to my plan?",
      "What are my costs for ABA services?",
      "Who is my point of contact if the referral stalls?",
    ],
    faqs: [
      {
        q: "Can I see an outside ABA provider with Kaiser coverage?",
        a: "Usually only with Kaiser's referral and authorization. Where Kaiser does not deliver ABA directly, it contracts with outside providers — but the authorization still originates inside the system.",
      },
      {
        q: "What if the wait for an evaluation is months long?",
        a: "Raise it formally rather than waiting quietly, ask about timely-access standards in your state, and in parallel use the free doors — early intervention under three, or a school district evaluation from three up — which do not depend on Kaiser at all.",
      },
    ],
  },

  {
    slug: "humana",
    name: "Humana",
    title: "Does Humana Cover ABA Therapy?",
    metaDescription:
      "How Humana plans generally handle ABA therapy for autism: published medical policy, prior authorization, differences between commercial, Medicaid and Medicare plans.",
    h1: "Does Humana cover ABA therapy?",
    lede:
      "For plans that include the benefit, generally yes with a diagnosis and prior authorization. The bigger question with Humana is usually which kind of plan you actually have.",
    tint: "bg-mint",
    howItWorks: [
      "Humana publishes medical coverage policies that describe when it considers ABA medically necessary; that document is what a reviewer applies.",
      "A documented autism diagnosis comes first, then an assessment and a written treatment plan.",
      "Prior authorization is generally required before services start, with periodic reauthorization based on progress.",
      "Requirements differ across commercial employer plans, Medicaid managed care plans, and Medicare plans — check which one your card belongs to before reading any policy.",
    ],
    gotchas: [
      {
        t: "Know your plan type first",
        d: "A Humana Medicaid managed care plan follows your state's Medicaid rules for children's services; a commercial employer plan follows its own policy and possibly ERISA. These are different worlds with the same logo.",
      },
      {
        t: "Medicaid managed care has extra protections for children",
        d: "If your child is covered by Medicaid through a Humana plan, federal EPSDT rules for children under 21 are a powerful backstop that a plan-level denial does not override.",
      },
      {
        t: "Self-funded employer plans",
        d: "As with every commercial carrier, ask HR whether the plan is self-funded before assuming a state mandate applies.",
      },
    ],
    askThem: [
      "Which type of plan do I have — commercial, Medicaid managed care, or Medicare?",
      "Where is the published medical coverage policy for ABA?",
      "Is prior authorization required, and what documentation is expected?",
      "If this is Medicaid, how do EPSDT rules apply to my child?",
      "What are my costs and limits?",
      "What's the appeal path if a request is denied?",
    ],
    faqs: [
      {
        q: "Does Humana Medicaid cover ABA?",
        a: "Children under 21 covered by Medicaid have federal EPSDT protections requiring medically necessary services, and every state Medicaid program has an ABA pathway. A managed care plan administers those benefits but does not get to define them away.",
      },
      {
        q: "How do I find Humana's ABA policy?",
        a: "Large carriers publish medical coverage policies on their websites. Ask member services for the specific policy applied to applied behavior analysis, by name, and ask them to send it to you.",
      },
    ],
  },
];

export function getPayer(slug: string): PayerRecord | undefined {
  return payers.find((p) => p.slug === slug);
}
