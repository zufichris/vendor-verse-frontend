"use client"

import { CircleDollarSign, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCheckoutStore } from "@/lib/stores/checkout"

export function PaymentMethod() {
    const { paymentMethod, setPaymentMethod, formData, handleInputChange, errors } = useCheckoutStore()

    const options = [
        {
            key: "stripe",
            value: "Card",
            icon: CreditCard,
            description: 'Pay by card'
        },
        {
            key: "cod",
            value: "Cash on Delivery (COD)",
            icon: CircleDollarSign,
            description: "Pay with cash on delivery"

        }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        {options.map((option) => {
                            const IconComponent = option.icon
                            return (
                                <div
                                    key={option.key}
                                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={()=>{
                                        setPaymentMethod(option.key)
                                    }}
                                >
                                    <RadioGroupItem value={option.key} id={option.key} />
                                    <IconComponent/>
                                    <div className="flex-1">
                                        <Label htmlFor={option.key} className="font-medium cursor-pointer">
                                            {option.value}
                                        </Label>
                                        <p className="text-sm text-gray-600">{option.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                        <Textarea
                            id="orderNotes"
                            value={formData.orderNotes}
                            onChange={(e) => handleInputChange("orderNotes", e.target.value)}
                            placeholder="Any special instructions for your order..."
                            rows={3}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
