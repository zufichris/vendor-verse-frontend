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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth";
import { Order } from "@/types/order.types";
import { Spinner } from "../ui/spinner";

export function CheckoutForm() {
  const {
    currentStep,
    setCurrentStep,
    validateStep,
    isProcessing,
    setIsProcessing,
    orderComplete,
    setOrderComplete,
    // finalTotal,
    formData,
    newsletter,
    paymentMethod
  } = useCheckoutStore();

  const router = useRouter();

  const { items, shipping, subtotal, finalTotal, tax, clearCart } = useCartStore();
  const {handleInputChange, shippingMethod}=useCheckoutStore()
  const {user}=useAuthStore()
  // const [order, setOrder] = useState<Order | null>(null)

  const currency = items[0]?.selectedVariant.currency

  useEffect(()=>{
    handleInputChange("email",user?.email||"")
    handleInputChange("billingFirstName",user?.firstName||"")
    handleInputChange("billingLastName",user?.lastName||"")
    handleInputChange("shippingFirstName",user?.firstName||"")
    handleInputChange("shippingLastName",user?.lastName||"")
  },[user,handleInputChange])

  // console.log(user,"User")
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
        productId: i.selectedVariant.productId,
        variantId: i.selectedVariant.id,
        quantity: i.count,
        discount: 0,
        name: i.productName,
        price: i.selectedVariant.price,
        sku: i.selectedVariant.sku,
        total: i.count,
        imageUrl: i.selectedVariant.thumbnail.url || i.selectedVariant.images[0].url,
        metaData: {size: i.selectedSize}
      })),
      tax,
      shipping,
      shippingAddress: {
        city: formData.shippingAddress || formData.billingAddress,
        country: formData.shippingCountry || formData.billingCountry,
        email: formData.email,
        firstName: formData.shippingFirstName || formData.billingFirstName,
        lastName: formData.shippingLastName || formData.billingLastName,
        phone: formData.phone,
        postalCode: formData.shippingZipCode || formData.billingZipCode,
        state: formData.shippingState || formData.billingState,
        street: formData.shippingApartment || formData.billingApartment,
      },
      notes: formData.orderNotes,
      newsletter,
      currency: currency,
      paymentMethod: paymentMethod || 'stripe',
      billingAddress: {
        city: formData.billingAddress,
        country: formData.billingCountry,
        email: formData.email,
        firstName: formData.billingFirstName,
        lastName: formData.billingLastName,
        phone: formData.phone,
        postalCode: formData.billingZipCode,
        state: formData.billingState,
        street: formData.billingApartment,
      }
      
    });
    if (res.success) {
      setOrderComplete(true);
      clearCart();
      
      router.push(res.data.paymentLink || `/checkout/confirmation/${res.data.orderNumber}`);
    }
    setIsProcessing(false);
  };

  if (!items.length) {
    router.replace('/')
  }

  return (
    <div className="space-y-6">
      {currentStep === 1 && <ContactInformation user={user} />}
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
              disabled={isProcessing || orderComplete}
              className="px-8 bg-gray-900 hover:bg-gray-800"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Processing...
                </>
              ) : orderComplete ? (
                <div className="flex items-center">
                  <Spinner /> Redirecting
                </div>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Place Order - {currency}{finalTotal.toFixed(2)}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
