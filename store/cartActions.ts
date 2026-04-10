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
import { isUserLoggedIn } from "@/helper/auth/action";
import { toast } from "sonner";

// Types
type CartItem = {
  productVariantId: string;
  sku?: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  cartSizes?: any[];
  isQuantityChangable?: boolean;
  quantity?: number;
  uuid?: string; 
};

// Add to cart
export const addToCart = async (item: CartItem) => {

  const isAuth = await isUserLoggedIn()

  if (!isAuth) {
    toast.info("Please login to add items to cart");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);

    return; // ✅ stop execution
  }

  const normalizedItem = {
    productVariantId: item.productVariantId,
    sku: item.sku,
    slug: item.slug,
    title: item.title,
    image: item.image,
    price: item.price,
    originalPrice: item.originalPrice,
    cartSizes: item.cartSizes,
    isQuantityChangable: item.isQuantityChangable,
    quantity: item.quantity,
    uuid: item.uuid 
  };

  // ✅ optimistic UI
  useCartStore.getState().addItem(normalizedItem);


  // ✅ DB sync
  // addToCartDB(item.productVariantId, item.quantity).catch((error) => {
  //   console.error("Failed to sync with DB:", error);
  // });
};

// Remove
export const removeFromCart = async (productVariantId: string, sku?: string,uuid?:string) => {
  useCartStore.getState().removeItem(productVariantId, sku,uuid);

  // removeFromCartDB(productVariantId,uuid).catch((error) => {
  //   console.error("Failed to remove from DB:", error);
  // });
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