"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Product detail error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="  mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't load this product. It might have been removed or you may have followed a broken link.
          </p>

          <div className="space-y-4">
            <Button onClick={reset} className="w-full bg-black hover:bg-gray-800" size="lg">
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <Link href="/products">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
