import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getBlogPosts } from '@/lib/directus'
import BlogCard from '@/components/BlogCard'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'blog' })
  const typedLocale = locale as 'sv' | 'en'

  let blogPosts
  try {
    blogPosts = await getBlogPosts(typedLocale)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return (
      <main className="py-section">
        <div className="container mx-auto px-4">
          <p className="text-center text-concrete-600">
            {locale === 'sv'
              ? 'Blogginlagg kunde inte laddas just nu.'
              : 'Blog posts could not be loaded at this time.'}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="py-section">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-display-lg font-display text-primary-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-concrete-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Blog posts grid */}
        {blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.post_id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date_published}
                author={post.author}
                category={post.category}
                slug={post.slug}
                locale={typedLocale}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-concrete-600">
            {locale === 'sv'
              ? 'Inga artiklar att visa.'
              : 'No articles to display.'}
          </p>
        )}
      </div>
    </main>
  )
}
