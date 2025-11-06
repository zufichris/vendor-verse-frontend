"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart";
import { toast, Toaster } from "sonner";
import { SizeToast } from "./size-toast";

interface AddToCartButtonProps {
    disabled?: boolean;
    className?: string;
    selectedVariant: ProductVariant & {productName: string;};
    selectedVariantSize?: string;
    quantity: number,
    added?: boolean
}

export function AddToCartButton({
    disabled,
    className,
    selectedVariant,
    selectedVariantSize,
    quantity = 1,
    added
}: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(added);
    const [selectedSize, setSelectedSize] = useState(selectedVariantSize);
    const [displaySelectSize, setDisplaySelectSize] = useState(false);
    const { addToCart } = useCartStore();

    const handleAddToCart = async () => {
        if (!selectedSize) {
            toast.custom(
              (id) => (
                <SizeToast
                  product={selectedVariant}
                  onClose={() => {
                    setDisplaySelectSize(false)
                    setSelectedSize('')
                    toast.dismiss(id)
                  }}
                  isConfirming={isAdding}
                  onConfirm={async(size)=>{
                    setIsAdded(true)
                    await addToCart({ count: quantity||1, selectedVariant, selectedSize: size||selectedSize!, productName: `${selectedVariant.productName || ''} | ${selectedVariant.name || ''}` });
                    setIsAdding(false);
                  }}
                  onSelect={setSelectedSize}
                  size={selectedSize||null}

                />
              ),
              {
                duration: Number.POSITIVE_INFINITY,
                position: "bottom-right",
              },
            )
            return
        }
        console.log('adding with size: ', selectedSize)
        setIsAdding(true);
        await addToCart({ count: quantity||1, selectedVariant, selectedSize: selectedSize!, productName: selectedVariant.name! });
        setIsAdding(false);
    };

    useEffect(()=>{
        setSelectedSize(selectedVariantSize)
    },[selectedVariantSize])

    return (
        <>
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
            <Toaster theme="dark" />
        </>
    );
}

interface ProductQuantitySelectorProps {
    maxQuantity: number;
    defaultQuantity?: number;
    onValueChange?: (qty:number)=>void
}

export function ProductQuantitySelector({
    maxQuantity,
    defaultQuantity = 1,
    onValueChange
}: ProductQuantitySelectorProps) {
    const [quantity, setQuantity] = useState(defaultQuantity);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
            onValueChange?.(newQuantity)
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
            {/* <p className="text-sm text-muted-foreground">{maxQuantity} available</p> */}
        </div>
    );
}
