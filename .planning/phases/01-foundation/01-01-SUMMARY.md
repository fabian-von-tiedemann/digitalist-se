---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [next.js, directus, next-intl, typescript, tailwind]

requires: []
provides:
  - Next.js 15 project with TypeScript and Tailwind
  - Directus SDK typed client configuration
  - i18n routing with Swedish default, English secondary
affects: [01-02, 01-03, 02-01, 02-02, 02-03]

tech-stack:
  added: [next@15.5.9, @directus/sdk, next-intl, tailwindcss]
  patterns: [app-router, locale-routing, typed-cms-client]

key-files:
  created: [package.json, src/lib/directus.ts, src/i18n/request.ts, src/i18n/routing.ts, src/middleware.ts, messages/sv.json, messages/en.json]
  modified: [next.config.ts, tailwind.config.ts]

key-decisions:
  - "Upgraded to Next.js 15 (from planned 14) to fix security vulnerabilities"
  - "next-intl with localePrefix 'as-needed' for clean Swedish URLs"
  - "Directus SDK with static token auth pattern"

patterns-established:
  - "Locale-aware pages in src/app/[locale]/ directory"
  - "Message files in messages/{locale}.json"
  - "CMS client in src/lib/directus.ts with typed schema"

issues-created: []

duration: 12min
completed: 2026-01-13
---

# Phase 1 Plan 01: Teknikstack-beslut och projektsetup Summary

**Next.js 15 with Directus SDK and next-intl i18n routing, zero security vulnerabilities**

## Performance

- **Duration:** 12 min
- **Started:** 2026-01-13T18:02:46Z
- **Completed:** 2026-01-13T18:14:00Z
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments

- Next.js 15.5.9 project with TypeScript, Tailwind CSS, ESLint 9
- Directus SDK client with typed Page and Post schemas
- next-intl routing: Swedish at /, English at /en
- Zero npm vulnerabilities (upgraded from 14.2.x)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Next.js 15 project** - `0da5775` (feat)
2. **Task 2: Add Directus SDK** - `3068265` (feat)
3. **Task 3: Configure i18n routing** - `881e8b1` (feat)

## Files Created/Modified

- `package.json` - Project dependencies and scripts
- `next.config.ts` - Next.js config with next-intl plugin
- `tailwind.config.ts` - Tailwind configuration
- `src/lib/directus.ts` - Typed Directus client
- `src/i18n/request.ts` - next-intl request config
- `src/i18n/routing.ts` - Locale routing definition
- `src/middleware.ts` - Locale detection middleware
- `src/app/[locale]/layout.tsx` - Locale-aware layout
- `src/app/[locale]/page.tsx` - Translated home page
- `messages/sv.json` - Swedish translations
- `messages/en.json` - English translations
- `.env.local.example` - Environment template

## Decisions Made

- **Upgraded to Next.js 15:** Original plan specified 14.x but all 14.2.x versions had security vulnerabilities. Upgraded to 15.5.9 with zero vulnerabilities. Required ESLint 9 upgrade as well.
- **next-intl over alternatives:** Chosen for type-safe translations and robust App Router support with generateStaticParams.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Upgraded Next.js to fix security vulnerabilities**
- **Found during:** Task 1 (Project setup)
- **Issue:** Next.js 14.2.21 and 14.2.28 both flagged with security vulnerabilities
- **Fix:** Upgraded to Next.js 15.5.9, ESLint 9.39.2, eslint-config-next 15.5.9
- **Verification:** `npm audit` shows 0 vulnerabilities
- **Impact:** Uses newer APIs (async params in page components)

---

**Total deviations:** 1 auto-fixed (security critical)
**Impact on plan:** Necessary upgrade for production security. No functionality loss.

## Issues Encountered

None

## Next Phase Readiness

- Foundation complete with Next.js 15 + Directus SDK + i18n
- Ready for Upsun deployment (Plan 01-02)
- Ready for design tokens (Plan 01-03)

---
*Phase: 01-foundation*
*Completed: 2026-01-13*
