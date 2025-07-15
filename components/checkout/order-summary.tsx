"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Shield, Truck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/stores/cart";

export function OrderSummary() {
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);

    const { finalTotal, tax, subtotal, items, shipping } = useCartStore();

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "save10") {
            setPromoDiscount(subtotal * 0.1);
            setPromoApplied(true);
        }
    };

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-3">
                            <div className="relative">
                                <Image
                                    src={item.product.thumbnail.url || "/placeholder.svg"}
                                    alt={item.product.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md object-cover"
                                />
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gray-900">
                                    {item.count}
                                </Badge>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                    {item.product.name}
                                </h4>
                                <p className="text-sm text-gray-600">${item.product.price}</p>
                            </div>
                            <span className="font-medium text-sm">
                                ${(item.product.price * item.count).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                {/* <div className="flex gap-2">
                        <Input
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={promoApplied}
                        />
                        <Button
                            variant="outline"
                            onClick={applyPromoCode}
                            disabled={promoApplied || !promoCode}
                        >
                            Apply
                        </Button>
                    </div>*/}
                    {promoApplied && (
                        <p className="text-sm flex items-center gap-1 text-green-600">
                            <Check className="h-4 w-4" />
                            Promo code applied!
                        </p>
                    )}
                </div>

                <Separator />

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-${promoDiscount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${(finalTotal as number).toFixed(2)}</span>
                    </div>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>Secure SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Truck className="h-4 w-4" />
                        <span>Free returns within 30 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-4 w-4" />
                        <span>24/7 customer support</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
