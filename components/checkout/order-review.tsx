"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { CartItem, useCartStore } from "@/lib/stores/cart";
import { validateCoupon, ValidCoupon } from "@/lib/actions/coupon";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
interface Props{
  welcomeCoupon: ValidCoupon | null
}

export function OrderReview({welcomeCoupon}: Props) {
    const { formData, handleInputChange } = useCheckoutStore();
    const { items, shipping, finalTotal, tax, subtotal } = useCartStore();

    const [couponCode, setCouponCode] = useState(welcomeCoupon?.valid ? (welcomeCoupon?.code || '') : '')
    const [couponRate, setCouponRate] = useState(welcomeCoupon?.valid ? (welcomeCoupon?.discountRate || 0) : 0)
    const [inputDisabled, setInputDisabled] = useState(welcomeCoupon?.valid||false)
    const [isApplying, setIsApplying] = useState(false)

    const discount = subtotal * couponRate / 100

    const grandTotal = finalTotal -  discount;

    async function handleApply(){
        try {
            if (!couponCode) {
                return
            }

            if (couponCode.toLowerCase() === welcomeCoupon?.code?.toLowerCase()) {
                return
            }

            setIsApplying(true)

            const valid = await validateCoupon(couponCode)
            console.log(valid)

            if (valid && valid.valid) {
                console.log('Is valid')
                setCouponCode(valid.code)
                setCouponRate(valid.discountRate)
                handleInputChange('discountCode', valid.code)
                handleInputChange('discountRate', valid.discountRate)
                setInputDisabled(true)
                toast.success("Coupon applied")
            }else{
                toast.error("Invalid coupon code")
            }
        } catch (err) {
            console.log(err)
            toast.error("Invalid coupon code")
        }finally{
            setIsApplying(false)
        }


    }

    useEffect(()=>{
        if (welcomeCoupon && welcomeCoupon.valid) {
            handleInputChange('discountCode', welcomeCoupon.code)
            handleInputChange('discountRate', welcomeCoupon.discountRate)
        }
    },[])


    const currency = items[0]?.selectedVariant?.currency

    return (
        <Card>
            <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input className="" placeholder="You have a coupon?" disabled={inputDisabled} value={couponCode} onChange={(e)=> setCouponCode(e.target.value)} />
                        <Button type="button" size={'sm'} onClick={handleApply} disabled={inputDisabled || isApplying}>{
                            isApplying ? <><Spinner />Checking</> : 'Apply'
                            }</Button>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="font-medium">Items in your order</h4>
                    {items.map((item) => (
                        <>
                            <div
                                key={item.productName}
                                className="hidden sm:flex items-center space-x-4 p-4 border rounded-lg"
                            >
                                <Image
                                    src={item.selectedVariant.thumbnail.url || "/placeholder.svg"}
                                    alt={item.productName}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                                <div className="flex-1">
                                    <h5 className="font-medium">{item.productName}</h5>
                                    <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                                </div>
                                <span className="font-medium">
                                    {item.selectedVariant.currency}{(item.selectedVariant.price * item.count).toFixed(2)}
                                </span>
                            </div>
                            <MobileItem item={item} />
                        </>
                    ))}
                </div>


                {/*Shipping Summary */}
                <div className="border-t pt-4">
                    {/* Discount */}
                    {
                        discount > 0 && (
                        <div className="flex justify-between my-2">
                            <span>Discount:</span>
                            <span>{currency}{discount.toFixed(2)}</span>
                        </div>
                        )
                    }

                    <h4 className="font-medium mb-2">Shipping Summary</h4>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{currency}{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>{currency}{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{currency}{Number(grandTotal).toFixed(2)}</span>
                    </div>
                </div>

                {/* Shipping & Billing Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                            <p>
                                {formData?.shippingFirstName || formData.billingFirstName} {formData?.shippingLastName || formData.billingLastName}
                            </p>
                            <p>{formData?.shippingAddress || formData.billingAddress}</p>
                            {formData?.shippingApartment || formData.billingApartment && <p>{formData?.shippingApartment || formData.billingApartment}</p>}
                            <p>
                                {formData?.shippingCity || formData.billingCity}, {formData?.shippingState || formData.billingState}{" "}
                                {formData?.shippingZipCode || formData.billingZipCode}
                            </p>
                            <p>{formData?.shippingCountry || formData.billingCountry}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function MobileItem({item}:{item: CartItem}){
    return (
        <div
                key={item.productName}
                className="sm:hidden text-sm flex items-start space-x-4 p-4 border rounded-lg"
            >
                <Image
                    src={item.selectedVariant.thumbnail.url || "/placeholder.svg"}
                    alt={item.productName}
                    width={80}
                    height={80}
                    className="rounded-md object-contain"
                />
                <div>
                    <div className="flex-1">
                        <h5 className="font-medium text-ellipsis line-clamp-2 mb-3">{item.productName}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                    </div>
                    <span className="font-medium">
                        {item.selectedVariant.currency}{(item.selectedVariant.price * item.count).toFixed(2)}
                    </span>
                </div>
            </div>
    )
}


