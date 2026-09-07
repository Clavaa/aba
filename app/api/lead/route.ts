import { NextResponse } from "next/server";
import { siteConfig } from "@/site.config";

/**
 * Lead intake endpoint.
 *
 * PHI-light by design (Cross-site rule: SendGrid signs no BAA):
 * we relay only contact info + coverage basics — never diagnoses,
 * clinical details, or member IDs.
 *
 * - Honeypot: the hidden "company" field; bots that fill it get a
 *   success response and go nowhere.
 * - No SENDGRID_API_KEY set → graceful no-op with a console warning,
 *   so local/dev builds never crash on missing secrets.
 */

const MAX_FIELD = 200;

/** The only fields we accept — everything else in the payload is dropped. */
const ALLOWED_FIELDS = [
  "state",
  "insuranceType",
  "childAge",
  "parentName",
  "phone",
  "email",
  "source",
] as const;

type LeadField = (typeof ALLOWED_FIELDS)[number];

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, MAX_FIELD);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: humans never see this field. Pretend success for bots.
  if (sanitize(body.company) !== "") {
    return NextResponse.json({ ok: true });
  }

  const lead = {} as Record<LeadField, string>;
  for (const field of ALLOWED_FIELDS) lead[field] = sanitize(body[field]);

  // A lead needs a name and at least one way to reach them back. The intake
  // quiz collects a phone; the footer signup collects an email only — both
  // are reachable, so both are valid.
  if (!lead.parentName || (!lead.phone && !lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Name and either a phone number or an email are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn(
      "[lead] SENDGRID_API_KEY is not set — lead received but NOT emailed:",
      { ...lead, phone: "***", email: "***" }
    );
    // Still succeed: never lose the visitor to a config problem.
    return NextResponse.json({ ok: true });
  }

  const text = [
    `New coverage-check lead (${lead.source || "website"})`,
    "",
    `Parent name:   ${lead.parentName}`,
    `Phone:         ${lead.phone}`,
    `Email:         ${lead.email || "—"}`,
    `State:         ${lead.state || "—"}`,
    `Insurance:     ${lead.insuranceType || "—"}`,
    `Child's age:   ${lead.childAge || "—"}`,
    "",
    "Reminder: respond fast — lead-qualification odds drop sharply after 5 minutes.",
  ].join("\n");

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: siteConfig.contact.leadInbox }] }],
      from: { email: siteConfig.contact.leadFrom, name: siteConfig.brand.name },
      subject: `New lead: ${lead.parentName} (${lead.state || "state unknown"})`,
      content: [{ type: "text/plain", value: text }],
    }),
  });

  if (!res.ok) {
    console.error("[lead] SendGrid error", res.status, await res.text());
    return NextResponse.json(
      { ok: false, error: "Delivery failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
