import type { NextConfig } from "next";

/**
 * Baseline security headers. Vercel already adds HSTS on its domains and serves
 * hashed /_next/static assets as immutable, so neither is repeated here. A full
 * script CSP is intentionally omitted: Next.js inline bootstrap scripts would
 * need nonces, which would make every page dynamic.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in a parent folder otherwise confuses Next's root detection.
  outputFileTracingRoot: __dirname,
  // Lets a production test build (NEXT_DIST_DIR=.next-test) run without overwriting
  // the .next folder a running `npm run dev` depends on.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
