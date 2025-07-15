"use server";

import { Api } from "@/utils";
import { revalidatePath } from "next/cache";

export interface Order {
    items: { quantity: number; productId: string }[];
    amountPaid: number;
    taxAmount: number;
    shippingAmount: number;
    subtotal: number;
    email: string;
    phone: string;
    billingFirstName: string;
    billingLastName: string;
    billingAddress: string;
    billingApartment: string;
    billingCity: string;
    billingState: string;
    billingZipCode: string;
    billingCountry: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    orderNotes: string;
}
export async function createOrder(items: Order) {
    const res = await Api.post<Order>("/orders", items);
    revalidatePath("/account/orders");
    revalidatePath("/account/orders");
    return res;
}
