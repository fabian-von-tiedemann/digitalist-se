'use client'

import { useTranslations } from 'next-intl'

type Badge = {
  id: string
  icon: React.ReactNode
}

// CSS-only geometric icons for certifications
const ShieldIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const CertificateIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M7 8h10M7 12h6" />
    <circle cx="17" cy="15" r="3" />
    <path d="M17 18v3" />
  </svg>
)

const GDPRIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const SwedishFlagIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="1" fill="#006AA7" />
    <rect x="7" y="4" width="3" height="16" fill="#FECC00" />
    <rect x="2" y="10" width="20" height="4" fill="#FECC00" />
  </svg>
)

const badges: Badge[] = [
  { id: 'iso27001', icon: <ShieldIcon /> },
  { id: 'iso9001', icon: <CertificateIcon /> },
  { id: 'gdpr', icon: <GDPRIcon /> },
  { id: 'swedish', icon: <SwedishFlagIcon /> },
]

export default function TrustSignals() {
  const t = useTranslations('trust')

  return (
    <section className="bg-concrete-100 border-y border-concrete-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-2 px-4 py-2 bg-concrete-200 rounded-brutalist border border-concrete-300"
            >
              <span className="text-primary-700">{badge.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-concrete-700">
                {t(`badges.${badge.id}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
