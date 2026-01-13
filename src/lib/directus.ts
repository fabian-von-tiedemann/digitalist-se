import { createDirectus, rest, staticToken } from '@directus/sdk'

// Define your collections schema (will expand as content model grows)
type Schema = {
  pages: Page[]
  posts: Post[]
  case_studies: CaseStudy[]
  case_studies_translations: CaseStudyTranslation[]
  blog_posts: BlogPost[]
  blog_posts_translations: BlogPostTranslation[]
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

type BlogPostCategory = 'ai-act' | 'technical-guide' | 'case-story' | 'strategy'

type BlogPost = {
  id: string
  status: 'published' | 'draft' | 'archived'
  date_published: string
  author: string
  category: BlogPostCategory
  featured_image?: string
  translations: BlogPostTranslation[]
}

type BlogPostTranslation = {
  id: number
  blog_posts_id: string
  languages_code: 'sv' | 'en'
  title: string
  slug: string
  excerpt: string
  content: string
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

// Mock blog posts data for when Directus is unavailable
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    status: 'published',
    date_published: '2024-12-15T10:00:00Z',
    author: 'Anna Lindberg',
    category: 'ai-act',
    translations: [
      {
        id: 1,
        blog_posts_id: '1',
        languages_code: 'sv',
        title: 'AI Act och svensk offentlig sektor',
        slug: 'ai-act-svensk-offentlig-sektor',
        excerpt: 'EU:s AI Act trar i kraft 2025. Har ar vad svenska myndigheter behover veta for att forbereda sig.',
        content: `
## Vad ar AI Act?

EU:s AI Act ar varldens forsta omfattande lagstiftning for artificiell intelligens. Lagen klassificerar AI-system efter riskniva och staller olika krav beroende pa klassificering.

### Risknivaer

1. **Oacceptabel risk** - Forbjudna system (t.ex. social scoring)
2. **Hog risk** - Stranga krav pa transparens, dokumentation och mansklig oversyn
3. **Begransad risk** - Transparenskrav
4. **Minimal risk** - Inga sarskilda krav

## Vad betyder detta for svensk offentlig sektor?

Manga AI-system som anvands inom offentlig sektor kommer klassificeras som hog risk, sarskilt inom:

- Halso- och sjukvard
- Utbildning
- Tillgang till offentliga tjanster
- Rattsvasendet

### Forberedelser ni bor gora nu

1. **Inventera befintliga AI-system** - Kartlagg vilka AI-losningar ni anvander idag
2. **Klassificera efter riskniva** - Bedom vilken riskkategori varje system tillhor
3. **Dokumentera** - Borja bygga upp den dokumentation som kravs
4. **Utbilda personalen** - Sakertsall att relevanta medarbetare forstar regelverket

## Hur Digitalist kan hjalpa

Vi erbjuder:

- AI Act-revision av befintliga system
- Suveran AI-infrastruktur som uppfyller kraven
- Utbildning och workshops
- Lopande compliance-stod

Kontakta oss for en kostnadsfri forsta konsultation.
        `,
      },
      {
        id: 2,
        blog_posts_id: '1',
        languages_code: 'en',
        title: 'AI Act and Swedish public sector',
        slug: 'ai-act-swedish-public-sector',
        excerpt: 'The EU AI Act comes into force in 2025. Here is what Swedish authorities need to know to prepare.',
        content: `
## What is the AI Act?

The EU AI Act is the world's first comprehensive legislation for artificial intelligence. The law classifies AI systems by risk level and sets different requirements depending on classification.

### Risk levels

1. **Unacceptable risk** - Prohibited systems (e.g., social scoring)
2. **High risk** - Strict requirements for transparency, documentation, and human oversight
3. **Limited risk** - Transparency requirements
4. **Minimal risk** - No specific requirements

## What does this mean for Swedish public sector?

Many AI systems used in the public sector will be classified as high risk, especially in:

- Healthcare
- Education
- Access to public services
- Justice system

### Preparations you should make now

1. **Inventory existing AI systems** - Map which AI solutions you use today
2. **Classify by risk level** - Assess which risk category each system belongs to
3. **Document** - Start building the required documentation
4. **Train staff** - Ensure relevant employees understand the regulations

## How Digitalist can help

We offer:

- AI Act audit of existing systems
- Sovereign AI infrastructure that meets requirements
- Training and workshops
- Ongoing compliance support

Contact us for a free initial consultation.
        `,
      },
    ],
  },
  {
    id: '2',
    status: 'published',
    date_published: '2024-12-01T09:00:00Z',
    author: 'Erik Svensson',
    category: 'technical-guide',
    translations: [
      {
        id: 3,
        blog_posts_id: '2',
        languages_code: 'sv',
        title: 'Sa bygger du suveran AI-infrastruktur',
        slug: 'bygga-suveran-ai-infrastruktur',
        excerpt: 'En teknisk guide till att bygga AI-losningar som uppfyller krav pa datasuveranitet och regelefterlevnad.',
        content: `
## Vad ar suveran AI?

Suveran AI innebar att data och berakningar stannar inom nationella granser och under nationell kontroll. For svensk offentlig sektor ar detta kritiskt for att uppfylla GDPR, OSL och kommande AI Act.

### Nyckelkomponenter

1. **Svensk hosting** - Data lagras i svenska datacenter
2. **Oppenhet** - Anvand open source nar mojligt
3. **Kontroll** - Full insyn i hur data behandlas
4. **Skalbarhet** - Infrastruktur som vaxer med behoven

## Stacken.ai - Var AI-plattform

Stacken.ai ar var plattform for suveran AI, byggd pa:

- **Kubernetes** - Container-orkestrering i svenska datacenter
- **Open source LLM:er** - Llama, Mistral, och andra oppna modeller
- **RAG-arkitektur** - Retrieval-Augmented Generation for sakra svar
- **Fullstandig loggning** - Sparbarhet for compliance

### Arkitekturmonster

\`\`\`
[Anvandare] -> [API Gateway] -> [LLM Service]
                    |
                    v
            [Vektor-databas] <- [Dokument-pipeline]
\`\`\`

## Kom igang

1. Kontakta oss for en arkitektur-workshop
2. Vi utvardererar era behov och datakallor
3. Proof-of-concept pa 4-6 veckor
4. Produktionssattning med lopande support

Redo att bygga suveran AI? Kontakta oss idag.
        `,
      },
      {
        id: 4,
        blog_posts_id: '2',
        languages_code: 'en',
        title: 'How to build sovereign AI infrastructure',
        slug: 'building-sovereign-ai-infrastructure',
        excerpt: 'A technical guide to building AI solutions that meet data sovereignty and compliance requirements.',
        content: `
## What is sovereign AI?

Sovereign AI means that data and computations stay within national borders and under national control. For Swedish public sector, this is critical to comply with GDPR, OSL, and the upcoming AI Act.

### Key components

1. **Swedish hosting** - Data stored in Swedish datacenters
2. **Openness** - Use open source when possible
3. **Control** - Full transparency in how data is processed
4. **Scalability** - Infrastructure that grows with needs

## Stacken.ai - Our AI platform

Stacken.ai is our platform for sovereign AI, built on:

- **Kubernetes** - Container orchestration in Swedish datacenters
- **Open source LLMs** - Llama, Mistral, and other open models
- **RAG architecture** - Retrieval-Augmented Generation for secure answers
- **Complete logging** - Traceability for compliance

### Architecture pattern

\`\`\`
[User] -> [API Gateway] -> [LLM Service]
                |
                v
        [Vector database] <- [Document pipeline]
\`\`\`

## Get started

1. Contact us for an architecture workshop
2. We evaluate your needs and data sources
3. Proof-of-concept in 4-6 weeks
4. Production deployment with ongoing support

Ready to build sovereign AI? Contact us today.
        `,
      },
    ],
  },
  {
    id: '3',
    status: 'published',
    date_published: '2024-11-15T08:00:00Z',
    author: 'Maria Andersson',
    category: 'case-story',
    translations: [
      {
        id: 5,
        blog_posts_id: '3',
        languages_code: 'sv',
        title: 'Socialstyrelsen: En framgangssaga',
        slug: 'socialstyrelsen-framgangssaga',
        excerpt: 'Hur Socialstyrelsen transformerade sin dokumenthantering med suveran AI och sparade miljoner.',
        content: `
## Bakgrund

Socialstyrelsen ar en statlig myndighet som hanterar tusentals dokument dagligen. Manuell klassificering och bearbetning tog avsevard tid och resurser.

### Utmaningen

- 10 000+ dokument per manad
- Inkonsekvent klassificering
- Langa handlaggningstider
- Behov av GDPR- och OSL-kompatibel losning

## Losningen

Vi implementerade en AI-driven dokumenthanteringslosning baserad pa var Stacken.ai-plattform.

### Teknisk implementation

1. **Dokumentinlasning** - Automatisk OCR och textextraktion
2. **Klassificering** - AI-modell tranad pa myndighetens dokumenttyper
3. **Informationsextraktion** - Automatisk identifiering av nyckelinformation
4. **Workflow-integration** - Somlost kopplad till befintliga system

### Resultat

Efter 6 manaders drift:

- **40% effektivisering** - Snabbare handlaggning
- **2M kr arlig besparing** - Minskade personalkostnader
- **99.2% noggrannhet** - Battre an manuell klassificering
- **100% compliance** - Uppfyller alla regulatoriska krav

## Kundens ord

> "Digitalist har hjälpt oss att transformera vår dokumenthantering på ett sätt som uppfyller alla våra regulatoriska krav."
>
> *- IT-chef, Socialstyrelsen*

## Vill du veta mer?

Kontakta oss for att diskutera hur vi kan hjalpa er organisation.
        `,
      },
      {
        id: 6,
        blog_posts_id: '3',
        languages_code: 'en',
        title: 'National Board of Health and Welfare: A success story',
        slug: 'socialstyrelsen-success-story',
        excerpt: 'How the National Board of Health and Welfare transformed their document management with sovereign AI and saved millions.',
        content: `
## Background

The National Board of Health and Welfare is a government agency that handles thousands of documents daily. Manual classification and processing took considerable time and resources.

### The challenge

- 10,000+ documents per month
- Inconsistent classification
- Long processing times
- Need for GDPR and OSL-compliant solution

## The solution

We implemented an AI-driven document management solution based on our Stacken.ai platform.

### Technical implementation

1. **Document ingestion** - Automatic OCR and text extraction
2. **Classification** - AI model trained on the agency's document types
3. **Information extraction** - Automatic identification of key information
4. **Workflow integration** - Seamlessly connected to existing systems

### Results

After 6 months of operation:

- **40% efficiency gain** - Faster processing
- **2M SEK annual savings** - Reduced personnel costs
- **99.2% accuracy** - Better than manual classification
- **100% compliance** - Meets all regulatory requirements

## Client testimonial

> "Digitalist has helped us transform our document management in a way that meets all our regulatory requirements."
>
> *- IT Director, National Board of Health and Welfare*

## Want to learn more?

Contact us to discuss how we can help your organization.
        `,
      },
    ],
  },
]

// Helper function to get blog posts by locale
export async function getBlogPosts(locale: 'sv' | 'en'): Promise<Array<BlogPostTranslation & { post_id: string; date_published: string; author: string; category: BlogPostCategory }>> {
  // Return mock data (Directus CMS not accessible without API token)
  // TODO: Replace with actual Directus fetch when CMS is configured
  return mockBlogPosts
    .filter((bp) => bp.status === 'published')
    .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
    .map((bp) => {
      const translation = bp.translations.find((t) => t.languages_code === locale)
      if (!translation) return null
      return {
        ...translation,
        post_id: bp.id,
        date_published: bp.date_published,
        author: bp.author,
        category: bp.category,
      }
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
}

// Helper function to get a single blog post by slug and locale
export async function getBlogPostBySlug(
  slug: string,
  locale: 'sv' | 'en'
): Promise<(BlogPostTranslation & { post_id: string; date_published: string; author: string; category: BlogPostCategory }) | null> {
  const posts = await getBlogPosts(locale)
  return posts.find((p) => p.slug === slug) || null
}

// Helper function to get all blog post slugs for static generation
export async function getAllBlogPostSlugs(): Promise<Array<{ slug: string; locale: 'sv' | 'en' }>> {
  const slugs: Array<{ slug: string; locale: 'sv' | 'en' }> = []
  for (const bp of mockBlogPosts.filter((p) => p.status === 'published')) {
    for (const t of bp.translations) {
      slugs.push({ slug: t.slug, locale: t.languages_code })
    }
  }
  return slugs
}

// Helper function to get related blog posts by category
export async function getRelatedBlogPosts(
  category: BlogPostCategory,
  currentSlug: string,
  locale: 'sv' | 'en',
  limit: number = 2
): Promise<Array<BlogPostTranslation & { post_id: string; date_published: string; author: string; category: BlogPostCategory }>> {
  const posts = await getBlogPosts(locale)
  return posts
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit)
}

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

export type { Schema, Page, Post, CaseStudy, CaseStudyTranslation, BlogPost, BlogPostTranslation, BlogPostCategory }
