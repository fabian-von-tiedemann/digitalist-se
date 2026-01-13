---
phase: 04-polish-launch
plan: 01
subsystem: seo
tags: [next-js, metadata, sitemap, robots, redirects, hreflang, open-graph]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js 15 App Router, next-intl i18n
  - phase: 02-core-pages
    provides: Page structure (home, kontakt, case, blogg)
  - phase: 03-content-conversion
    provides: Dynamic content pages with CMS integration
provides:
  - Dynamic metadata with generateMetadata per page
  - Sitemap.xml with static and CMS-driven pages
  - Robots.txt with sitemap reference
  - Redirect configuration for old URL patterns
  - Hreflang alternates for sv/en locales
affects: [04-02, 04-03, launch]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - generateMetadata pattern for locale-aware SEO
    - MetadataRoute.Sitemap for dynamic sitemap generation
    - MetadataRoute.Robots for robots.txt configuration

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/app/[locale]/kontakt/page.tsx
    - src/app/[locale]/case/page.tsx
    - src/app/[locale]/blogg/page.tsx
    - next.config.ts

key-decisions:
  - "Used Next.js 15 Metadata API (no third-party SEO libraries)"
  - "Redirects marked permanent: false (temporary until full URL audit)"
  - "Swedish canonical URLs without /sv prefix (next-intl as-needed)"

patterns-established:
  - "generateMetadata with locale-aware canonicals and hreflang"
  - "Dynamic sitemap pulling from CMS data functions"

issues-created: []

# Metrics
duration: 4min
completed: 2026-01-13
---

# Phase 4 Plan 1: SEO och redirects Summary

**Complete SEO infrastructure with dynamic metadata, sitemap/robots generation, and legacy URL redirects for digitalist.se migration**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-13T19:43:44Z
- **Completed:** 2026-01-13T19:47:50Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Dynamic generateMetadata on all pages with OG/Twitter cards and hreflang alternates
- Sitemap.xml with static pages and CMS-driven case/blog entries (sv + en)
- Robots.txt allowing crawlers, disallowing /api/, referencing sitemap
- Redirect configuration for old digitalist.se URL patterns

## Task Commits

Each task was committed atomically:

1. **Task 1: Add dynamic metadata with generateMetadata per page** - `07e5f84` (feat)
2. **Task 2: Create sitemap.ts and robots.ts** - `d4f103e` (feat)
3. **Task 3: Configure redirects in next.config.ts** - `10bfb87` (feat)

## Files Created/Modified

- `src/app/[locale]/layout.tsx` - Base metadata template with OG/Twitter/viewport
- `src/app/[locale]/page.tsx` - Home page generateMetadata with hreflang
- `src/app/[locale]/kontakt/page.tsx` - Contact page metadata with alternates
- `src/app/[locale]/case/page.tsx` - Case studies page metadata
- `src/app/[locale]/blogg/page.tsx` - Blog page metadata with alternates
- `src/app/sitemap.ts` - Dynamic sitemap with CMS integration
- `src/app/robots.ts` - Robots.txt configuration
- `next.config.ts` - Redirects and trailingSlash config

## Decisions Made

- Used native Next.js 15 Metadata API instead of next-seo or other libraries (cleaner, no deps)
- Marked redirects as `permanent: false` - these are placeholders until full URL audit of current digitalist.se
- Swedish URLs use clean paths (no /sv prefix) per next-intl as-needed configuration

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Next Phase Readiness

- SEO infrastructure complete and verified via build
- Ready for Phase 4 Plan 2 (WCAG-tillganglighet)
- TODO noted in next.config.ts for complete URL mapping before launch

---
*Phase: 04-polish-launch*
*Completed: 2026-01-13*
