"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { useCartStore } from "@/lib/stores/cart";

export function OrderReview() {
    const { formData } = useCheckoutStore();
    const { items, shipping, finalTotal, tax } = useCartStore();

    const currency = items[0]?.selectedVariant?.currency

    return (
        <Card>
            <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h4 className="font-medium">Items in your order</h4>
                    {items.map((item) => (
                        <div
                            key={item.productName}
                            className="flex items-center space-x-4 p-4 border rounded-lg"
                        >
                            <Image
                                src={item.selectedVariant.thumbnail.url || "/placeholder.svg"}
                                alt={item.productName}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <h5 className="font-medium">{item.productName}</h5>
                                <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                            </div>
                            <span className="font-medium">
                                {item.selectedVariant.currency}{(item.selectedVariant.price * item.count).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/*Shipping Summary */}
                <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Shipping Summary</h4>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{currency}{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>{currency}{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{currency}{Number(finalTotal).toFixed(2)}</span>
                    </div>
                </div>

                {/* Shipping & Billing Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                            <p>
                                {formData?.shippingFirstName || formData.billingFirstName} {formData?.shippingLastName || formData.billingLastName}
                            </p>
                            <p>{formData?.shippingAddress || formData.billingAddress}</p>
                            {formData?.shippingApartment || formData.billingApartment && <p>{formData?.shippingApartment || formData.billingApartment}</p>}
                            <p>
                                {formData?.shippingCity || formData.billingCity}, {formData?.shippingState || formData.billingState}{" "}
                                {formData?.shippingZipCode || formData.billingZipCode}
                            </p>
                            <p>{formData?.shippingCountry || formData.billingCountry}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
