import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { events } from "@/lib/events";
import JsonLd from "@/components/JsonLd";
import ImageSlot from "@/components/ImageSlot";
import FeatureStrip from "@/components/FeatureStrip";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * Sensory-friendly events.
 *
 * Event structured data is emitted ONLY for real entries in lib/events.ts,
 * which ships empty. An invented event is worse than no events page: a family
 * with an autistic child who drives to something that isn't happening has been
 * genuinely harmed.
 */

export const metadata: Metadata = {
  title: "Sensory-Friendly Events",
  description:
    "Low-sensory, judgement-free community events for autistic children and their families — and what makes an event genuinely sensory-friendly.",
  alternates: { canonical: "/events/" },
};

export default function EventsPage() {
  return (
    <>
      {events.map((e) => (
        <JsonLd
          key={e.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            "@id": `${siteConfig.brand.domain}/events/#${e.slug}`,
            name: e.name,
            description: e.description,
            startDate: e.startDate,
            endDate: e.endDate,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: e.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: e.city,
                addressRegion: e.stateCode,
                addressCountry: "US",
              },
            },
            organizer: { "@id": `${siteConfig.brand.domain}/#organization` },
          }}
        />
      ))}

      <section className="px-3 pt-3">
        <div className="field-card mx-auto max-w-[1400px] bg-teal-80 px-4 py-16 text-center sm:px-10 sm:py-20">
          <p className="eyebrow">Come as you are</p>
          <h1 className="display display-hero display-mega mx-auto mt-6 max-w-4xl">
            Somewhere you don&rsquo;t have to apologise.
          </h1>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg text-ink-muted">
            Lights up, sound down, nobody staring, and everyone in the room
            gets it. Sensory-friendly events exist so a family can go out
            without bracing for the hard part.
          </p>
        </div>
      </section>

      <FeatureStrip
        features={[
          { icon: "ages", text: "Siblings welcome, all ages" },
          { icon: "shield", text: "Free to attend" },
          { icon: "clock", text: "Leave whenever you need to" },
        ]}
      />

      <section className="mx-auto max-w-[1400px] px-4 py-10" aria-labelledby="events-heading">
        <h2 id="events-heading" className="display display-h2">
          {events.length > 0 ? "What's coming up" : "Nothing on the calendar yet"}
        </h2>

        {events.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <li key={e.slug} className="rounded-[30px] bg-white p-6 shadow-lift">
                <ImageSlot
                  intent={e.photoIntent}
                  tint="bg-beige-100"
                  className="aspect-[16/10] rounded-[20px]"
                />
                <p className="eyebrow mt-5 text-coral">{e.dateLabel}</p>
                <h3 className="display-round display-round-md mt-2">{e.name}</h3>
                <p className="mt-2 font-semibold text-ink-muted">
                  {e.venue} · {e.city}, {e.stateCode}
                </p>
                <p className="mt-3 text-ink-muted">{e.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[30px] bg-peach-100 p-8">
              {/* TODO(events): add real, dated events to lib/events.ts. Event
                  schema is emitted only for entries that exist — never invent
                  one. A family driving to an event that isn't happening is a
                  real harm, not a marketing miss. */}
              <p className="text-lg text-ink-muted">
                We haven&rsquo;t scheduled our next one yet, and we&rsquo;re not
                going to list a placeholder date to look busy. When something
                is booked it appears here with a real venue and a real time.
              </p>
              <p className="mt-4 text-lg text-ink-muted">
                Want to hear when it is? Join the list at the bottom of this
                page, or call and ask what&rsquo;s happening near you — plenty
                of good sensory-friendly events are run by other people, and
                we&rsquo;ll happily point you at those instead.
              </p>
              <a href={siteConfig.contact.phoneHref} className="btn btn-primary mt-7">
                <PhoneIcon />
                Ask what&rsquo;s near me
              </a>
            </div>

            <div className="rounded-[30px] bg-beige-80 p-8">
              <h3 className="display-round display-round-md">
                What makes an event sensory-friendly
              </h3>
              <ul className="mt-4 space-y-3 text-ink-muted">
                <li>· Lights left up and sound turned down</li>
                <li>· Freedom to move, stim, or make noise without comment</li>
                <li>· A quiet room to retreat to, signposted at the door</li>
                <li>· No queue that has to be stood in</li>
                <li>· Staff who have been told what to expect</li>
                <li>· Permission to leave ten minutes in</li>
              </ul>
              <p className="mt-5 text-sm text-ink-muted">
                Worth asking any organiser about before you commit a Saturday.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-24">
        <Link href="/resources/" className="btn btn-outline">
          Parent guides
        </Link>
      </section>
    </>
  );
}
