'use client'

import { useTranslations } from 'next-intl'

export default function SkipLink() {
  const t = useTranslations('accessibility')

  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      {t('skipToContent')}
    </a>
  )
}
