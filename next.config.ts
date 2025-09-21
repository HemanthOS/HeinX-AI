import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // for static export if needed
  eslint: {
    ignoreDuringBuilds: true, // ignore all ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ignore all TypeScript errors
  },
};

export default nextConfig;
