"use client"

import { CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCheckoutStore } from "@/lib/stores/checkout"

const paymentOptions = [
    {
        id: "card",
        name: "Credit/Debit Card",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard,
    },
    {
        id: "paypal",
        name: "PayPal",
        description: "Pay with your PayPal account",
        icon: () => <div className="w-5 h-5 rounded bg-blue-900" />,
    },
    {
        id: "apple",
        name: "Apple Pay",
        description: "Touch ID or Face ID",
        icon: () => <div className="w-5 h-5 rounded bg-black" />,
    },
    {
        id: "google",
        name: "Google Pay",
        description: "Pay with Google",
        icon: () => <div className="w-5 h-5 rounded bg-blue-500" />,
    },
]

export function PaymentMethod() {
    const { paymentMethod, setPaymentMethod, formData, handleInputChange, errors } = useCheckoutStore()

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
                        {paymentOptions.map((option) => {
                            const IconComponent = option.icon
                            return (
                                <div
                                    key={option.id}
                                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <RadioGroupItem value={option.id} id={option.id} />
                                    <IconComponent className="h-5 w-5" />
                                    <div className="flex-1">
                                        <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                            {option.name}
                                        </Label>
                                        <p className="text-sm text-gray-600">{option.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </RadioGroup>

                    {paymentMethod === "card" && (
                        <div className="space-y-4 mt-6 p-4 border rounded-lg bg-gray-50">
                            <div>
                                <Label htmlFor="cardNumber">Card Number *</Label>
                                <Input
                                    id="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                    placeholder="1234 5678 9012 3456"
                                    className={errors.cardNumber ? "border-red-500" : ""}
                                />
                                {errors.cardNumber && <p className="text-sm mt-1 text-red-500">{errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                                    <Input
                                        id="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                        placeholder="MM/YY"
                                        className={errors.expiryDate ? "border-red-500" : ""}
                                    />
                                    {errors.expiryDate && <p className="text-sm mt-1 text-red-500">{errors.expiryDate}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="cvv">CVV *</Label>
                                    <Input
                                        id="cvv"
                                        value={formData.cvv}
                                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                                        placeholder="123"
                                        className={errors.cvv ? "border-red-500" : ""}
                                    />
                                    {errors.cvv && <p className="text-sm mt-1 text-red-500">{errors.cvv}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="nameOnCard">Name on Card *</Label>
                                <Input
                                    id="nameOnCard"
                                    value={formData.nameOnCard}
                                    onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                                    placeholder="Full name as shown on card"
                                    className={errors.nameOnCard ? "border-red-500" : ""}
                                />
                                {errors.nameOnCard && <p className="text-sm mt-1 text-red-500">{errors.nameOnCard}</p>}
                            </div>
                        </div>
                    )}
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
