import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments stay out of search results entirely.
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  // Everything public is crawlable, including CSS/JS/images. The printable /cv page
  // carries its own noindex, so it isn't blocked here (crawlers must see that tag).
  return { rules: { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml"), host: siteUrl };
}
