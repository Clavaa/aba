import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import FeatureStrip from "@/components/FeatureStrip";
import ImageSlot from "@/components/ImageSlot";
import CallCta from "@/components/CallCta";

/** Target: "aba therapy examples" — 5,000/mo, no page until now. */

export const metadata: Metadata = {
  title: "ABA Therapy Examples: What It Looks Like",
  description:
    "Real examples of ABA therapy techniques — reinforcement, prompting and fading, chaining, shaping and behaviour plans — each shown in an ordinary family moment.",
  alternates: { canonical: "/resources/aba-therapy-examples/" },
};

const url = `${siteConfig.brand.domain}/resources/aba-therapy-examples/`;

const EXAMPLES = [
  {
    term: "Positive reinforcement",
    moment: "Asking instead of grabbing",
    body: "Your child reaches across the table for the crackers. Before the grab lands, you hold the bowl up and wait. They sign or say \"cracker\" — and the cracker arrives immediately. The speed matters more than the size: a reward that comes two seconds later teaches the thing that happened two seconds later.",
  },
  {
    term: "Prompting and fading",
    moment: "Learning to wash hands",
    body: "Week one, you guide their hands through every step. Week two, you only tap the soap. Week three, you point at the sink. Week four, you say nothing. Fading the help on a plan — rather than whenever you remember — is what separates a taught skill from a child who has learned to wait for an adult.",
  },
  {
    term: "Chaining",
    moment: "Getting dressed",
    body: "Getting dressed is eleven small steps, not one. Backward chaining does the first ten for them and lets them do the last — pulling the shirt down — so the routine always ends in a win. Then you hand back step ten, then nine.",
  },
  {
    term: "Shaping",
    moment: "From sound to word",
    body: "A child who says \"buh\" for ball gets the ball. Once \"buh\" is reliable, only \"ba\" earns it. Then \"ball\". You reward successive approximations rather than holding out for the finished version, which never arrives on its own.",
  },
  {
    term: "Functional communication training",
    moment: "The 4pm meltdown",
    body: "The screaming at homework time reliably ends homework. So it isn't defiance — it's a working sentence. Teach a card, a sign or a word for \"break\" that works faster and more reliably than the scream, and honour it every time at first. The scream fades because it became the slower option.",
  },
  {
    term: "Antecedent strategies",
    moment: "Leaving the playground",
    body: "Most of the work happens before the hard moment, not after it. A two-minute warning, a visual timer, and telling them what comes next changes the transition more than anything you can do once the meltdown has started.",
  },
  {
    term: "Task analysis",
    moment: "Brushing teeth",
    body: "Break the routine into its actual steps, then teach and measure each one. It's how you find out that the sticking point isn't brushing at all — it's the sound of the tap.",
  },
  {
    term: "Generalisation",
    moment: "The skill that only works at the table",
    body: "A child who names colours perfectly in a session and never at the supermarket hasn't finished learning them. Good programs deliberately practise a skill in new rooms, with new people and new objects — otherwise you've taught a trick, not a skill.",
  },
];

const related = [
  {
    href: "/resources/positive-reinforcement/",
    label: "Positive reinforcement",
    note: "The mechanism underneath most of these examples.",
  },
  {
    href: "/resources/discrete-trial-training/",
    label: "Discrete trial training",
    note: "The structured end of the teaching spectrum, in four parts.",
  },
  {
    href: "/resources/what-is-aba/",
    label: "What is ABA therapy?",
    note: "The core idea, the evidence, and the criticism answered plainly.",
  },
  {
    href: "/services/in-home/",
    label: "In-home ABA therapy",
    note: "Where most of these examples actually happen.",
  },
  {
    href: "/resources/autism-therapy-types/",
    label: "Types of autism therapy",
    note: "What else belongs in the week alongside ABA.",
  },
  {
    href: "/getting-started/",
    label: "Check your coverage",
    note: "What's available for your address and plan.",
  },
];

export default function AbaExamplesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${url}#list`,
          name: "Examples of ABA therapy techniques",
          itemListElement: EXAMPLES.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.term,
            description: e.body,
          })),
        }}
      />

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-peach-100 px-4 py-16 text-center sm:px-10 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-muted">
            <Link href="/resources/" className="underline underline-offset-4 hover:text-coral">
              Resources
            </Link>{" "}
            / ABA therapy examples
          </nav>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-4xl">
            ABA therapy examples, in real moments.
          </h1>
          <p className="mx-auto mt-7 max-w-[40rem] text-lg text-ink-muted">
            Eight techniques you&rsquo;ll hear named in a treatment plan, each
            shown in an ordinary bit of family life rather than defined at you.
          </p>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "ages", text: "Eight techniques, eight real moments" },
          { icon: "clock", text: "Most of it looks like playing" },
          { icon: "shield", text: "Written for parents, not clinicians" },
        ]}
      />

      <section className="mx-auto max-w-[1400px] px-4 py-8" aria-labelledby="ex-heading">
        <h2 id="ex-heading" className="sr-only">
          Examples of ABA therapy techniques
        </h2>
        <ol className="grid gap-5 md:grid-cols-2">
          {EXAMPLES.map((e, i) => {
            const tints = ["bg-teal-80", "bg-peach-100", "bg-beige-80"];
            return (
              <li key={e.term} className={`rounded-[30px] ${tints[i % 3]} p-7`}>
                <p className="eyebrow text-coral">{e.moment}</p>
                <h3 className="display-round display-round-md mt-2">{e.term}</h3>
                <p className="mt-3 text-ink-muted">{e.body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-[1400px] px-3 pb-20">
        <div className="field-card grid items-center gap-10 bg-teal-80 px-6 py-14 sm:px-12 lg:grid-cols-2">
          <div>
            <h2 className="display display-h2">Want to see it on your kid?</h2>
            <p className="mt-5 max-w-md text-lg text-ink-muted">
              Every one of these gets written into a plan around your child
              specifically — what they already do, what they want, and which
              moment in your day is hardest.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/getting-started/" className="btn btn-primary">
                {siteConfig.cta.checkCoverage}
              </Link>
              <CallCta className="btn btn-outline" />
            </div>
          </div>
          <ImageSlot
            intent="Clinician and child at a low table mid-play, natural window light"
            src="/photos/in-home-session.jpg"
            alt="A behavior technician and a young boy sorting shape blocks together on a living-room rug"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="field-card aspect-[4/3]"
          />
        </div>
      </section>
      <RelatedLinks links={related} />
    </>
  );
}
