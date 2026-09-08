import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import Quiz from "@/components/Quiz";
import Accordion, { type AccordionItem } from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Cómo Empezar la Terapia ABA",
  description:
    "Revise su cobertura en un minuto. Cuatro preguntas, y una persona real le llama en español con lo que cubre su plan de Medicaid o su seguro.",
  alternates: {
    canonical: "/es/como-empezar/",
    languages: { en: "/getting-started/", es: "/es/como-empezar/" },
  },
};

const faq: AccordionItem[] = [
  {
    title: "¿Cuánto cuesta la primera llamada?",
    body: (
      <p>
        Nada. La llamada, la revisión de beneficios y el papeleo de la
        autorización previa no le cuestan nada. Si al final no somos lo que su
        familia necesita, se lo decimos y le indicamos a dónde ir.
      </p>
    ),
  },
  {
    title: "¿Necesito un diagnóstico antes de llamar?",
    body: (
      <p>
        No para hablar con nosotros. Para que el seguro pague la terapia ABA
        casi siempre sí se necesita un diagnóstico, pero muchas familias nos
        llaman antes de tenerlo y les explicamos cómo conseguir la evaluación
        — incluyendo las dos puertas gratuitas que usted puede abrir hoy mismo
        sin permiso de nadie.
      </p>
    ),
  },
  {
    title: "¿Atienden en español?",
    body: (
      <p>
        Sí. Puede hacer todo el proceso en español, desde la primera llamada
        hasta las sesiones y la capacitación para padres. Dígalo al llamar y
        listo.
      </p>
    ),
  },
  {
    title: "¿Y si no tengo papeles o mi seguro es limitado?",
    body: (
      <p>
        Llame de todos modos. Los programas de Medicaid para niños, CHIP y las
        reglas estatales varían mucho, y muchas familias califican para más de
        lo que creen. Le decimos la verdad sobre su situación aunque la
        respuesta no nos convenga a nosotros.
      </p>
    ),
  },
  {
    title: "¿Qué información necesito tener a la mano?",
    body: (
      <p>
        Su tarjeta del seguro o de Medicaid, la edad de su hijo, y si ya tiene
        un diagnóstico o una evaluación pendiente. Nada más. Si no tiene la
        tarjeta cerca, igual podemos empezar.
      </p>
    ),
  },
];

export default function EsComoEmpezarPage() {
  const states = getStateLinks();

  return (
    <div lang="es">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${siteConfig.brand.domain}/es/como-empezar/#faq`,
          inLanguage: "es",
          mainEntity: [
            {
              q: "¿Cuánto cuesta la primera llamada?",
              a: "Nada. La llamada, la revisión de beneficios y el papeleo de la autorización previa no tienen costo.",
            },
            {
              q: "¿Necesito un diagnóstico antes de llamar?",
              a: "No para hablar con nosotros. Para que el seguro pague la terapia ABA casi siempre se necesita un diagnóstico, y le explicamos cómo conseguir la evaluación.",
            },
            {
              q: "¿Atienden en español?",
              a: "Sí. Puede hacer todo el proceso en español, desde la primera llamada hasta las sesiones y la capacitación para padres.",
            },
          ].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-12">
          <nav
            aria-label="Ruta de navegación"
            className="text-sm font-semibold text-spruce-soft"
          >
            <Link
              href="/es/"
              className="underline underline-offset-4 hover:text-garden"
            >
              Inicio
            </Link>{" "}
            / Cómo empezar
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            Empecemos por lo primero: ¿qué cubre su plan?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Cuatro preguntas, más o menos un minuto. Después una persona real
            revisa su plan y le llama en español con la respuesta — sin
            compromiso y sin costo.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CallCta className="btn btn-primary" fallbackLabel="Hable con una persona" href="/es/como-empezar/" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12" id="quiz">
        <Quiz states={states} lang="es" />
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-14"
        aria-labelledby="es-espera-heading"
      >
        <div className="field-card bg-butter p-6 sm:p-10">
          <h2 id="es-espera-heading" className="display display-h2">
            Qué pasa después
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Le llamamos",
                d: "Una persona, en español, lo antes posible. No es un centro de llamadas leyendo un guion.",
              },
              {
                n: "2",
                t: "Revisamos su plan",
                d: "Verificamos sus beneficios y le decimos en palabras claras qué cubre, qué necesita autorización y cuánto suele tardar.",
              },
              {
                n: "3",
                t: "Usted decide",
                d: "Con la información completa. Si le conviene otra opción, se lo decimos — preferimos eso a apuntarlo en una lista y desaparecer.",
              },
            ].map((p) => (
              <li key={p.n} className="rounded-3xl bg-white/80 p-6">
                <p className="display text-3xl text-garden">{p.n}</p>
                <h3 className="display display-h3 mt-1">{p.t}</h3>
                <p className="mt-2 text-spruce-soft">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-14"
        aria-labelledby="es-faq-heading"
      >
        <h2 id="es-faq-heading" className="display display-h2">
          Preguntas frecuentes
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              ¿Prefiere hablar ahora mismo?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Llame y pregunte por atención en español. Contestamos preguntas
              aunque nunca se haga cliente nuestro.
            </p>
          </div>
          <CallCta className="btn btn-marigold shrink-0" fallbackLabel="Hable con una persona" href="/es/como-empezar/" />
        </div>
      </section>
    </div>
  );
}
