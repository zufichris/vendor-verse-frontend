"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import MovementModal from "./movement-dialog"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-background to-background" />
          <Image
            src="/banners/banner1.jpg"
            alt="Aetli women empowerment"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className={`text-5xl md:text-7xl font-bold text-foreground mb-6 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <span className="text-pretty">Every Woman, Every Body, Every Size</span>
          </h1>
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            Aetli celebrates you — as you are, in all your beautiful forms
          </p>
        </div>
      </section>

      {/* Founded Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-[#faf7f2] via-[#f5efe5] to-[#f0e9dd]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Founded with Purpose</h2>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                Rooted in beautiful Dubai and founded by Tarryn Petersen, Aetli was created for the woman who loves to
                move — through workouts and coffee dates, school runs and moments of self-care, slow mornings and power
                moves in the corporate world.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Born from a personal journey of building confidence, finding balance, and learning to honour the female
                body in all its beautiful forms, Aetli is, at its core, a celebration of women — as we are.
              </p>
            </div>
            <div className="order-1 md:order-2">
              {/* <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/portrait-of-confident-woman-founder-tarryn-peterse.jpg"
                  alt="Tarryn Petersen, Aetli Founder"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-12">
            To create a lifestyle and activewear brand where every woman, every body, every size isn't just accepted —
            she's celebrated.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Thoughtful Design",
                description: "Buttery soft, supportive and flattering pieces crafted with care and intention",
              },
              {
                icon: "",
                title: "Build Confidence",
                description: "Every piece empowers you to feel your most confident and beautiful",
              },
              {
                icon: "",
                title: "Community First",
                description: "A space where women show up for one another and lift each other up",
              },
            ].map((item, index) => (
              <div key={index} className="group cursor-default">
                <div className="text-5xl mb-4 transition-transform group-hover:scale-125 duration-300">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center">Our Values</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Inclusivity",
                description:
                  "We celebrate every body, every size, every journey. Aetli is a space where you belong, exactly as you are.",
              },
              {
                title: "Quality",
                description:
                  "Thoughtfully designed and crafted pieces that support your body and lifestyle in every moment.",
              },
              {
                title: "Empowerment",
                description:
                  "Beyond fashion, we build confidence. Every piece is designed to help you feel your best self.",
              },
              {
                title: "Community",
                description:
                  "We believe in the power of women lifting women. Together, we celebrate, support, and grow.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 group"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pieces Section */}
      <section className="py-20 md:py-32 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">The Pieces</h2>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                Our pieces are thoughtfully designed with care at every step. We focus on what matters most: quality,
                fit, and how you feel in every piece.
              </p>
              <ul className="space-y-4">
                {[
                  "Buttery soft fabrics that feel amazing",
                  "Supportive fits for every body type",
                  "Flattering designs that make you feel confident",
                  "Sustainable choices we believe in",
                  "Pieces for movement, work, and life",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "/banners/banner2.jpg",
                "/banners/banner1.jpg",
                // "/womens-comfort-clothing-collection.jpg",
                "/banners/banner3.jpg",
              ].map((src, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Aetli collection piece ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-tr from-[#fff5f0] via-[#fef8f3] to-[#fdf2eb]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Welcome to Our Community</h2>
          <p className="text-xl text-foreground/80 leading-relaxed mb-4">
            Aetli is more than a brand — it's a movement. A space where women show up for one another, lift each other
            up, and feel at home in their own skin.
          </p>
          <p className="text-xl text-foreground/80 leading-relaxed mb-12">
            Whether you're in the gym, on the mat, out for a walk, building businesses, raising families, or doing all
            of the above — you already belong here.
          </p>
          <MovementModal trigger={
            <button className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 text-lg">
            Join the Movement
          </button>
          } />

          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Experience Aetli</h2>
          <p className="text-xl text-foreground/80 mb-12 leading-relaxed">
            Discover pieces that celebrate you, support you, and make you feel unstoppable. Because confidence looks
            good on everyone.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href={"/shop"}>
              <button className="cursor-pointer px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Shop Collection
              </button>
            </Link>
            <Link href={"/contact"}>
              <button className="cursor-pointer px-8 py-4 bg-background text-foreground border-2 border-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
