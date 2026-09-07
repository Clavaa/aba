import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getStateLinks } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import StateSelect from "@/components/StateSelect";
import ImageSlot from "@/components/ImageSlot";
import Sprout from "@/components/Sprout";
import PhoneIcon from "@/components/PhoneIcon";

/**
 * Spanish home page. Only 1 of the 10 competitors in the teardown has a
 * Spanish mirror at all, and none of them run the intake funnel in Spanish
 * end to end — the quiz on /es/como-empezar/ does.
 */

export const metadata: Metadata = {
  title: "Terapia ABA para Niños con Autismo | En los 50 Estados",
  description:
    "Terapia ABA para niños con autismo — en casa, en un centro, en la escuela o en línea. Cubierta por Medicaid y la mayoría de los seguros en los 50 estados.",
  alternates: {
    canonical: "/es/",
    languages: { en: "/", es: "/es/" },
  },
};

const pasos = [
  {
    n: "1",
    t: "Hable con una persona real",
    d: "Una llamada de 15 minutos. Nos cuenta sobre su hijo y su seguro. Sin guion y sin presión — si no somos lo que necesita, se lo decimos.",
  },
  {
    n: "2",
    t: "Revisamos su cobertura",
    d: "Verificamos sus beneficios de Medicaid o de su seguro y nos encargamos de la autorización previa. Con Medicaid, la mayoría de las familias no paga nada de su bolsillo.",
  },
  {
    n: "3",
    t: "Conoce a su BCBA",
    d: "Un analista de conducta certificado conoce a su hijo — lo que le gusta, lo que le cuesta, lo que ustedes quieren para su vida — y arma un plan para su familia.",
  },
  {
    n: "4",
    t: "Empieza la terapia",
    d: "Las sesiones empiezan en casa, en un centro, en la escuela o por video. Usted ve las metas, el progreso y los datos en todo momento.",
  },
];

export default function EsHomePage() {
  const states = getStateLinks();

  return (
    <div lang="es">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${siteConfig.brand.domain}/es/#webpage`,
          name: "Terapia ABA para niños con autismo",
          inLanguage: "es",
          isPartOf: { "@id": `${siteConfig.brand.domain}/#organization` },
        }}
      />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="field-card bg-mint p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <h1 className="display display-hero">
                Su familia merece apoyo de verdad.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-spruce-soft">
                Terapia ABA para niños con autismo — en casa, en un centro, en
                la escuela o en línea. Cubierta por Medicaid y por la mayoría
                de los seguros en los 50 estados. Con Medicaid, la mayoría de
                las familias no paga nada de su bolsillo.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/es/como-empezar/" className="btn btn-primary">
                  Revisar mi cobertura
                </Link>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="btn btn-outline"
                >
                  <PhoneIcon />
                  Llame al {siteConfig.contact.phone}
                </a>
              </div>
              <p className="mt-4 font-semibold text-garden">
                Hablamos español. Atendemos su llamada en español.
              </p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Dónde ocurre la terapia">
                {[
                  "En casa",
                  "En un centro",
                  "En la escuela",
                  "Por video",
                  "Intervención temprana",
                ].map((s) => (
                  <li key={s} className="chip bg-white/80">
                    <span aria-hidden="true" className="text-garden">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-3xl bg-white/70 p-4 sm:p-5">
                <StateSelect
                  states={states}
                  label="Cómo funciona la cobertura en"
                  cta="Ver mi estado"
                  id="es-hero-state"
                />
                <p className="mt-2 text-sm text-spruce-soft">
                  Las páginas por estado están en inglés por ahora — llámenos y
                  se lo explicamos todo en español.
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <ImageSlot
                intent="Luz dorada: madre e hijo riéndose juntos en el porche de una casa real"
                tint="bg-butter"
                className="aspect-[4/5]"
              />
              <Sprout className="absolute -bottom-4 -left-4 h-16 w-16 rotate-[-8deg] text-garden" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── QUÉ HACEMOS ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="es-que-heading"
      >
        <h2 id="es-que-heading" className="display display-h2 max-w-3xl">
          Usted ya lleva esto solo. Eso puede cambiar.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="field-card bg-mint p-6 sm:p-8">
            <h3 className="display display-h3">La comunicación primero</h3>
            <p className="mt-3 text-spruce-soft">
              Antes que nada: una forma segura de que su hijo pida lo que
              necesita — palabras, señas, imágenes o un dispositivo. Cuando la
              comunicación crece, los momentos difíciles casi siempre bajan.
            </p>
          </div>
          <div className="field-card bg-butter p-6 sm:p-8">
            <h3 className="display display-h3">El papeleo lo hacemos nosotros</h3>
            <p className="mt-3 text-spruce-soft">
              Autorizaciones previas, verificación de beneficios, llamadas de
              seguimiento. Usted no firmó para volverse experto en seguros.
              Nosotros hacemos esas llamadas todos los días.
            </p>
          </div>
          <div className="field-card bg-peach p-6 sm:p-8">
            <h3 className="display display-h3">La familia entra en el plan</h3>
            <p className="mt-3 text-spruce-soft">
              La capacitación para padres es parte de cada plan, no un extra.
              Su hijo pasa muchas más horas con usted que con cualquier
              terapeuta — ahí es donde las habilidades se quedan.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── PASOS ───────────────── */}
      <section className="mx-auto max-w-6xl px-4" aria-labelledby="es-pasos-heading">
        <div className="field-card bg-peach p-6 sm:p-10">
          <h2 id="es-pasos-heading" className="display display-h2">
            De la primera llamada a la primera sesión
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-spruce-soft">
            Cuatro pasos. Nosotros cargamos con la parte pesada de cada uno.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p) => (
              <li key={p.n} className="rounded-3xl bg-white/80 p-6">
                <p className="display text-3xl text-garden">{p.n}</p>
                <h3 className="display display-h3 mt-1">{p.t}</h3>
                <p className="mt-2 text-spruce-soft">{p.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/es/como-empezar/" className="btn btn-primary">
              Empezar ahora
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              Llame al {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────── ENLACES ───────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-20"
        aria-labelledby="es-mas-heading"
      >
        <h2 id="es-mas-heading" className="display display-h2">
          Más información
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/es/terapia-aba/"
            className="field-card bg-mint p-6 transition-transform hover:-translate-y-0.5"
          >
            <h3 className="display display-h3">¿Qué es la terapia ABA?</h3>
            <p className="mt-2 text-spruce-soft">
              La idea central en un ejemplo, cómo se ve una sesión de verdad, y
              las críticas que se le hacen — respondidas sin rodeos.
            </p>
          </Link>
          <Link
            href="/es/seguro-y-medicaid/"
            className="field-card bg-butter p-6 transition-transform hover:-translate-y-0.5"
          >
            <h3 className="display display-h3">Seguro y Medicaid</h3>
            <p className="mt-2 text-spruce-soft">
              Cómo se paga la terapia ABA, qué es la autorización previa, y qué
              hacer si le niegan el servicio.
            </p>
          </Link>
          <Link
            href="/es/como-empezar/"
            className="field-card bg-peach p-6 transition-transform hover:-translate-y-0.5"
          >
            <h3 className="display display-h3">Cómo empezar</h3>
            <p className="mt-2 text-spruce-soft">
              Cuatro preguntas, un minuto, y una persona real le llama con la
              respuesta sobre su cobertura.
            </p>
          </Link>
        </div>
        <p className="mt-8 text-spruce-soft">
          ¿Busca las páginas de cada estado, los empleos o las guías completas?
          Están en{" "}
          <Link
            href="/"
            hrefLang="en"
            className="font-semibold text-garden underline underline-offset-4"
          >
            la versión en inglés del sitio
          </Link>
          . Y si prefiere que se lo expliquemos en español por teléfono, para
          eso estamos.
        </p>
      </section>

      {/* ───────────────── CIERRE ───────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="field-card flex flex-col items-start justify-between gap-4 bg-spruce p-6 text-ivory sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display display-h2 text-ivory">
              Una llamada. Sin compromiso.
            </h2>
            <p className="mt-2 max-w-xl text-ivory/80">
              Le decimos qué cubre su plan y cuánto tarda de verdad donde usted
              vive — aunque la respuesta no sea la que esperaba.
            </p>
          </div>
          <a
            href={siteConfig.contact.phoneHref}
            className="btn btn-marigold shrink-0"
          >
            <PhoneIcon />
            {siteConfig.contact.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
