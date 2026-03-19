/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GRAPHQL_HOST: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_ENV: process.env.NEXT_ENV
  },
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.cogent.lu', 'fra1.digitaloceanspaces.com']
  },
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.cogent.lu' }],
      destination: 'https://cogent.lu/:path*',
      permanent: true
    }
  ],
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
