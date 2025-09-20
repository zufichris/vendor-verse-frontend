"use client"
import { create } from "zustand"

interface FormData {
    email: string
    phone: string
    billingFirstName: string
    billingLastName: string
    billingAddress: string
    billingApartment: string
    billingCity: string
    billingState: string
    billingZipCode: string
    billingCountry: string
    orderNotes: string
}

interface CheckoutStore {
    currentStep: number
    shippingMethod: string
    isProcessing: boolean
    orderComplete: boolean
    saveInfo: boolean
    formData: FormData
    errors: Partial<Record<keyof FormData, string>>
    finalTotal: number

    setCurrentStep: (step: number) => void
    setShippingMethod: (method: string) => void
    setIsProcessing: (processing: boolean) => void
    setOrderComplete: (complete: boolean) => void
    setSaveInfo: (saveInfo: boolean) => void
    handleInputChange: (field: keyof FormData, value: string) => void
    validateStep: (step: number) => boolean
}

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
    currentStep: 1,
    shippingMethod: "standard",
    isProcessing: false,
    orderComplete: false,
    saveInfo: false,
    finalTotal: 0,
    formData: {
        email: "",
        phone: "",
        billingFirstName: "",
        billingLastName: "",
        billingAddress: "",
        billingApartment: "",
        billingCity: "",
        billingState: "",
        billingZipCode: "",
        billingCountry: "United States",
        orderNotes: "",
    },
    errors: {},

    setCurrentStep: (step) => set({ currentStep: step }),
    setShippingMethod: (method) => set({ shippingMethod: method }),
    setIsProcessing: (processing) => set({ isProcessing: processing }),
    setOrderComplete: (complete) => set({ orderComplete: complete }),
    setSaveInfo: (saveInfo) => set({ saveInfo }),

    handleInputChange: (field, value) => {
        set((state) => ({
            formData: { ...state.formData, [field]: value },
            errors: { ...state.errors, [field]: "" },
        }))
    },

    validateStep: (step) => {
        const { formData } = get()

        const newErrors: Record<string, string> = {}
        if (step === 1) {
            if (!formData.email) newErrors.email = "Email is required"
            if (!formData.phone) newErrors.phone = "Phone number is required"
            if (!formData.billingFirstName) newErrors.billingFirstName = "First name is required"
            if (!formData.billingLastName) newErrors.billingLastName = "Last name is required"
            if (!formData.billingAddress) newErrors.billingAddress = "Address is required"
            if (!formData.billingCity) newErrors.billingCity = "City is required"
            if (!formData.billingState) newErrors.billingState = "State is required"
            if (!formData.billingZipCode) newErrors.billingZipCode = "ZIP code is required"
        }

        set({ errors: newErrors })
        return Object.keys(newErrors).length === 0
    },
}))
