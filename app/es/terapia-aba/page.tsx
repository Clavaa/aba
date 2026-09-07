import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import JsonLd from "@/components/JsonLd";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import PhoneIcon from "@/components/PhoneIcon";

export const metadata: Metadata = {
  title: "¿Qué Es la Terapia ABA? Explicado para Padres",
  description:
    "Qué es el análisis aplicado de la conducta, cómo se ve una sesión de verdad, qué dice la evidencia, y las críticas que se le hacen — respondidas con honestidad.",
  alternates: {
    canonical: "/es/terapia-aba/",
    languages: { en: "/resources/what-is-aba/", es: "/es/terapia-aba/" },
  },
};

const faq: AccordionItem[] = [
  {
    title: "¿La terapia ABA es lo mismo que disciplina?",
    body: (
      <p>
        No. La disciplina responde al mal comportamiento con consecuencias. La
        terapia ABA busca entender qué logra su hijo con esa conducta y le
        enseña una manera mejor de lograr lo mismo. Si un niño grita porque
        gritar es la única forma segura de terminar una tarea que no puede
        hacer, la respuesta es enseñarle a pedir un descanso — no castigar el
        grito.
      </p>
    ),
  },
  {
    title: "¿Cuánto tiempo dura la terapia?",
    body: (
      <p>
        Varía muchísimo: meses para un programa enfocado en pocas habilidades,
        años para un programa completo en la primera infancia. Un buen programa
        siempre trabaja para necesitarse menos a sí mismo. Pregunte a cualquier
        proveedor cuáles son sus criterios para dar de alta; si no tiene una
        respuesta, eso le dice algo.
      </p>
    ),
  },
  {
    title: "¿La terapia ABA busca que mi hijo deje de parecer autista?",
    body: (
      <p>
        No debería, y un buen programa no lo hace. Las metas deben ser sobre
        capacidad, seguridad y ser entendido — comunicarse, manejar un momento
        difícil, estar seguro cerca de la calle. Las metas que solo buscan
        suprimir conductas autistas inofensivas, como aletear las manos porque
        se ve raro, no se justifican. Usted puede preguntar por qué está cada
        meta en el plan, y puede decir que no.
      </p>
    ),
  },
  {
    title: "¿Cura el autismo?",
    body: (
      <p>
        No, y cualquier proveedor que use esa palabra debería preocuparle. El
        autismo no es una enfermedad que se cura. Lo que la terapia puede hacer
        es enseñar habilidades — comunicación, rutinas diarias, formas más
        fáciles de pasar los momentos duros — y eso se mide en progreso, no en
        curas.
      </p>
    ),
  },
];

export default function EsTerapiaAbaPage() {
  return (
    <div lang="es">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${siteConfig.brand.domain}/es/terapia-aba/#faq`,
          inLanguage: "es",
          mainEntity: [
            {
              q: "¿Qué es la terapia ABA?",
              a: "El análisis aplicado de la conducta parte de la idea de que los niños hacen las cosas por una razón. Un analista de conducta identifica qué logra su hijo con una conducta, le enseña habilidades que logran lo mismo de forma más efectiva, y mide si está funcionando.",
            },
            {
              q: "¿La terapia ABA es lo mismo que disciplina?",
              a: "No. La disciplina responde al mal comportamiento con consecuencias. La terapia ABA identifica la función de la conducta y enseña una habilidad de reemplazo más efectiva.",
            },
            {
              q: "¿La terapia ABA cura el autismo?",
              a: "No. El autismo no se cura. La terapia enseña habilidades y se mide en progreso; cualquier proveedor que hable de una cura no está siendo honesto.",
            },
          ].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
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
            / Qué es ABA
          </nav>
          <h1 className="display display-hero mt-3 max-w-4xl">
            La conducta es un mensaje. ABA es aprender a leerlo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-spruce-soft">
            El análisis aplicado de la conducta parte de una idea: los niños
            hacen las cosas por una razón, y si uno entiende la razón, puede
            enseñar una mejor manera de conseguir lo mismo. Todo lo demás — los
            datos, los planes, los términos técnicos — es maquinaria construida
            encima de eso.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-3xl px-4 py-12 sm:py-16"
        aria-labelledby="es-idea-heading"
      >
        <h2 id="es-idea-heading" className="display display-h2">
          La idea central, en un ejemplo
        </h2>
        <div className="mt-5 space-y-4 text-lg text-spruce-soft">
          <p>
            Un niño de cuatro años tira el plato casi todas las noches. Lo
            instintivo es tratar el tirar el plato como el problema y detenerlo.
            Un analista de conducta hace otra pregunta primero: ¿qué consigue el
            niño al tirar el plato? Si uno observa con cuidado, resulta que cada
            vez que lo tira, la cena se acaba. No está siendo desobediente. Está
            diciendo «ya terminé» de la única manera que siempre le ha
            funcionado.
          </p>
          <p>
            A esa razón se le llama la <em>función</em> de la conducta, y
            encontrarla es la mayor parte del trabajo. Una vez que se sabe, el
            plan se escribe solo: enseñarle una forma de decir «ya terminé» que
            funcione más rápido y de manera más confiable que tirar el plato —
            una palabra, una seña, una tarjeta, un botón — y asegurarse de que
            funcione todas las veces al principio. Tirar el plato normalmente
            desaparece no porque se haya castigado, sino porque se volvió la
            opción más lenta.
          </p>
          <p>
            Multiplique eso y tiene la terapia ABA: identificar qué está
            tratando de lograr su hijo, enseñar habilidades que lo logren mejor,
            acomodar el ambiente para que la nueva habilidad gane, y medir si de
            verdad está funcionando.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4" aria-labelledby="es-sesion-heading">
        <div className="field-card bg-white p-6 shadow-lift ring-2 ring-spruce/10 sm:p-10">
          <h2 id="es-sesion-heading" className="display display-h2">
            Cómo se ve de verdad
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Casi siempre parece juego",
                d: "Los programas modernos enseñan dentro de actividades que al niño ya le gustan. Si un programa se ve como un niño haciendo ejercicios en una mesa todo el día, esa es una forma específica y bastante anticuada de hacer esto — pregunte por qué.",
              },
              {
                t: "Alguien está tomando datos",
                d: "Contando, midiendo tiempos, anotando qué pasó antes y después. Parece trabajo de oficina y es lo que separa a la terapia ABA de una opinión: si algo no funciona, los datos lo dicen en semanas.",
              },
              {
                t: "Un BCBA escribe y ajusta el plan",
                d: "Un analista de conducta certificado evalúa, fija las metas con usted, capacita a los técnicos, lee los datos y cambia lo que no está funcionando.",
              },
              {
                t: "Usted está adentro",
                d: "La capacitación para padres no es un extra. Su hijo pasa muchas más horas con usted que con cualquier terapeuta, y las habilidades que se quedan son las que se siguen practicando cuando todos se van.",
              },
            ].map((c, i) => {
              const tints = ["bg-mint", "bg-butter", "bg-peach", "bg-mint"];
              return (
                <div key={c.t} className={`field-card ${tints[i]} p-6`}>
                  <h3 className="display display-h3">{c.t}</h3>
                  <p className="mt-2 text-spruce-soft">{c.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="es-critica-heading">
        <div className="field-card bg-peach p-6 sm:p-10">
          <h2 id="es-critica-heading" className="display display-h2">
            Las críticas, tomadas en serio
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-spruce-soft">
            Si busca sobre este tema por más de una hora va a encontrar adultos
            autistas que critican la terapia ABA, a veces con dureza. Vale la
            pena leerlos. Esto es lo que dicen, sin ponernos a la defensiva.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">Su historia es real</h3>
              <p className="mt-2 text-spruce-soft">
                Los primeros programas conductuales de los años sesenta y
                setenta usaron castigos que hoy serían indefendibles, y buscaban
                que los niños fueran «indistinguibles» de los demás. Eso pasó, y
                es justo que quienes lo vivieron estén enojados.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">La obediencia es un riesgo real</h3>
              <p className="mt-2 text-spruce-soft">
                Un programa puede enseñarle a un niño a obedecer a los adultos y
                a aguantar la incomodidad en silencio. Eso lo produce un
                programa mal llevado, y llamarlo progreso es exactamente lo que
                advierten las críticas.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6">
              <h3 className="display display-h3">Qué hacemos al respecto</h3>
              <p className="mt-2 text-spruce-soft">
                Metas sobre la vida de su hijo, no sobre las apariencias. El
                «no» de un niño — incluso sin palabras — es información a la que
                el plan tiene que responder. Y un padre que puede cuestionar
                cualquier meta y recibir una respuesta de verdad.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-spruce-soft">
            Lo que no le vamos a decir es que esto aplica a todos los demás y no
            a nosotros. Pregúntenos, igual que a cualquier otro proveedor:{" "}
            <span className="font-semibold text-spruce">
              ¿Por qué está esta meta en el plan? ¿Qué pasa cuando mi hijo se
              niega? ¿Qué tienen que mostrar los datos para que ustedes paren
              algo?
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14" aria-labelledby="es-aba-faq">
        <h2 id="es-aba-faq" className="display display-h2">
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
              ¿Quiere hablarlo con alguien?
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              En español, sin costo y sin compromiso. Le explicamos cómo
              funciona donde usted vive.
            </p>
          </div>
          <a href={siteConfig.contact.phoneHref} className="btn btn-marigold shrink-0">
            <PhoneIcon />
            {siteConfig.contact.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
