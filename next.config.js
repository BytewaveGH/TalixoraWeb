/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Optional: build into another folder (e.g. while `next dev` holds .next)
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Old URLs (Bytewave site and previous Talixora pages). Query strings are preserved.
      { source: '/whybytewave', destination: '/about', permanent: true },
      { source: '/whytalixora', destination: '/about', permanent: true },
      { source: '/contactUs', destination: '/contact', permanent: true },
    ]
  },
}

module.exports = nextConfig
