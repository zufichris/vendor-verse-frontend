import { create } from "zustand";
import { Product, ProductVariant } from "@/types/product";
import { shippingOptions } from "@/constants/shipping";
import { Api, QueryResponse } from "@/utils";
import { User } from "@/types/user";
import { freeShipping } from "../constants";

export interface CartItem {
  count: number;
  selectedVariant: ProductVariant
  selectedSize: string
  productName: string
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  isLoading: boolean;
  error?: string;
  initCart: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  update: (variantId: string, newCount: number, newSize: string) => void;
  updateShipping: (method: string) => void;
  clearCart: () => void;
}

type CartResponse = {
  id: string
  userId: string
  variantId: string
  productName: string
  unitPrice: number
  quantity: number
  productImageurl: string
  size: string
  variant: ProductVariant
  user?: User | null
}

const STORAGE_KEY = "cart";

var defaultShippingCost = shippingOptions.find(itm => itm.id === "standard" || itm.isDefault)?.price || 0;

const computeTotals = (items: CartItem[], shippingCost: number = defaultShippingCost, taxCost: number = 0) => {
  const subtotal = Number(
    items.reduce((sum, i) => sum + i.selectedVariant.price * i.count, 0).toFixed(2),
  );
  const shipping = subtotal >= freeShipping.amount ? 0 : shippingCost;
  const tax = taxCost;
  const finalTotal = subtotal + shipping + tax;
  const totalItems = items.reduce((sum, i) => sum + i.count, 0);
  return { subtotal, shipping, tax, finalTotal, totalItems };
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: defaultShippingCost,
  finalTotal: 0,
  isLoading: true,
  tax: 0,

  initCart: async () => {

    try {
      if (typeof window !== "undefined") {
        // try to get from backend
        try {
          const { data, success } = await Api.get<QueryResponse<CartResponse>>('/users/cart');

          if (success) {
            let items: CartItem[] = [];

            (data?.data ?? []).map(itm => {
              if (itm.variant) {
                items.push({
                  count: itm.quantity,
                  selectedSize: itm.size,
                  selectedVariant: itm.variant,
                  productName: itm.productName
                })
              }
            })

            const getter = get();
            const totals = computeTotals(items, getter.shipping, getter.tax);
            set({ items, ...totals, isLoading: false });
            return;
          }
        } catch (err) {
          console.log(err)
        }

        // Fallback to localstorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const items: CartItem[] = JSON.parse(stored);
          const getter = get();
          const totals = computeTotals(items, getter.shipping, getter.tax);
          set({ items, ...totals, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage:", e);
      set({ isLoading: false, error: "Failed to load cart" });
    }
  },

  addToCart: (item: CartItem) => {
    const items = get().items.slice();
    let existing = items.find((i) => i.selectedVariant.id === item.selectedVariant.id);
    if (existing) {
      existing.count += item.count;
      existing.selectedVariant = item?.selectedVariant ?? existing.selectedVariant
      existing.selectedSize = item.selectedSize || existing.selectedSize
    } else {
      items.push(item);
      existing = item;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const getter = get();
    const totals = computeTotals(items, getter.shipping, getter.tax);
    set({ items, ...totals });

    // Try to add to user's cart in backend
    try {
      Api.post('/users/cart', {
        size: item.selectedSize,
        quantity: existing.count,
        variantId: existing?.selectedVariant!.id
      }).then(res => console.log(res)).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },

  removeFromCart: (variantId: string) => {
    const items = get().items.filter((i) => i.selectedVariant.id !== variantId);
    const getter = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const totals = computeTotals(items, getter.shipping, getter.tax);
    set({ items, ...totals });

    try {
      Api.delete(`/users/cart/${variantId}`).then(res => console.log(res)).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },

  update: (variantId: string, newCount: number, newSize: string) => {
    console.log('update called')
    if (newCount <= 0) return;
    const items = get().items.map((i) =>
      i.selectedVariant.id === variantId ? { ...i, count: newCount, selectedSize: newSize } : i,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const getter = get();
    const totals = computeTotals(items, getter.shipping, getter.tax);
    set({ items, ...totals });

    // Try to add to user's cart in backend
    try {
      Api.post('/users/cart', {
        variantId: variantId,
        quantity: newCount,
        size: newSize
      }).then(res => console.log(res)).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },

  updateShipping(method: string) {
    const shippingOption = shippingOptions.find((opt) => opt.id === method);
    if (!shippingOption) return;
    const shippingCost = shippingOption.price;
    const getter = get();
    const items = getter.items;
    const totals = computeTotals(items, shippingCost,);
    set({ ...totals });

  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      items: [],
      totalItems: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      finalTotal: 0,
    });

    try {
      Api.delete('/users/cart/clear').then(res => console.log(res)).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  },
}));
