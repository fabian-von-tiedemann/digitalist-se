import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { getCaseStudyBySlug, getCaseStudies, getAllCaseStudySlugs } from '@/lib/directus'
import CaseCard from '@/components/CaseCard'
import JsonLd from '@/components/JsonLd'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  return slugs.map(({ slug, locale }) => ({
    locale,
    slug,
  }))
}

export default async function CaseDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'cases' })
  const caseStudy = await getCaseStudyBySlug(slug, locale as 'sv' | 'en')

  if (!caseStudy) {
    notFound()
  }

  // Get related cases (excluding current)
  const allCases = await getCaseStudies(locale as 'sv' | 'en')
  const relatedCases = allCases.filter((c) => c.slug !== slug).slice(0, 2)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalist.se'
  const caseUrl = `${baseUrl}/${locale}/case/${slug}`

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": caseUrl,
    "headline": caseStudy.title,
    "description": caseStudy.description,
    "about": {
      "@type": "Thing",
      "name": caseStudy.client
    },
    "author": {
      "@type": "Organization",
      "name": "Digitalist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digitalist",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digitalist.se/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": caseUrl
    },
    "inLanguage": locale
  }

  return (
    <main>
      <JsonLd data={caseStudySchema} />
      {/* Hero section */}
      <section className="py-section bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Client badge */}
            <span className="inline-block px-4 py-2 text-sm font-medium bg-white text-primary-800 border-2 border-primary-900 rounded-brutalist shadow-brutalist mb-6">
              {caseStudy.client}
            </span>

            {/* Title */}
            <h1 className="text-display-lg font-display text-primary-900 mb-6">
              {caseStudy.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-concrete-700 leading-relaxed">
              {caseStudy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Results metrics banner */}
      <section className="py-8 bg-accent-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {caseStudy.results.map((result, index) => (
              <div key={index} className="text-center">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge and Solution */}
      <section className="py-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Challenge */}
            <div>
              <h2 className="text-display-sm font-display text-primary-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-brutalist text-primary-800">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </span>
                {t('detail.challenge')}
              </h2>
              <p className="text-lg text-concrete-700 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-display-sm font-display text-primary-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-accent-100 rounded-brutalist text-accent-700">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                {t('detail.solution')}
              </h2>
              <p className="text-lg text-concrete-700 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote section */}
      {caseStudy.quote && (
        <section className="py-section bg-concrete-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-sm font-display text-primary-900 mb-8">
                {t('detail.quote')}
              </h2>
              <blockquote className="relative">
                <svg
                  className="absolute -top-4 -left-4 w-12 h-12 text-accent-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl text-primary-800 italic leading-relaxed mb-6">
                  &ldquo;{caseStudy.quote}&rdquo;
                </p>
                {caseStudy.quote_author && (
                  <cite className="text-lg text-concrete-600 not-italic font-medium">
                    - {caseStudy.quote_author}
                  </cite>
                )}
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-section bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display-md font-display text-white mb-6">
            {t('detail.cta')}
          </h2>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white font-bold rounded-brutalist border-2 border-accent-400 shadow-brutalist-light transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            {t('detail.ctaButton')}
            <svg
              className="w-5 h-5"
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
      </section>

      {/* Related cases */}
      {relatedCases.length > 0 && (
        <section className="py-section">
          <div className="container mx-auto px-4">
            <h2 className="text-display-md font-display text-primary-900 text-center mb-12">
              {t('detail.related')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {relatedCases.map((relatedCase) => (
                <CaseCard
                  key={relatedCase.case_id}
                  title={relatedCase.title}
                  client={relatedCase.client}
                  description={relatedCase.description}
                  results={relatedCase.results}
                  slug={relatedCase.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
