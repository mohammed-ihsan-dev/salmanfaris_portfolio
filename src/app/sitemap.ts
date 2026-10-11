import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";

/** Only real, public, indexable routes. Layout previews never appear (they don't exist in production). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => !p.preview)
      .map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
