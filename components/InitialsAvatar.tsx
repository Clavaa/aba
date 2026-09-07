import { leaderInitials, type AvatarTint } from "@/data/leadership";

/**
 * Initials avatar — the ONLY person representation on this site.
 * No photos of people ship anywhere (Style Bible + privacy stance), so
 * leaders render as a rounded field-tint circle with their initials in the
 * display face. Decorative: the name is always printed beside it.
 */
export default function InitialsAvatar({
  name,
  tint = "bg-mint",
  size = "md",
}: {
  /** Full display name; initials derive from it ("Sarah Klein, BCBA" → SK) */
  name: string;
  tint?: AvatarTint;
  size?: "md" | "lg";
}) {
  const sizes = {
    md: "h-16 w-16 text-xl",
    lg: "h-20 w-20 text-2xl",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`display grid shrink-0 select-none place-items-center rounded-full border-2 border-spruce/15 text-spruce ${tint} ${sizes[size]}`}
    >
      {leaderInitials(name)}
    </span>
  );
}
