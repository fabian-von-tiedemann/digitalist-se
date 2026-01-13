import { setRequestLocale, getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import TrustSignals from '@/components/TrustSignals'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200">
              {t('subtitle')}
            </p>
          </div>
        </div>
        {/* Bottom edge decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-accent-500" />
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="border-2 border-primary-900 bg-white p-6 shadow-brutal md:p-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-primary-900 md:text-3xl">
                {t('info.title')}
              </h2>

              <div className="mt-8 space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-primary-900 bg-primary-50">
                    <svg
                      className="h-6 w-6 text-primary-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-primary-800">
                      {t('info.address.label')}
                    </h3>
                    <p className="mt-1 whitespace-pre-line text-primary-600">
                      {t('info.address.value')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-primary-900 bg-primary-50">
                    <svg
                      className="h-6 w-6 text-primary-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-primary-800">
                      {t('info.email.label')}
                    </h3>
                    <a
                      href={`mailto:${t('info.email.value')}`}
                      className="mt-1 block text-accent-600 transition-colors hover:text-accent-700"
                    >
                      {t('info.email.value')}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-primary-900 bg-primary-50">
                    <svg
                      className="h-6 w-6 text-primary-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-primary-800">
                      {t('info.phone.label')}
                    </h3>
                    <a
                      href={`tel:${t('info.phone.value').replace(/\s/g, '')}`}
                      className="mt-1 block text-accent-600 transition-colors hover:text-accent-700"
                    >
                      {t('info.phone.value')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder or additional info */}
              <div className="mt-12 border-2 border-primary-200 bg-primary-50 p-6">
                <p className="text-sm text-primary-600">
                  {locale === 'sv'
                    ? 'Vi finns i centrala Stockholm och tar gärna emot besök efter överenskommelse.'
                    : 'We are located in central Stockholm and welcome visits by appointment.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <TrustSignals />
    </>
  )
}
