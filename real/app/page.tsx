import HeroSection from "@/components/home/hero-section";
import FeaturedProducts from "@/components/home/featured-products";
import CategoryShowcase from "@/components/home/category-showcase";
import SpecialOffers from "@/components/home/special-offers";
import TestimonialsSection from "@/components/home/testimonials-section";
import BrandShowcase from "@/components/home/brand-showcase";
import TrustIndicators from "@/components/home/trust-indicators";
import BlogPreview from "@/components/home/blog-preview";
import NewsletterSection from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      {/* <SpecialOffers /> */}
      <CategoryShowcase />
      {/* <TestimonialsSection /> */}
      {/* <BrandShowcase /> */}
      {/* <BlogPreview /> */}
      {/* <NewsletterSection /> */}
      <TrustIndicators />
    </main>
  );
}
