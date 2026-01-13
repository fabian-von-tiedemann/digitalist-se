import { createDirectus, rest, staticToken } from '@directus/sdk'

// Define your collections schema (will expand as content model grows)
type Schema = {
  pages: Page[]
  posts: Post[]
  case_studies: CaseStudy[]
  case_studies_translations: CaseStudyTranslation[]
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

type CaseStudy = {
  id: string
  status: 'published' | 'draft' | 'archived'
  sort: number
  translations: CaseStudyTranslation[]
}

type CaseStudyTranslation = {
  id: number
  case_studies_id: string
  languages_code: 'sv' | 'en'
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

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055'
const directusToken = process.env.DIRECTUS_API_TOKEN || ''

export const directus = createDirectus<Schema>(directusUrl)
  .with(staticToken(directusToken))
  .with(rest())

// Mock case studies data for when Directus is unavailable
const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    status: 'published',
    sort: 1,
    translations: [
      {
        id: 1,
        case_studies_id: '1',
        languages_code: 'sv',
        title: 'AI-driven dokumenthantering',
        client: 'Socialstyrelsen',
        slug: 'socialstyrelsen',
        description: 'Implementation av suveran AI-losning for automatiserad dokumentklassificering och informationsextraktion.',
        challenge: 'Socialstyrelsen hanterade tusentals dokument manuellt varje manad, vilket ledde till langa handlaggningstider och inkonsekvent klassificering.',
        solution: 'Vi implementerade en AI-driven dokumenthanteringslosning byggd pa var Stacken.ai-plattform, helt hostad i svenska datacenter for att uppfylla GDPR och OSL.',
        results: ['40% effektivisering', '2M kr arlig besparing', '99.2% klassificeringsnoggrannhet'],
        quote: 'Digitalist har hjälpt oss att transformera vår dokumenthantering på ett sätt som uppfyller alla våra regulatoriska krav.',
        quote_author: 'IT-chef, Socialstyrelsen',
      },
      {
        id: 2,
        case_studies_id: '1',
        languages_code: 'en',
        title: 'AI-driven document management',
        client: 'National Board of Health and Welfare',
        slug: 'socialstyrelsen',
        description: 'Implementation of sovereign AI solution for automated document classification and information extraction.',
        challenge: 'The National Board of Health and Welfare processed thousands of documents manually each month, leading to long processing times and inconsistent classification.',
        solution: 'We implemented an AI-driven document management solution built on our Stacken.ai platform, fully hosted in Swedish datacenters to comply with GDPR and OSL.',
        results: ['40% efficiency gain', '2M SEK annual savings', '99.2% classification accuracy'],
        quote: 'Digitalist has helped us transform our document management in a way that meets all our regulatory requirements.',
        quote_author: 'IT Director, National Board of Health and Welfare',
      },
    ],
  },
  {
    id: '2',
    status: 'published',
    sort: 2,
    translations: [
      {
        id: 3,
        case_studies_id: '2',
        languages_code: 'sv',
        title: 'Prediktiv analys for resursplanering',
        client: 'Statlig myndighet',
        slug: 'statlig-myndighet-resursplanering',
        description: 'Maskininlarningsmodeller for att forutsaga arbetsbelastning och optimera personalplanering.',
        challenge: 'Myndigheten hade svårt att forutsaga arbetsbelastning, vilket ledde till antingen overbemanning eller underkapacitet.',
        solution: 'Vi byggde prediktiva ML-modeller som analyserar historiska data och externa faktorer for att ge veckovisa prognoser.',
        results: ['25% battre resursutnyttjande', '15% minskad overtid', '30% snabbare handlaggning'],
        quote: 'Prognoserna har blivit en central del av var planeringsprocess.',
        quote_author: 'Verksamhetschef',
      },
      {
        id: 4,
        case_studies_id: '2',
        languages_code: 'en',
        title: 'Predictive analytics for resource planning',
        client: 'Government Agency',
        slug: 'government-agency-resource-planning',
        description: 'Machine learning models to predict workload and optimize staff planning.',
        challenge: 'The agency struggled to predict workload, leading to either overstaffing or insufficient capacity.',
        solution: 'We built predictive ML models that analyze historical data and external factors to provide weekly forecasts.',
        results: ['25% better resource utilization', '15% reduced overtime', '30% faster processing'],
        quote: 'The forecasts have become a central part of our planning process.',
        quote_author: 'Operations Manager',
      },
    ],
  },
  {
    id: '3',
    status: 'published',
    sort: 3,
    translations: [
      {
        id: 5,
        case_studies_id: '3',
        languages_code: 'sv',
        title: 'Sakert dataflode for varden',
        client: 'Vardorganisation',
        slug: 'vardorganisation-dataflode',
        description: 'Integration av kansliga halsodata mellan system med fullstandig spar barhet och kryptering.',
        challenge: 'Vardorganisationen behovde dela patientdata mellan olika system utan att kompromissa med integriteten.',
        solution: 'Vi designade en sakerhetsarkitektur med end-to-end-kryptering, detaljerad loggning och rollbaserad atkomstkontroll pa var Digitalist.cloud-plattform.',
        results: ['100% GDPR-kompatibilitet', '50% snabbare datadelning', 'Noll sakerhetsincideneter'],
        quote: 'Vi kan nu dela data sakert mellan vara system utan att oroa oss for integritetsfragor.',
        quote_author: 'CISO',
      },
      {
        id: 6,
        case_studies_id: '3',
        languages_code: 'en',
        title: 'Secure data flow for healthcare',
        client: 'Healthcare Organization',
        slug: 'healthcare-organization-dataflow',
        description: 'Integration of sensitive health data between systems with full auditability and encryption.',
        challenge: 'The healthcare organization needed to share patient data between different systems without compromising privacy.',
        solution: 'We designed a security architecture with end-to-end encryption, detailed logging, and role-based access control on our Digitalist.cloud platform.',
        results: ['100% GDPR compliance', '50% faster data sharing', 'Zero security incidents'],
        quote: 'We can now securely share data between our systems without worrying about privacy issues.',
        quote_author: 'CISO',
      },
    ],
  },
]

// Helper function to get case studies by locale
export async function getCaseStudies(locale: 'sv' | 'en'): Promise<Array<CaseStudyTranslation & { case_id: string; sort: number }>> {
  // Return mock data (Directus CMS not accessible without API token)
  // TODO: Replace with actual Directus fetch when CMS is configured
  return mockCaseStudies
    .filter((cs) => cs.status === 'published')
    .sort((a, b) => a.sort - b.sort)
    .map((cs) => {
      const translation = cs.translations.find((t) => t.languages_code === locale)
      if (!translation) return null
      return {
        ...translation,
        case_id: cs.id,
        sort: cs.sort,
      }
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
}

// Helper function to get a single case study by slug and locale
export async function getCaseStudyBySlug(
  slug: string,
  locale: 'sv' | 'en'
): Promise<(CaseStudyTranslation & { case_id: string; sort: number }) | null> {
  const cases = await getCaseStudies(locale)
  return cases.find((c) => c.slug === slug) || null
}

// Helper function to get all case study slugs for static generation
export async function getAllCaseStudySlugs(): Promise<Array<{ slug: string; locale: 'sv' | 'en' }>> {
  const slugs: Array<{ slug: string; locale: 'sv' | 'en' }> = []
  for (const cs of mockCaseStudies.filter((c) => c.status === 'published')) {
    for (const t of cs.translations) {
      slugs.push({ slug: t.slug, locale: t.languages_code })
    }
  }
  return slugs
}

export type { Schema, Page, Post, CaseStudy, CaseStudyTranslation }
