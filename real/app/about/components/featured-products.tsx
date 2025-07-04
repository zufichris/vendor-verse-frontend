"use client"

import { useState, useEffect } from "react"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/actions/products"
import type { Product } from "@/lib/types"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [visibleProducts, setVisibleProducts] = useState(4)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    async function loadProducts() {
      const result = await getFeaturedProducts(8)
      if (result.success) {
        setProducts(result.data)
      }
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  const loadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleProducts((prev) => Math.min(prev + 4, products.length))
      setIsLoadingMore(false)
    }, 500)
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="  mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="  mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, carefully curated for quality and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.slice(0, visibleProducts).map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="text-center">
            <Button
              onClick={loadMore}
              disabled={isLoadingMore}
              size="lg"
              variant="outline"
              className="px-8 bg-transparent"
            >
              {isLoadingMore ? "Loading..." : "Load More Products"}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
