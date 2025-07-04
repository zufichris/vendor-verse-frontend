'use server'

import { db } from '@/lib/db'
import type { ApiResponse, Order, CartItem, Address } from '@/lib/types'

export async function createOrder(
  userId: string,
  items: CartItem[],
  shippingAddress: Address,
  paymentMethod: string
): Promise<ApiResponse<Order | null>> {
  try {
    if (!items.length) {
      return {
        success: false,
        data: null,
        error: 'Cart is empty',
      }
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const order = await db.createOrder({
      userId,
      items,
      total,
      status: 'pending',
      shippingAddress,
      paymentMethod,
    })

    return {
      success: true,
      data: order,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: 'Failed to create order',
    }
  }
}

export async function getUserOrders(userId: string): Promise<ApiResponse<Order[]>> {
  try {
    const orders = await db.getUserOrders(userId)
    return {
      success: true,
      data: orders,
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      error: 'Failed to fetch orders',
    }
  }
}
