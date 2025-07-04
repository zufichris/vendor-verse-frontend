"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame, Zap } from "lucide-react"

const offers = [
  {
    id: 1,
    title: "Flash Sale",
    subtitle: "Up to 70% Off",
    description: "Limited time offer on selected items",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Hot Deal",
    color: "rgb(239, 68, 68)",
    icon: Flame,
    cta: "Shop Now",
    link: "/products?sale=true",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Styles",
    description: "Discover the latest trends and collections",
    image: "/placeholder.svg?height=300&width=400",
    badge: "New",
    color: "rgb(34, 197, 94)",
    icon: Zap,
    cta: "Explore",
    link: "/products?new=true",
  },
]

export default function SpecialOffers() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="  mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't miss out on these amazing deals and exclusive offers</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon
            return (
              <div
                key={offer.id}
                className="relative overflow-hidden rounded-2xl group hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

                  {/* Badge */}
                  <Badge
                    className="absolute top-4 left-4 text-white border-0 px-3 py-1"
                    style={{ backgroundColor: offer.color }}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {offer.badge}
                  </Badge>

                  {/* Timer for Flash Sale */}
                  {offer.id === 1 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-sm font-medium">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-gray-900">
                          {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-2">{offer.title}</h3>
                      <p className="text-xl md:text-2xl mb-3 opacity-90">{offer.subtitle}</p>
                      <p className="text-lg mb-6 opacity-80">{offer.description}</p>
                      <Link href={offer.link}>
                        <Button
                          size="lg"
                          className="text-white border-2 border-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300"
                        >
                          {offer.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
