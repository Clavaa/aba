import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import CallCta from "@/components/CallCta";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import StateSelect from "@/components/StateSelect";

export const metadata: Metadata = {
  title: "Seguro y Medicaid para la Terapia ABA",
  description:
    "Cómo se paga la terapia ABA: Medicaid y CHIP, seguros privados, autorización previa, y qué hacer cuando le niegan el servicio.",
  alternates: {
    canonical: "/es/seguro-y-medicaid/",
    languages: { en: "/insurance/", es: "/es/seguro-y-medicaid/" },
  },
};

const faq: AccordionItem[] = [
  {
    title: "¿Medicaid cubre la terapia ABA?",
    body: (
      <p>
        Sí. Todos los programas estatales de Medicaid cubren la terapia ABA
        médicamente necesaria para los niños que califican — eso viene de una
        regla federal para menores de 21 años, no de la buena voluntad de cada
        estado. Lo que cambia de un estado a otro es el camino: qué papeles
        piden, cuántas horas autorizan y cada cuánto hay que renovar.
      </p>
    ),
  },
  {
    title: "¿Qué es la autorización previa?",
    body: (
      <p>
        Es el permiso que el plan da antes de que empiece la terapia. Su
        analista de conducta hace una evaluación, escribe un plan de tratamiento
        con metas específicas y pide un número de horas; el plan lo revisa y lo
        aprueba por un período. Después hay que renovarlo con datos del
        progreso. Nosotros hacemos ese papeleo por usted.
      </p>
    ),
  },
  {
    title: "Me negaron el servicio. ¿Se acabó?",
    body: (
      <p>
        No. Muchas negaciones tienen que ver con documentación incompleta, no
        con su hijo, y se revierten al apelar. Pida siempre la razón de la
        negación por escrito. Usted tiene derecho a apelar, y en muchos casos a
        una revisión externa por alguien que no trabaja para el plan.
      </p>
    ),
  },
  {
    title: "¿Cuánto voy a pagar de mi bolsillo?",
    body: (
      <p>
        Con Medicaid, la mayoría de las familias no paga nada. Con un seguro
        privado depende de su deducible, su coaseguro y su máximo anual de
        gastos — números que están en su plan y que podemos revisar con usted
        en una llamada.
      </p>
    ),
  },
  {
    title: "¿La ley de mi estado obliga a mi plan a cubrir el autismo?",
    body: (
      <p>
        Todos los estados tienen una ley de cobertura de autismo, pero hay una
        trampa importante: si su empleador «autofinancia» el plan, la ley
        estatal normalmente no lo alcanza, aunque la tarjeta diga el nombre de
        una aseguradora conocida. Pregunte en recursos humanos: ¿nuestro plan es
        totalmente asegurado o autofinanciado? La respuesta cambia bajo qué
        reglas puede usted pelear.
      </p>
    ),
  },
];

export default function EsSeguroPage() {
  const states = getStateLinks();

  return (
    <div lang="es">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${siteConfig.brand.domain}/es/seguro-y-medicaid/#faq`,
          inLanguage: "es",
          mainEntity: [
            {
              q: "¿Medicaid cubre la terapia ABA?",
              a: "Sí. Todos los programas estatales de Medicaid cubren la terapia ABA médicamente necesaria para los niños que califican, por una regla federal para menores de 21 años. Lo que cambia por estado es el proceso, las horas autorizadas y la frecuencia de renovación.",
            },
            {
              q: "¿Qué es la autorización previa para la terapia ABA?",
              a: "Es el permiso que el plan da antes de empezar la terapia, basado en una evaluación y un plan de tratamiento con metas específicas. Se renueva periódicamente con datos del progreso.",
            },
            {
              q: "¿Qué hago si me niegan la terapia ABA?",
              a: "Pida la razón por escrito y apele. Muchas negaciones se deben a documentación incompleta y se revierten; en muchos casos existe además el derecho a una revisión externa independiente.",
            },
          ].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-butter p-6 sm:p-10 lg:p-14">
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
            / Seguro y Medicaid
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            Sí, lo más probable es que esté cubierto.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            Todos los estados cubren la terapia ABA por Medicaid para los niños
            que califican, y todos tienen una ley de autismo para los seguros
            privados. Las reglas se ven distintas en cada estado — nosotros las
            conocemos y hacemos las llamadas por usted.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/es/como-empezar/" className="btn btn-primary">
              Revisar mi cobertura
            </Link>
            <CallCta className="btn btn-outline" fallbackLabel="Hable con una persona" href="/es/como-empezar/" />
          </div>
        </div>
      </section>

      {/* ───────── LAS DOS VÍAS ───────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="es-vias-heading"
      >
        <h2 id="es-vias-heading" className="display display-h2">
          Las dos vías para pagar la terapia
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">Medicaid y CHIP</h3>
            <p className="mt-3 text-spruce-soft">
              Para los niños que califican, la terapia ABA médicamente necesaria
              está cubierta en todos los estados. Con Medicaid, la mayoría de
              las familias no paga nada de su bolsillo. El proceso normal es:
              diagnóstico, evaluación del analista de conducta, plan de
              tratamiento, autorización previa, y renovación cada cierto tiempo.
            </p>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">Seguro privado</h3>
            <p className="mt-3 text-spruce-soft">
              Todos los estados tienen una ley que obliga a los planes emitidos
              en el estado a cubrir el tratamiento del autismo. El proceso se
              parece al de Medicaid, pero usted además tiene deducible,
              coaseguro y un máximo anual de gastos. Y ojo con los planes
              autofinanciados por el empleador: esos siguen otras reglas.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── LA TRAMPA DEL PLAN AUTOFINANCIADO ───────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="es-erisa-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <p className="display text-xs tracking-wide text-garden">
            LO QUE CASI NADIE LE EXPLICA
          </p>
          <h2 id="es-erisa-heading" className="display display-h2 mt-1">
            El logo de su tarjeta puede no ser quien decide
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            Si su empleador autofinancia el plan de salud, la aseguradora
            solamente lo administra: el dinero que paga los reclamos es del
            empleador, y el plan se rige por una ley federal en lugar de la ley
            de autismo de su estado. Eso significa que una ley estatal que exige
            cubrir la terapia ABA puede simplemente no aplicarle, aunque su
            vecino tenga la misma tarjeta y sí esté protegido por ella.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            Autofinanciado no quiere decir sin cobertura — muchos planes de
            empleadores cubren la terapia ABA muy bien por decisión propia, y
            las protecciones federales de paridad de salud mental siguen
            aplicando. Quiere decir que las reglas bajo las que usted reclama
            son otras. Haga una sola pregunta en recursos humanos:{" "}
            <span className="font-semibold text-spruce">
              ¿nuestro plan es totalmente asegurado o autofinanciado?
            </span>
          </p>
        </div>
      </section>

      {/* ───────── ESTADO ───────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="es-estado-heading"
      >
        <div className="field-card bg-mint p-6 sm:p-10">
          <h2 id="es-estado-heading" className="display display-h2">
            Cómo funciona en su estado
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Cada estado tiene su propio programa, su propio proceso de
            autorización y sus propias reglas sobre las horas. Las páginas por
            estado están en inglés — pero si prefiere, llámenos y se lo
            explicamos todo en español.
          </p>
          <div className="mt-6 rounded-3xl bg-white/70 p-4 sm:p-5">
            <StateSelect
              states={states}
              label="Ver la página de"
              cta="Ver mi estado"
              id="es-insurance-state"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14" aria-labelledby="es-seg-faq">
        <h2 id="es-seg-faq" className="display display-h2">
          Preguntas frecuentes
        </h2>
        <div className="mt-8">
          <Accordion items={faq} defaultOpen={-1} />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-spruce-soft">
          Esta página explica programas públicos y leyes de seguros en términos
          generales. No es una determinación de beneficios ni asesoría legal —
          lo que cuenta es lo que su plan diga por escrito. Llámenos y revisamos
          su plan exacto.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              ¿Tiene la tarjeta a la mano?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Una llamada y le decimos qué cubre su plan de verdad — incluso
              cuando la respuesta no es la que esperaba.
            </p>
          </div>
          <CallCta className="btn btn-marigold shrink-0" fallbackLabel="Hable con una persona" href="/es/como-empezar/" />
        </div>
      </section>
    </div>
  );
}
