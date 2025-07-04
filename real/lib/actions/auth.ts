'use server'

import { db } from '@/lib/db'
import type { ApiResponse, User, LoginCredentials, RegisterData } from '@/lib/types'

export async function loginUser(credentials: LoginCredentials): Promise<ApiResponse<User | null>> {
  try {
    // Simulate authentication
    const user = await db.getUserByEmail(credentials.email)
    
    if (!user) {
      return {
        success: false,
        data: null,
        error: 'Invalid email or password',
      }
    }

    // In a real app, you'd verify the password hash here
    return {
      success: true,
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: 'Login failed',
    }
  }
}

export async function registerUser(userData: RegisterData): Promise<ApiResponse<User | null>> {
  try {
    // Check if user already exists
    const existingUser = await db.getUserByEmail(userData.email)
    
    if (existingUser) {
      return {
        success: false,
        data: null,
        error: 'User already exists',
      }
    }

    // Create new user
    const user = await db.createUser({
      name: userData.name,
      email: userData.email,
      role: 'customer',
    })

    return {
      success: true,
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: 'Registration failed',
    }
  }
}
