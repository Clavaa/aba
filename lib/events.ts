/**
 * Sensory-friendly events.
 *
 * Ships EMPTY, and the events page renders an honest empty state rather than
 * a placeholder date. Event structured data is emitted only for entries here.
 *
 * TODO(events): add real events only — a confirmed venue, a confirmed date,
 * and someone from our team actually running it. Delete each one once it has
 * happened; a stale Event listing sends families somewhere on the wrong day.
 */

export type SiteEvent = {
  slug: string;
  name: string;
  description: string;
  /** Human-readable, e.g. "Saturday 12 October, 10am" */
  dateLabel: string;
  /** ISO 8601 with offset, required by Event schema */
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  stateCode: string;
  photoIntent: string;
};

export const events: SiteEvent[] = [];
