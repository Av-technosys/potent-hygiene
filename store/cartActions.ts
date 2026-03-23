/* eslint-disable @typescript-eslint/no-explicit-any */
// helper/cart.ts

import { useCartStore } from "@/store/cartStore";

import {
  addToCart as addToCartDB,
  removeFromCart as removeFromCartDB,
  updateCartItemQuantity,
  clearCart as clearCartDB,
  getCart,
} from "@/helper/cart/action";

// Types
type CartItem = {
  productVariantId: string;
  sku?: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
};

// Add to cart
export const addToCart = async (item: CartItem) => {
  console.log("Adding to cart in zustand");

  const normalizedItem = {
    productVariantId: item.productVariantId,
    sku: item.sku,
    slug: item.slug,
    title: item.title,
    image: item.image,
    price: item.price,
    originalPrice: item.originalPrice,
  };

  // ✅ optimistic UI
  useCartStore.getState().addItem(normalizedItem);

  console.log("Synced to Zustand, now DB...");

  // ✅ DB sync
  addToCartDB(item.productVariantId, 1).catch((error) => {
    console.error("Failed to sync with DB:", error);
  });
};

// Remove
export const removeFromCart = async (productVariantId: string, sku?: string) => {
  useCartStore.getState().removeItem(productVariantId, sku);

  removeFromCartDB(productVariantId).catch((error) => {
    console.error("Failed to remove from DB:", error);
  });
};

// Update quantity
export const updateCartQuantity = async (
  productVariantId: string,
  quantity: number,
  sku?: string
) => {
  useCartStore.getState().updateQuantity(productVariantId, quantity, sku);

  updateCartItemQuantity(productVariantId, quantity).catch((error) => {
    console.error("Failed to update DB:", error);
  });
};

// Clear
export const clearCart = async () => {
  useCartStore.getState().clearCart();

  clearCartDB().catch((error) => {
    console.error("Failed to clear DB:", error);
  });
};

// Sync from DB
export const syncCartFromDB = async () => {
  const result = await getCart();

  if (result.success && result.items) {
    const formattedItems = result.items.map((item: any) => ({
      productVariantId: item.productVariantId,
      sku: item.sku || "",
      slug: item.slug || "",
      title: item.title || "Product",
      image: item.image || "/product.png",
      price: item.price || 0,
      originalPrice: item.originalPrice,
      quantity: item.quantity ?? 0,
      addedAt: Date.now(),
    }));

    useCartStore.getState().setCart(formattedItems);
  }
};