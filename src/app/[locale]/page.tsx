import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import Dimensions from '@/components/Dimensions'
import ClientLogos from '@/components/ClientLogos'
import CaseStudies from '@/components/CaseStudies'
import BlogPreview from '@/components/BlogPreview'
import CTABanner from '@/components/CTABanner'
import JsonLd from '@/components/JsonLd'

type Props = {
  params: Promise<{ locale: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalist.se'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'sv'
    ? 'Suverän AI för offentlig sektor'
    : 'Sovereign AI for the Public Sector'

  const description = locale === 'sv'
    ? 'Sveriges enda öppna helhetspartner för suverän AI. Vi hjälper offentlig sektor att implementera AI som säkerställer digital suveränitet.'
    : 'Sweden\'s only open full-service partner for sovereign AI. We help the public sector implement AI that ensures digital sovereignty.'

  const canonicalUrl = locale === 'sv' ? baseUrl : `${baseUrl}/en`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'sv': baseUrl,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: `${title} | Digitalist`,
      description,
      url: canonicalUrl,
      locale: locale === 'sv' ? 'sv_SE' : 'en_GB',
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const servicesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": locale === 'sv' ? "Skyddet" : "The Shield",
      "description": locale === 'sv'
        ? "Säker AI-infrastruktur som uppfyller GDPR, OSL och AI Act"
        : "Secure AI infrastructure compliant with GDPR, OSL and AI Act",
      "provider": { "@type": "Organization", "name": "Digitalist" },
      "serviceType": "AI Infrastructure",
      "areaServed": { "@type": "Country", "name": "Sweden" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": locale === 'sv' ? "Spjutet" : "The Spear",
      "description": locale === 'sv'
        ? "AI-agenter och automation för effektivare verksamhet"
        : "AI agents and automation for more efficient operations",
      "provider": { "@type": "Organization", "name": "Digitalist" },
      "serviceType": "AI Automation",
      "areaServed": { "@type": "Country", "name": "Sweden" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": locale === 'sv' ? "Kärnan" : "The Core",
      "description": locale === 'sv'
        ? "Kunskapshantering och enterprise search med AI"
        : "Knowledge management and enterprise search with AI",
      "provider": { "@type": "Organization", "name": "Digitalist" },
      "serviceType": "Knowledge Management",
      "areaServed": { "@type": "Country", "name": "Sweden" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": locale === 'sv' ? "Hjärnan" : "The Brain",
      "description": locale === 'sv'
        ? "AI-strategi och kompetensutveckling för organisationer"
        : "AI strategy and competence development for organizations",
      "provider": { "@type": "Organization", "name": "Digitalist" },
      "serviceType": "AI Consulting",
      "areaServed": { "@type": "Country", "name": "Sweden" }
    }
  ]

  return (
    <>
      <JsonLd data={servicesSchema} />
      <Hero />
      <TrustSignals />
      <Dimensions />
      <ClientLogos />
      <CaseStudies locale={locale as 'sv' | 'en'} />
      <BlogPreview locale={locale as 'sv' | 'en'} />
      <CTABanner variant="primary" />
    </>
  )
}
