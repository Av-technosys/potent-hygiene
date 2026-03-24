/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cartTypes";

type CartState = {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity" | "addedAt">) => void;
  removeItem: (productVariantId: string, sku?: string) => void;
  updateQuantity: (productVariantId: string, quantity: number, sku?: string) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;

  totalItems: () => number;
  subtotal: () => number;
};

const getItemKey = (item: { productVariantId: string; sku?: string }) =>
  `${item.productVariantId}-${item.sku || "default"}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      setCart: (items) => set({ items }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => getItemKey(i) === getItemKey(item)
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                getItemKey(i) === getItemKey(item)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...item, quantity: 1, addedAt: Date.now() },
            ],
          };
        }),

      removeItem: (productVariantId, sku) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              getItemKey(i) !==
              getItemKey({ productVariantId, sku })
          ),
        })),

      updateQuantity: (productVariantId, quantity, sku) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              getItemKey(i) ===
              getItemKey({ productVariantId, sku })
                ? { ...i, quantity }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "potent-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);