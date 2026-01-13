import { NextRequest, NextResponse } from 'next/server'
import { createFormSubmission } from '@/lib/directus'
import type { FormSubmissionType, FormSubmissionInterest } from '@/lib/directus'

// Rate limiting - simple in-memory store (will reset on server restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // max requests
const RATE_WINDOW = 60 * 1000 // per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Valid types and interests
const validTypes: FormSubmissionType[] = ['contact', 'newsletter', 'meeting']
const validInterests: FormSubmissionInterest[] = ['shield', 'spear', 'core', 'brain', 'general']

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    const { type, email, name, company, phone, message, interest } = body

    // Type validation
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission type' },
        { status: 400 }
      )
    }

    // Email validation
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Interest validation (if provided)
    if (interest && !validInterests.includes(interest)) {
      return NextResponse.json(
        { success: false, error: 'Invalid interest selection' },
        { status: 400 }
      )
    }

    // For contact type, name and message are required
    if (type === 'contact') {
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return NextResponse.json(
          { success: false, error: 'Name is required (minimum 2 characters)' },
          { status: 400 }
        )
      }
      if (!message || typeof message !== 'string' || message.trim().length < 10) {
        return NextResponse.json(
          { success: false, error: 'Message is required (minimum 10 characters)' },
          { status: 400 }
        )
      }
    }

    // Create submission in Directus
    const submission = await createFormSubmission({
      type,
      email: email.trim().toLowerCase(),
      name: name?.trim() || undefined,
      company: company?.trim() || undefined,
      phone: phone?.trim() || undefined,
      message: message?.trim() || undefined,
      interest: interest || undefined,
    })

    if (!submission) {
      // Fallback: log to console if Directus fails
      console.log('=== FORM SUBMISSION (Directus unavailable) ===')
      console.log('Type:', type)
      console.log('Email:', email)
      console.log('Name:', name)
      console.log('Company:', company)
      console.log('Interest:', interest)
      console.log('Timestamp:', new Date().toISOString())
      console.log('==============================================')

      return NextResponse.json({
        success: true,
        message: 'Submission received (offline mode)',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Submission received successfully',
      id: submission.id,
    })

  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred processing your submission' },
      { status: 500 }
    )
  }
}
