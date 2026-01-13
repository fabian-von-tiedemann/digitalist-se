'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-900">
      {/* Background geometric pattern - CSS only */}
      <div className="absolute inset-0 opacity-10">
        {/* Large diagonal stripes */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.1) 40px,
              rgba(255, 255, 255, 0.1) 80px
            )`
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(9, 103, 210, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(9, 103, 210, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-950" />

      {/* Accent glow */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-accent-400/10 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Headline */}
        <h1 className="text-display-xl font-display font-bold tracking-tight text-white text-balance">
          {t('headline')}
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-primary-200">
          {t('subheadline')}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {/* Primary CTA */}
          <Link
            href="/kontakt"
            className="btn-brutalist border-accent-500 bg-accent-500 text-white hover:bg-accent-600 hover:border-accent-600"
          >
            {t('cta_primary')}
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/tjanster"
            className="group inline-flex items-center gap-2 font-medium text-primary-100 transition-colors hover:text-accent-300"
          >
            {t('cta_secondary')}
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

      {/* Bottom edge decoration - brutalist touch */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-accent-500" />
        <div className="h-px bg-accent-300" />
      </div>
    </section>
  )
}
