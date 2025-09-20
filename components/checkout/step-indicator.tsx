"use client"

import { useCheckoutStore } from "@/lib/stores/checkout"

const steps = [
    { id: 1, name: "Information", description: "Contact & Shipping" },
    { id: 2, name: "Shipping", description: "Delivery Method" },
    { id: 3, name: "Payment", description: "Payment Details" },
    { id: 4, name: "Review", description: "Order Summary" },
]

export function StepIndicator() {
    const { currentStep } = useCheckoutStore()

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center relative">
                        <div
                            className={`flex relative items-center z-50 justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep >= step.id ? "border-primary bg-primary text-primary-foreground" : "border-secondary-300 bg-primary-foreground text-secondary-500"
                                }`}
                        >
                            {step.id}
                            <div className="absolute -bottom-10 w-40 text-center mt-1.5">
                                <p className={`font-medium text-sm ${currentStep >= step.id ? "text-secondary-900" : "text-secondary-400"}`}>
                                    {step.name}
                                </p>
                                <p className="text-xs text-secondary-600">{step.description}</p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-full h-0.5 z-10 mx-4 absolute ${currentStep > step.id ? "bg-primary" : "bg-primary-foreground"}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
