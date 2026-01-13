import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import Dimensions from '@/components/Dimensions'
import ClientLogos from '@/components/ClientLogos'
import CaseStudies from '@/components/CaseStudies'
import BlogPreview from '@/components/BlogPreview'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <TrustSignals />
      <Dimensions />
      <ClientLogos />
      <CaseStudies locale={locale as 'sv' | 'en'} />
      <BlogPreview locale={locale as 'sv' | 'en'} />
    </>
  )
}
