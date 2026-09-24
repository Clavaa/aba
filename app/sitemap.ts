import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllStates } from "@/lib/states";
import { services } from "@/lib/services";
import { payers } from "@/lib/payers";
import { getJobCities } from "@/lib/jobcities";
import {
  CAREERS_REVISED,
  CORE_REVISED,
  COVERAGE_REVISED,
  GEO_TEMPLATE_REVISED,
  GUIDES_REVISED,
  rev,
} from "@/lib/revisions";

/**
 * Which revision date a URL belongs to. Pattern-matched rather than hand-listed
 * so a page added later inherits the right date instead of silently shipping
 * without a lastmod.
 */
function revisionFor(url: string): Date {
  if (url.includes("/locations/")) return rev(GEO_TEMPLATE_REVISED);
  if (url.includes("/careers/")) return rev(CAREERS_REVISED);
  if (url.includes("/resources/") || url.includes("/autism-evaluation"))
    return rev(GUIDES_REVISED);
  if (url.includes("/insurance/") || url.includes("/cost-of-aba-therapy"))
    return rev(COVERAGE_REVISED);
  return rev(CORE_REVISED);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.domain;
  const states = getAllStates();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/locations/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/es/`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/es/como-empezar/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/es/seguro-y-medicaid/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/es/terapia-aba/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/faq/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact/`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/find-a-diagnostician/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/support-services/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/events/`, changeFrequency: "weekly", priority: 0.5 },
    {
      url: `${base}/privacy-policy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: `${base}/terms/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/resources/`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${base}/resources/what-is-aba/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/resources/autism-levels/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/resources/signs-of-autism-by-age/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/resources/aba-therapy-for-adhd/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/resources/aba-therapy-examples/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/resources/discrete-trial-training/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/autism-evaluation/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/autism-evaluation/screener/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/autism-evaluation/m-chat/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/insurance/`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${base}/cost-of-aba-therapy/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/getting-started/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about/`, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${base}/about/leadership/`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${base}/careers/`, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${base}/careers/openings/`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${base}/careers/rbt/`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/careers/rbt/certification/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/careers/rbt/competency-assessment/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${base}/careers/bcba/`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/careers/bcba/supervision/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/careers/pay/`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/resources/autism-therapy-types/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/resources/positive-reinforcement/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/resources/autism-resources-for-parents/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // State + county location pages live in the per-state sharded sitemaps
  // (app/locations/sitemap.ts → /locations/sitemap/{state}.xml). This root
  // sitemap keeps the core pages and the cost-by-state set.
  const costPages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${base}/cost-of-aba-therapy/${s.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const payerPages: MetadataRoute.Sitemap = payers.map((p) => ({
    url: `${base}/insurance/${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const payStatePages: MetadataRoute.Sitemap = states.map((st) => ({
    url: `${base}/careers/pay/${st.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const jobCityPages: MetadataRoute.Sitemap = getJobCities(150).map((c) => ({
    url: `${base}/careers/jobs/${c.jobSlug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const all: MetadataRoute.Sitemap = [
    ...staticPages,
    ...servicePages,
    ...payerPages,
    ...costPages,
    ...jobCityPages,
    ...payStatePages,
  ];

  return all.map((e) => ({ ...e, lastModified: revisionFor(String(e.url)) }));
}
