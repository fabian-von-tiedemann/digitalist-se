---
phase: 01-foundation
plan: 02
subsystem: infra
tags: [upsun, directus, multi-app, postgresql, deployment]

requires: [01-01]
provides:
  - Directus CMS app configuration for Upsun
  - Multi-app Upsun configuration (Next.js + Directus)
  - PostgreSQL database service configuration
affects: [01-03, 02-01, 02-02, 02-03]

tech-stack:
  added: [directus@11.x, pg@8.x, postgresql@16]
  patterns: [multi-app-deployment, cms-subdomain, internal-relationships]

key-files:
  created: [directus/package.json, directus/.env.example, directus/extensions/.gitkeep, .upsun/config.yaml]
  modified: [.gitignore]

key-decisions:
  - "Directus 11.x with PostgreSQL for self-hosted CMS"
  - "Multi-app Upsun: frontend at root, CMS at cms.{domain}"
  - "Internal HTTP relationship for frontend->CMS communication"

patterns-established:
  - "Directus app in /directus subdirectory"
  - "Environment variables for Directus secrets via Upsun"
  - "Disk mounts for uploads and cache"

issues-created: []

duration: 8min
completed: 2026-01-13
---

# Phase 1 Plan 02: Upsun Deployment Configuration Summary

**Multi-app Upsun configuration with Next.js frontend and Directus CMS ready for deployment**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-13T18:09:00Z
- **Completed:** 2026-01-13T18:17:00Z
- **Tasks:** 2 completed, 1 blocked (CLI auth), 1 skipped (checkpoint)
- **Files modified:** 5

## Accomplishments

- Directus CMS application directory with package.json and configuration
- Upsun multi-app config: Next.js frontend + Directus CMS + PostgreSQL 16
- Internal service relationship for frontend to CMS communication
- Disk mounts configured for Directus uploads and Next.js cache

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Directus app directory** - `31177ec` (feat)
2. **Task 2: Create Upsun multi-app configuration** - `0bd2b42` (infra)
3. **Task 3: Deploy to Upsun** - SKIPPED (CLI unavailable/auth required)
4. **Task 4: Human verification checkpoint** - SKIPPED (YOLO mode)

## Files Created/Modified

- `directus/package.json` - Directus 11.x and PostgreSQL dependencies
- `directus/.env.example` - Environment template with all required vars
- `directus/extensions/.gitkeep` - Placeholder for custom extensions
- `.upsun/config.yaml` - Multi-app deployment configuration
- `.gitignore` - Added exception for directus/.env.example

## Decisions Made

- **Directus 11.x:** Latest major version for self-hosted CMS
- **PostgreSQL 16:** Latest stable PostgreSQL for Upsun services
- **Node.js 20:** LTS version for both applications
- **cms.{default} subdomain:** Clean separation of frontend and CMS admin

## Architecture

```
Upsun Project Structure:
├── frontend (Next.js)     → https://{default}/
│   └── mounts: .next/cache
│   └── relationships: directus -> cms:http
├── cms (Directus)         → https://cms.{default}/
│   └── mounts: uploads, extensions
│   └── relationships: database -> db:postgresql
└── services:
    └── db: postgresql:16
```

## Deviations from Plan

### Blocked Tasks

**Task 3: Deploy to Upsun - BLOCKED**
- **Reason:** Upsun CLI not available or authentication required
- **Impact:** Deployment configuration files are ready, actual deployment pending
- **Resolution:** Manual deployment required via `upsun auth:login` and `upsun push`

### Skipped Tasks

**Task 4: Human verification checkpoint - SKIPPED**
- **Reason:** YOLO mode with skip_checkpoints:true
- **Impact:** None, checkpoint verification not applicable until deployment

---

**Total deviations:** 1 blocked (CLI auth), 1 skipped (checkpoint)
**Impact on plan:** Configuration complete, deployment requires manual CLI auth

## Next Steps

To complete deployment manually:

1. Install Upsun CLI: `curl -fsSL https://raw.githubusercontent.com/platformsh/cli/main/installer.sh | bash`
2. Authenticate: `upsun auth:login`
3. Create project: `upsun project:create --title "Digitalist.se" --region "eu-5.platform.sh"`
4. Set environment variables:
   ```bash
   upsun variable:create --name SECRET --value "$(openssl rand -hex 32)" --level environment --sensitive true
   upsun variable:create --name ADMIN_EMAIL --value "admin@digitalist.se" --level environment
   upsun variable:create --name ADMIN_PASSWORD --value "$(openssl rand -base64 16)" --level environment --sensitive true
   upsun variable:create --name FRONTEND_API_TOKEN --value "$(openssl rand -hex 32)" --level environment --sensitive true
   ```
5. Deploy: `upsun push`

## Next Phase Readiness

- Deployment configuration complete
- Ready for manual Upsun deployment
- After deployment: Design system setup (Plan 01-03)

---
*Phase: 01-foundation*
*Completed: 2026-01-13*
