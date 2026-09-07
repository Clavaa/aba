/**
 * Renders a JSON-LD structured-data block.
 * All values come from site.config.ts and the state dataset — never inline.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output of our own build-time data; < escaped for safety.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
