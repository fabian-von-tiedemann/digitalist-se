import { Link } from '@/i18n/routing'

type CaseCardProps = {
  title: string
  client: string
  description: string
  results: string[]
  slug: string
  featured?: boolean
}

export default function CaseCard({
  title,
  client,
  description,
  results,
  slug,
  featured = false,
}: CaseCardProps) {
  return (
    <article
      className={`
        group border-2 border-primary-900 rounded-brutalist shadow-brutalist bg-white
        transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none
        flex flex-col
        ${featured ? 'p-8 md:col-span-2' : 'p-6'}
      `}
    >
      {/* Client badge */}
      <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-brutalist mb-4 self-start">
        {client}
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

      {/* Description */}
      <p className="text-lg text-concrete-700 mb-6 flex-1">{description}</p>

      {/* Results metrics */}
      <div className="flex flex-wrap gap-2 mb-6">
        {results.map((result, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1.5 bg-accent-50 text-accent-700 text-sm font-medium border border-accent-200 rounded-brutalist"
          >
            {result}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        href={`/case/${slug}`}
        className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded-brutalist"
      >
        Las hela caset
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
