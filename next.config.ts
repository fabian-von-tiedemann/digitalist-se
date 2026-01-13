import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Ensure consistent URL format
  trailingSlash: false,

  // Redirects from old digitalist.se URLs to new structure
  // TODO: Before launch, analyze current digitalist.se URL structure for complete mapping
  async redirects() {
    return [
      // Old service pages to case studies (temporary until service pages exist)
      {
        source: '/tjanster/:path*',
        destination: '/case',
        permanent: false,
      },
      // Old about page to contact
      {
        source: '/om-oss',
        destination: '/kontakt',
        permanent: false,
      },
      // Old news/blog patterns to new blog
      {
        source: '/nyheter/:path*',
        destination: '/blogg',
        permanent: false,
      },
      {
        source: '/blog/:path*',
        destination: '/blogg',
        permanent: false,
      },
      {
        source: '/aktuellt/:path*',
        destination: '/blogg',
        permanent: false,
      },
      // English blog pattern
      {
        source: '/en/blog/:path*',
        destination: '/en/blogg',
        permanent: false,
      },
      {
        source: '/en/news/:path*',
        destination: '/en/blogg',
        permanent: false,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
