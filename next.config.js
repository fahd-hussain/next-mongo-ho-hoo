/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/application',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
