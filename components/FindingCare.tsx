import Link from "next/link";

/**
 * "How to find an ABA therapist in {place}" — the practical block that sits on
 * every geography page (city, county, state).
 *
 * It exists because the questions behind a local search are not the ones our
 * overview copy answers. Someone typing a place name next to "ABA therapist",
 * "ABA services", "in-home ABA therapy", "BCBA" or "autism testing" is trying
 * to work out who shows up, who supervises them, and how to tell one provider
 * from another. This answers exactly that, in the words families use, without
 * claiming anything about a specific address.
 *
 * The scope prop only changes how we talk about geography — a state is not a
 * place a clinician drives to, so the framing shifts.
 */

export type CareScope = "city" | "county" | "state";

export default function FindingCare({
  place,
  stateName,
  scope,
}: {
  /** Display name of the place, e.g. "Houston" or "Harris County" */
  place: string;
  stateName: string;
  scope: CareScope;
}) {
  const wide = scope !== "city";

  return (
    <section
      className="mx-auto max-w-[1400px] px-4 py-14 sm:py-20"
      aria-labelledby="finding-care-heading"
    >
      <p className="eyebrow">Choosing a provider</p>
      <h2 id="finding-care-heading" className="display display-h2 mt-4">
        How to find an ABA therapist in {place}
      </h2>
      <p className="mt-6 max-w-3xl text-lg text-ink-muted">
        Searching for an ABA therapist in {place} &mdash; or for autism therapy
        in {place}, or autism services in {place}, which turn up much the same
        list &mdash; gives you two different kinds of result: directories that
        list anyone who paid to be listed, and providers who can tell you what
        is actually open for your address.
        The questions below separate them. They work on us as well as on
        anyone else &mdash; if we can&rsquo;t answer one, that is worth knowing
        before you enroll.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="display display-h3 text-coral">
            In-home ABA therapy in {place}
          </h3>
          <p className="mt-4 text-ink-muted">
            {wide
              ? `Most ABA services in ${place} are delivered where the child already is — at home, in a classroom or daycare room, and over video for parent coaching. That is the model we run.`
              : `In-home ABA therapy in ${place} means a technician comes to your address on a set schedule, and the skills get taught in the rooms where they have to hold up — the kitchen at dinner, the door at leaving time, the bedroom at night. ABA services in ${place} can also run by telehealth, which is how parent coaching usually happens between visits.`}{" "}
            Ask any provider which settings they can actually staff near you,
            not which ones appear on their website. Coverage is a staffing
            question, and the honest answer changes week to week.
          </p>
        </div>

        <div>
          <h3 className="display display-h3 text-coral">
            What a BCBA in {place} actually does
          </h3>
          <p className="mt-4 text-ink-muted">
            A BCBA &mdash; Board Certified Behavior Analyst &mdash; assesses
            your child, writes the treatment plan, sets the goals, and
            supervises the technicians who run the sessions. You should know
            the name of the BCBA in {place} assigned to your case, how often
            they observe sessions in person, and how many cases they carry. You
            can verify any certificant yourself in the{" "}
            <a
              href="https://www.bacb.com/services/o.php?page=101135"
              className="underline underline-offset-4 hover:text-coral"
              target="_blank"
              rel="noopener noreferrer"
            >
              BACB registry
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="display display-h3 text-coral">
            Autism testing in {place}
          </h3>
          <p className="mt-4 text-ink-muted">
            ABA is not the same appointment as a diagnosis. Autism testing in{" "}
            {place} is done by a developmental pediatrician, child psychologist
            or child neurologist, and most health plans want that evaluation on
            file before they will authorize therapy. An autism evaluation in{" "}
            {place} is a separate booking from therapy, with its own waitlist,
            so it is worth starting now rather than after you have chosen a
            provider. If your child is under three, early intervention autism
            services in {place} will evaluate for free, without a diagnosis or
            a referral.
            If you are still at that stage, start with{" "}
            <Link href="/find-a-diagnostician/" className="underline underline-offset-4 hover:text-coral">
              how to find a diagnostician
            </Link>{" "}
            and{" "}
            <Link href="/autism-evaluation/" className="underline underline-offset-4 hover:text-coral">
              what an autism evaluation involves
            </Link>
            . You do not need us to get one.
          </p>
        </div>

        <div>
          <h3 className="display display-h3 text-coral">
            What &ldquo;best ABA therapy in {place}&rdquo; should mean
          </h3>
          <p className="mt-4 text-ink-muted">
            There is no ranking body, so nobody can honestly call themselves
            the best ABA provider in {stateName}. What you can compare is
            specific: how quickly a BCBA does the first assessment, whether
            goals are written for your family&rsquo;s actual routines, how much
            supervision each technician gets, whether you are told about
            turnover before a new face arrives, and whether the provider will
            put a realistic start date in writing. Those are answerable
            questions. &ldquo;Best&rdquo; is not.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-3xl bg-peach px-6 py-8 sm:px-10">
        <h3 className="display display-h3">
          Five questions to ask any ABA provider in {place}
        </h3>
        <ol className="mt-6 grid gap-4 text-ink-muted sm:grid-cols-2">
          <li>
            <span className="font-semibold text-ink">1.</span> Who is the BCBA
            on my case, and how many hours a month will they spend supervising
            my child&rsquo;s sessions?
          </li>
          <li>
            <span className="font-semibold text-ink">2.</span> What is your
            realistic start date for my address &mdash; not your average across{" "}
            {stateName}?
          </li>
          <li>
            <span className="font-semibold text-ink">3.</span> Which settings
            can you staff for us: home, school, daycare, telehealth?
          </li>
          <li>
            <span className="font-semibold text-ink">4.</span> What happens to
            my child&rsquo;s schedule when a technician leaves?
          </li>
          <li>
            <span className="font-semibold text-ink">5.</span> What will I owe
            after insurance, and when will you tell me if that changes?
          </li>
        </ol>
      </div>
    </section>
  );
}
