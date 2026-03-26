// store/wishlistStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistItem = {
  productVariantId: string;
  name?: string;
  price?: number;
  image?: string;
};

type WishlistState = {
  items: WishlistItem[];

  setWishlist: (items: WishlistItem[]) => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (productVariantId: string) => void;

  totalItems: () => number;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      setWishlist: (items) => set({ items }),

      addItem: (item) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.productVariantId === item.productVariantId
          );

          if (exists) return state;

          return { items: [...state.items, item] };
        }),

      removeItem: (productVariantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => i.productVariantId !== productVariantId
          ),
        })),

      totalItems: () => get().items.length,
    }),
    {
      name: "potent-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);