here/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows the build to succeed even if there are Type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This allows the build to succeed even if there are Linting warnings
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
