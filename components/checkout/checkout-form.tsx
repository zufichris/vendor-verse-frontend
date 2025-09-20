"use client";

import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactInformation } from "./contact-information";
import { ShippingMethod } from "./shipping-method";
import { OrderReview } from "./order-review";
import { OrderConfirmation } from "./order-confirmation";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { createOrder } from "@/lib/actions/order";
import { useCartStore } from "@/lib/stores/cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth";

export function CheckoutForm() {
    const {
        currentStep,
        setCurrentStep,
        validateStep,
        isProcessing,
        setIsProcessing,
        orderComplete,
        setOrderComplete,
        handleInputChange,
        saveInfo,
        formData
    } = useCheckoutStore();

    const router = useRouter();

    const { items, shipping, finalTotal, clearCart } = useCartStore();
    const { user } = useAuthStore()

    useEffect(() => {
        let savedData: Partial<typeof formData> = {};
        try {

            savedData = JSON.parse(localStorage.getItem('checkoutInfo') || '{}');
            console.log("Loaded saved checkout info:", savedData);
        } catch (error) {
            console.error("Failed to parse saved checkout info:", error);

        }
        handleInputChange("email", user?.email || savedData.email || "")
        handleInputChange("phone", user?.phone || savedData.phone || "")
        handleInputChange("billingAddress", savedData.billingAddress || "")
        handleInputChange("billingApartment", savedData.billingApartment || "")
        handleInputChange("billingCity", savedData.billingCity || "")
        handleInputChange("billingState", savedData.billingState || "")
        handleInputChange("billingZipCode", savedData.billingZipCode || "")
        handleInputChange("billingCountry", savedData.billingCountry || "United Arab Emirates")
        handleInputChange("billingFirstName", user?.firstName || savedData.billingFirstName || "")
        handleInputChange("billingLastName", user?.lastName || savedData.billingLastName || "")
    }, [user, handleInputChange, localStorage])

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(Math.min(currentStep + 1, 4));
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(Math.max(currentStep - 1, 1));
    };

    const handlePlaceOrder = async () => {
        if (!validateStep(4)) return;
        setIsProcessing(true);
        if (saveInfo) {
            localStorage.setItem('checkoutInfo', JSON.stringify(formData));
        }
        const res = await createOrder({
            items: items.map((i) => ({
                productId: i.product.id,
                quantity: i.count,
                discount: 0,
                name: i.product.name,
                price: i.product.price,
                sku: i.product.sku,
                total: i.count,
            })),
            shipping,
            shippingAddress: {
                city: formData.billingAddress,
                country: formData.billingCountry,
                email: formData.email,
                firstName: formData.billingFirstName,
                lastName: formData.billingLastName,
                phone: formData.phone,
                postalCode: formData.billingZipCode,
                state: formData.billingState,
                street: formData.billingApartment,
            },
            notes: formData.orderNotes,
        });
        if (res.success) {
            setOrderComplete(true);
            clearCart();
            router.push(res.data.paymentLink);
        }
        setIsProcessing(false);
    };

    if (orderComplete) {
        return <OrderConfirmation />;
    }

    return (
        <div className="space-y-6">
            {currentStep === 1 && <ContactInformation user={user} />}
            {currentStep === 2 && <ShippingMethod />}
            {/* {currentStep === 3 && <PaymentMethod />} */}
            {currentStep === 3 && <OrderReview />}

            <div className="flex justify-between">
                {currentStep > 1 && (
                    <Button variant="outline" onClick={handlePrevStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                )}
                <div className="ml-auto">
                    {currentStep < 3 ? (
                        <Button
                            onClick={handleNextStep}
                            className="bg-gray-900 hover:bg-gray-800"
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="px-8 bg-gray-900 hover:bg-gray-800"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Place Order - ${finalTotal}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
