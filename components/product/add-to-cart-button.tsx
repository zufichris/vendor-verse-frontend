"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart";

interface AddToCartButtonProps {
    product: Product;
    disabled?: boolean;
    className?: string;
}

export function AddToCartButton({
    product,
    disabled,
    className,
}: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCartStore();

    const handleAddToCart = async () => {
        setIsAdding(true);
        addToCart({ count: 1, product });
        setIsAdding(false);
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={disabled || isAdding}
            className={cn(className)}
            size="lg"
        >
            {isAdding ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Adding...
                </>
            ) : isAdded ? (
                <>
                    <Check className="h-4 w-4 mr-2" />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                </>
            )}
        </Button>
    );
}

interface ProductQuantitySelectorProps {
    maxQuantity: number;
    defaultQuantity?: number;
}

export function ProductQuantitySelector({
    maxQuantity,
    defaultQuantity = 1,
}: ProductQuantitySelectorProps) {
    const [quantity, setQuantity] = useState(defaultQuantity);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) =>
                        handleQuantityChange(Number.parseInt(e.target.value) || 1)
                    }
                    className="w-20 text-center"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= maxQuantity}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">{maxQuantity} available</p>
        </div>
    );
}
