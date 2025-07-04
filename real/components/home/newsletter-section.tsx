"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift, Bell, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Gift,
    text: "Exclusive offers & early access",
  },
  {
    icon: Bell,
    text: "New product notifications",
  },
  {
    icon: Sparkles,
    text: "Style tips & trends",
  },
]

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true)
        setEmail("")
        setIsLoading(false)
      }, 1500)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="  mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Join our community of fashion enthusiasts and be the first to know about new products, exclusive offers,
              and style tips.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="flex items-center justify-center md:justify-start space-x-3 text-gray-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <span>{benefit.text}</span>
                </div>
              )
            })}
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-colors"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <p className="text-green-400 text-xl font-medium mb-2">Welcome to our community! 🎉</p>
              <p className="text-gray-300">You'll receive our latest updates and exclusive offers in your inbox.</p>
            </div>
          )}

          <p className="text-sm text-gray-400 mt-6">We respect your privacy. Unsubscribe at any time. No spam, ever.</p>
        </div>
      </div>
    </section>
  )
}
