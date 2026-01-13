import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { getBlogPosts } from '@/lib/directus'
import BlogCard from './BlogCard'

type BlogPreviewProps = {
  locale: 'sv' | 'en'
}

export default async function BlogPreview({ locale }: BlogPreviewProps) {
  const t = await getTranslations({ locale, namespace: 'blog' })

  let blogPosts
  try {
    blogPosts = await getBlogPosts(locale)
  } catch (error) {
    // Graceful error handling if data fetching fails
    console.error('Failed to fetch blog posts:', error)
    return (
      <section className="py-section bg-concrete-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-concrete-600">
            {locale === 'sv'
              ? 'Blogginlagg kunde inte laddas just nu.'
              : 'Blog posts could not be loaded at this time.'}
          </p>
        </div>
      </section>
    )
  }

  if (blogPosts.length === 0) {
    return null
  }

  // Take only the 3 latest posts for preview
  const latestPosts = blogPosts.slice(0, 3)
  const [featuredPost, ...otherPosts] = latestPosts

  return (
    <section className="py-section bg-concrete-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-display-md font-display text-primary-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-concrete-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Featured post spans 2 columns */}
          <BlogCard
            title={featuredPost.title}
            excerpt={featuredPost.excerpt}
            date={featuredPost.date_published}
            author={featuredPost.author}
            category={featuredPost.category}
            slug={featuredPost.slug}
            locale={locale}
            featured
          />

          {/* Other posts */}
          {otherPosts.map((post) => (
            <BlogCard
              key={post.post_id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date_published}
              author={post.author}
              category={post.category}
              slug={post.slug}
              locale={locale}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center">
          <Link
            href="/blogg"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-900 rounded-brutalist font-medium text-primary-900 bg-white shadow-brutalist transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {t('viewAll')}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
