import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    TrendingUp,
    Star,
    Shield,
    Truck,
    Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Api, type QueryResponse } from "@/utils/api";
import { notFound } from "next/navigation";
import type { ProductCategory } from "@/types/product";

const categoryBenefits = [
    { icon: Shield, text: "Premium quality guarantee" },
    { icon: Truck, text: "Free shipping on orders $50+" },
    { icon: Award, text: "Expert curation" },
    { icon: Star, text: "Top-rated products" },
];

function CategoryCard({ category }: { category: ProductCategory }) {
    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-0">
                <div className="grid lg:grid-cols-5 gap-0">
                    {/* Category Image */}
                    <div className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden">
                        <Image
                            src={
                                category.image?.url || "/placeholder.svg?height=400&width=600"
                            }
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="lg:col-span-3 p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-secondary transition-colors">
                                        {category.name}
                                    </h3>
                                    <TrendingUp className="h-5 w-5 text-secondary" />
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {category.description}
                                </p>
                            </div>

                            {/* Benefits Grid */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {categoryBenefits.map((benefit, index) => {
                                    const IconComponent = benefit.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                                                <IconComponent className="h-4 w-4 text-primary-foreground" />
                                            </div>
                                            <span className="text-sm text-gray-700">
                                                {benefit.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-6">
                            <Link
                                href={`/products?category=${category.slug}`}
                                className="block"
                            >
                                <Button
                                    size="lg"
                                    className="w-full bg-gray-900 hover:bg-primary text-primary-foreground group-hover:bg-secondary transition-all duration-300"
                                >
                                    Explore {category.name}
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default async function() {
    const res = await Api.get<QueryResponse<ProductCategory>>(
        "/products/categories",
    );

    if (!res.success) {
        return notFound();
    }
    const {
        data: allCategories,
        total,
        totalPages,
        page,
        hasNextPage,
        hasPreviousPage,
    } = res.data!;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Star className="h-4 w-4" />
                        Curated Collections
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Shop by Category
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our carefully curated collections designed to help you find
                        exactly what you're looking for. Each category features premium
                        products from trusted brands.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {total}+
                        </div>
                        <div className="text-gray-600">Categories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                        <div className="text-gray-600">Products</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                        <div className="text-gray-600">Brands</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
                        <div className="text-gray-600">Rating</div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-gray-900">All Categories</h2>
                        <Badge variant="outline" className="text-gray-600">
                            {total} categories available
                        </Badge>
                    </div>

                    <div className="space-y-8">
                        {allCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>

                    {/* Pagination Info */}
                    {totalPages > 1 && (
                        <div className="text-center pt-8">
                            <p className="text-gray-600">
                                Showing page {page} of {totalPages}
                            </p>
                            <div className="flex justify-center gap-4 mt-4">
                                {hasPreviousPage && (
                                    <Link href={`/categories?page=${page - 1}`}>
                                        <Button variant="outline">Previous</Button>
                                    </Link>
                                )}
                                {hasNextPage && (
                                    <Link href={`/categories?page=${page + 1}`}>
                                        <Button variant="outline">Next</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Shop by Category | Premium Products & Brands",
    description:
        "Explore our curated product categories featuring premium quality items from trusted brands. Find exactly what you're looking for with our organized collections.",
    keywords:
        "product categories, online shopping, premium brands, curated collections",
};
