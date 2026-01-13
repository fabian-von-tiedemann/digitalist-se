import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { getCaseStudies } from '@/lib/directus'
import CaseCard from './CaseCard'

type CaseStudiesProps = {
  locale: 'sv' | 'en'
}

export default async function CaseStudies({ locale }: CaseStudiesProps) {
  const t = await getTranslations({ locale, namespace: 'cases' })

  let caseStudies
  try {
    caseStudies = await getCaseStudies(locale)
  } catch (error) {
    // Graceful error handling if data fetching fails
    console.error('Failed to fetch case studies:', error)
    return (
      <section className="py-section bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-concrete-600">
            {locale === 'sv'
              ? 'Case studies kunde inte laddas just nu.'
              : 'Case studies could not be loaded at this time.'}
          </p>
        </div>
      </section>
    )
  }

  if (caseStudies.length === 0) {
    return null
  }

  // First case is featured
  const [featuredCase, ...otherCases] = caseStudies

  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-display-md font-display text-primary-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-concrete-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Featured case spans 2 columns */}
          <CaseCard
            title={featuredCase.title}
            client={featuredCase.client}
            description={featuredCase.description}
            results={featuredCase.results}
            slug={featuredCase.slug}
            featured
          />

          {/* Other cases */}
          {otherCases.map((caseStudy) => (
            <CaseCard
              key={caseStudy.case_id}
              title={caseStudy.title}
              client={caseStudy.client}
              description={caseStudy.description}
              results={caseStudy.results}
              slug={caseStudy.slug}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center">
          <Link
            href="/case"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-900 rounded-brutalist font-medium text-primary-900 bg-white shadow-brutalist transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {t('viewAll')}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
