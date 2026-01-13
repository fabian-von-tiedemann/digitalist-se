import { Link } from '@/i18n/routing'

type DimensionCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  href: string
  linkText: string
}

export default function DimensionCard({
  icon,
  title,
  description,
  features,
  href,
  linkText,
}: DimensionCardProps) {
  return (
    <article className="group border-2 border-primary-900 rounded-brutalist shadow-brutalist bg-white transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none p-6 flex flex-col">
      {/* Icon area */}
      <div className="w-12 h-12 mb-4 flex items-center justify-center">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-display-sm text-primary-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-lg text-concrete-700 mb-4">
        {description}
      </p>

      {/* Feature list */}
      <ul className="flex-1 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-concrete-700">
            <span className="text-accent-500 mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Link */}
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded-brutalist"
      >
        {linkText}
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
