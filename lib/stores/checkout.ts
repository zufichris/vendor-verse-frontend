"use client"
import { PaymentMethod } from "@/types/order.types"
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
    shippingFirstName: string
    shippingLastName: string
    shippingAddress: string
    shippingApartment: string
    shippingCity: string
    shippingState: string
    shippingZipCode: string
    shippingCountry: string
    cardNumber: string
    expiryDate: string
    cvv: string
    nameOnCard: string
    orderNotes: string
    discountCode: string
    discountRate: number
}

interface CheckoutStore {
    currentStep: number
    paymentMethod: PaymentMethod
    shippingMethod: string
    isProcessing: boolean
    orderComplete: boolean
    saveInfo: boolean
    formData: FormData
    errors: Partial<Record<keyof FormData, string>>
    finalTotal: number
    newsletter: boolean


    setCurrentStep: (step: number) => void
    setShippingMethod: (method: string) => void
    setPaymentMethod: (method: string) => void
    setIsProcessing: (processing: boolean) => void
    setOrderComplete: (complete: boolean) => void
    setSaveInfo: (saveInfo: boolean) => void
    handleInputChange: (field: keyof FormData, value: string | number) => void
    validateStep: (step: number) => boolean
}

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
    currentStep: 1,
    paymentMethod: "stripe",
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
        billingCountry: "United Arab Emirates",
        shippingFirstName: "",
        shippingLastName: "",
        shippingAddress: "",
        shippingApartment: "",
        shippingCity: "",
        shippingState: "",
        shippingZipCode: "",
        shippingCountry: "United Arab Emirates",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
        orderNotes: "",
        discountCode: '',
        discountRate: 0
    },
    newsletter: false,
    errors: {},

    setCurrentStep: (step) => set({ currentStep: step }),
    setPaymentMethod: (method) => set({ paymentMethod: method as PaymentMethod }),
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
        // if (step === 3 && paymentMethod === "stripe") {
        //     if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
        //     if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
        //     if (!formData.cvv) newErrors.cvv = "CVV is required"
        //     if (!formData.nameOnCard) newErrors.nameOnCard = "Name on card is required"
        // }
        set({ errors: newErrors })
        return Object.keys(newErrors).length === 0
    },
}))
