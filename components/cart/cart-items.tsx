"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartPageLoading from "@/app/cart/loading";
import { useCartStore } from "@/lib/stores/cart";

export function CartItems() {
    const {
        items,
        totalItems,
        subtotal,
        shipping,
        isLoading,
        finalTotal,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCartStore();

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) removeFromCart(id);
        else updateQuantity(id, newQuantity);
    };

    const handleClearCart = () => {
        clearCart();
    };
    if (isLoading) {
        return <CartPageLoading />;
    }

    if (totalItems === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="mx-auto px-4 py-16">
                    <div className="text-center max-w-md mx-auto">
                        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Your cart is empty
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added any items yet.
                        </p>
                        <Link href="/shop">
                            <Button size="lg" className="bg-black hover:bg-gray-800">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            <div className="mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <Link href="/shop">
                        <Button variant="ghost" size="icon" className="mr-4">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">
                                        Cart Items ({totalItems})
                                    </h2>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleClearCart}
                                        disabled={isLoading}
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div
                                            key={item.product.id} className="flex flex-col gap-4 p-4 border rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <Image
                                                    src={item.product.thumbnail.url || "/placeholder.svg"}
                                                    alt={item.product.name}
                                                    width={70}
                                                    height={70}
                                                    className="rounded-md object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-lg font-bold text-black">
                                                        ${item.product.price}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.product.id,
                                                            item.count - 1,
                                                        )
                                                    }
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-12 text-center font-medium">
                                                    {item.count}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.product.id,
                                                            item.count + 1,
                                                        )
                                                    }
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg">
                                                    Subtotal:   ${(item.product.price * item.count).toFixed(2)}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Total items</span>
                                        <span>{totalItems}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${finalTotal}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex sm:flex-row sm:justify-between flex-col gap-2">
                                    <Link href="/checkout">
                                        <Button
                                            className="w-full mb-4 bg-black hover:bg-gray-800"
                                            size="lg"
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Link>
                                    <Link href="/shop">
                                        <Button
                                            variant="outline"
                                            className="w-full bg-transparent"
                                            size="lg"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
