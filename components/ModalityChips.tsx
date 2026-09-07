import Link from "next/link";
import { services } from "@/lib/services";

/**
 * The modality chip strip (Style Bible: "In Center · At Home · School").
 *
 * Every chip is a link to its service page — this is the internal-linking
 * spine that connects the homepage and all 3,000+ location pages to the
 * service lines. Source of truth is lib/services.ts, so a new service line
 * appears here automatically.
 */
export default function ModalityChips({
  className = "mt-7 flex flex-wrap gap-2",
  chipClass = "chip bg-white/80",
}: {
  className?: string;
  chipClass?: string;
}) {
  return (
    <ul className={className} aria-label="Where therapy happens">
      {services.map((s) => (
        <li key={s.slug}>
          <Link href={`/services/${s.slug}/`} className={chipClass}>
            <span aria-hidden="true" className="text-garden">
              ✓
            </span>
            {s.navLabel}
          </Link>
        </li>
      ))}
    </ul>
  );
}
