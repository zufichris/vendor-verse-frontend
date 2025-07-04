"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategories } from "@/lib/actions/products";
import type { Category } from "@/lib/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      const result = await getCategories();
      setCategories(result);
      setIsLoading(false);
    }

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="  mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                    <div className="p-6 md:col-span-2">
                      <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-32 mb-6 animate-pulse" />
                      <div className="flex gap-3">
                        <div className="h-10 bg-gray-200 rounded flex-1 animate-pulse" />
                        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const trendingCategories = categories.filter((cat) => cat.trending);
  const allCategories = categories;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="  mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Shop by Category
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our extensive collection organized by categories. Find
            exactly what you're looking for with ease.
          </p>
        </div>

        {/* Trending Categories */}
        {trendingCategories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-black">
                Trending Categories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCategories.map((category) => (
                <Card
                  key={category.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                      Trending
                    </Badge>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90 mb-4">
                          {category.productCount} products
                        </p>
                        <Link href={`/products?category=${category.id}`}>
                          <Button
                            variant="outline"
                            className="bg-white/10 border-white text-white hover:bg-white hover:text-black"
                          >
                            Shop Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Categories */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-8">All Categories</h2>

          <div className="grid gap-8">
            {allCategories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Category Image */}
                    <div className="relative aspect-[4/3] md:aspect-auto">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                      {category.trending && (
                        <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="p-6 md:col-span-2">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-black mb-2">
                                {category.name}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {category.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {category.productCount} products available
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex gap-3">
                          <Link
                            href={`/products?category=${category.id}`}
                            className="flex-1"
                          >
                            <Button className="w-full bg-black hover:bg-gray-800">
                              Browse {category.name}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === category.id
                                  ? null
                                  : category.id,
                              )
                            }
                          >
                            {selectedCategory === category.id
                              ? "Less Info"
                              : "More Info"}
                          </Button>
                        </div>

                        {/* Expanded Info */}
                        {selectedCategory === category.id && (
                          <div className="mt-6 pt-6 border-t animate-fade-in">
                            <div className="grid sm:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-semibold mb-2">
                                  Why Choose This Category?
                                </h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  <li>• Premium quality products</li>
                                  <li>• Competitive pricing</li>
                                  <li>• Fast shipping available</li>
                                  <li>• 30-day return policy</li>
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-semibold mb-2">
                                  Popular Brands
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="secondary">Brand A</Badge>
                                  <Badge variant="secondary">Brand B</Badge>
                                  <Badge variant="secondary">Brand C</Badge>
                                  <Badge variant="secondary">+More</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-black mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-black mb-2">
              {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
            </div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-black mb-2">50+</div>
            <div className="text-gray-600">Brands</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-black mb-2">4.7</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
