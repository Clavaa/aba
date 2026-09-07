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

/**
 * Header menu. Top-level entries may carry `children`, which render as a
 * dropdown panel — the target runs six top-level items, five of them with
 * a menu underneath, and one flat link.
 */
export type MenuItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; note?: string }[];
};

type Strings = {
  mainMenu: MenuItem[];
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
    mainMenu: [
      {
        href: "/about/",
        label: "About Sproutwell",
        children: [
          { href: "/about/", label: "About us", note: "Who we are and how we work" },
          { href: "/about/leadership/", label: "Our leadership", note: "The people accountable for care" },
          { href: "/faq/", label: "FAQ", note: "The questions we get most" },
        ],
      },
      {
        href: "/services/",
        label: "Our services",
        children: [
          { href: "/services/in-home/", label: "In-home ABA", note: "Therapy where life happens" },
          { href: "/services/center-based/", label: "Center-based ABA", note: "A room built for the work" },
          { href: "/services/school/", label: "School-based support", note: "The hardest six hours" },
          { href: "/services/telehealth/", label: "Telehealth & parent coaching", note: "No drive required" },
          { href: "/services/early-intervention/", label: "Early intervention", note: "Toddlers and preschoolers" },
          { href: "/services/", label: "All services", note: "Compare every setting" },
        ],
      },
      {
        href: "/resources/",
        label: "Resources for parents",
        children: [
          { href: "/resources/what-is-aba/", label: "What is ABA?", note: "Including the criticism" },
          { href: "/resources/autism-levels/", label: "Autism levels 1, 2, 3", note: "What the report means" },
          { href: "/resources/signs-of-autism-by-age/", label: "Signs by age", note: "12 months to teens" },
          { href: "/autism-evaluation/", label: "Getting an evaluation", note: "Three doors, two of them free" },
          { href: "/autism-evaluation/screener/", label: "Parent checklist", note: "Two minutes, no signup" },
          { href: "/autism-evaluation/m-chat/", label: "The M-CHAT explained", note: "What the score means" },
        ],
      },
      {
        href: "/careers/",
        label: "Careers",
        children: [
          { href: "/careers/", label: "Careers at Sproutwell", note: "Why work here" },
          { href: "/careers/openings/", label: "All positions", note: "Current open roles" },
          { href: "/careers/rbt/", label: "RBT jobs & guide", note: "No degree required" },
          { href: "/careers/rbt/certification/", label: "RBT certification", note: "All six requirements" },
          { href: "/careers/bcba/", label: "BCBA jobs & guide", note: "Clinical leadership" },
          { href: "/careers/pay/", label: "How ABA pay works", note: "The honest version" },
        ],
      },
      {
        href: "/locations/",
        label: "Locations",
        children: [
          { href: "/locations/", label: "All 50 states + DC", note: "Every state has a page" },
          { href: "/locations/texas/", label: "Texas", note: "Coverage and counties" },
          { href: "/locations/florida/", label: "Florida", note: "Coverage and counties" },
          { href: "/locations/new-york/", label: "New York", note: "Coverage and counties" },
          { href: "/locations/california/", label: "California", note: "Coverage and counties" },
          { href: "/cost-of-aba-therapy/", label: "What ABA costs", note: "By state" },
        ],
      },
      { href: "/insurance/", label: "Insurance" },
    ],
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
    mainMenu: [
      { href: "/es/", label: "Inicio" },
      { href: "/es/terapia-aba/", label: "Qué es ABA" },
      { href: "/es/seguro-y-medicaid/", label: "Seguro y Medicaid" },
      { href: "/es/como-empezar/", label: "Cómo empezar" },
    ],
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
