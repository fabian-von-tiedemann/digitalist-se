import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['sv', 'en'],
  defaultLocale: 'sv',
  localePrefix: 'as-needed' // Swedish URLs without /sv prefix
})

// Create locale-aware navigation components
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
