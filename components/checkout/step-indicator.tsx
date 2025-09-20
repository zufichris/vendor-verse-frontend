"use client"

import { useCheckoutStore } from "@/lib/stores/checkout"
import { cn } from "@/utils"

const steps = [
    { id: 1, name: "Information", description: "Contact & Shipping" },
    { id: 2, name: "Shipping", description: "Delivery Method" },
    { id: 3, name: "Review", description: "Order Summary" },
]

export function StepIndicator() {
    const { currentStep } = useCheckoutStore()

    return (
        <div className="w-full">
            <div className="flex items-center justify-around mb-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="relative w-full flex justify-center">
                        <div
                            className={`flex relative items-center z-50 justify-center h-8 w-8 sm:w-10 sm:h-10 rounded-full border-2 transition-colors ${currentStep >= step.id ? "border-primary bg-primary text-primary-foreground" : "border-secondary-300 bg-primary-foreground text-secondary-500"
                                }`}
                        >
                            {step.id}
                            <div className={cn("absolute -bottom-10 w-40 text-center mt-1 text-primary overflow-hidden p-1", currentStep >= step.id && "text-secondary")}>
                                <p className={`font-medium text-sm`}>
                                    {step.name}
                                </p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-full h-0.5 z-10 mx-4 absolute left-1/2 top-1/2 ${currentStep > step.id ? "bg-primary" : "bg-primary-foreground"}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
