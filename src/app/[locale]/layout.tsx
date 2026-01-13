import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { inter, spaceGrotesk, jetbrainsMono } from '@/lib/fonts'
import Header from '@/components/Header'
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

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-concrete-50 text-primary-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
