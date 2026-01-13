import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getCaseStudies } from '@/lib/directus'
import CaseCard from '@/components/CaseCard'

type Props = {
  params: Promise<{ locale: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalist.se'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cases' })

  const canonicalUrl = locale === 'sv' ? `${baseUrl}/case` : `${baseUrl}/en/case`

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'sv': `${baseUrl}/case`,
        'en': `${baseUrl}/en/case`,
      },
    },
    openGraph: {
      title: `${t('title')} | Digitalist`,
      description: t('subtitle'),
      url: canonicalUrl,
      locale: locale === 'sv' ? 'sv_SE' : 'en_GB',
    },
  }
}

export default async function CasesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'cases' })
  const caseStudies = await getCaseStudies(locale as 'sv' | 'en')

  return (
    <main className="py-section">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-display-lg font-display text-primary-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-concrete-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseCard
              key={caseStudy.case_id}
              title={caseStudy.title}
              client={caseStudy.client}
              description={caseStudy.description}
              results={caseStudy.results}
              slug={caseStudy.slug}
              featured={index === 0}
            />
          ))}
        </div>

        {caseStudies.length === 0 && (
          <p className="text-center text-concrete-600 py-12">
            {locale === 'sv'
              ? 'Inga case tillgangliga just nu.'
              : 'No case studies available at this time.'}
          </p>
        )}
      </div>
    </main>
  )
}
