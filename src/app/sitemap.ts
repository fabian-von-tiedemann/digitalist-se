import type { MetadataRoute } from 'next'
import { getCaseStudies, getBlogPosts } from '@/lib/directus'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalist.se'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/case`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogg`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blogg`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic case study pages
  const caseStudiesSv = await getCaseStudies('sv')
  const caseStudiesEn = await getCaseStudies('en')

  const casePages = [
    ...caseStudiesSv.map((cs) => ({
      url: `${baseUrl}/case/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...caseStudiesEn.map((cs) => ({
      url: `${baseUrl}/en/case/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // Dynamic blog post pages
  const blogPostsSv = await getBlogPosts('sv')
  const blogPostsEn = await getBlogPosts('en')

  const blogPages = [
    ...blogPostsSv.map((post) => ({
      url: `${baseUrl}/blogg/${post.slug}`,
      lastModified: new Date(post.date_published),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...blogPostsEn.map((post) => ({
      url: `${baseUrl}/en/blogg/${post.slug}`,
      lastModified: new Date(post.date_published),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticPages, ...casePages, ...blogPages]
}
