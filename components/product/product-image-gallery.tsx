"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";
import type { ImageMeta } from "@/types/product";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Plus } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

interface ProductImageGalleryProps {
    images: ImageMeta[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    const displayImages = images.slice(0, 3);

    return (
        <div className="space-y-4">
            {/* Main Image */}
        <div
            className="hidden lg:block relative bg-muted rounded-lg overflow-hidden max-h-[78vh] mx-auto"
            style={{ aspectRatio: "2/3", minHeight: "300px", width: "auto" }}
        >
            <Image
              src={images[selectedImage]?.url || "/placeholder.svg"}
              alt={images[selectedImage]?.altText || "Product image"}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
              className="object-contain"
              priority
            />
        </div>

            {/* Thumbnail Images */}
            {displayImages.length > 1 && (
                <div className="hidden lg:grid grid-cols-4 gap-2">
                    {displayImages.map((image, index) => (
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
                                className="w-full object-top"
                            />
                        </button>
                    ))}
                    {
                        images.length > displayImages.length ? (
                            <Dialog>
                                <DialogTrigger>
                                    <button
                                        className={cn(
                                            "aspect-square overflow-hidden rounded-md bg-muted transition-colors relative cursor-pointer")}
                                    >
                                        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-70 z-10 flex items-center justify-center">
                                            <span className="text-2xl text-white flex items-center"><Plus/>{images.length - displayImages.length}</span>
                                        </div>
                                        <Image
                                            src={images[displayImages.length].url || "/placeholder.svg"}
                                            alt={images[displayImages.length].altText || `Product image ${displayImages.length}`}
                                            width={150}
                                            height={150}
                                            className="w-full object-top"
                                        />
                                        
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <ImageCarousel images={images} />
                                </DialogContent>
                            </Dialog>
                        ) : null
                    }
                </div>
            )}


            {/* Mobile */}
            <div className="block lg:hidden">
                <ImageCarousel images={images} />
            </div>
        </div>
    );
}


const ImageCarousel = ({images}:ProductImageGalleryProps)=>{

    return (
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.altText || 'gallery img'}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
    )
}
