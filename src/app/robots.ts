import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  // Until the final domain is set, keep the whole site out of search engines.
  if (!site) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/cv" }, sitemap: `${site}/sitemap.xml` };
}
