# Digitalist.se — Ny sajt

## What This Is

En konverteringsdriven foretagssajt for Digitalist Open Tech AB som positionerar bolaget som Sveriges enda oppna helhetspartner for suveran AI i offentlig sektor. Sajten samlar Digitalist, Stacken.ai och Digitalist.cloud under ett unified brand och ska generera kvalificerade leads genom thought leadership som leder till tydliga affarskonverteringar.

## Current State (v1.0)

**Shipped:** 2026-01-13
**LOC:** 3,470 TypeScript
**Tech stack:** Next.js 15, Directus CMS, Tailwind CSS, next-intl
**Deploy:** Upsun multi-app (frontend + CMS)
**URLs:**
- Frontend: https://main-bvxea6i-gyichbvbjhhpy.eu-5.platformsh.site/
- CMS: https://cms.main-bvxea6i-gyichbvbjhhpy.eu-5.platformsh.site/admin

## Core Value

**Pengar in.** Sajten ska generera affarer — varje designbeslut, varje textstycke, varje interaktion utvarderas mot fragan "leder detta till konvertering?"

## Requirements

### Validated

- Hero-sektion som kommunicerar "Suveran AI for offentlig sektor" pa 5 sekunder — v1.0
- De fyra dimensionerna (Shield, Spear, Core, Brain) som tydliga tjansteinganger — v1.0
- Kundcase-sektion med Socialstyrelsen och andra dokumenterade case — v1.0
- Trust signals: ISO-certifikat, kundloggor, synligt tidigt pa sidan — v1.0
- Multipla konverteringspunkter: kontaktformular, CTA-banners — v1.0
- Design: "Modern brutalism moter sci-fi" — auktoritar/solid + transparent — v1.0
- SEO-optimerad struktur med redirects fran nuvarande sajt — v1.0
- LLM SEO — strukturerat innehall som AI-modeller kan referera korrekt — v1.0
- Blogg/nyhetssektion for thought leadership — v1.0
- Flersprakarkitektur (svenska forst, engelska fardigt) — v1.0
- WCAG-tillganglighet (offentlig sektor-krav) — v1.0

### Active

- [ ] Stacken.ai och Digitalist.cloud integrerade som produkter under Digitalist-paraplyet
- [ ] Karriarsidor for rekrytering
- [ ] Whitepaper-nedladdning som konverteringspunkt
- [ ] Boka mote-funktionalitet (Calendly/Cal.com integration)
- [ ] Actual client logos (replace placeholder text)
- [ ] Real case study content from Directus CMS
- [ ] Real blog content from Directus CMS
- [ ] Production domain (digitalist.se) DNS cutover

### Out of Scope

- Kundportal/inloggade sidor — hanteras separat
- E-handel/direktkop — detta ar lead generation, inte transaktioner
- Komplex interaktiv produktdemo — case och beskrivningar racker

## Context

**Marknadssituation:**
Sveriges offentliga sektor behover effektivisera med 140 miljarder kr. AI ar losningen, men GDPR/OSL/AI Act blockerar amerikanska molntjanster. Digitalist ager losningen genom fysisk kontroll + oppen kallkod pa svensk mark.

**Positionering:**
"The Sovereign Powerhouse" — mellan stora drakar (Atea/CGI) och nischade teknikbolag. Vinner pa fysik & frihet mot drakar, helhet & havstang mot nischer.

**Malgrupper (alla lika viktiga):**
- IT-chef/CIO: Teknisk trovardighet, arkitektur, sakerhet
- Verksamhetschef: Affarsnytta, ROI, konkreta losningar
- Strateg: Vision, framtidssakring, thought leadership

**Sub-brands som integreras:**
- Stacken.ai (AI-plattform) -> "The Shield"
- Digitalist.cloud (Kubernetes-infrastruktur) -> "The Shield"

**Designriktning:**
"Myndig Innovation" — inte startup-lekfullt, inte myndighetsgratt. Materialitet: betong, stal, ljusstralar, glas. Struktur och transparens.

## Constraints

- **Hosting:** Upsun.com — plattformen maste vara kompatibel
- **Tillganglighet:** WCAG 2.1 AA — offentlig sektor som malgrupp kraver detta
- **Analytics:** Overvag GDPR-vanliga alternativ (Plausible/Matomo) givet malgruppen
- **Sprak:** Arkitektur for i18n fran start, svenska som default
- **SEO:** Redirects fran nuvarande sajt obligatoriskt vid launch
- **Inga SaaS-beroenden:** Allt ska vara open source och kunna koras self-hosted pa Upsun

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Unified brand (inte separata sub-brands) | Forenklar kopbeslut, ett Digitalist som gor allt | — Pending |
| Hybrid approach (thought leadership -> konvertering) | Offentlig sektor koper inte direkt, behover bygga fortroende forst | — Pending |
| Svenska forst, i18n-ready | Primar malgrupp ar svensk offentlig sektor | Good |
| **Next.js 15 + Directus + PostgreSQL** | Open source, Directus partner, multi-app pa Upsun | Good |
| **next-intl for i18n** | Robust routing, type-safe, svenska default utan /sv prefix | Good |
| **Tailwind CSS + design tokens** | "Myndig Innovation" estetik, snabb utveckling | Good |
| **CSS clip-path icons** | No external icon libs, small bundle | Good |
| **Mock data pattern** | CMS-ready but works without Directus API | Good |
| **JsonLd component** | Reusable Schema.org injection | Good |
| **Focus trap via Tab interception** | No external a11y library needed | Good |

---
*Last updated: 2026-01-13 after v1.0 milestone*
