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
    cardNumber: string
    expiryDate: string
    cvv: string
    nameOnCard: string
    orderNotes: string
}

interface CheckoutStore {
    currentStep: number
    paymentMethod: string
    shippingMethod: string
    isProcessing: boolean
    orderComplete: boolean
    newsletter: boolean
    saveInfo: boolean
    formData: FormData
    errors: Record<string, string>
    finalTotal: number

    setCurrentStep: (step: number) => void
    setPaymentMethod: (method: string) => void
    setShippingMethod: (method: string) => void
    setIsProcessing: (processing: boolean) => void
    setOrderComplete: (complete: boolean) => void
    setNewsletter: (newsletter: boolean) => void
    setSaveInfo: (saveInfo: boolean) => void
    handleInputChange: (field: string, value: string) => void
    validateStep: (step: number) => boolean
}

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
    currentStep: 1,
    paymentMethod: "card",
    shippingMethod: "standard",
    isProcessing: false,
    orderComplete: false,
    newsletter: false,
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
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
        orderNotes: "",
    },
    errors: {},

    setCurrentStep: (step) => set({ currentStep: step }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    setShippingMethod: (method) => set({ shippingMethod: method }),
    setIsProcessing: (processing) => set({ isProcessing: processing }),
    setOrderComplete: (complete) => set({ orderComplete: complete }),
    setNewsletter: (newsletter) => set({ newsletter }),
    setSaveInfo: (saveInfo) => set({ saveInfo }),

    handleInputChange: (field, value) => {
        set((state) => ({
            formData: { ...state.formData, [field]: value },
            errors: { ...state.errors, [field]: "" },
        }))
    },

    validateStep: (step) => {
        const { formData, paymentMethod } = get()
        const newErrors: Record<string, string> = {}
        if (step === 1) {
            if (!formData.email) newErrors.email = "Email is required"
            if (!formData.billingFirstName) newErrors.billingFirstName = "First name is required"
            if (!formData.billingLastName) newErrors.billingLastName = "Last name is required"
            if (!formData.billingAddress) newErrors.billingAddress = "Address is required"
            if (!formData.billingCity) newErrors.billingCity = "City is required"
            if (!formData.billingState) newErrors.billingState = "State is required"
            if (!formData.billingZipCode) newErrors.billingZipCode = "ZIP code is required"
        }
        if (step === 3 && paymentMethod === "card") {
            if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
            if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
            if (!formData.cvv) newErrors.cvv = "CVV is required"
            if (!formData.nameOnCard) newErrors.nameOnCard = "Name on card is required"
        }
        set({ errors: newErrors })
        return Object.keys(newErrors).length === 0
    },
}))
