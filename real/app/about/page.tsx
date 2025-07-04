import Image from "next/image";
import { Award, Globe, Heart, Shield, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about creating exceptional shopping experiences with over 10 years in e-commerce.",
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Expert in product curation and customer experience, ensuring quality in every selection.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Streamlines operations to deliver fast, reliable service to customers worldwide.",
  },
  {
    name: "David Kim",
    role: "Head of Technology",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Builds innovative solutions to make online shopping seamless and secure.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision we make is centered around delivering exceptional value and service to our customers.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "We prioritize the security of your data and transactions with industry-leading protection.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description:
      "We carefully curate every product to ensure it meets our high standards of quality and value.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connecting customers worldwide with premium products and reliable international shipping.",
  },
];

const stats = [
  { number: "500K+", label: "Happy Customers" },
  { number: "50+", label: "Countries Served" },
  { number: "10K+", label: "Products Available" },
  { number: "99.9%", label: "Uptime Guarantee" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="  mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              About VendorVerse
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're on a mission to revolutionize online shopping by connecting
              customers with premium products and exceptional service. Since our
              founding, we've been committed to creating a marketplace that
              prioritizes quality, trust, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="  mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  VendorVerse was born from a simple idea: online shopping
                  should be effortless, trustworthy, and delightful. Founded in
                  2020 by a team of e-commerce veterans, we set out to create a
                  platform that puts customers first.
                </p>
                <p>
                  What started as a small team with big dreams has grown into a
                  global marketplace serving hundreds of thousands of customers
                  worldwide. We've built relationships with trusted vendors,
                  implemented cutting-edge technology, and created a shopping
                  experience that we're proud of.
                </p>
                <p>
                  Today, we continue to innovate and expand, always keeping our
                  core values at the heart of everything we do. Our commitment
                  to quality, security, and customer satisfaction drives us to
                  constantly improve and evolve.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="VendorVerse team working"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide every decision we make and every
              interaction we have with our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              By the Numbers
            </h2>
            <p className="text-gray-600">
              Our growth and impact in the e-commerce space
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind VendorVerse, working tirelessly
              to bring you the best shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="  mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To create the world's most trusted and customer-centric e-commerce
              platform, where quality products meet exceptional service, and
              every shopping experience exceeds expectations.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <Truck className="h-12 w-12 text-black mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fast & Reliable</h3>
                <p className="text-gray-600 text-center">
                  Quick delivery and dependable service you can count on.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-black mb-4" />
                <h3 className="font-semibold text-lg mb-2">Secure & Safe</h3>
                <p className="text-gray-600 text-center">
                  Your data and transactions are protected with advanced
                  security.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Heart className="h-12 w-12 text-black mb-4" />
                <h3 className="font-semibold text-lg mb-2">Customer Love</h3>
                <p className="text-gray-600 text-center">
                  Dedicated support and service that puts you first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
