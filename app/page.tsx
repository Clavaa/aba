import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import ImageTextSection from "@/components/ImageTextSection";
import CtaImageBackground from "@/components/CtaImageBackground";
import ServiceRail from "@/components/ServiceRail";
import TestimonialRail from "@/components/TestimonialRail";
import ImageTextAccordion from "@/components/ImageTextAccordion";
import FindYourCenter from "@/components/FindYourCenter";
import WhatsHappening from "@/components/WhatsHappening";
import StickyAccordion from "@/components/StickyAccordion";
import InsuranceMarquee from "@/components/InsuranceMarquee";
import StateSelect from "@/components/StateSelect";
import TriageTrio from "@/components/TriageTrio";
import ImageSlot from "@/components/ImageSlot";
import ModalityChips from "@/components/ModalityChips";
import FeatureStrip from "@/components/FeatureStrip";
import Sprout from "@/components/Sprout";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", es: "/es/" } },
};

/* ------------------------------------------------------------------ */
/* Copy: pain/relief accordion — 5th–7th grade reading level           */
/* ------------------------------------------------------------------ */

const painRelief: AccordionItem[] = [
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Calling clinics that never call back",
    body: (
      <p>
        You&rsquo;re on three waitlists. You leave voicemails at nap time. You
        refresh your email at midnight hoping someone, anyone, has an opening.
        Months go by and your child is still waiting.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          You call once. A real person answers, checks your coverage, and tells
          you the honest timeline for your state —{" "}
          {siteConfig.intake.startTimeframe.toLowerCase()}.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Translating your own child to the world",
    body: (
      <p>
        You know what every sound, point, and hand-flap means. Teachers
        don&rsquo;t. Grandparents don&rsquo;t. You spend all day being the only
        interpreter your child has — and it&rsquo;s exhausting.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          Communication is where we start. Your child&rsquo;s plan is built
          around how they connect today — words, pictures, gestures, a device —
          and grows from there, at their pace.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Planning your whole life around meltdowns",
    body: (
      <p>
        You skip the grocery store at busy hours. You carry the exact right
        snack. You brace yourself every time plans change, because you know
        what a hard moment in public costs both of you.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          Behavior is communication. We figure out what the hard moments are
          saying, then teach easier ways to say it — so outings stop feeling
          like a gamble.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Fighting the insurance maze alone",
    body: (
      <p>
        Prior authorizations. Diagnostic paperwork. Letters that say
        &ldquo;denied&rdquo; without saying why. You didn&rsquo;t sign up to be
        a benefits specialist, but here you are, on hold again.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          We do the insurance legwork for you — Medicaid or private plan, in
          every state. We handle the paperwork and the follow-up calls, and we
          tell you what&rsquo;s covered in plain English.
        </p>
      ),
    },
  },
  {
    kicker: "WHAT YOU'RE DOING",
    title: "Running on empty and calling it normal",
    body: (
      <p>
        You&rsquo;re the therapist, the advocate, the researcher, and the
        parent — on four hours of sleep. Everyone says &ldquo;take care of
        yourself&rdquo; and nobody says how.
      </p>
    ),
    relief: {
      kicker: "HOW WE HELP",
      body: (
        <p>
          Backup means you&rsquo;re not the only one anymore. Sessions can
          happen in your home, and parent coaching is part of every plan — so
          the wins keep coming when we&rsquo;re not in the room.
        </p>
      ),
    },
  },
];

const steps: AccordionItem[] = [
  {
    kicker: "STEP 1",
    title: "Talk to a real person",
    body: (
      <p>
        One {siteConfig.intake.callLength} call. Tell us about your child and
        your insurance. No script, no pressure — if we&rsquo;re not the right
        fit, we&rsquo;ll say so and point you somewhere good.
      </p>
    ),
  },
  {
    kicker: "STEP 2",
    title: "We check your coverage for you",
    body: (
      <p>
        We verify your Medicaid or insurance benefits and handle the prior
        authorization paperwork. You get a plain-English answer about
        what&rsquo;s covered — with Medicaid, most families pay nothing out of
        pocket.
      </p>
    ),
  },
  {
    kicker: "STEP 3",
    title: "Meet your BCBA",
    body: (
      <p>
        A Board Certified Behavior Analyst gets to know your child — what they
        love, what&rsquo;s hard, what you want life to look like — and builds a
        plan around your family, not a template.
      </p>
    ),
  },
  {
    kicker: "STEP 4",
    title: "Start therapy — and see the plan work",
    body: (
      <p>
        Sessions start at home, at school, in daycare, or by telehealth.{" "}
        {siteConfig.intake.startTimeframe}. You see goals, progress, and data
        the whole way — no black box.
      </p>
    ),
  },
];

export default function HomePage() {
  const states = getStateLinks();

  return (
    <>
      {/* 2 · hero-home — inset teal field card */}
      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 pb-0 pt-16 text-center sm:px-10 sm:pt-20">
          <p className="eyebrow">ABA therapy and backup for your whole family</p>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-5xl">
            Let&rsquo;s get your family some backup.
          </h1>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg text-ink-muted">
            ABA therapy for kids with autism — at home, at school, in daycare,
            or online. Covered by Medicaid and most insurance plans in all 50
            states and DC. With Medicaid, most families pay nothing out of
            pocket.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/getting-started/" className="btn btn-primary">
              {siteConfig.cta.primary}
            </Link>
            <Link href="/resources/what-is-aba/" className="btn btn-outline">
              What is ABA
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <ModalityChips className="flex flex-wrap justify-center gap-2" />
          </div>

          <div className="mx-auto mt-9 max-w-2xl rounded-[30px] bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="Accepted plans in"
              cta="See my state"
              id="hero-state-select"
            />
          </div>

          {/* Mascot anchor, bleeding off the bottom of the field card */}
          <div className="relative mx-auto mt-12 max-w-3xl">
            <ImageSlot
              intent="Golden-hour photo: parent and child laughing together on the porch of a real home"
              src="/photos/porch-golden-hour.jpg"
              alt="A mother and her young son sitting together on a sunlit porch at golden hour, both laughing"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="aspect-[16/6] rounded-t-[40px]"
            />
            <Sprout className="absolute -top-8 right-6 h-20 w-20 rotate-[8deg] text-coral" />
          </div>
        </div>
      </section>

      {/* 3 · insurance-logos-section */}
      <InsuranceMarquee states={states} />

      {/* Reassurance strip */}
      <FeatureStrip
        features={[
          { icon: "map", text: "All 50 states and DC" },
          { icon: "shield", text: "Medicaid and most insurance plans" },
          { icon: "ages", text: "Toddlers through teens" },
        ]}
      />

      {/* 4 · image-text-section */}
      <ImageTextSection
        eyebrow="Why am I doing this all alone?"
        heading="You're showing up for your child. Who's showing up for you?"
        body={
          <>
            <p>
              <strong className="text-ink">
                Dealing with an autism diagnosis is hard.
              </strong>{" "}
              Not hard like &ldquo;my kid won&rsquo;t eat vegetables.&rdquo;
              Hard like the 4pm meltdown every single day, the sibling who has
              learned to stay quiet, the teeth that haven&rsquo;t been brushed
              properly in months.
            </p>
            <p className="mt-4">
              You have been the therapist, the advocate, the researcher and the
              parent, all at once, for a long time. That is the part nobody
              builds a plan around. We do.
            </p>
          </>
        }
        cta={{ href: "/getting-started/", label: "Get help today" }}
        photoIntent="Golden hour: parent leaning in to kiss their child on the temple, both mid-laugh, outdoors"
      />

      {/* 5 · cta-image-background-section */}
      <CtaImageBackground
        eyebrow="You are not the only one anymore"
        heading="Hi, we're here to help your child. Your family. You."
        body="Your child needs ABA therapy, but what do you need? We build the plan around the whole household — because when the people around a child are steadier, the child is steadier too."
        primary={{ href: "/getting-started/", label: "Start the 15-minute intake" }}
      />

      {/* 6 · services-horizontal-scroll */}
      <ServiceRail
        eyebrow="All the ways we help you"
        cards={[
          {
            href: "/services/in-home/",
            title: "In-home ABA",
            body: "Bedtime, meals, the shoes, the doorway meltdown — taught in the rooms where they actually happen.",
            photoIntent: "RBT and child playing on a living-room rug, parent nearby, real clutter",
            photo: "/photos/in-home-session.jpg",
            photoAlt: "A behavior technician and a young boy sorting shape blocks on a living-room rug while his father watches from the sofa",
          },
          {
            href: "/services/daycare/",
            title: "ABA in daycare",
            body: "Therapy that fits inside the day your child already has.",
            photoIntent: "Daycare classroom mid-morning, clinician kneeling beside a toddler at a low table",
            photo: "/photos/daycare-peers.jpg",
            photoAlt: "A clinician at a low table with two young children, all three sorting coloured counting bears onto matching cards",
          },
          {
            href: "/services/school/",
            title: "School-based support",
            body: "One plan the whole building runs, plus classroom data you can take to an IEP meeting.",
            photoIntent: "Clinician crouched beside a student at a classroom desk, teacher in background",
            photo: "/photos/school-desk.jpg",
            photoAlt: "A clinician crouched at eye level beside a boy at his classroom desk, both smiling",
          },
          {
            href: "/services/telehealth/",
            title: "Telehealth & parent coaching",
            body: "A BCBA in your kitchen at 5:45pm, coaching the routine while it's happening.",
            photoIntent: "Parent with a propped phone at the kitchen table while a toddler eats",
            photo: "/photos/telehealth-kitchen.jpg",
            photoAlt: "A mother waving at a propped tablet on the kitchen table while her toddler eats breakfast beside her",
          },
          {
            href: "/services/early-intervention/",
            title: "Early intervention",
            body: "Play-based teaching for toddlers, aimed at communication first.",
            photoIntent: "Toddler and parent on the floor with blocks, clinician sitting back on her heels",
          },
          {
            href: "/autism-evaluation/",
            title: "Help getting evaluated",
            body: "Three referral doors, two of them free and open to you today.",
            photoIntent: "Parent on the phone at a kitchen counter, toddler playing behind",
            photo: "/photos/parent-on-phone.jpg",
            photoAlt: "A father on the phone at his kitchen counter with a laptop and notepad open, his toddler eating in a high chair behind him",
          },
        ]}
        primary={{ href: "/getting-started/", label: "Get in touch" }}
        secondary={{ href: "/services/", label: "View all services" }}
      />

      {/* 7 · stocking-cards → the pain/relief accordion */}
      <section
        className="mx-auto max-w-[1400px] px-4 py-16 sm:py-20"
        aria-labelledby="pain-heading"
      >
        <p className="eyebrow text-center">What you&rsquo;re carrying</p>
        <h2
          id="pain-heading"
          className="display-round display-round-xl mx-auto mt-5 max-w-4xl text-center text-coral"
        >
          What you&rsquo;re doing, and how we help.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-ink-muted">
          You&rsquo;ve been carrying this by yourself. Here&rsquo;s what changes
          when you don&rsquo;t have to.
        </p>
        <div className="mx-auto mt-12 max-w-4xl">
          <Accordion items={painRelief} />
        </div>
      </section>

      {/* 8 · testimonials-horizontal-scroll */}
      <TestimonialRail />

      {/* 9 · image-text-accordion */}
      <ImageTextAccordion
        eyebrow="ABA therapy"
        heading="Our core service."
        points={[
          {
            title: "It starts with what a behavior is for",
            body: (
              <p>
                A child throws the plate and dinner ends. That&rsquo;s not
                defiance — it&rsquo;s the only reliable way they&rsquo;ve found
                to say &ldquo;I&rsquo;m done.&rdquo; Finding that reason is most
                of the job; the plan writes itself afterwards.
              </p>
            ),
            photoIntent: "Clinician and child at a low table mid-play, natural window light",
            photo: "/photos/in-home-session.jpg",
            photoAlt: "A behavior technician and a young boy sorting shape blocks together on a living-room rug",
          },
          {
            title: "Communication comes before almost everything",
            body: (
              <p>
                Words, signs, pictures, a device — whatever gets your child
                heard fastest. Behaviour usually softens as communication grows,
                which is why it&rsquo;s the first target and not the last.
              </p>
            ),
            photoIntent: "Toddler pointing at a picture card while a parent responds, warm light",
          },
          {
            title: "A BCBA owns the plan, and you can see it",
            body: (
              <p>
                A Board Certified Behavior Analyst assesses, sets goals with
                you, trains the technicians, reads the data and changes what
                isn&rsquo;t working. You see the goals and the progress — no
                black box.
              </p>
            ),
            photoIntent: "BCBA reviewing a printed progress graph with a parent at a kitchen table",
          },
          {
            title: "Parent coaching is part of it, not an upsell",
            body: (
              <p>
                Your child spends far more hours with you than with any
                therapist. The skills that stick are the ones that keep getting
                practised after everyone leaves.
              </p>
            ),
            photoIntent: "Clinician showing a parent a strategy in a doorway, child playing beyond",
            photo: "/photos/blocks-close.jpg",
            photoAlt: "A behavior technician and a young boy building a block tower together on a living-room rug, both mid-laugh",
          },
        ]}
        cta={{ href: "/services/", label: "Learn all about ABA" }}
      />

      {/* 10 · find-your-center */}
      <FindYourCenter
        states={states}
        slides={[
          {
            intent: "Sunlit living room set up for a session: low table, two small chairs, toys on the rug",
            photo: "/photos/living-room-setup.jpg",
            alt: "A sunlit living room set up for a session, with a low wooden table and two child-sized chairs on a rug beside a sofa",
            caption: "Set up for a session at home",
          },
          {
            intent: "Sunlit living room set up for an in-home session, toys on a rug",
            photo: "/photos/in-home-session.jpg",
            alt: "A behavior technician and a young boy playing with shape blocks on a living-room rug, a parent nearby",
            caption: "A family's living room",
          },
          {
            intent: "Quiet classroom corner with a small table and two chairs",
            photo: "/photos/quiet-corner.jpg",
            alt: "A quiet corner of a bright room with two navy armchairs, a small round table and a shelf of picture books",
            caption: "A quiet corner to work in",
          },
        ]}
        bullets={[
          "Every state Medicaid program covers ABA for eligible children — we explain exactly how yours works",
          "In-home, school, daycare and telehealth, with the honest trade-offs of each",
          "County and city pages for the local picture, not a swap-the-name template",
          "One conversation tells you what's actually open near your address right now",
        ]}
      />

      {/* 11 · three-columns-card-section */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:py-24">
        <TriageTrio />
      </section>

      {/* 12 · whats-happening-carousel */}
      <WhatsHappening
        eyebrow="What's new"
        heading="Guides worth your time."
        cards={[
          {
            href: "/resources/what-is-aba/",
            kicker: "Guide",
            title: "What is ABA therapy?",
            body: "The core idea in one example — and the criticism of ABA, answered without defensiveness.",
            photoIntent: "Parent and child reading together on a sunlit couch",
          },
          {
            href: "/resources/autism-levels/",
            kicker: "Guide",
            title: "Autism levels 1, 2 and 3",
            body: "Why there are really two levels, not one, and the four things the number doesn't tell you.",
            photoIntent: "Close-up of a parent's hands holding an evaluation report",
          },
          {
            href: "/resources/signs-of-autism-by-age/",
            kicker: "Guide",
            title: "Signs of autism by age",
            body: "12 months to the teen years — plus the children this kind of list usually misses.",
            photoIntent: "Toddler pointing at something off-frame while a parent watches",
          },
          {
            href: "/careers/pay/",
            kicker: "Careers",
            title: "How ABA pay actually works",
            body: "Why two jobs at the same hourly rate pay thousands apart over a year.",
            photoIntent: "RBT walking to a car with a session bag, early morning light",
          },
        ]}
        cta={{ href: "/resources/", label: "All parent guides" }}
      />

      {/* 13 · sticky-accordion-section */}
      <StickyAccordion
        eyebrow="From first conversation to first session"
        heading="Four steps. We carry all four."
        items={steps.map((s) => ({
          q: s.title,
          a: s.body,
        }))}
        cta={{ href: "/getting-started/", label: siteConfig.cta.startIntake }}
      />
    </>
  );
}
