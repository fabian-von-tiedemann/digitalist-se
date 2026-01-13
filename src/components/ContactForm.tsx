'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  company: string
  phone: string
  message: string
  interest: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  interest: '',
}

export default function ContactForm() {
  const t = useTranslations('contact.form')
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const interestOptions = [
    { value: '', label: t('interests.select') },
    { value: 'shield', label: t('interests.shield') },
    { value: 'spear', label: t('interests.spear') },
    { value: 'core', label: t('interests.core') },
    { value: 'brain', label: t('interests.brain') },
    { value: 'general', label: t('interests.general') },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = t('errors.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid')
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = t('errors.messageRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Submission failed')
      }

      setFormState('success')
      setFormData(initialFormData)
    } catch (error) {
      setFormState('error')
      setErrorMessage(
        error instanceof Error ? error.message : t('errors.generic')
      )
    }
  }

  const handleRetry = () => {
    setFormState('idle')
    setErrorMessage('')
  }

  if (formState === 'success') {
    return (
      <div className="border-2 border-accent-500 bg-accent-50 p-8 shadow-brutal">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border-2 border-accent-500 bg-accent-500">
            <svg
              className="h-6 w-6 text-white"
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
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-900">
              {t('success.title')}
            </h3>
            <p className="text-primary-600">{t('success.message')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name field */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary-800"
        >
          {t('name')} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className={`w-full border-2 bg-white px-4 py-3 text-primary-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            errors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-primary-900 focus:border-accent-500 focus:ring-accent-500'
          } disabled:cursor-not-allowed disabled:opacity-50`}
          placeholder={t('placeholders.name')}
        />
        {errors.name && (
          <p className="mt-1 text-sm font-medium text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary-800"
        >
          {t('email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className={`w-full border-2 bg-white px-4 py-3 text-primary-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-primary-900 focus:border-accent-500 focus:ring-accent-500'
          } disabled:cursor-not-allowed disabled:opacity-50`}
          placeholder={t('placeholders.email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm font-medium text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Company field (optional) */}
      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary-800"
        >
          {t('company')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className="w-full border-2 border-primary-900 bg-white px-4 py-3 text-primary-900 transition-all focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={t('placeholders.company')}
        />
      </div>

      {/* Phone field (optional) */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary-800"
        >
          {t('phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className="w-full border-2 border-primary-900 bg-white px-4 py-3 text-primary-900 transition-all focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={t('placeholders.phone')}
        />
      </div>

      {/* Interest dropdown */}
      <div>
        <label
          htmlFor="interest"
          className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary-800"
        >
          {t('interest')}
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className="w-full border-2 border-primary-900 bg-white px-4 py-3 text-primary-900 transition-all focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message field */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary-800"
        >
          {t('message')} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          rows={5}
          className={`w-full resize-none border-2 bg-white px-4 py-3 text-primary-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-primary-900 focus:border-accent-500 focus:ring-accent-500'
          } disabled:cursor-not-allowed disabled:opacity-50`}
          placeholder={t('placeholders.message')}
        />
        {errors.message && (
          <p className="mt-1 text-sm font-medium text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error message */}
      {formState === 'error' && (
        <div className="border-2 border-red-500 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <div className="flex-1">
              <p className="font-medium text-red-800">{errorMessage}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-2 text-sm font-medium text-red-600 underline hover:text-red-800"
              >
                {t('errors.retry')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="btn-brutalist w-full border-accent-500 bg-accent-500 text-white hover:border-accent-600 hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formState === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
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
          t('submit')
        )}
      </button>
    </form>
  )
}
