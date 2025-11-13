import { OrderConfirmation } from '@/components/checkout/order-confirmation';
import { getOrderTrackingInfo } from '@/lib/actions/order'
import { notFound } from 'next/navigation';
import React from 'react'
interface Props{
    params: Promise<{number: string}>
}

export default async function OrderConfirmationPage({params}:Props) {
    const {number} = await params;
    
    const order = await getOrderTrackingInfo(number)

    if (!order.success || !order.data) {
        return notFound()
    }

  return (
    <OrderConfirmation order={order.data}/>
  )
}
