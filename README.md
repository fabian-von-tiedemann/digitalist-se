# Digitalist.se

Konverteringsdriven foretagssajt for Digitalist Open Tech AB — Sveriges enda oppna helhetspartner for suveran AI i offentlig sektor.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Directus 11.x (self-hosted)
- **Styling:** Tailwind CSS med design tokens
- **i18n:** next-intl (svenska default, engelska)
- **Hosting:** Upsun (multi-app deploy)

## Kom igang

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev

# Bygg for produktion
npm run build
```

Oppna [http://localhost:3000](http://localhost:3000) i webblasaren.

## Projektstruktur

```
src/
├── app/
│   ├── [locale]/          # Locale-baserade sidor
│   │   ├── page.tsx       # Startsida
│   │   ├── kontakt/       # Kontaktsida
│   │   ├── case/          # Kundcase
│   │   └── blogg/         # Blogg
│   └── api/               # API routes
├── components/            # React-komponenter
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Dimensions.tsx
│   └── ...
├── lib/
│   ├── directus.ts        # CMS-klient
│   └── fonts.ts           # Typsnittskonfiguration
└── i18n/                  # Internationalisering
    ├── routing.ts
    └── request.ts

directus/                  # Directus CMS-app
.upsun/                    # Upsun deploy-konfiguration
.planning/                 # Projektplanering (GSD workflow)
```

## Design

"Myndig Innovation" — brutalistisk estetik som kommunicerar auktoritet och transparens. Tre fargpaletter:

- **Primary:** Navy (#0a1628)
- **Accent:** Blue (#2563eb)
- **Concrete:** Gray (#6b7280)

## De fyra dimensionerna

1. **AI Shield** — Sakerhetslosningar och compliance
2. **AI Spear** — Offensiva AI-verktyg
3. **AI Core** — Infrastruktur och plattform
4. **AI Brain** — Strategi och radgivning

## Deployment

Sajten deployas automatiskt till Upsun vid push till main.

**URLs:**
- Frontend: https://main-bvxea6i-gyichbvbjhhpy.eu-5.platformsh.site/
- CMS Admin: https://cms.main-bvxea6i-gyichbvbjhhpy.eu-5.platformsh.site/admin

## Utveckling

### Lagg till oversattningar

Redigera `messages/sv.json` och `messages/en.json`.

### Lagg till nytt innehall

Case studies och bloggposter hanteras via Directus CMS eller mock data i `src/lib/directus.ts`.

### SEO

- Metadata: `generateMetadata()` per sida
- Sitemap: `src/app/sitemap.ts`
- Schema.org: `JsonLd`-komponenten

## Licens

Proprietary — Digitalist Open Tech AB
