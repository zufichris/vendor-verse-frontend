"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Absolutely love the quality and style of products here. The customer service is exceptional and shipping is always fast!",
    product: "Summer Collection",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I've been shopping here for over a year now. The variety is amazing and the prices are very competitive. Highly recommend!",
    product: "Professional Wear",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Student",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Great experience every time! The website is easy to navigate and I always find exactly what I'm looking for.",
    product: "Casual Wear",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Photographer",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The attention to detail in every product is remarkable. Quality materials and excellent craftsmanship throughout.",
    product: "Accessories",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 bg-gray-50">
      <div className="  mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 h-12 w-12 opacity-10" style={{ color: "rgb(59, 130, 246)" }} />

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    src={currentTestimonial.avatar || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgb(34, 197, 94)" }}
                  >
                    <Star className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: "rgb(245, 158, 11)" }} />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{currentTestimonial.name}</div>
                  <div className="text-gray-600 mb-2">{currentTestimonial.role}</div>
                  <div className="text-sm font-medium" style={{ color: "rgb(59, 130, 246)" }}>
                    Purchased: {currentTestimonial.product}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full w-10 h-10 p-0 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-8" : "opacity-50 hover:opacity-75"
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? "rgb(59, 130, 246)" : "rgb(156, 163, 175)",
                    }}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-10 h-10 p-0 bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Testimonials */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`p-4 rounded-lg transition-all duration-300 text-left ${
                  index === currentIndex ? "bg-white shadow-md scale-105" : "bg-white/50 hover:bg-white/75"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium text-sm text-gray-900">{testimonial.name}</div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" style={{ color: "rgb(245, 158, 11)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
