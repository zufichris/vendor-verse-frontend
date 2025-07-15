import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ProductCategory } from "@/types/product";
import { Api, QueryResponse } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Sparkles } from "lucide-react";

export default async function CategoryCards() {
    const res = await Api.get<QueryResponse<ProductCategory>>(
        "/products/categories?limit=8",
    );

    if (!res.success) {
        return (
            <section className="py-16">
                <div className="mx-auto px-4">
                    <div className="text-center">
                        <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
                            {res.message || "Failed to load categories"}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (!res.data.data.length) {
        return (
            <section className="py-16">
                <div className="mx-auto px-4">
                    <div className="text-center">
                        <p className="text-gray-600">
                            No categories available at the moment.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        Discover Collections
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Explore our carefully curated categories to find exactly what you're
                        looking for.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {res.data.data.map((category, index) => (
                        <div
                            key={category.id}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <Image
                                    src={
                                        category.image?.url ||
                                        "/placeholder.svg?height=300&width=400"
                                    }
                                    alt={category.image?.altText || category.name}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm shadow-lg">
                                        <Package className="h-3 w-3 mr-1" />
                                        New Items
                                    </Badge>
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                            {category.name}
                                        </h3>
                                        <p className="text-white/90 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                            {category.description ||
                                                `Discover amazing ${category.name.toLowerCase()} products`}
                                        </p>

                                        <Link href={`/shop?category=${category.slug}`}>
                                            <Button
                                                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-gray-900 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                                                size="sm"
                                            >
                                                Shop Now
                                                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            </div>
                            <Link
                                href={`/shop?category=${category.slug}`}
                                className="absolute inset-0 z-10"
                                aria-label={`Shop ${category.name} category`}
                            />
                        </div>
                    ))}{" "}
                </div>

                <div className="text-center mt-12">
                    <Link href="/categories">
                        <Button
                            variant="outline"
                            size="lg"
                            className="group bg-transparent"
                        >
                            View All Categories
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
