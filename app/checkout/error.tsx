"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Checkout error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="  mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">Checkout Error</h1>
          <p className="text-gray-600 mb-8">
            We encountered an issue during checkout. Please try again or return to your cart.
          </p>

          <div className="space-y-4">
            <Button onClick={reset} className="w-full bg-black hover:bg-gray-800" size="lg">
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <Link href="/cart">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Return to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
