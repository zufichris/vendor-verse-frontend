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
import type { Product } from "@/types/product";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const discountedPrice = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : product.discountFixedAmount
            ? product.price - product.discountFixedAmount
            : product.price;

    const hasDiscount = product.discountPercentage || product.discountFixedAmount;

    return (
        <div className="px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <ProductImageGallery images={[product.thumbnail, ...product.images]} />

                {/* Product Information */}
                <div className="space-y-6">
                    {/* Breadcrumb & Category */}
                    <div className="text-sm text-muted-foreground">
                        <span>{product.category?.name}</span>
                        {product.brand && (
                            <>
                                <span className="mx-2">•</span>
                                <span>{product.brand}</span>
                            </>
                        )}
                    </div>
                    {/* Product Title */}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge
                                variant={product.condition === "new" ? "default" : "secondary"}
                            >
                                {product.condition}
                            </Badge>
                            {product.featured && <Badge variant="secondary">Featured</Badge>}
                            <Badge
                                variant={product.isInStock ? "default" : "destructive"}
                                className={
                                    product.isInStock ? "bg-success text-success-foreground" : ""
                                }
                            >
                                {product.isInStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold">
                                {product.currency} {discountedPrice.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xl text-muted-foreground line-through">
                                    {product.currency} {product.price.toFixed(2)}
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
                    {product.variants && product.variants.length > 0 && (
                        <ProductVariantSelector variants={product.variants} />
                    )}

                    {/* Quantity & Add to Cart */}
                    <div className="space-y-4">
                        <ProductQuantitySelector maxQuantity={product.stockQuantity} />

                        <div className="flex gap-4">
                            <AddToCartButton
                                product={product}
                                disabled={!product.isInStock}
                                className="flex-1"
                            />
                            <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Add to wishlist</span>
                            </Button>
                            <Button variant="outline" size="icon">
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Share product</span>
                            </Button>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
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
                                            On orders over {product.currency} 100
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
