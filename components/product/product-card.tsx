"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Heart,
    ShoppingCart,
    Star,
    Eye,
    Share2,
    Plus,
    Minus,
    Check,
    Truck,
    RotateCcw,
    Zap,
    Clock,
    Users,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/types/product";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface ProductCardProps {
    product: Product;
    showQuickView?: boolean;
    showCompare?: boolean;
}

const colorVariants = [
    { name: "Black", color: "#000000" },
    { name: "White", color: "#FFFFFF" },
    { name: "Navy", color: "#1e3a8a" },
    { name: "Red", color: "#dc2626" },
];

const sizeVariants = ["XS", "S", "M", "L", "XL"];

export default function ProductCard({
    product,
    showQuickView = true,
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(colorVariants[0]);
    const [selectedSize, setSelectedSize] = useState(sizeVariants[2]);
    const [quantity, setQuantity] = useState(1);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageTransition, setImageTransition] = useState(false);
    const { addItem } = useCart();

    // Get all available images (main image + additional images)
    const allImages = [product.thumbnail, ...(product.images || [])].filter(Boolean);
    const hasMultipleImages = allImages.length > 1;

    // Auto-cycle through images on hover with smooth transition
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isHovered && hasMultipleImages) {
            interval = setInterval(() => {
                setImageTransition(true);

                setTimeout(() => {
                    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
                    setImageTransition(false);
                }, 150); // Half of transition duration
            }, 1500); // Change image every 1.5 seconds
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovered, hasMultipleImages, allImages.length]);

    // Reset to first image when not hovering
    useEffect(() => {
        if (!isHovered) {
            setCurrentImageIndex(0);
            setImageTransition(false);
        }
    }, [isHovered]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAddingToCart(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.thumbnail.url,
                quantity: 1,
            });
        }

        setIsAddingToCart(false);
        setShowSuccess(true);

        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsQuickViewOpen(true);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: `/products/${product.slug}`,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            navigator.clipboard.writeText(
                `${window.location.origin}/products/${product.slug}`,
            );
        }
    };

    const variant = product.featured ? "featured" : "compact"
    const cardClasses = {
        default:
            "group relative bg-primary-foreground rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100",
        compact:
            "group relative bg-primary-foreground rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100",
        featured:
            "group relative bg-primary-foreground rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200",
    };

    return (
        <>
            <TooltipProvider>
                <Card
                    className={cardClasses[variant]}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CardContent className="p-0">
                        {/* Image   */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                            {/* Main Product Image */}
                            <Link href={`/products/${product.slug}`}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={
                                            allImages[currentImageIndex].url ||
                                            "/placeholder.svg?height=400&width=400"
                                        }
                                        alt={allImages[currentImageIndex].altText || product.name}
                                        fill
                                        className={`object-cover transition-all duration-300 ${imageTransition
                                                ? "opacity-0 scale-105"
                                                : "opacity-100 scale-100"
                                            } ${isHovered ? "scale-110" : "scale-100"} ${isImageLoading ? "blur-sm" : "blur-0"}`}
                                        onLoad={() => setIsImageLoading(false)}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={currentImageIndex === 0}
                                    />

                                    {/* Loading Overlay */}
                                    {isImageLoading && (
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                                            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                        </div>
                                    )}

                                    {/* Gradient Overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""
                                            }`}
                                    />

                                    {/* Image Counter */}
                                    {hasMultipleImages && isHovered && (
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-primary/70 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                            {currentImageIndex + 1} / {allImages.length}
                                        </div>
                                    )}
                                </div>
                            </Link>

                            {/* Image Navigation Dots */}
                            {hasMultipleImages && (
                                <div
                                    className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    {allImages.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex
                                                    ? "bg-primary-foreground scale-125"
                                                    : "bg-primary-foreground/60 hover:bg-primary-foreground/80"
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setCurrentImageIndex(index);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                                {product.condition === "new" && (
                                    <Badge className="bg-emerald-500 text-primary-foreground font-medium px-2 py-1 text-xs shadow-lg">
                                        New
                                    </Badge>
                                )}
                                {product.discountPercentage && (
                                    <Badge className="bg-red-500 text-primary-foreground font-medium px-2 py-1 text-xs shadow-lg">
                                        -{product.discountPercentage}%
                                    </Badge>
                                )}
                                {!product.isInStock && (
                                    <Badge className="bg-orange-500 text-primary-foreground font-medium px-2 py-1 text-xs flex items-center gap-1 shadow-lg">
                                        <Clock className="h-3 w-3" />
                                        {product.stockQuantity} left
                                    </Badge>
                                )}
                                {product.condition && (
                                    <Badge className="bg-yellow-500 text-primary-foreground font-medium px-2 py-1 text-xs flex items-center gap-1 shadow-lg">
                                        <Star className="h-3 w-3 fill-current" />
                                        Top Rated
                                    </Badge>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div
                                className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 translate-x-4"
                                    }`}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-9 w-9 bg-primary-foreground/95 hover:bg-primary-foreground shadow-lg backdrop-blur-sm border border-gray-200"
                                            onClick={handleWishlist}
                                        >
                                            <Heart
                                                className={`h-4 w-4 transition-all duration-200 ${isWishlisted
                                                        ? "fill-red-500 text-red-500 scale-110"
                                                        : "text-gray-600 hover:text-red-500"
                                                    }`}
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            {isWishlisted
                                                ? "Remove from wishlist"
                                                : "Add to wishlist"}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>

                                {showQuickView && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-9 w-9 bg-primary-foreground/95 hover:bg-primary-foreground shadow-lg backdrop-blur-sm border border-gray-200"
                                                onClick={handleQuickView}
                                            >
                                                <Eye className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Quick view</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-9 w-9 bg-primary-foreground/95 hover:bg-primary-foreground shadow-lg backdrop-blur-sm border border-gray-200"
                                            onClick={handleShare}
                                        >
                                            <Share2 className="h-4 w-4 text-gray-600 hover:text-green-600 transition-colors" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Share product</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Quick Add to Cart */}
                            <div
                                className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                    }`}
                            >
                                {product.isInStock ? (
                                    <div className="flex gap-2">
                                        <div className="flex items-center bg-primary-foreground/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:bg-gray-100"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setQuantity(Math.max(1, quantity - 1));
                                                }}
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="px-2 text-sm font-medium min-w-[2rem] text-center">
                                                {quantity}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:bg-gray-100"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setQuantity(
                                                        Math.min(product.stockQuantity, quantity + 1),
                                                    );
                                                }}
                                                disabled={quantity >= product.stockQuantity}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>

                                        <Button
                                            className={`flex-1 bg-primary hover:bg-gray-800 text-primary-foreground shadow-lg transition-all duration-200 ${showSuccess ? "bg-green-500 hover:bg-green-600" : ""
                                                }`}
                                            onClick={handleAddToCart}
                                            disabled={isAddingToCart || showSuccess}
                                        >
                                            {showSuccess ? (
                                                <>
                                                    <Check className="h-4 w-4 mr-2" />
                                                    Added!
                                                </>
                                            ) : isAddingToCart ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        className="w-full bg-gray-400 text-primary-foreground cursor-not-allowed shadow-lg"
                                        disabled
                                    >
                                        Out of Stock
                                    </Button>
                                )}
                            </div>

                            {/* Out of Stock Overlay */}
                            {!product.isInStock && (
                                <div className="absolute inset-0 bg-primary/50 flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-primary-foreground px-4 py-2 rounded-lg shadow-lg">
                                        <p className="text-gray-800 font-medium">Out of Stock</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                            {/* Rating and Reviews */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3.5 w-3.5 ${i < Math.floor(4.3)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-1">
                                        {4.5} ({2})
                                    </span>
                                </div>

                                <Badge variant="outline" className="text-xs font-medium">
                                    {product.brand}
                                </Badge>
                            </div>

                            {/* Product Name */}
                            <Link href={`/products/${product.slug}`}>
                                <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors leading-tight text-sm">
                                    {product.name}
                                </h3>
                            </Link>

                            {/* Category */}
                            <p className="text-sm text-gray-500">{product?.category?.name}</p>

                            {/* Color Variants */}
                            {variant !== "compact" && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Colors:</span>
                                    <div className="flex gap-1">
                                        {colorVariants.slice(0, 4).map((color) => (
                                            <button
                                                key={color.name}
                                                className={`w-4 h-4 rounded-full border-2 transition-all ${selectedColor.name === color.name
                                                        ? "border-gray-800 scale-110 shadow-md"
                                                        : "border-gray-300 hover:border-gray-500 hover:scale-105"
                                                    }`}
                                                style={{ backgroundColor: color.color }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedColor(color);
                                                }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-primary">
                                        ${product.price}
                                    </span>
                                    {product.price && (
                                        <span className="text-sm text-gray-500 line-through">
                                            ${product.price}
                                        </span>
                                    )}
                                </div>

                                {product.isInStock && (
                                    <Badge variant="destructive" className="text-xs">
                                        Save ${(product.price! - product.price).toFixed(2)}
                                    </Badge>
                                )}
                            </div>

                            {/* Features */}
                            {variant === "featured" && (
                                <div className="flex items-center gap-4 text-xs text-gray-600 pt-2 border-t border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <Truck className="h-3 w-3" />
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RotateCcw className="h-3 w-3" />
                                        <span>Returns</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Zap className="h-3 w-3" />
                                        <span>Fast Delivery</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </TooltipProvider>

            {/* Quick View Modal */}
            <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-primary-foreground">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                            <span>Quick View</span>
                            <DialogTrigger hidden className="border-r-destructive"/>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsQuickViewOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={
                                        allImages[currentImageIndex]?.url ||
                                        "/placeholder.svg?height=500&width=500"
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {hasMultipleImages && (
                                <div className="grid grid-cols-4 gap-2">
                                    {allImages.map((image, index) => (
                                        <button
                                            key={index}
                                            className={`aspect-square relative bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${index === currentImageIndex
                                                    ? "border-primary"
                                                    : "border-gray-200 hover:border-gray-400"
                                                }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        >
                                            <Image
                                                src={image.url || "/placeholder.svg?height=100&width=100"}
                                                alt={`${product.name} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2">
                                    {product.name}
                                </h2>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(4.5)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">
                                        {4.5} ({24} reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-primary">
                                    ${product.price}
                                </span>
                                {product.price && (
                                    <span className="text-xl text-gray-500 line-through">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Color Selection */}
                            <div>
                                <h4 className="font-medium mb-2">
                                    Color: {selectedColor.name}
                                </h4>
                                <div className="flex gap-2">
                                    {colorVariants.map((color) => (
                                        <button
                                            key={color.name}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor.name === color.name
                                                    ? "border-gray-800 scale-110"
                                                    : "border-gray-300 hover:border-gray-500"
                                                }`}
                                            style={{ backgroundColor: color.color }}
                                            onClick={() => setSelectedColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <h4 className="font-medium mb-2">Size: {selectedSize}</h4>
                                <div className="flex gap-2">
                                    {sizeVariants.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-3 py-2 border rounded-md transition-colors ${selectedSize === size
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-gray-300 hover:border-gray-500"
                                                }`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="flex gap-4">
                                <div className="flex items-center border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                                        {quantity}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            setQuantity(Math.min(product.stockQuantity, quantity + 1))
                                        }
                                        disabled={quantity >= product.stockQuantity}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Button
                                    className="flex-1 bg-primary hover:bg-gray-800"
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart || !product.isInStock}
                                >
                                    {isAddingToCart ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                                            Adding to Cart...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Add to Cart
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Product Features */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Truck className="h-4 w-4" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <RotateCcw className="h-4 w-4" />
                                    <span>30-day Returns</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Zap className="h-4 w-4" />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>{4} Reviews</span>
                                </div>
                            </div>

                            {/* View Full Details */}
                            <Link href={`/products/${product.slug}`}>
                                <Button variant="outline" className="w-full">
                                    View Full Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
