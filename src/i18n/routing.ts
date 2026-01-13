import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sv', 'en'],
  defaultLocale: 'sv',
  localePrefix: 'as-needed' // Swedish URLs without /sv prefix
})
