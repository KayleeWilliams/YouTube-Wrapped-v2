/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack')({
        compiler: 'jsx',
        jsx: 'react', 
      }),
    )
    return config
  },
  images: {
    domains: ['yt3.ggpht.com'],
  },
}

module.exports = nextConfig
