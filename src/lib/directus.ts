import { createDirectus, rest, staticToken } from '@directus/sdk'

// Define your collections schema (will expand as content model grows)
type Schema = {
  pages: Page[]
  posts: Post[]
}

type Page = {
  id: string
  title: string
  slug: string
  content: string
  status: 'published' | 'draft' | 'archived'
}

type Post = {
  id: string
  title: string
  slug: string
  content: string
  status: 'published' | 'draft' | 'archived'
  date_published: string
}

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055'
const directusToken = process.env.DIRECTUS_API_TOKEN || ''

export const directus = createDirectus<Schema>(directusUrl)
  .with(staticToken(directusToken))
  .with(rest())

export type { Schema, Page, Post }
