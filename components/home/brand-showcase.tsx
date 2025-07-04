"use client"

import Image from "next/image"

const brands = [
  { name: "Nike", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Adidas", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Puma", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Under Armour", logo: "/placeholder.svg?height=60&width=120" },
  { name: "New Balance", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Reebok", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Converse", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Vans", logo: "/placeholder.svg?height=60&width=120" },
]

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="  mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with the world's most recognized brands to bring you quality products
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group hover:scale-110 transition-transform duration-300 opacity-60 hover:opacity-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={60}
                className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex animate-scroll space-x-8">
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 opacity-60">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={100}
                  height={50}
                  className="filter grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
