/**
 * Production site configuration. Every absolute URL (canonical, Open Graph,
 * sitemap, robots, JSON-LD) is built from `siteUrl`.
 *
 * NEXT_PUBLIC_SITE_URL overrides the default (e.g. for a staging domain).
 * It is public by design: it only holds the site's own address.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://salmanfaris.online").replace(/\/+$/, "");

/**
 * Only the production deployment is indexable. On Vercel, preview and
 * development deployments get noindex + a blocking robots.txt so they never
 * compete with the real domain. Outside Vercel (local `next start`) the
 * production rules apply so they can be tested.
 */
export const isIndexable = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

export const absoluteUrl = (path = "/") => new URL(path, `${siteUrl}/`).toString();

export const siteName = "Salman Faris";
export const siteTitle = "Salman Faris | Video Editor & Motion Graphics Artist";
export const siteDescription =
  "Portfolio of Salman Faris, a Dubai-based video editor and motion graphics artist with 5+ years in commercials, brand content, education and wedding films.";
