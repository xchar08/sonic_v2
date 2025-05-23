// next.config.cjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensure static export
  images: { unoptimized: true }, // Required for static exports
  distDir: 'out', // Explicitly set output directory
};

module.exports = nextConfig;