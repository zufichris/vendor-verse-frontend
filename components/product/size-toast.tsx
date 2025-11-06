"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ProductVariant } from "@/types/product"

interface SizeToastProps {
  product: ProductVariant
  onClose: () => void
  onSelect: (selected:string)=>void
  onConfirm: (size:string)=>void
  isConfirming: boolean
  size:string | null
}

export function SizeToast({ product, onClose, onSelect, isConfirming, onConfirm, size }: SizeToastProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(size)


  return (
    <div className="w-full max-w-sm bg-card rounded-lg shadow-lg p-4 animate-in fade-in slide-in-from-bottom-4 duration-300 bg-primary-foreground">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Size</p>
          <h3 className="text-sm font-bold text-foreground mt-1 line-clamp-1">{product.name}</h3>
        </div>
        <button
          onClick={(e)=>{
            e.stopPropagation()
            onClose?.()
          }}
          className="ml-2 p-1 hover:bg-muted rounded-md transition-colors duration-200"
          aria-label="Close"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Size Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={(e) => {
              e.stopPropagation()
                setSelectedSize(size)
                onSelect?.(size)
            }}
            disabled={isConfirming}
            className={`
              py-2 px-3 rounded-md font-semibold text-xs transition-all duration-200
              border border-border cursor-pointer disabled:opacity-60
              ${
                selectedSize === size
                  ? "bg-primary text-primary-foreground border-primary shadow-sm scale-100"
                  : "bg-muted text-foreground hover:border-primary/50 hover:bg-muted/80"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Price and Buttons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-3 border-t border-b border-border">
          <span className="text-xs text-muted-foreground">Price</span>
          <span className="font-bold text-foreground">{product.currency}{product.price}</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={(e)=>{
              e.stopPropagation()
              onClose?.()
            }}
            variant="outline"
            size="sm"
            className="flex-1 border-border text-foreground bg-transparent"
            disabled={isConfirming}
          >
            Cancel
          </Button>
          <Button
            onClick={async(e)=>{
              e.stopPropagation()
              if (!selectedSize) {
                return
              }
              
              await onConfirm?.(selectedSize)
              onClose?.()
            }}
            disabled={!selectedSize || isConfirming}
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200"
          >
            {isConfirming ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  )
}
