---
plan: 03-01
status: complete
completed_at: 2026-01-13
---

# Summary: Case Studies Section

## Completed Tasks

### Task 1: Create case_studies types and mock data
- Added `CaseStudy` and `CaseStudyTranslation` types to `src/lib/directus.ts`
- Created mock data with 3 case studies (Socialstyrelsen, Statlig myndighet, Vardorganisation)
- Added helper functions: `getCaseStudies()`, `getCaseStudyBySlug()`, `getAllCaseStudySlugs()`
- Each case study has Swedish and English translations

### Task 2: Create CaseCard and CaseStudies components
- Created `CaseCard.tsx` with brutalist styling (border-2, shadow-brutalist, hover animations)
- Created `CaseStudies.tsx` as a server component fetching data from mock
- Added translations for case studies section in `sv.json` and `en.json`
- Featured case (first) gets larger styling spanning 2 columns

### Task 3: Create case pages and integrate into homepage
- Created `/case` listing page with grid of CaseCards
- Created `/case/[slug]` detail page with:
  - Hero section with client badge and title
  - Results metrics banner
  - Challenge and Solution sections with icons
  - Quote/testimonial section (optional)
  - CTA section
  - Related cases section
- Integrated `CaseStudies` component into homepage after `ClientLogos`
- Used `generateStaticParams` for pre-rendering all case detail pages

## Deviations

1. **Directus API unavailable**: No `.env.local` file with API token exists, so Directus CMS collection was not created. Instead, used static mock data with the same schema structure. Added TODO comment for replacing with actual Directus fetch when CMS is configured.

## Verification Results

- [x] `npm run build` succeeds without errors
- [x] Directus types and mock data created (3 entries)
- [x] Homepage displays case studies section
- [x] `/case` page lists all published case studies
- [x] `/case/socialstyrelsen` shows detailed case study
- [x] Both sv and en content works (via translations)
- [x] Graceful error handling if data fetch fails

## Files Modified

- `src/lib/directus.ts` - Added CaseStudy types and mock data
- `src/components/CaseCard.tsx` - New component
- `src/components/CaseStudies.tsx` - New component
- `src/app/[locale]/case/page.tsx` - New page
- `src/app/[locale]/case/[slug]/page.tsx` - New page
- `src/app/[locale]/page.tsx` - Added CaseStudies to homepage
- `messages/sv.json` - Added cases translations
- `messages/en.json` - Added cases translations

## Commits

1. `6411bf9` - feat(03-01): add case studies types and mock data to Directus client
2. `be25520` - feat(03-01): create CaseCard and CaseStudies components with brutalist styling
3. `e6b7591` - feat(03-01): create case pages and integrate CaseStudies into homepage

## Next Steps

1. Configure Directus CMS with `case_studies` collection when API access is available
2. Replace mock data with actual Directus API calls in `getCaseStudies()` functions
3. Seed real case study content via Directus admin
4. Add images/media to case studies via Directus assets
