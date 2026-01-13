'use client'

import { useTranslations } from 'next-intl'

type ClientLogo = {
  id: string
  type: 'government' | 'healthcare' | 'agency'
}

const clients: ClientLogo[] = [
  { id: 'socialstyrelsen', type: 'government' },
  { id: 'agency1', type: 'agency' },
  { id: 'agency2', type: 'agency' },
  { id: 'agency3', type: 'agency' },
  { id: 'healthcare1', type: 'healthcare' },
  { id: 'healthcare2', type: 'healthcare' },
]

// Placeholder logo component - styled by organization type
function LogoPlaceholder({ id, type }: ClientLogo) {
  const t = useTranslations('clients')

  // Different accent colors for different org types
  const typeStyles = {
    government: 'border-primary-400 bg-primary-50',
    healthcare: 'border-accent-400 bg-accent-50',
    agency: 'border-concrete-400 bg-concrete-100',
  }

  return (
    <div
      className={`
        aspect-[3/2] flex items-center justify-center
        border-2 rounded-brutalist p-4
        transition-all duration-300
        grayscale hover:grayscale-0
        ${typeStyles[type]}
      `}
    >
      <span className="text-sm font-medium text-concrete-600 text-center">
        {t(`logos.${id}`)}
      </span>
    </div>
  )
}

export default function ClientLogos() {
  const t = useTranslations('clients')

  return (
    <section className="py-section bg-concrete-50">
      <div className="container mx-auto px-4">
        <h2 className="text-display-sm font-display text-primary-900 text-center mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {clients.map((client) => (
            <LogoPlaceholder key={client.id} {...client} />
          ))}
        </div>
        <p className="text-center text-concrete-600 text-sm mt-8">
          {t('description')}
        </p>
      </div>
    </section>
  )
}
