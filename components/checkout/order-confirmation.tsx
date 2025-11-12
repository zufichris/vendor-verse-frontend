"use client"

import Link from "next/link"
import { Check, Mail, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCheckoutStore } from "@/lib/stores/checkout"
import { Order } from "@/types/order.types"
import { useRouter } from "next/navigation"
import { shippingOptions } from "@/constants/shipping"

export function OrderConfirmation({order}:{order:Order}) {
    const { formData } = useCheckoutStore()

    const shippingInfo = shippingOptions.find(itm => itm.price === order.shipping)



    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-green-500">
                        <Check className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">Order Confirmed!</h1>
                    <p className="text-xl mb-2 text-gray-700">Thank you for your purchase, {formData.billingFirstName}!</p>
                    <p className="mb-8 text-gray-600">
                        Your order {order?.orderNumber} has been confirmed and will be processed shortly.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6 text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold">Order Confirmation</h3>
                                </div>
                                <p className="text-sm text-gray-600">A confirmation email has been sent to {formData.email}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <Truck className="h-5 w-5 text-green-600" />
                                    <h3 className="font-semibold">Estimated Delivery</h3>
                                </div>
                                <p className="text-sm text-gray-600">{shippingInfo?.description || '0-1 business days'}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Link href={`/account/orders/${order?.orderNumber}`}>
                            <Button className="w-full md:w-auto px-8 bg-gray-900 hover:bg-gray-800">Track Your Order</Button>
                        </Link>
                        <Link href="/shop">
                            <Button variant="outline" className="w-full md:w-auto px-8 ml-0 md:ml-4 bg-transparent">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
