"use client";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactInformation } from "./contact-information";
import { ShippingMethod } from "./shipping-method";
import { PaymentMethod } from "./payment-method";
import { OrderReview } from "./order-review";
import { OrderConfirmation } from "./order-confirmation";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { createOrder } from "@/lib/actions/order";
import { useCartStore } from "@/lib/stores/cart";

export function CheckoutForm() {
    const {
        currentStep,
        setCurrentStep,
        validateStep,
        isProcessing,
        setIsProcessing,
        orderComplete,
        setOrderComplete,
        finalTotal,
        formData,
    } = useCheckoutStore();
    const { items, shipping, subtotal, tax, clearCart } = useCartStore();
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
        const res = await createOrder({
            items: items.map((i) => ({
                productId: i.product.id,
                quantity: i.count,
            })),
            amountPaid: Number(finalTotal),
            taxAmount: tax,
            shippingAmount: shipping,
            subtotal,
            ...formData,
        });
        if (res.success) {
            setOrderComplete(true);
            clearCart();
        }
        setIsProcessing(false);
    };

    if (orderComplete) {
        return <OrderConfirmation />;
    }

    return (
        <div className="space-y-6">
            {currentStep === 1 && <ContactInformation />}
            {currentStep === 2 && <ShippingMethod />}
            {currentStep === 3 && <PaymentMethod />}
            {currentStep === 4 && <OrderReview />}

            <div className="flex justify-between">
                {currentStep > 1 && (
                    <Button variant="outline" onClick={handlePrevStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                )}
                <div className="ml-auto">
                    {currentStep < 4 ? (
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
                                    Place Order - ${finalTotal.toFixed(2)}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
