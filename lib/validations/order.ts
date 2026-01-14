import { PaymentMethodSchema } from "@/types/order.types";
import z from "zod";

export const OrderItemMetaData = z.object({
    size: z.string()
}).catchall(z.string())

export const OrderItemSchema = z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    name: z.string(),
    sku: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().min(1),
    discount: z.number().min(0).default(0),
    total: z.number().positive(),
    imageUrl: z.string(),
    metaData: OrderItemMetaData
});

export const AddressSchema = z.object({
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

export const CreateOrderDtoSchema = z.object({
    items: z.array(OrderItemSchema).min(1),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema.optional(),
    tax: z.number().default(0),
    shipping: z.number().default(0),
    couponCode: z.string().optional().nullable(),
    notes: z.string().optional(),
    newsletter: z.boolean().optional().default(false),
    currency: z.string(),
    paymentMethod: PaymentMethodSchema.default('stripe'),
    shippingMethod: z.enum(['standard', 'express', 'free', 'international']).default('standard')
});

export type OrderItemMetaData = z.infer<typeof OrderItemMetaData>
export type OrderItemDTO = z.infer<typeof OrderItemSchema>
export type AddressDTO = z.infer<typeof AddressSchema>
export type CreateOrderDTO = z.infer<typeof CreateOrderDtoSchema>