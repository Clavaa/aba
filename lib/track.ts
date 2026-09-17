/**
 * Conversion tracking for the traffic beacon. Client-side only.
 *
 * Every form on the site posts to /api/lead/ and then sets status "done";
 * calling trackLead() at that point is what lets the traffic report say which
 * page and which traffic source produced a lead, instead of leaving you to
 * match inbox timestamps against sessions by hand.
 *
 * No form field is ever sent here — only which form it was and which page it
 * sat on. The lead's own details go to the intake inbox and nowhere else.
 */

export const KEY_INTERNAL = "sw_internal";
export const KEY_SESSION = "sw_session";

export function trackLead(form: string): void {
  try {
    if (typeof window === "undefined") return;
    const body = JSON.stringify({
      k: "lead",
      f: form,
      p: window.location.pathname,
      s: sessionStorage.getItem(KEY_SESSION),
      i: localStorage.getItem(KEY_INTERNAL) === "1",
      r: document.referrer || null,
    });
    const blob = new Blob([body], { type: "application/json" });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/t/", blob);
      return;
    }
    void fetch("/api/t/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    /* A submitted form must never be disturbed by analytics. */
  }
}
