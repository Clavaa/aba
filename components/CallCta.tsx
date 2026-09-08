import Link from "next/link";
import { siteConfig, hasPhone } from "@/site.config";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * The "talk to a person" call to action.
 *
 * Renders a real tel: link when a call-tracked number is configured, and
 * falls back to the contact page when one isn't. Publishing a number that
 * rings nowhere is worse for a parent than offering them a form, so the
 * fallback is the default state until site.config.contact.phone is set.
 */
export default function CallCta({
  className = "btn btn-outline",
  label,
  fallbackLabel,
  icon = true,
  href = "/contact/",
}: {
  className?: string;
  /** Label when a phone number exists; defaults to the number itself */
  label?: string;
  /** Label when it doesn't */
  fallbackLabel?: string;
  icon?: boolean;
  /** Where the fallback points */
  href?: string;
}) {
  if (hasPhone) {
    return (
      <a href={siteConfig.contact.phoneHref!} className={className}>
        {icon && <PhoneIcon />}
        {label ?? siteConfig.contact.phone}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {fallbackLabel ?? siteConfig.cta.talk}
    </Link>
  );
}
