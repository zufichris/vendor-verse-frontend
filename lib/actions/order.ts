"use server";

import { Order } from "@/types/order.types";
import { Api, QueryResponse } from "@/utils";
import { revalidatePath } from "next/cache";
import z from "zod";
import { CreateOrderDTO } from "../validations/order";



export async function createOrder(items: CreateOrderDTO) {
  const res = await Api.post<{ paymentLink: string, id: string, orderNumber: string }>("/orders", items);
  console.log(res, 'created order response')
  revalidatePath("/account/orders");
  revalidatePath("/account");
  revalidatePath("/checkout")
  return res;
}

export async function getMyOrders(page: number = 1) {
  return await Api.get<QueryResponse<Order>>(`/orders?page=${page}&limit=5&sortBy=createdAt&sortOrder=desc`)
}

export async function getMyOrdersCount() {
  return await Api.get<number>('/orders/count')
}

export async function cancelMyOrder(id: string, note?: string) {
  const result = await Api.delete<boolean>(`/orders/cancel/${id}${note?.trim() ? `?note=${note.trim()}` : ''}`)

  revalidatePath("/account/orders");
  revalidatePath("/account");
  revalidatePath(`/account/orders/${id}`);

  return result;
}

export async function getOrderByNumber(id: string) {
  return await Api.get<Order>(`/orders/${id}`)
}
export async function getOrderTrackingInfo(id: string) {
  return await Api.get<Order>(`/orders/tracking/${id}`)
}
