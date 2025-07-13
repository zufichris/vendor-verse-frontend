"use client"

import Link from "next/link"
import { Search, ArrowLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="  mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed from our catalog.
          </p>

          <div className="space-y-4">
            <Link href="/products">
              <Button className="w-full bg-black hover:bg-gray-800" size="lg">
                <Search className="h-5 w-5 mr-2" />
                Browse All Products
              </Button>
            </Link>

            <Button variant="outline" onClick={() => window.history.back()} className="w-full" size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
