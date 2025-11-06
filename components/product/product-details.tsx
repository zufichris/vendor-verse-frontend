'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductVariantSelector } from "@/components/product/product-variant-selector";
import {
    AddToCartButton,
    ProductQuantitySelector,
} from "@/components/product/add-to-cart-button";
import { Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import type { Product, ProductVariant } from "@/types/product";
import { useState } from "react";
import Link from "next/link";
import ShareButton from "./share-btn";
import WishlistButton from "./wishlist-btn";
import ProductDescription from "./product-description";

interface ProductDetailsProps {
    product: Product;
    selectedVariant: ProductVariant;
}

export function ProductDetails({ product, selectedVariant:defaultVariant }: ProductDetailsProps) {
    const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedSize, setSelectedSize] = useState(selectedVariant.sizes[0]);
    const [quantity, setQuantity] = useState(1)

    const discountedPrice = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : product.discountFixedAmount
            ? product.price - product.discountFixedAmount
            : product.price;

    const hasDiscount = product.discountPercentage || product.discountFixedAmount;

    const isInStock = product.isInStock && product.stockQuantity > 0

    return (
        <div className="px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <ProductImageGallery images={[selectedVariant.thumbnail, ...selectedVariant.images]} />

                {/* Product Information */}
                <div className="space-y-6">
                    {/* Breadcrumb & Category */}
                    <div className="text-sm text-muted-foreground">
                        <span>{product.category?.name}</span>
                        {/* {product.brand && (
                            <>
                                <span className="mx-2">•</span>
                                <span>{product.brand}</span>
                            </>
                        )} */}
                    </div>
                    {/* Product Title */}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge
                                variant={product.condition === "new" ? "default" : "secondary"}
                                className="capitalize"
                            >
                                {product.condition}
                            </Badge>
                            {product.featured && <Badge variant="secondary">Featured</Badge>}
                            <Badge
                                variant={isInStock ? "default" : "destructive"}
                                className={
                                    isInStock ? "bg-success text-success-foreground" : ""
                                }
                            >
                                {isInStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold">
                                {product.currency}{discountedPrice.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xl text-muted-foreground line-through">
                                    {product.currency}{product.price.toFixed(2)}
                                </span>
                            )}
                            {product.discountPercentage && (
                                <Badge variant="destructive">
                                    {product.discountPercentage}% OFF
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Variants */}
                    {/* {product.variants && product.variants.length > 0 && (
                        <ProductVariantSelector variants={product.variants} onSelect={setSelectedVariant} />
                    )} */}

                    {/* Quantity & Add to Cart */}
                    <div className="space-y-4">
                        <ProductQuantitySelector defaultQuantity={quantity} onValueChange={setQuantity} maxQuantity={product.stockQuantity} />

                        {/* Variant colors */}
                        <div className="flex items-center gap-2">
                            <span>Color:</span>
                            {
                                product.variants?.map(variant => (
                                    <button
                                        // href={`/products/${product.slug}:${variant.slug}`}
                                        key={variant.id}
                                        className={`w-5 h-5 rounded-full border transition-all ${variant.slug === selectedVariant.slug && 'border-2 border-gray-400'}`}
                                        style={{backgroundColor: variant.colorCode}}
                                        disabled={variant.slug === selectedVariant.slug}
                                        onClick={()=> setSelectedVariant(variant)}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Size:</span>
                            {
                                selectedVariant.sizes?.map(size => (
                                    <Button
                                        variant={size === selectedSize ? 'default' : 'outline'}
                                        key={size}
                                        onClick={()=> setSelectedSize(size)}
                                        className="cursor-pointer"
                                    >
                                        {size}
                                    </Button>
                                ))
                            }
                        </div>

                        <div className="flex gap-4">
                            <AddToCartButton
                                quantity={quantity}
                                disabled={!isInStock}
                                selectedVariant={{...selectedVariant, productName: product.name}}
                                selectedVariantSize={selectedSize}
                                className="flex-1"
                            />
                            <WishlistButton isWishlisted={isWishlisted} onWishlist={setIsWishlisted} />
                            <ShareButton text={product.description} title={`${product.name} | ${selectedVariant.name}`} urlPath={`/products/${product.slug}:${selectedVariant.slug}`} />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            <ProductDescription description={product.description} />
                        </p>
                    </div>

                    {/* Product Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">SKU:</span>
                                    <span className="ml-2 text-muted-foreground">
                                        {product.sku}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium">Type:</span>
                                    <span className="ml-2 text-muted-foreground capitalize">
                                        {product.type}
                                    </span>
                                </div>
                                {product.weight && (
                                    <div>
                                        <span className="font-medium">Weight:</span>
                                        <span className="ml-2 text-muted-foreground">
                                            {product.weight}
                                            {product.weightUnit}
                                        </span>
                                    </div>
                                )}
                                {product.dimensions && (
                                    <div>
                                        <span className="font-medium">Dimensions:</span>
                                        <span className="ml-2 text-muted-foreground">
                                            {product.dimensions.length} × {product.dimensions.width} ×{" "}
                                            {product.dimensions.height} {product.dimensions.unit}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {product.tags && product.tags.length > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <span className="font-medium text-sm">Tags:</span>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {product.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Shipping & Returns */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium">Free Shipping</p>
                                        <p className="text-sm text-muted-foreground">
                                            On orders over AED350
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium">2 Year Warranty</p>
                                        <p className="text-sm text-muted-foreground">
                                            Full manufacturer warranty
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RotateCcw className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-medium">30-Day Returns</p>
                                        <p className="text-sm text-muted-foreground">
                                            Easy returns and exchanges
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
