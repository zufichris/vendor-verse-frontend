"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";
import type { ProductVariant } from "@/types/product";

interface ProductVariantSelectorProps {
    variants: ProductVariant[];
}

export function ProductVariantSelector({
    variants,
}: ProductVariantSelectorProps) {
    const [selectedVariant, setSelectedVariant] = useState(variants[0]?.id);

    const attributeGroups = variants.reduce(
        (groups, variant) => {
            if (!variant.attributes) return groups;

            Object.entries(variant.attributes).forEach(([key, value]) => {
                if (!groups[key]) groups[key] = new Set();
                groups[key].add(value);
            });

            return groups;
        },
        {} as Record<string, Set<string>>,
    );

    return (
        <div className="space-y-4">
            {Object.entries(attributeGroups).map(([attributeName, values]) => (
                <div key={attributeName} className="space-y-2">
                    <h4 className="font-medium capitalize">{attributeName}</h4>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(values).map((value) => {
                            const variant = variants.find(
                                (v) => v.attributes?.[attributeName] === value,
                            );
                            const isSelected = selectedVariant === variant?.id;
                            const isInStock = variant?.isInStock ?? false;

                            return (
                                <Button
                                    key={value}
                                    variant={isSelected ? "default" : "outline"}
                                    size="sm"
                                    disabled={!isInStock}
                                    onClick={() => variant && setSelectedVariant(variant.id)}
                                    className={cn("relative", !isInStock && "opacity-50")}
                                >
                                    {value}
                                    {!isInStock && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 text-xs px-1"
                                        >
                                            Out
                                        </Badge>
                                    )}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
