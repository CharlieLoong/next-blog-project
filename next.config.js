/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
