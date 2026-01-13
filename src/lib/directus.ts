import { createDirectus, rest, staticToken, readItems, createItem } from '@directus/sdk'

// Define your collections schema
type Schema = {
  languages: Language[]
  case_studies: CaseStudy[]
  case_studies_translations: CaseStudyTranslation[]
  blog_posts: BlogPost[]
  blog_posts_translations: BlogPostTranslation[]
  form_submissions: FormSubmission[]
}

type Language = {
  code: string
  name: string
}

// Form submission types
export type FormSubmissionType = 'contact' | 'newsletter' | 'meeting'
export type FormSubmissionInterest = 'shield' | 'spear' | 'core' | 'brain' | 'general'
export type FormSubmissionStatus = 'new' | 'contacted' | 'converted' | 'closed'

export type FormSubmission = {
  id?: string
  date_created?: string
  type: FormSubmissionType
  name?: string
  email: string
  company?: string
  phone?: string
  message?: string
  interest?: FormSubmissionInterest
  status?: FormSubmissionStatus
  notes?: string
}

type CaseStudy = {
  id: string
  status: 'published' | 'draft' | 'archived'
  sort: number
  translations: CaseStudyTranslation[] | number[]
}

type CaseStudyTranslation = {
  id: number
  case_studies_id: string
  languages_code: string
  title: string
  client: string
  slug: string
  description: string
  challenge: string
  solution: string
  results: string[]
  quote?: string
  quote_author?: string
}

type BlogPostCategory = 'ai-act' | 'technical-guide' | 'case-story' | 'strategy'

type BlogPost = {
  id: string
  status: 'published' | 'draft' | 'archived'
  date_published: string
  author: string
  category: BlogPostCategory
  featured_image?: string
  translations: BlogPostTranslation[] | number[]
}

type BlogPostTranslation = {
  id: number
  blog_posts_id: string
  languages_code: string
  title: string
  slug: string
  excerpt: string
  content: string
}

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055'
const directusToken = process.env.DIRECTUS_TOKEN || ''

export const directus = createDirectus<Schema>(directusUrl)
  .with(staticToken(directusToken))
  .with(rest())

// Helper function to get case studies by locale from Directus
export async function getCaseStudies(locale: 'sv' | 'en'): Promise<Array<CaseStudyTranslation & { case_id: string; sort: number }>> {
  try {
    const cases = await directus.request(
      readItems('case_studies', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort'],
        fields: ['id', 'status', 'sort', { translations: ['*'] }],
        deep: {
          translations: {
            _filter: { languages_code: { _eq: locale } }
          }
        }
      })
    )

    return cases
      .map((cs) => {
        const translations = cs.translations as CaseStudyTranslation[]
        const translation = translations?.[0]
        if (!translation) return null
        return {
          ...translation,
          case_id: cs.id,
          sort: cs.sort,
        }
      })
      .filter((t): t is NonNullable<typeof t> => t !== null)
  } catch (error) {
    console.error('Error fetching case studies from Directus:', error)
    return []
  }
}

// Helper function to get a single case study by slug and locale
export async function getCaseStudyBySlug(
  slug: string,
  locale: 'sv' | 'en'
): Promise<(CaseStudyTranslation & { case_id: string; sort: number }) | null> {
  try {
    const cases = await directus.request(
      readItems('case_studies', {
        filter: { status: { _eq: 'published' } },
        fields: ['id', 'status', 'sort', { translations: ['*'] }],
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
              slug: { _eq: slug }
            }
          }
        }
      })
    )

    for (const cs of cases) {
      const translations = cs.translations as CaseStudyTranslation[]
      const translation = translations?.[0]
      if (translation && translation.slug === slug) {
        return {
          ...translation,
          case_id: cs.id,
          sort: cs.sort,
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching case study by slug:', error)
    return null
  }
}

// Helper function to get all case study slugs for static generation
export async function getAllCaseStudySlugs(): Promise<Array<{ slug: string; locale: 'sv' | 'en' }>> {
  try {
    const cases = await directus.request(
      readItems('case_studies', {
        filter: { status: { _eq: 'published' } },
        fields: ['id', { translations: ['slug', 'languages_code'] }]
      })
    )

    const slugs: Array<{ slug: string; locale: 'sv' | 'en' }> = []
    for (const cs of cases) {
      const translations = cs.translations as CaseStudyTranslation[]
      for (const t of translations || []) {
        if (t.slug && (t.languages_code === 'sv' || t.languages_code === 'en')) {
          slugs.push({ slug: t.slug, locale: t.languages_code as 'sv' | 'en' })
        }
      }
    }
    return slugs
  } catch (error) {
    console.error('Error fetching case study slugs:', error)
    return []
  }
}

// Helper function to get blog posts by locale from Directus
export async function getBlogPosts(locale: 'sv' | 'en'): Promise<Array<BlogPostTranslation & { post_id: string; date_published: string; author: string; category: BlogPostCategory }>> {
  try {
    const posts = await directus.request(
      readItems('blog_posts', {
        filter: { status: { _eq: 'published' } },
        sort: ['-date_published'],
        fields: ['id', 'status', 'date_published', 'author', 'category', { translations: ['*'] }],
        deep: {
          translations: {
            _filter: { languages_code: { _eq: locale } }
          }
        }
      })
    )

    return posts
      .map((bp) => {
        const translations = bp.translations as BlogPostTranslation[]
        const translation = translations?.[0]
        if (!translation) return null
        return {
          ...translation,
          post_id: bp.id,
          date_published: bp.date_published,
          author: bp.author,
          category: bp.category,
        }
      })
      .filter((t): t is NonNullable<typeof t> => t !== null)
  } catch (error) {
    console.error('Error fetching blog posts from Directus:', error)
    return []
  }
}

// Helper function to get a single blog post by slug and locale
export async function getBlogPostBySlug(
  slug: string,
  locale: 'sv' | 'en'
): Promise<(BlogPostTranslation & { post_id: string; date_published: string; author: string; category: BlogPostCategory }) | null> {
  try {
    const posts = await directus.request(
      readItems('blog_posts', {
        filter: { status: { _eq: 'published' } },
        fields: ['id', 'status', 'date_published', 'author', 'category', { translations: ['*'] }],
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
              slug: { _eq: slug }
            }
          }
        }
      })
    )

    for (const bp of posts) {
      const translations = bp.translations as BlogPostTranslation[]
      const translation = translations?.[0]
      if (translation && translation.slug === slug) {
        return {
          ...translation,
          post_id: bp.id,
          date_published: bp.date_published,
          author: bp.author,
          category: bp.category,
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

// Helper function to get all blog post slugs for static generation
export async function getAllBlogPostSlugs(): Promise<Array<{ slug: string; locale: 'sv' | 'en' }>> {
  try {
    const posts = await directus.request(
      readItems('blog_posts', {
        filter: { status: { _eq: 'published' } },
        fields: ['id', { translations: ['slug', 'languages_code'] }]
      })
    )

    const slugs: Array<{ slug: string; locale: 'sv' | 'en' }> = []
    for (const bp of posts) {
      const translations = bp.translations as BlogPostTranslation[]
      for (const t of translations || []) {
        if (t.slug && (t.languages_code === 'sv' || t.languages_code === 'en')) {
          slugs.push({ slug: t.slug, locale: t.languages_code as 'sv' | 'en' })
        }
      }
    }
    return slugs
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

// Helper function to get related blog posts by category
export async function getRelatedBlogPosts(
  category: BlogPostCategory,
  currentSlug: string,
  locale: 'sv' | 'en',
  limit: number = 2
): Promise<Array<BlogPostTranslation & { post_id: string; date_published: string; author: string; category: BlogPostCategory }>> {
  const posts = await getBlogPosts(locale)
  return posts
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit)
}

// Helper function to create a form submission in Directus
export async function createFormSubmission(data: Omit<FormSubmission, 'id' | 'date_created'>): Promise<FormSubmission | null> {
  try {
    const result = await directus.request(
      createItem('form_submissions', {
        ...data,
        status: 'new'
      })
    )
    return result as FormSubmission
  } catch (error) {
    console.error('Error creating form submission:', error)
    return null
  }
}

export type { Schema, Language, CaseStudy, CaseStudyTranslation, BlogPost, BlogPostTranslation, BlogPostCategory }
