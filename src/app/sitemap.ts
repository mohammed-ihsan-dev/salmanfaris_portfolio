import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return [];
  return [
    { url: site, changeFrequency: "monthly", priority: 1 },
    ...projects.filter((p) => !p.preview).map((p) => ({ url: `${site}/work/${p.slug}`, changeFrequency: "yearly" as const })),
  ];
}
