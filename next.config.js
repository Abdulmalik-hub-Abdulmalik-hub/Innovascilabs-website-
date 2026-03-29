/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yourcdn.com', 'supabase.co'], // Za mu canza wannan zuwa URL din Supabase dinka daga baya
  },
}

module.exports = nextConfig
