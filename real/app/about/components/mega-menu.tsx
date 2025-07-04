"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Electronics",
    href: "/products?category=electronics",
    subcategories: ["Smartphones", "Laptops", "Audio", "Smart Home", "Gaming"],
  },
  {
    name: "Fashion",
    href: "/products?category=fashion",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Accessories",
      "Jewelry",
    ],
  },
  {
    name: "Home & Living",
    href: "/products?category=home",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Storage"],
  },
  {
    name: "Sports & Fitness",
    href: "/products?category=sports",
    subcategories: [
      "Fitness Equipment",
      "Sportswear",
      "Outdoor Gear",
      "Yoga",
      "Running",
    ],
  },
];

const featuredProducts = [
  {
    name: "Premium Headphones",
    price: "$299",
    image: "/placeholder.svg?height=100&width=100",
    href: "/products/1",
  },
  {
    name: "Smart Watch",
    price: "$199",
    image: "/placeholder.svg?height=100&width=100",
    href: "/products/2",
  },
];

export default function MegaMenu() {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-50">
      <div className="  mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Categories */}
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-8">
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={category.href}
                    className="text-lg font-semibold text-black hover:text-gray-600 transition-colors mb-3 block"
                  >
                    {category.name}
                  </Link>
                  <ul className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`${category.href}&subcategory=${sub.toLowerCase()}`}
                          className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-black mb-4">
              Featured Products
            </h3>
            <div className="space-y-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-black">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.price}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/products">
                <Button className="w-full bg-black hover:bg-gray-800">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
