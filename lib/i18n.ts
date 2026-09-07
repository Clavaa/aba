/**
 * Two-language chrome.
 *
 * The site is English-first with a Spanish mirror of the money pages at /es/.
 * Rather than duplicate the header, footer, and sticky bar, the chrome reads
 * the current path and switches strings — anything under /es/ renders Spanish
 * navigation and Spanish calls to action.
 *
 * TODO(architecture): the Spanish pages set lang="es" on their own content
 * wrapper because the root layout owns <html lang="en">. That is valid HTML
 * and correct for assistive tech, but if /es/ grows past a handful of pages,
 * move to App Router route groups with separate root layouts — app/(en)/ and
 * app/(es)/ — so the document language is right at the <html> level too.
 */

export type Lang = "en" | "es";

export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

type NavItem = { href: string; label: string };

type Strings = {
  nav: NavItem[];
  mobileNav: NavItem[];
  call: (phone: string) => string;
  callNow: string;
  checkCoverage: string;
  autismQuestion: string;
  autismQuestionHref: string;
  menuOpen: string;
  menuClose: string;
  menu: string;
  homeAria: (brand: string) => string;
  quickContact: string;
  mainNav: string;
  mobileNavLabel: string;
  ratingSoon: (source: string) => string;
  footerColumns: { heading: string; links: NavItem[] }[];
  footerTalk: string;
  disclaimer: string;
  rights: string;
  langSwitchLabel: string;
  langSwitchHref: string;
};

export const STRINGS: Record<Lang, Strings> = {
  en: {
    nav: [
      { href: "/services/", label: "Services" },
      { href: "/locations/", label: "Where we work" },
      { href: "/insurance/", label: "Insurance" },
      { href: "/cost-of-aba-therapy/", label: "Cost" },
      { href: "/getting-started/", label: "Getting started" },
      { href: "/careers/", label: "Careers" },
    ],
    mobileNav: [],
    call: (phone) => `Call ${phone}`,
    callNow: "Call now",
    checkCoverage: "Check my coverage",
    autismQuestion: "Does my child have autism?",
    autismQuestionHref: "/autism-evaluation/",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menu: "Menu",
    homeAria: (brand) => `${brand} home`,
    quickContact: "Quick contact",
    mainNav: "Main",
    mobileNavLabel: "Mobile",
    ratingSoon: (source) => `${source} rating coming soon`,
    footerColumns: [
      {
        heading: "Families",
        links: [
          { href: "/getting-started/", label: "Check my coverage" },
          { href: "/services/", label: "How therapy happens" },
          { href: "/autism-evaluation/", label: "Getting an evaluation" },
          { href: "/resources/what-is-aba/", label: "What is ABA?" },
          { href: "/resources/", label: "Parent guides" },
          { href: "/insurance/", label: "Insurance we accept" },
          { href: "/cost-of-aba-therapy/", label: "What ABA costs" },
          { href: "/locations/", label: "All 50 states + DC" },
        ],
      },
      {
        heading: "Company",
        links: [
          { href: "/about/", label: "About us" },
          { href: "/about/leadership/", label: "Our leadership" },
          { href: "/careers/", label: "Work with us" },
          { href: "/careers/openings/", label: "Open roles" },
          { href: "/careers/rbt/", label: "RBT jobs & guide" },
          { href: "/careers/rbt/certification/", label: "RBT certification" },
          { href: "/careers/bcba/", label: "BCBA jobs & guide" },
          { href: "/careers/pay/", label: "How ABA pay works" },
        ],
      },
    ],
    footerTalk: "Talk to us",
    disclaimer:
      "Coverage details on this site describe public state Medicaid and insurance-law programs and can change. They are general information, not legal, medical, or benefits advice — your health plan's written determination is what counts. Call us and we'll check your exact plan for you.",
    rights: "All rights reserved.",
    langSwitchLabel: "Español",
    langSwitchHref: "/es/",
  },

  es: {
    nav: [
      { href: "/es/", label: "Inicio" },
      { href: "/es/terapia-aba/", label: "Qué es ABA" },
      { href: "/es/seguro-y-medicaid/", label: "Seguro y Medicaid" },
      { href: "/es/como-empezar/", label: "Cómo empezar" },
    ],
    mobileNav: [],
    call: (phone) => `Llame al ${phone}`,
    callNow: "Llamar ahora",
    checkCoverage: "Revisar mi cobertura",
    autismQuestion: "¿Mi hijo tiene autismo?",
    autismQuestionHref: "/es/terapia-aba/",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    menu: "Menú",
    homeAria: (brand) => `Inicio de ${brand}`,
    quickContact: "Contacto rápido",
    mainNav: "Principal",
    mobileNavLabel: "Móvil",
    ratingSoon: (source) => `Calificación de ${source} próximamente`,
    footerColumns: [
      {
        heading: "Familias",
        links: [
          { href: "/es/como-empezar/", label: "Revisar mi cobertura" },
          { href: "/es/terapia-aba/", label: "Qué es la terapia ABA" },
          { href: "/es/seguro-y-medicaid/", label: "Seguro y Medicaid" },
          { href: "/es/", label: "Inicio" },
        ],
      },
      {
        heading: "En inglés",
        links: [
          { href: "/", label: "English site" },
          { href: "/locations/", label: "Los 50 estados" },
          { href: "/careers/", label: "Empleos" },
        ],
      },
    ],
    footerTalk: "Hable con nosotros",
    disclaimer:
      "La información sobre cobertura en este sitio describe programas públicos de Medicaid y leyes estatales de seguros, y puede cambiar. Es información general — no es asesoría legal, médica ni de beneficios. Lo que cuenta es la determinación por escrito de su plan de salud. Llámenos y revisamos su plan exacto por usted.",
    rights: "Todos los derechos reservados.",
    langSwitchLabel: "English",
    langSwitchHref: "/",
  },
};

// Mobile nav = the desktop set plus the pages that don't fit in the header.
STRINGS.en.mobileNav = [
  ...STRINGS.en.nav,
  { href: "/autism-evaluation/", label: "Autism evaluation" },
  { href: "/resources/", label: "Parent guides" },
  { href: "/about/", label: "About" },
];
STRINGS.es.mobileNav = [...STRINGS.es.nav, { href: "/", label: "English site" }];

export function strings(pathname: string): Strings {
  return STRINGS[langFromPath(pathname)];
}
