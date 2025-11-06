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
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                <Image
                    src={images[selectedImage]?.url || "/placeholder.svg"}
                    alt={images[selectedImage]?.altText || "Product image"}
                    width={600}
                    height={600}
                    className="w-full object-top"
                    priority
                />
            </div>

            {/* Thumbnail Images */}
            {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
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
        </div>
    );
}


const ImageCarousel = ({images}:ProductImageGalleryProps)=>{

    return <div className="w-full p-6 flex justify-center">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={img.url+index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                        src={img?.url || "/placeholder.svg"}
                        alt={img?.altText || "Product image"}
                        width={600}
                        height={600}
                        className="w-full object-top"
                        priority
                />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}
