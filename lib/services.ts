/**
 * Service-line content records — one per setting we deliver ABA in.
 *
 * These are hand-written editorial records, not a template with the setting
 * swapped: each service has its own "best for", its own honest trade-offs,
 * and its own coverage note. The candor in `tradeoffs` is deliberate — no
 * competitor publishes the downsides of their own service lines, and parents
 * who are choosing between settings are the ones who search for them.
 *
 * NOTHING here describes our own staffing, capacity, or outcomes. Claims about
 * the operation live in site.config.ts behind explicit TODOs.
 */

export type ServiceRecord = {
  slug: string;
  /** Full name for headings and titles, e.g. "In-home ABA therapy" */
  name: string;
  /** Short label for nav, chips, and cards, e.g. "At home" */
  navLabel: string;
  /** <title> (brand template appends the site name) */
  title: string;
  metaDescription: string;
  h1: string;
  lede: string;
  /** Style Bible pastel for the hero field card */
  tint: "bg-mint" | "bg-butter" | "bg-peach";
  photoIntent: string;
  /** "This is probably your fit if…" */
  bestFor: string[];
  /** What an actual session looks like — 4 cards */
  whatItLooksLike: { t: string; d: string }[];
  /** Honest strengths */
  strengths: string[];
  /** Honest trade-offs — we publish these on purpose */
  tradeoffs: string[];
  /** How insurance and Medicaid generally treat this setting */
  coverage: string;
  faqs: { q: string; a: string }[];
};

export const services: ServiceRecord[] = [
  /* ─────────────────────────── IN-HOME ─────────────────────────── */
  {
    slug: "in-home",
    name: "In-home ABA therapy",
    navLabel: "At home",
    title: "In-Home ABA Therapy for Kids",
    metaDescription:
      "In-home ABA therapy: what a session looks like in your own house, who it fits best, the honest trade-offs, and how Medicaid and private insurance cover it.",
    h1: "ABA that happens where life happens.",
    lede:
      "Bedtime, breakfast, the shoes, the sibling, the doorway meltdown at 4pm. In-home ABA teaches skills in the exact rooms and moments they have to work in — with you right there.",
    tint: "bg-mint",
    photoIntent:
      "Golden-hour: RBT and child playing on the living-room rug, parent nearby on the couch, real toys and real clutter",
    bestFor: [
      "The hardest parts of your day are home routines — meals, sleep, dressing, transitions",
      "Your child does better in familiar places and shuts down in new ones",
      "You want therapy to fit around the day your family already has",
      "Your child is young and a full day away from home isn't realistic yet",
      "You want the people who live in the house — you, a partner, grandma, a sibling — coached directly",
    ],
    whatItLooksLike: [
      {
        t: "A behavior technician comes to you",
        d: "Usually the same person on the same days, so your child gets a familiar face instead of a rotating cast. Sessions run in your kitchen, bedroom, backyard — wherever the target skill actually lives.",
      },
      {
        t: "Teaching rides on real moments",
        d: "Asking for a snack is taught at snack time. Getting dressed is taught while getting dressed. Nothing has to be transferred from a therapy room later, because it never left home.",
      },
      {
        t: "You get coached in the doorway",
        d: "Parent training isn't a separate appointment you have to find childcare for. It happens in the two minutes after a session, on the routine that just went sideways, with a plan you can run tonight.",
      },
      {
        t: "A BCBA writes and revises the plan",
        d: "A Board Certified Behavior Analyst builds the program, watches sessions, reads the data, and changes what isn't working. You see the goals and the progress — not a black box.",
      },
    ],
    strengths: [
      "Skills are learned where they're needed, so there's no generalization gap to close later",
      "No commute — for a lot of families that's the difference between doing therapy and dropping out",
      "Siblings and every caregiver in the house can be part of the plan",
      "The BCBA sees your actual environment: the trigger nobody would have described on a phone call",
    ],
    tradeoffs: [
      "Fewer built-in chances to practice with other kids — peer goals need a deliberate plan",
      "Your home becomes a work space for a set number of hours a week, and that's a real adjustment",
      "Scheduling depends on one clinician's route, so a sick technician is harder to cover than in a building full of staff",
      "Group and classroom-readiness goals need a deliberate plan — school or daycare sessions usually carry those better than a living room",
    ],
    coverage:
      "Every state Medicaid program covers medically necessary ABA for eligible children under EPSDT, and in-home is a standard place of service for it. Private plans covered by your state's autism insurance law generally cover in-home ABA too. What varies is the authorization: how many hours, for how long, and what documentation your plan wants first.",
    faqs: [
      {
        q: "Do I have to be home during sessions?",
        a: "For most families, yes — a caregiver is usually expected to be in the home. Beyond any plan requirement, parent coaching is where a lot of the durable change comes from, and it can't happen if nobody's there. Some plans require a caregiver present as a condition of payment; we'll tell you exactly what yours says.",
      },
      {
        q: "Does my house need to be clean or set up a certain way?",
        a: "No. We work in real houses. What helps is a spot with room to sit and play and a door you can close if the household gets loud — not a dedicated therapy room.",
      },
      {
        q: "How many hours a week is normal at home?",
        a: "It depends entirely on the plan your BCBA writes and what your insurer authorizes — the range across families is wide. Focused programs targeting a few specific skills run far fewer hours than comprehensive early-childhood programs. Your state page lists what your state publishes about authorized hours.",
      },
      {
        q: "Can we add another setting later, or do both?",
        a: "Yes. A lot of children start at home, add school or daycare sessions when peer and classroom goals become the priority, and taper as skills hold. The plan should follow the child, not the setting.",
      },
    ],
  },

  /* ───────────────────────────── SCHOOL ───────────────────────────── */
  {
    slug: "school",
    name: "School-based ABA support",
    navLabel: "In school",
    title: "School-Based ABA Therapy & IEP Support",
    metaDescription:
      "School-based ABA: how district IEP services differ from private ABA in the classroom, when insurance covers school hours, and how to get the two to work together.",
    h1: "The hardest six hours of the day shouldn't be the ones nobody's watching.",
    lede:
      "If the plan works at home and falls apart at school, the plan isn't finished. School-based support puts ABA where the trouble actually happens — and gets the adults in that building working from the same page.",
    tint: "bg-peach",
    photoIntent:
      "Classroom doorway, clinician crouched beside a student at a desk, teacher mid-conversation in the background, daylight",
    bestFor: [
      "Behavior that's fine at home and hard at school, or the reverse",
      "An IEP or behavior plan that looks good on paper and isn't working in the room",
      "A transition year: starting kindergarten, changing schools, moving to less support",
      "A team — teacher, aide, district staff — that needs one consistent strategy instead of five",
    ],
    whatItLooksLike: [
      {
        t: "Observation before opinions",
        d: "A BCBA watches the actual school day first — arrival, the hallway, the loud part of the cafeteria — because the thing that sets a child off at 10:40 is rarely the thing described in a meeting.",
      },
      {
        t: "One plan, taught to the adults",
        d: "The strategies get written down in language a teacher can use in a live classroom, and the people who spend the day with your child get trained on them rather than handed a document.",
      },
      {
        t: "Direct support in the room",
        d: "Where the district and your plan allow it, a technician works with your child during the school day on the same targets running everywhere else.",
      },
      {
        t: "You get an ally in the meeting",
        d: "Data your BCBA collected is data you can bring to an IEP meeting. Walking in with a record instead of an impression changes that conversation.",
      },
    ],
    strengths: [
      "Skills get taught in the setting that demands them, with the real peers and the real noise",
      "Teachers and aides stop guessing — everyone runs the same response to the same behavior",
      "Objective data from the classroom is the most useful thing you can bring to an IEP or 504 meeting",
      "Problems get caught in the setting where they show up first",
    ],
    tradeoffs: [
      "It only happens if the school agrees. Districts vary enormously in whether they allow outside clinicians in the building, and some say no",
      "Some health plans exclude services delivered during school hours, treating them as educational rather than medical — this has to be checked before anything is scheduled",
      "Coordination takes time up front: permissions, scheduling, and a relationship with staff who didn't ask for a new person in their room",
      "It can't fix a placement that's wrong for your child; sometimes the honest recommendation is a different setting, not more support in this one",
    ],
    coverage:
      "Two different systems can pay for help at school, and they aren't the same thing. Services on an IEP are the district's responsibility under federal special-education law and cost you nothing. Private ABA delivered at school is billed to Medicaid or your health plan and requires the school's cooperation — and some plans specifically exclude school-hours services. We check both doors before promising either.",
    faqs: [
      {
        q: "What's the difference between IEP services and ABA at school?",
        a: "An IEP is an education plan the school district owns and funds under IDEA; its job is access to education. Private ABA is a medical service your health plan funds; its job is treating the effects of a diagnosis. They can run alongside each other, and when they're coordinated it works better — but they answer to different rules and different people.",
      },
      {
        q: "Can the school say no to an outside ABA provider?",
        a: "Yes. Access to a school building is the district's decision, and policies differ from district to district. When the answer is no, the usual paths are consulting with the school team from outside, supporting you through the IEP process, and running direct hours before and after school.",
      },
      {
        q: "Will insurance pay for ABA during school hours?",
        a: "Sometimes. Some plans cover it, some exclude services during school hours entirely, and some cover consultation but not direct hours. It's plan-specific language — call us with your plan and we'll read it before you make any arrangements with the school.",
      },
      {
        q: "Can you come to my child's IEP meeting?",
        a: "Coordination with school teams, including participating in meetings when a family invites us, is a normal part of school-based support. Ask us what that looks like for your situation.",
      },
    ],
  },

  /* ──────────────────────────── TELEHEALTH ──────────────────────────── */
  {
    slug: "telehealth",
    name: "ABA telehealth & parent coaching",
    navLabel: "Telehealth",
    title: "ABA Telehealth & Parent Coaching",
    metaDescription:
      "ABA by video: live parent coaching during your real routines, who it works for, who it doesn't, and how state and plan rules affect coverage.",
    h1: "A behavior analyst in your kitchen at 5:45pm, without the drive.",
    lede:
      "Telehealth ABA isn't a child watching a screen. It's a BCBA watching a routine you're already living, and coaching you through it while it's happening.",
    tint: "bg-mint",
    photoIntent:
      "Parent holding a phone on a stand at the kitchen table while a toddler eats, warm evening light, laptop propped nearby",
    bestFor: [
      "You're far from any provider and the drive is the reason therapy keeps not happening",
      "The problems happen at specific times — dinner, bath, bedtime — that a clinician would never be there for anyway",
      "You're waiting on an evaluation or an authorization and need to start doing something now",
      "Both parents, or a grandparent two states away, need the same coaching",
      "Travel, illness, or a bad winter would otherwise mean weeks with no services at all",
    ],
    whatItLooksLike: [
      {
        t: "You're the one running it",
        d: "The analyst coaches; you do the teaching. That's not a compromise — for a lot of goals, the parent doing it every day beats a stranger doing it twice a week.",
      },
      {
        t: "Live, in the real moment",
        d: "Sessions get scheduled for the routine that's hard, not for a convenient afternoon hour. The coaching lands while the moment is happening, not in a recap.",
      },
      {
        t: "Short, frequent, specific",
        d: "One routine, one target, one plan for tomorrow. Nobody sits through a lecture on behavior science.",
      },
      {
        t: "It plugs into an in-person plan",
        d: "Telehealth works well as part of a program — supervision, caregiver training, and continuity — rather than as a full replacement for direct hours when direct hours are what a child needs.",
      },
    ],
    strengths: [
      "Removes the single biggest reason families drop out: travel",
      "Coaching happens in the routine that actually needs fixing",
      "Easy to include a second parent, a grandparent, or a babysitter on the same call",
      "Often the fastest way to start doing something useful while paperwork is still moving",
    ],
    tradeoffs: [
      "It is not the right tool for intensive one-to-one hours, or for behavior with a safety risk that needs hands-on support",
      "A caregiver has to be present and participating for the whole session — it isn't childcare",
      "It needs a working device, a stable connection, and a way to position the camera on the room",
      "Clinicians are licensed by state and plans set their own telehealth rules, so what's covered depends on where you live",
    ],
    coverage:
      "Telehealth coverage for ABA is set plan by plan and state by state, and it has changed a lot in recent years. Many plans cover caregiver training and supervision codes delivered remotely; fewer cover remote direct therapy hours. Your state page describes the pathway where you live, and we verify the specific language on your plan before scheduling anything.",
    faqs: [
      {
        q: "Does my child sit in front of a screen?",
        a: "Mostly no. In parent-mediated telehealth the camera is on the routine and the child is doing what they'd be doing anyway. Some older kids do work directly on video for specific goals, but that's a clinical decision, not the default.",
      },
      {
        q: "Is telehealth ABA as good as in person?",
        a: "For caregiver training and coaching, remote delivery is well established. For intensive direct therapy, in-person is generally what's called for. Anyone who tells you video fully replaces one-to-one hours for every child is selling something.",
      },
      {
        q: "What do I need to have?",
        a: "A phone, tablet, or computer with a camera, an internet connection that holds a video call, and a way to prop the device up so your hands are free. That's it.",
      },
      {
        q: "Can we start on telehealth and switch to in person?",
        a: "That's a common path, especially where in-person capacity is tight or the drive is long. The goals carry over; the delivery changes.",
      },
    ],
  },

  /* ──────────────────────────── DAYCARE ──────────────────────────── */
  {
    slug: "daycare",
    name: "ABA in daycare",
    navLabel: "In daycare",
    title: "ABA Therapy in Daycare & Preschool",
    metaDescription:
      "ABA delivered inside your child's daycare or preschool day: who has to agree, what it's good at, the honest trade-offs, and how coverage treats it.",
    h1: "Therapy that fits the day your child already has.",
    lede:
      "If your child is already in daycare four days a week, that is where their hardest social moments happen — and where the skills have to work. Daycare-based ABA puts the plan into that room instead of asking your family to find a fifth day.",
    tint: "bg-peach",
    photoIntent:
      "Daycare classroom mid-morning: toddlers at a low table, clinician kneeling beside one, teacher nearby",
    bestFor: [
      "Your child is already enrolled somewhere and pulling them out isn't realistic",
      "Both parents work and a separate therapy schedule would mean cutting hours",
      "The hard moments are with other children — sharing, waiting, joining in",
      "Drop-off, transitions, or nap time are the flashpoints of the day",
      "You want the daycare staff running the same strategies you are",
    ],
    whatItLooksLike: [
      {
        t: "A technician works inside the real day",
        d: "Sessions happen during circle time, snack, free play and transitions — the moments that are actually hard — rather than in a separate room away from everyone.",
      },
      {
        t: "The staff get coached too",
        d: "Teachers spend more hours with your child than we will. A good daycare program trains the adults who are there all week, so the strategies don't leave when we do.",
      },
      {
        t: "Peers are already there",
        d: "Social goals don't have to be manufactured. The turn-taking practice is happening anyway; we just make it deliberate and support it.",
      },
      {
        t: "You get one plan, not two",
        d: "The same targets run at daycare and at home, so your child isn't being asked to do something different in each place.",
      },
    ],
    strengths: [
      "No extra day to find and no second commute",
      "Peer practice is built into the setting rather than staged",
      "The people with your child all week learn the plan",
      "Skills get taught in the environment that demands them",
    ],
    tradeoffs: [
      "The daycare has to agree, and many won't — an outside clinician in the room is a real ask, with licensing and liability questions behind it",
      "Some health plans exclude services delivered in an educational or childcare setting, the same way they can exclude school hours",
      "A busy, loud room is harder for some children than a quiet one, and for those kids this is the wrong setting",
      "Coordination takes time: permissions, scheduling, and a relationship with staff who didn't ask for a new person in their room",
    ],
    coverage:
      "Daycare is a place of service, and how a plan treats it varies more than the home does. Some plans cover it outright, some exclude childcare and educational settings by name, and some require the same documentation as a school placement. This has to be checked in your plan language before anything is arranged with the daycare — it is not a question anyone should answer from a general rule.",
    faqs: [
      {
        q: "Will my daycare allow this?",
        a: "Maybe. It is entirely their decision, and it varies enormously between providers — some welcome it because it helps them support a child they're struggling with, and others decline for licensing or liability reasons. It's worth asking directly and early, and we can talk to them with you.",
      },
      {
        q: "Does this replace in-home therapy?",
        a: "Not usually. Daycare-based sessions are strong on peer and routine goals and weak on the household routines that happen at 6am and 7pm. Many families run both, or start in daycare and add home hours when bedtime becomes the priority.",
      },
      {
        q: "Will the other children notice?",
        a: "Some will, and that's generally fine — young children accept an extra adult in the room quickly. Good programs work inside the group rather than pulling your child out of it, which draws less attention, not more.",
      },
      {
        q: "What if the daycare says no?",
        a: "Then in-home becomes the path, with the daycare supported by consultation from outside where they're willing. A refusal closes one setting, not the whole plan.",
      },
    ],
  },

  /* ────────────────────── EARLY INTERVENTION ────────────────────── */
  {
    slug: "early-intervention",
    name: "Early intervention ABA",
    navLabel: "Early intervention",
    title: "Early Intervention ABA for Toddlers",
    metaDescription:
      "Early intervention ABA for toddlers and preschoolers: play-based teaching, heavy parent coaching, how Part C differs from insurance-funded ABA, and what to do while you wait.",
    h1: "The years when you're most worried are the years that count most.",
    lede:
      "Early ABA for toddlers looks like play, because for a two-year-old play is how learning happens. Underneath it is a plan, and almost all of it is aimed at one thing first: communication.",
    tint: "bg-butter",
    photoIntent:
      "Toddler and parent on the floor with blocks, clinician sitting back on her heels mid-laugh, morning window light",
    bestFor: [
      "Your toddler isn't using words, or lost words they used to have",
      "They don't point, wave, or bring you things to show you",
      "Your pediatrician flagged a screening and you're waiting on an evaluation",
      "A diagnosis just landed and nobody has told you what to actually do on Monday",
      "You want the family coached now, while routines are still forming",
    ],
    whatItLooksLike: [
      {
        t: "It looks like playing, on purpose",
        d: "Teaching happens inside the play a child already likes — following their lead, then building a small demand into the moment they're most motivated. Nobody drills a two-year-old at a table all morning.",
      },
      {
        t: "Communication comes first",
        d: "Before almost anything else: a reliable way to ask for what you want. Words, signs, pictures, or a device — whatever gets your child heard fastest. Behavior usually softens as communication grows.",
      },
      {
        t: "Parent coaching is most of the value",
        d: "At this age the people in the house are the intervention. A big share of the plan is teaching you to run these moments across the whole week, not just during sessions.",
      },
      {
        t: "Hours sized to a small human",
        d: "A toddler's stamina, naps, and tolerance set the schedule. A good early plan is honest about that instead of maximizing billable hours.",
      },
    ],
    strengths: [
      "Skills are being built while routines are still forming, before harder patterns settle in",
      "Play-based teaching is easier on a young child and easier for parents to copy",
      "Communication gains tend to make everything else in the day easier",
      "Your whole family learns the approach early, so it's just how your house works",
    ],
    tradeoffs: [
      "Evaluation waits are real, and insurance-funded ABA usually requires a diagnosis first",
      "Little kids have little stamina — the intensity some programs describe isn't realistic for every toddler",
      "It asks a lot of parents at the most exhausting stage of parenting",
      "Progress at this age is rarely a straight line, and any provider promising a specific outcome on a specific timeline is guessing",
    ],
    coverage:
      "Two systems serve young children and it's worth knowing both. Every state runs an early intervention program for children under three under Part C of federal special-education law — usually free or income-based, and it generally does not require an autism diagnosis. Insurance-funded ABA is separate: it's a medical service that usually does require a diagnosis, and it continues past a child's third birthday when Part C ends. Many families use Part C while they wait for a diagnostic evaluation, then move into ABA.",
    faqs: [
      {
        q: "Is my child too young for ABA?",
        a: "Programs commonly serve toddlers and preschoolers, and starting early is generally supported by the research. The practical gate is usually the diagnosis and the authorization, not the birthday.",
      },
      {
        q: "We don't have a diagnosis yet. Can we do anything now?",
        a: "Yes. Your state's Part C early intervention program generally doesn't require a diagnosis, and you can refer your own child — you don't need a doctor to do it for you. Start there while the evaluation is pending, and start the evaluation today, because the wait is the long part.",
      },
      {
        q: "What's the difference between Part C early intervention and ABA?",
        a: "Part C is an education-side program run by your state for children under three, and it ends at three. ABA is a medical service funded by Medicaid or your health plan, requires a diagnosis and prior authorization in most cases, and doesn't have an age cliff. They can run at the same time.",
      },
      {
        q: "How many hours should a toddler do?",
        a: "That's a clinical decision written by a BCBA and authorized by your plan, based on your child's needs and stamina — not a number a website should give you. What we can tell you is that the honest answer changes as your child changes.",
      },
    ],
  },
];

export function getService(slug: string): ServiceRecord | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceLinks(): { slug: string; name: string; navLabel: string }[] {
  return services.map(({ slug, name, navLabel }) => ({ slug, name, navLabel }));
}
