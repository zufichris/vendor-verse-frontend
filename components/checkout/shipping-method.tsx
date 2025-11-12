"use client"

import { Truck, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCheckoutStore } from "@/lib/stores/checkout"
import { shippingOptions } from "@/constants/shipping"
import { useCartStore } from "@/lib/stores/cart"



export function ShippingMethod() {
    const { shippingMethod, setShippingMethod } = useCheckoutStore()
    const {updateShipping} = useCartStore()

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={(val)=>{
                    setShippingMethod(val)
                    updateShipping(val)
                }}>
                    {shippingOptions.map((option) => {
                        const IconComponent = option.icon
                        return (
                            <div
                                key={option.id}
                                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <IconComponent className="h-5 w-5 text-gray-600" />
                                <div className="flex-1">
                                    <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                        {option.name}
                                    </Label>
                                    <p className="text-sm text-gray-600">{option.description}</p>
                                </div>
                                <span className="font-semibold">{option.currency}{option.price.toFixed(2)}</span>
                            </div>
                        )
                    })}
                </RadioGroup>

                {/* <div className="mt-6 p-4 rounded-lg bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm text-blue-600">Shipping Protection</span>
                    </div>
                    <p className="text-sm text-gray-700">All orders are insured and tracked. Free returns within 30 days.</p>
                </div> */}
            </CardContent>
        </Card>
    )
}
