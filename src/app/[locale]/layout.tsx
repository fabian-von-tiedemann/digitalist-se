import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { inter, spaceGrotesk, jetbrainsMono } from '@/lib/fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SkipLink from '@/components/SkipLink'
import JsonLd from '@/components/JsonLd'
import "../globals.css"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalist.se'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Digitalist — Suverän AI för offentlig sektor',
    template: '%s | Digitalist',
  },
  description: 'Sveriges enda öppna helhetspartner för suverän AI. Vi hjälper offentlig sektor att implementera AI som säkerställer digital suveränitet.',
  keywords: ['AI', 'suverän AI', 'offentlig sektor', 'digital suveränitet', 'AI-strategi', 'Sverige'],
  authors: [{ name: 'Digitalist' }],
  creator: 'Digitalist',
  publisher: 'Digitalist',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    alternateLocale: 'en_GB',
    siteName: 'Digitalist',
    title: 'Digitalist — Suverän AI för offentlig sektor',
    description: 'Sveriges enda öppna helhetspartner för suverän AI',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitalist — Suverän AI för offentlig sektor',
    description: 'Sveriges enda öppna helhetspartner för suverän AI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const messages = await getMessages()

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digitalist",
    "alternateName": "Digitalist Open Tech AB",
    "url": "https://digitalist.se",
    "logo": "https://digitalist.se/logo.svg",
    "description": "Sveriges enda öppna helhetspartner för suverän AI i offentlig sektor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kungsgatan 44",
      "addressLocality": "Stockholm",
      "postalCode": "111 35",
      "addressCountry": "SE"
    },
    "sameAs": [],
    "knowsAbout": ["Artificial Intelligence", "GDPR", "AI Act", "Kubernetes", "Open Source"]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Digitalist",
    "url": "https://digitalist.se",
    "inLanguage": ["sv", "en"]
  }

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="font-sans bg-concrete-50 text-primary-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <Header />
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
