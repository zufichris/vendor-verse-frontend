"use client";

import { Shield, Truck, RotateCcw, Headphones } from "lucide-react";

const indicators = [
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "rgb(34, 197, 94)",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
    color: "rgb(59, 130, 246)",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "rgb(168, 85, 247)",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
    color: "rgb(245, 158, 11)",
  },
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "4.9", label: "Average Rating" },
  { number: "99%", label: "Satisfaction Rate" },
];

export default function TrustIndicators() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="  mx-auto px-4">
        {/* Trust Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${indicator.color}15` }}
                >
                  <Icon
                    className="h-8 w-8"
                    style={{ color: indicator.color }}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {indicator.title}
                </h3>
                <p className="text-sm text-gray-600">{indicator.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center space-x-8 md:space-x-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
