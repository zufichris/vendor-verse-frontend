import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  count: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  finalTotal: number | bigint;
  isLoading: boolean;
  error?: string;
  initCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newCount: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "cart";

const computeTotals = (items: CartItem[]) => {
  const subtotal = Number(
    items.reduce((sum, i) => sum + i.product.price * i.count, 0).toFixed(2),
  );
  const shipping = 0;
  const tax = 0;
  const finalTotal = subtotal + shipping + tax;
  const totalItems = items.reduce((sum, i) => sum + i.count, 0);
  return { subtotal, shipping, tax, finalTotal, totalItems };
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  finalTotal: 0,
  isLoading: true,

  initCart: () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const items: CartItem[] = JSON.parse(stored);
          const totals = computeTotals(items);
          set({ items, ...totals, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        set({ isLoading: false, error: "Failed to load cart" });
      }
    }
  },

  addToCart: (item: CartItem) => {
    const items = get().items.slice();
    const existing = items.find((i) => i.product.id === item.product.id);
    if (existing) {
      existing.count += item.count;
    } else {
      items.push(item);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const totals = computeTotals(items);
    set({ items, ...totals });
  },

  removeFromCart: (productId: string) => {
    const items = get().items.filter((i) => i.product.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const totals = computeTotals(items);
    set({ items, ...totals });
  },

  updateQuantity: (productId: string, newCount: number) => {
    if (newCount <= 0) return;
    const items = get().items.map((i) =>
      i.product.id === productId ? { ...i, count: newCount } : i,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const totals = computeTotals(items);
    set({ items, ...totals });
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
  },
}));
