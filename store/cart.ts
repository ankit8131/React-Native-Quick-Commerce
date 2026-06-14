import { create } from "zustand";

import type { Product } from "@/types/catalog";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: Record<string, CartItem>;
  add: (product: Product) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: {},
  add: (product) =>
    set((state) => {
      const existing = state.items[product.id];
      return {
        items: {
          ...state.items,
          [product.id]: { product, qty: existing ? existing.qty + 1 : 1 },
        },
      };
    }),
  increment: (productId) =>
    set((state) => {
      const existing = state.items[productId];
      if (!existing) return state;
      return {
        items: {
          ...state.items,
          [productId]: { ...existing, qty: existing.qty + 1 },
        },
      };
    }),
  decrement: (productId) =>
    set((state) => {
      const existing = state.items[productId];
      if (!existing) return state;
      if (existing.qty <= 1) {
        const { [productId]: _removed, ...rest } = state.items;
        return { items: rest };
      }
      return {
        items: {
          ...state.items,
          [productId]: { ...existing, qty: existing.qty - 1 },
        },
      };
    }),
}));

export const useCartQty = (productId: string) =>
  useCartStore((s) => s.items[productId]?.qty ?? 0);

export const useCartCount = () =>
  useCartStore((s) =>
    Object.values(s.items).reduce((total, item) => total + item.qty, 0),
  );

export const useCartSavings = () =>
  useCartStore((s) =>
    Object.values(s.items).reduce(
      (total, item) => total + (item.product.mrp - item.product.price) * item.qty,
      0,
    ),
  );
