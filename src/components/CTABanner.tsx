'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

type CTABannerProps = {
  variant?: 'primary' | 'secondary'
  headlineKey?: string
  subtextKey?: string
  ctaTextKey?: string
  ctaLink?: string
}

export default function CTABanner({
  variant = 'primary',
  headlineKey,
  subtextKey,
  ctaTextKey,
  ctaLink = '/kontakt',
}: CTABannerProps) {
  const t = useTranslations('cta')

  const headline = headlineKey || t(`${variant}.headline`)
  const subtext = subtextKey || t(`${variant}.subtext`)
  const ctaText = ctaTextKey || t(`${variant}.button`)

  if (variant === 'secondary') {
    return (
      <section className="bg-primary-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-primary-200 bg-white p-8 shadow-brutal md:p-12">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-2xl font-bold text-primary-900 md:text-3xl">
                  {headline}
                </h2>
                <p className="mt-2 text-primary-600">{subtext}</p>
              </div>
              <Link
                href={ctaLink}
                className="group inline-flex items-center gap-2 border-2 border-primary-900 bg-primary-900 px-6 py-3 font-bold uppercase tracking-wider text-white transition-all hover:bg-primary-800"
              >
                {ctaText}
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Primary variant - dark background with prominent CTA
  return (
    <section className="relative overflow-hidden bg-primary-900 py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.1) 40px,
              rgba(255, 255, 255, 0.1) 80px
            )`,
          }}
        />
      </div>

      {/* Accent glow */}
      <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-accent-400/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200">
            {subtext}
          </p>
          <div className="mt-8">
            <Link
              href={ctaLink}
              className="btn-brutalist inline-flex items-center gap-2 border-accent-500 bg-accent-500 text-white transition-all hover:border-accent-400 hover:bg-accent-400"
            >
              {ctaText}
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom edge decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-accent-500" />
      </div>
    </section>
  )
}
