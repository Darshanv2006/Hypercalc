/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts', 'katex'],
  },
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;