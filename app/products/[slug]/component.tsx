import type React from "react"
import type { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"

interface ProductDetailsProps {
  product: Product
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.discountFixedAmount
      ? product.price - product.discountFixedAmount
      : null

  return (
    <div className="relative">
      {(product.discountPercentage || product.discountFixedAmount) && (
        <Badge
          className="absolute top-4 left-4 text-primary-foreground"
          style={{ backgroundColor: "rgb(239, 68, 68)" }}
        >
          -{product.discountPercentage || Math.round((product.discountFixedAmount! / product.price) * 100)}%
        </Badge>
      )}

      <div className="flex items-center gap-4 mb-6">
        {discountedPrice ? (
          <>
            <span className="text-3xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-xl line-through" style={{ color: "rgb(107, 114, 128)" }}>
              ${product.price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
          {product.name}
        </h2>
        <p style={{ color: "rgb(75, 85, 99)" }}>{product.description}</p>
      </div>

      <div className="mb-6">
        <Badge variant="outline">{product.brand || "No Brand"}</Badge>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: "rgb(17, 24, 39)" }}>
          Specifications
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium" style={{ color: "rgb(17, 24, 39)" }}>
              Category
            </span>
            <span style={{ color: "rgb(75, 85, 99)" }}>{product.category?.name || "Uncategorized"}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium" style={{ color: "rgb(17, 24, 39)" }}>
              Weight
            </span>
            <span style={{ color: "rgb(75, 85, 99)" }}>
              {product.weight ? `${product.weight} ${product.weightUnit || "lbs"}` : "N/A"}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium" style={{ color: "rgb(17, 24, 39)" }}>
              Dimensions
            </span>
            <span style={{ color: "rgb(75, 85, 99)" }}>
              {product.dimensions
                ? `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} ${product.dimensions.unit || "in"}`
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


