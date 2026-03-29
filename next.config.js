/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "your-project-id.supabase.co"
    ]
  }
};

module.exports = nextConfig;
