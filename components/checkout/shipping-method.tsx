"use client"

import { Truck, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckoutStore, useCheckoutStore } from "@/lib/stores/checkout"
import { shippingOptions } from "@/constants/shipping"
import { useCartStore } from "@/lib/stores/cart"
import { useEffect } from "react"

const mainCountry = 'united arab emirates'.replace(/\s+/g, ' ').trim().toLowerCase()



export function ShippingMethod() {
    const { shippingMethod, setShippingMethod, finalTotal, formData } = useCheckoutStore()
    const {updateShipping, shipping} = useCartStore()

    const selectedCountry = (formData.shippingCountry || formData.billingCountry).replace(/\s+/g, ' ').trim().toLowerCase()

    const withinSameCountry = selectedCountry === mainCountry

    useEffect(()=>{
        if (withinSameCountry) {
            setShippingMethod(finalTotal >= 500 ? 'free' : 'standard')
            updateShipping(finalTotal >= 500 ? 'free' : 'standard')
        }else{
            setShippingMethod('international')
            updateShipping('international')

        }
    },[formData.shippingCountry, formData.billingCountry])

    const ShippingOptions = !withinSameCountry ? shippingOptions.filter(opt => opt.id === 'international') : shippingOptions.filter(itm => shippingMethod === 'free' ? itm.id === 'free' : itm.id !== 'free' && itm.id !== 'international');

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Option
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={(val)=>{
                    setShippingMethod(val as CheckoutStore['shippingMethod'])
                    updateShipping(val)
                }} disabled={!(ShippingOptions.length > 1)}>
                    {ShippingOptions.map((option) => {
                        const IconComponent = option.icon
                        return (
                            <div
                                key={option.id}
                                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <IconComponent className="h-5 w-5 text-gray-600 hidden sm:block" />
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
