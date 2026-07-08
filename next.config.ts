import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(process.env.CF_PAGES ? { output: 'export' } : {}),
};

export default nextConfig;
