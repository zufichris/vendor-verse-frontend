"use client"

interface SizeSelectorProps {
  selectedSize: string | null
  onChange: (size: string) => void
  sizes: string[]
}

// const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

export function SizeSelector({ selectedSize, onChange, sizes }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`
            relative py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200
            border-2 cursor-pointer
            ${
              selectedSize === size
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-100"
                : "bg-background text-foreground border-border hover:border-primary/50 hover:shadow-sm"
            }
          `}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
