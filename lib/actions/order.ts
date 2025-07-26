"use server";

import { Api } from "@/utils";
import { revalidatePath } from "next/cache";
import z from "zod";

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

const OrderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  name: z.string(),
  sku: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
  discount: z.number().min(0).default(0),
  total: z.number().positive(),
});

const AddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

const CreateOrderDtoSchema = z.object({
  items: z.array(OrderItemSchema).min(1),
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema.optional(),
  tax: z.number().default(0),
  shipping: z.number().default(0),
  notes: z.string().optional(),
});

export async function createOrder(items: z.infer<typeof CreateOrderDtoSchema>) {
  const res = await Api.post<{ paymentLink: string }>("/orders", items);
  revalidatePath("/account/orders");
  revalidatePath("/account/orders");
  return res;
}
