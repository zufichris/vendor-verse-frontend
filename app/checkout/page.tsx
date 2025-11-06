import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { StepIndicator } from "@/components/checkout/step-indicator";
import CheckoutProvider from "@/components/checkout/checkout-provider";

export default function CheckoutPage() {

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center">
      
      <div className="mx-auto w-full px-4 py-8">
        <CheckoutProvider>
          <>
            <div className="flex items-center mb-8">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-600">Complete your purchase securely</p>
              </div>
            </div>

            <StepIndicator />
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CheckoutForm />
              </div>

              <div className="lg:col-span-1">
                <OrderSummary />
              </div>
            </div>
          </>
        </CheckoutProvider>

      </div>
    </div>
  );
}
