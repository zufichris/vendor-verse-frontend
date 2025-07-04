"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends",
    description:
      "Elevate your style with our premium summer collection featuring the finest materials and contemporary designs.",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Shop Now",
    link: "/products?category=summer",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Technology meets elegance",
    description: "Experience cutting-edge technology with our curated selection of premium electronics and gadgets.",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Explore",
    link: "/products?category=electronics",
  },
  {
    id: 3,
    title: "Home & Living",
    subtitle: "Transform your space",
    description: "Create the perfect ambiance with our exclusive home decor and living essentials collection.",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Discover",
    link: "/products?category=home",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4 animate-slide-up">
                <p className="text-lg md:text-xl mb-4 opacity-90">{banner.subtitle}</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">{banner.title}</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{banner.description}</p>
                <Link href={banner.link}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-3">
                    {banner.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
