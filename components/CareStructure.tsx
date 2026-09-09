/**
 * "Our care structure" layer diagram — the delivery hierarchy from regional
 * leadership down to the teams that answer the phone, drawn as a widening
 * stack (each layer supports more people than the one above it). Pure
 * markup: no images, no library, works at every width.
 */

const layers: { role: string; job: string }[] = [
  {
    role: "Regional Directors",
    job: "Own everything in their part of the country, so problems get fixed by someone close by — not a faraway head office.",
  },
  {
    role: "Clinical Directors",
    job: "Senior clinicians who make sure every care team in their area holds the same standard — no matter whose home, school or daycare they're working in.",
  },
  {
    role: "BCBAs",
    job: "Board Certified Behavior Analysts — your child's plan-builder and your main clinical contact from day one.",
  },
  {
    role: "Assistant BCBAs",
    job: "Certified clinicians who help oversee sessions and keep the plan on track between BCBA check-ins.",
  },
  {
    role: "Registered Behavior Technicians (RBTs)",
    job: "The person in the room with your child, session after session, running the plan the BCBA designed.",
  },
  {
    role: "Scheduling, intake & billing teams",
    job: "The people who answer the phone, check your insurance, and keep sessions on the calendar — so the paperwork never lands on you.",
  },
];

const tints = ["bg-mint", "bg-butter", "bg-peach"];

export default function CareStructure() {
  return (
    <ol className="mx-auto max-w-3xl">
      {layers.map((layer, i) => {
        // Each layer widens toward the bottom of the stack (56% → 100%)
        const width = 56 + (44 / (layers.length - 1)) * i;
        return (
          <li key={layer.role} className="flex flex-col items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="h-5 w-0.5 bg-spruce/25 sm:h-6"
              />
            )}
            <div
              className={`w-full rounded-3xl border-2 border-spruce/10 p-5 text-center sm:p-6 ${
                tints[i % tints.length]
              }`}
              style={{ maxWidth: `max(20rem, ${width}%)` }}
            >
              <h3 className="display display-h3">{layer.role}</h3>
              <p className="mt-1.5 text-[0.99rem] leading-snug text-spruce-soft">
                {layer.job}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
