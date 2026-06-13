import { create } from "zustand";

import type { Product } from "@/types/catalog";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartState {
  lines: Record<string, CartLine>;
  add: (product: Product) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: {},
  add: (product) =>
    set((state) => {
      const existing = state.lines[product.id];
      return {
        lines: {
          ...state.lines,
          [product.id]: { product, qty: existing ? existing.qty + 1 : 1 },
        },
      };
    }),
  increment: (productId) =>
    set((state) => {
      const existing = state.lines[productId];
      if (!existing) return state;
      return {
        lines: {
          ...state.lines,
          [productId]: { ...existing, qty: existing.qty + 1 },
        },
      };
    }),
  decrement: (productId) =>
    set((state) => {
      const existing = state.lines[productId];
      if (!existing) return state;
      if (existing.qty <= 1) {
        const { [productId]: _removed, ...rest } = state.lines;
        return { lines: rest };
      }
      return {
        lines: {
          ...state.lines,
          [productId]: { ...existing, qty: existing.qty - 1 },
        },
      };
    }),
}));

export const useCartQty = (productId: string) =>
  useCartStore((s) => s.lines[productId]?.qty ?? 0);

export const useCartCount = () =>
  useCartStore((s) =>
    Object.values(s.lines).reduce((total, line) => total + line.qty, 0),
  );

export const useCartSavings = () =>
  useCartStore((s) =>
    Object.values(s.lines).reduce(
      (total, line) => total + (line.product.mrp - line.product.price) * line.qty,
      0,
    ),
  );
