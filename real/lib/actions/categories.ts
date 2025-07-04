"use server";

import { db } from "@/lib/db";
import type { ApiResponse, Category } from "@/lib/types";

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  try {
    const categories = await db.getCategories();
    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: "Failed to fetch categories",
    };
  }
}

export async function getCategoryById(
  id: string,
): Promise<ApiResponse<Category | null>> {
  try {
    const category = await db.getCategoryById(id);
    return {
      success: true,
      data: category || null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch category",
    };
  }
}
