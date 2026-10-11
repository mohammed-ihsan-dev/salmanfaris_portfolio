import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in a parent folder otherwise confuses Next's root detection.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
