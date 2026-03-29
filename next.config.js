here/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "your-project-id.supabase.co"
    ]
  },

  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
