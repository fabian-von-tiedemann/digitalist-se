'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function NewsletterSignup() {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return
    }

    setFormState('submitting')

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          email: email.trim().toLowerCase(),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Subscription failed')
      }

      setFormState('success')
      setEmail('')
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="flex items-center gap-2 text-accent-500">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <span className="font-medium">{t('success')}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (formState === 'error') setFormState('idle')
          }}
          disabled={formState === 'submitting'}
          placeholder={t('placeholder')}
          className="w-full border-2 border-primary-900 bg-white px-4 py-3 text-primary-900 transition-all focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="border-2 border-accent-500 bg-accent-500 px-6 py-3 font-bold uppercase tracking-wider text-white transition-all hover:border-accent-600 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formState === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t('submitting')}
          </span>
        ) : (
          t('button')
        )}
      </button>
      {formState === 'error' && (
        <p className="text-sm font-medium text-red-600 sm:hidden">
          {t('error')}
        </p>
      )}
    </form>
  )
}
