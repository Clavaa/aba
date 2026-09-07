import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllStates } from "@/lib/states";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.domain;
  const states = getAllStates();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/locations/`, changeFrequency: "weekly", priority: 0.9 },
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
  ];

  // State + county location pages live in the per-state sharded sitemaps
  // (app/locations/sitemap.ts → /locations/sitemap/{state}.xml). This root
  // sitemap keeps the core pages and the cost-by-state set.
  const costPages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${base}/cost-of-aba-therapy/${s.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...costPages];
}
