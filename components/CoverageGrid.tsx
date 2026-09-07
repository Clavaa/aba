import Link from "next/link";

/**
 * The full 50-state (+DC) coverage grid — every chip is a real state page.
 */
export default function CoverageGrid({
  states,
  basePath = "/locations",
}: {
  states: { name: string; slug: string }[];
  basePath?: string;
}) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="States we serve">
      {states.map((s) => (
        <li key={s.slug}>
          <Link href={`${basePath}/${s.slug}/`} className="chip">
            {s.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
