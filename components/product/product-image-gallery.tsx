"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImageMeta } from "@/types/product";

interface ProductImageGalleryProps {
    images: ImageMeta[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                <Image
                    src={images[selectedImage]?.url || "/placeholder.svg"}
                    alt={images[selectedImage]?.altText || "Product image"}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover object-center"
                    priority
                />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={cn(
                                "aspect-square overflow-hidden rounded-md border-2 bg-muted transition-colors",
                                selectedImage === index
                                    ? "border-primary"
                                    : "border-transparent hover:border-muted-foreground",
                            )}
                        >
                            <Image
                                src={image.url || "/placeholder.svg"}
                                alt={image.altText || `Product image ${index + 1}`}
                                width={150}
                                height={150}
                                className="h-full w-full object-cover object-center"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
