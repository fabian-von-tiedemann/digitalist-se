'use client'

import { useTranslations } from 'next-intl'
import DimensionCard from './DimensionCard'

// CSS-only geometric icons for each dimension
function ShieldIcon() {
  return (
    <div className="w-12 h-12 relative">
      <div
        className="absolute inset-0 bg-accent-500"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      />
      <div
        className="absolute inset-2 bg-white"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      />
      <div
        className="absolute inset-3 bg-accent-500"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      />
    </div>
  )
}

function SpearIcon() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center">
      <div
        className="absolute w-8 h-12 bg-accent-500"
        style={{
          clipPath: 'polygon(50% 0%, 100% 30%, 50% 100%, 0% 30%)',
        }}
      />
    </div>
  )
}

function CoreIcon() {
  return (
    <div className="w-12 h-12 relative">
      <div
        className="absolute inset-0 bg-accent-500"
        style={{
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />
      <div
        className="absolute inset-3 bg-white"
        style={{
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />
    </div>
  )
}

function BrainIcon() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center">
      {/* Neural network pattern */}
      <div className="absolute w-3 h-3 rounded-full bg-accent-500 top-1 left-1/2 -translate-x-1/2" />
      <div className="absolute w-3 h-3 rounded-full bg-accent-500 bottom-1 left-1/2 -translate-x-1/2" />
      <div className="absolute w-3 h-3 rounded-full bg-accent-500 left-1 top-1/2 -translate-y-1/2" />
      <div className="absolute w-3 h-3 rounded-full bg-accent-500 right-1 top-1/2 -translate-y-1/2" />
      <div className="absolute w-4 h-4 rounded-full bg-accent-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Connection lines */}
      <div className="absolute w-0.5 h-4 bg-accent-400 top-4 left-1/2 -translate-x-1/2" />
      <div className="absolute w-0.5 h-4 bg-accent-400 bottom-4 left-1/2 -translate-x-1/2" />
      <div className="absolute w-4 h-0.5 bg-accent-400 left-4 top-1/2 -translate-y-1/2" />
      <div className="absolute w-4 h-0.5 bg-accent-400 right-4 top-1/2 -translate-y-1/2" />
    </div>
  )
}

export default function Dimensions() {
  const t = useTranslations('dimensions')

  const dimensions = [
    {
      id: 'shield',
      icon: <ShieldIcon />,
      title: t('shield.title'),
      description: t('shield.description'),
      features: [
        t('shield.features.0'),
        t('shield.features.1'),
        t('shield.features.2'),
      ],
      href: '/tjanster/skyddet',
    },
    {
      id: 'spear',
      icon: <SpearIcon />,
      title: t('spear.title'),
      description: t('spear.description'),
      features: [
        t('spear.features.0'),
        t('spear.features.1'),
        t('spear.features.2'),
      ],
      href: '/tjanster/spjutet',
    },
    {
      id: 'core',
      icon: <CoreIcon />,
      title: t('core.title'),
      description: t('core.description'),
      features: [
        t('core.features.0'),
        t('core.features.1'),
        t('core.features.2'),
      ],
      href: '/tjanster/karnan',
    },
    {
      id: 'brain',
      icon: <BrainIcon />,
      title: t('brain.title'),
      description: t('brain.description'),
      features: [
        t('brain.features.0'),
        t('brain.features.1'),
        t('brain.features.2'),
      ],
      href: '/tjanster/hjarnan',
    },
  ]

  return (
    <section className="py-section bg-concrete-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-display-md text-primary-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-concrete-700 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {dimensions.map((dimension) => (
            <DimensionCard
              key={dimension.id}
              icon={dimension.icon}
              title={dimension.title}
              description={dimension.description}
              features={dimension.features}
              href={dimension.href}
              linkText={t('readMore')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
