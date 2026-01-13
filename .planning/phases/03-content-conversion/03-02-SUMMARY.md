---
phase: 03-content-conversion
plan: 02
status: completed
completed_at: 2026-01-13
---

# Plan 03-02 Summary: Blog Section

## Objective
Create blog section with Directus CMS integration for thought leadership content.

## Tasks Completed

### Task 1: Add blog_posts types and mock data to directus.ts
- Added `BlogPost` and `BlogPostTranslation` types to Schema
- Added `BlogPostCategory` type with values: ai-act, technical-guide, case-story, strategy
- Created mock data with 3 blog posts (same pattern as case studies):
  1. "AI Act och svensk offentlig sektor" (ai-act category)
  2. "Sa bygger du suveran AI-infrastruktur" (technical-guide)
  3. "Socialstyrelsen: En framgangssaga" (case-story)
- Added helper functions: `getBlogPosts`, `getBlogPostBySlug`, `getAllBlogPostSlugs`, `getRelatedBlogPosts`
- Exported new types

### Task 2: Create BlogCard and BlogPreview components
- Created `BlogCard.tsx` with brutalist styling matching CaseCard
  - Props: title, excerpt, date, author, category, slug, locale, featured
  - Category badge with color coding per category
  - Date formatted with Intl.DateTimeFormat for locale
  - Link to /blogg/[slug]
- Created `BlogPreview.tsx` server component
  - Fetches 3 latest published posts
  - Featured post layout (first post larger)
  - Section header with translations
  - "Alla artiklar" link to /blogg
  - Graceful error handling

### Task 3: Create blog pages and integrate into homepage
- Created `/blogg` listing page with:
  - Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
  - All published posts displayed
  - Page metadata from translations
- Created `/blogg/[slug]` article detail page with:
  - Full article content with markdown rendering
  - Category badge and meta info
  - CTA section with contact link
  - Related posts (same category)
  - `generateStaticParams` for static generation
- Added BlogPreview to homepage after CaseStudies
- Added translations to sv.json and en.json:
  - blog.title, blog.subtitle, blog.viewAll, blog.readMore, blog.minRead
  - blog.categories.* (aiAct, technicalGuide, caseStory, strategy)
  - blog.article.relatedPosts, blog.article.author, blog.article.cta

## Files Modified
- `src/lib/directus.ts` - Added blog types, mock data, and helper functions
- `src/components/BlogCard.tsx` - New component
- `src/components/BlogPreview.tsx` - New component
- `src/app/[locale]/blogg/page.tsx` - Blog listing page
- `src/app/[locale]/blogg/[slug]/page.tsx` - Blog article detail page
- `src/app/[locale]/page.tsx` - Added BlogPreview import and render
- `messages/sv.json` - Added blog translations
- `messages/en.json` - Added blog translations

## Commits
1. `0d14158` - feat(03-02): add blog_posts types and mock data to directus.ts
2. `d8e8337` - feat(03-02): create BlogCard and BlogPreview components
3. `911cfdc` - feat(03-02): create blog pages and integrate BlogPreview into homepage

## Verification
- [x] `npm run build` succeeds without errors
- [x] Homepage displays blog preview with 3 posts
- [x] /blogg page lists all articles
- [x] /blogg/[slug] displays article with proper typography
- [x] Both sv and en content works via translations
- [x] Static generation works for all blog routes

## Deviations
- Used static mock data instead of actual Directus API (no token available, as noted in context)
- Category filtering on listing page not implemented (was marked as client-side filtering, kept page simple as server component)
- No featured_image field utilized (mock data has placeholder, but no actual images)

## Notes
- Mock data pattern matches case studies implementation from 03-01
- Simple markdown-to-HTML conversion implemented for article content
- Prose styling applied for article content (prose-primary with custom overrides)
- Related posts show articles from same category (excluding current article)
