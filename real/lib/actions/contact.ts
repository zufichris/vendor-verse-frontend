'use server'

import { db } from '@/lib/db'
import type { ApiResponse, ContactForm } from '@/lib/types'

export async function submitContactForm(formData: ContactForm): Promise<ApiResponse<boolean>> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        success: false,
        data: false,
        error: 'All required fields must be filled',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        data: false,
        error: 'Invalid email format',
      }
    }

    await db.submitContactForm(formData)

    return {
      success: true,
      data: true,
    }
  } catch (error) {
    return {
      success: false,
      data: false,
      error: 'Failed to submit contact form',
    }
  }
}
