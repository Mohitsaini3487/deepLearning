import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['localhost', 'vercel.com', '*.vercel.app'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  // Force App Router only
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Disable trailing slash redirection
  trailingSlash: false,
  // Clean build output
  distDir: '.next',
};

export default nextConfig;
