"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Products page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="  mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">Failed to Load Products</h1>
          <p className="text-gray-600 mb-8">
            We're having trouble loading the products. Please try again or go back to the homepage.
          </p>

          <div className="space-y-4">
            <Button onClick={reset} className="w-full bg-black hover:bg-gray-800" size="lg">
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <Link href="/home">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
