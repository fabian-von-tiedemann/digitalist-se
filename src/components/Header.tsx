'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function Header() {
  const t = useTranslations('nav')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { href: '/tjanster', label: t('services') },
    { href: '/om-oss', label: t('about') },
    { href: '/kontakt', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary-900 bg-concrete-50/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold text-primary-900 transition-colors hover:text-accent-600"
          >
            Digitalist
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-primary-800 transition-colors hover:text-accent-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="btn-brutalist bg-accent-500 text-white hover:bg-accent-600"
            >
              {t('cta')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-brutalist p-2 text-primary-900 transition-colors hover:bg-concrete-200 md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Stäng meny' : 'Öppna meny'}
            </span>
            {/* Hamburger Icon */}
            <svg
              className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-40 transform border-b-2 border-primary-900 bg-concrete-50 shadow-brutalist-lg transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-brutalist px-4 py-3 font-medium text-primary-800 transition-colors hover:bg-concrete-200 hover:text-accent-600"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/kontakt"
              className="btn-brutalist block w-full bg-accent-500 text-center text-white hover:bg-accent-600"
              onClick={closeMobileMenu}
            >
              {t('cta')}
            </Link>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-primary-900/20 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
