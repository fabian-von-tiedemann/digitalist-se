import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPostSlugs, type BlogPostCategory } from '@/lib/directus'
import BlogCard from '@/components/BlogCard'
import JsonLd from '@/components/JsonLd'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const categoryLabels: Record<BlogPostCategory, { sv: string; en: string }> = {
  'ai-act': { sv: 'AI Act', en: 'AI Act' },
  'technical-guide': { sv: 'Teknisk guide', en: 'Technical Guide' },
  'case-story': { sv: 'Kundcase', en: 'Case Story' },
  'strategy': { sv: 'Strategi', en: 'Strategy' },
}

const categoryColors: Record<BlogPostCategory, { bg: string; text: string; border: string }> = {
  'ai-act': { bg: 'bg-accent-50', text: 'text-accent-700', border: 'border-accent-200' },
  'technical-guide': { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-200' },
  'case-story': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'strategy': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
}

function formatDate(dateString: string, locale: 'sv' | 'en'): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs()
  return slugs.map(({ slug, locale }) => ({
    locale,
    slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const typedLocale = locale as 'sv' | 'en'
  const post = await getBlogPostBySlug(slug, typedLocale)

  if (!post) {
    return {
      title: locale === 'sv' ? 'Artikel hittades inte' : 'Article not found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const typedLocale = locale as 'sv' | 'en'
  const t = await getTranslations({ locale, namespace: 'blog' })

  const post = await getBlogPostBySlug(slug, typedLocale)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedBlogPosts(post.category, post.slug, typedLocale, 2)
  const colors = categoryColors[post.category]
  const categoryLabel = categoryLabels[post.category][typedLocale]

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalist.se'
  const postUrl = `${baseUrl}/${locale}/blogg/${slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date_published).toISOString(),
    "dateModified": new Date(post.date_published).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digitalist",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digitalist.se/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": categoryLabel,
    "inLanguage": locale
  }

  return (
    <main className="py-section">
      <JsonLd data={articleSchema} />
      <article className="container mx-auto px-4">
        {/* Article header */}
        <header className="max-w-3xl mx-auto mb-12">
          {/* Category badge */}
          <span
            className={`
              inline-block px-3 py-1 text-sm font-medium rounded-brutalist mb-6 border
              ${colors.bg} ${colors.text} ${colors.border}
            `}
          >
            {categoryLabel}
          </span>

          {/* Title */}
          <h1 className="text-display-lg font-display text-primary-900 mb-6">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-concrete-600">
            <span>{formatDate(post.date_published, typedLocale)}</span>
            <span className="w-1 h-1 rounded-full bg-concrete-400" />
            <span>
              {t('article.author')} {post.author}
            </span>
          </div>
        </header>

        {/* Article content */}
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg prose-primary max-w-none
              prose-headings:font-display prose-headings:text-primary-900
              prose-p:text-concrete-700
              prose-a:text-accent-600 prose-a:no-underline hover:prose-a:text-accent-700
              prose-strong:text-primary-900
              prose-code:bg-concrete-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-primary-900 prose-pre:text-white
              prose-blockquote:border-l-accent-500 prose-blockquote:bg-accent-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-brutalist prose-blockquote:not-italic
              prose-li:text-concrete-700"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </div>

        {/* CTA section */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="border-2 border-primary-900 rounded-brutalist shadow-brutalist bg-accent-50 p-8 text-center">
            <p className="text-xl text-primary-900 mb-6">
              {t('article.cta')}
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-900 rounded-brutalist font-medium text-white bg-accent-600 shadow-brutalist transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              {t('article.ctaButton')}
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <aside className="max-w-5xl mx-auto mt-20">
            <h2 className="text-display-sm font-display text-primary-900 mb-8 text-center">
              {t('article.relatedPosts')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.post_id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={relatedPost.date_published}
                  author={relatedPost.author}
                  category={relatedPost.category}
                  slug={relatedPost.slug}
                  locale={typedLocale}
                />
              ))}
            </div>
          </aside>
        )}
      </article>
    </main>
  )
}

// Simple markdown to HTML conversion for content
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraphs (simple approach)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<)/, '<p>')
    .replace(/(?<!>)$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[123]>)/g, '$1')
    .replace(/(<\/h[123]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p>(<pre>)/g, '$1')
    .replace(/(<\/pre>)<\/p>/g, '$1')
}
