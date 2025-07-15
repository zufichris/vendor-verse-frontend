"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { ProductCategory } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface FilterFormProps {
    categories: ProductCategory[];
    brands: string[];
    initialFilters: {
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        search?: string;
    };
}

export function FilterForm({
    categories,
    brands,
    initialFilters,
}: FilterFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [filters, setFilters] = useState({
        category: initialFilters.category || "",
        brand: initialFilters.brand || "",
        min_price: initialFilters.min_price || "",
        max_price: initialFilters.max_price || "",
        search: initialFilters.search || "",
    });

    const updateFilters = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(newFilters).forEach(([k, v]) => {
                if (v) {
                    params.set(k, v);
                } else {
                    params.delete(k);
                }
            });

            params.delete("page");

            router.push(`/shop?${params.toString()}`);
        });
    };

    const clearFilters = () => {
        setFilters({
            category: "",
            brand: "",
            min_price: "",
            max_price: "",
            search: "",
        });

        startTransition(() => {
            router.push("/shop");
        });
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <div>
                <Label htmlFor="search" className="text-sm font-medium">
                    Search Products
                </Label>
                <Input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => updateFilters("search", e.target.value)}
                    className="mt-1"
                />
            </div>

            <Separator />

            {/* Categories */}
            <div>
                <Label className="text-sm font-medium mb-3 block">Categories</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`category-${category.id}`}
                                checked={filters.category === category.id}
                                onCheckedChange={(checked) =>
                                    updateFilters("category", checked ? category.slug : "")
                                }
                            />
                            <Label
                                htmlFor={`category-${category.id}`}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {category.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Brands */}
            <div>
                <Label className="text-sm font-medium mb-3 block">Brands</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                                id={`brand-${brand}`}
                                checked={filters.brand === brand}
                                onCheckedChange={(checked) =>
                                    updateFilters("brand", checked ? brand : "")
                                }
                            />
                            <Label
                                htmlFor={`brand-${brand}`}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {brand}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
                <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                <div className="space-y-2">
                    <Input
                        type="number"
                        placeholder="Min price"
                        value={filters.min_price}
                        onChange={(e) => updateFilters("min_price", e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Max price"
                        value={filters.max_price}
                        onChange={(e) => updateFilters("max_price", e.target.value)}
                    />
                </div>
            </div>

            <Separator />

            {/* Clear Filters */}
            <Button
                variant="outline"
                onClick={clearFilters}
                disabled={isPending}
                className="w-full bg-transparent"
            >
                Clear All Filters
            </Button>
        </div>
    );
}
