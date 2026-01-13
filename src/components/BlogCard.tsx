import { Link } from '@/i18n/routing'
import type { BlogPostCategory } from '@/lib/directus'

type BlogCardProps = {
  title: string
  excerpt: string
  date: string
  author: string
  category: BlogPostCategory
  slug: string
  locale: 'sv' | 'en'
  featured?: boolean
}

const categoryColors: Record<BlogPostCategory, { bg: string; text: string; border: string }> = {
  'ai-act': { bg: 'bg-accent-50', text: 'text-accent-700', border: 'border-accent-200' },
  'technical-guide': { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-200' },
  'case-story': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'strategy': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
}

const categoryLabels: Record<BlogPostCategory, { sv: string; en: string }> = {
  'ai-act': { sv: 'AI Act', en: 'AI Act' },
  'technical-guide': { sv: 'Teknisk guide', en: 'Technical Guide' },
  'case-story': { sv: 'Kundcase', en: 'Case Story' },
  'strategy': { sv: 'Strategi', en: 'Strategy' },
}

function formatDate(dateString: string, locale: 'sv' | 'en'): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  category,
  slug,
  locale,
  featured = false,
}: BlogCardProps) {
  const colors = categoryColors[category]
  const categoryLabel = categoryLabels[category][locale]

  return (
    <article
      className={`
        group border-2 border-primary-900 rounded-brutalist shadow-brutalist bg-white
        transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none
        flex flex-col
        ${featured ? 'p-8 md:col-span-2' : 'p-6'}
      `}
    >
      {/* Category badge */}
      <span
        className={`
          inline-block px-3 py-1 text-sm font-medium rounded-brutalist mb-4 self-start border
          ${colors.bg} ${colors.text} ${colors.border}
        `}
      >
        {categoryLabel}
      </span>

      {/* Title */}
      <h3
        className={`
          font-display text-primary-900 mb-3
          ${featured ? 'text-display-md' : 'text-display-sm'}
        `}
      >
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-lg text-concrete-700 mb-6 flex-1">{excerpt}</p>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-sm text-concrete-600 mb-6">
        <span>{formatDate(date, locale)}</span>
        <span className="w-1 h-1 rounded-full bg-concrete-400" />
        <span>{author}</span>
      </div>

      {/* Link */}
      <Link
        href={`/blogg/${slug}`}
        className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded-brutalist"
      >
        {locale === 'sv' ? 'Las mer' : 'Read more'}
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}
