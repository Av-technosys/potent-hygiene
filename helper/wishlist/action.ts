/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { db } from "@/db";
import {
  cart,
  cartItem,
  productVariant,
  wishlist,
  wishlistItem,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { requireUserWithRefresh } from "../user/action";

export async function createWishlist(productVarientId: any) {
  try {
    const {userId} = await requireUserWithRefresh()
    const existingWishlist = await db
      .select()
      .from(wishlist)
      .where(eq(wishlist.userId, userId));
    if (existingWishlist.length > 0) {
      const existingProduct = await db
        .select()
        .from(wishlistItem)
        .where(
          and(
            eq(wishlistItem.wishlistId, existingWishlist[0].id),
            eq(wishlistItem.productVariantId, productVarientId),
          ),
        );
      if (existingProduct.length > 0) {
        return {
          success: false,
          message: "Product already exists in wishlist",
        };
      }
      await db.insert(wishlistItem).values({
        wishlistId: existingWishlist[0].id,
        productVariantId: productVarientId,
      });
    } else {
      const wishlistId = await db
        .insert(wishlist)
        .values({ userId: userId })
        .returning({ id: wishlist.id });
      await db.insert(wishlistItem).values({
        wishlistId: wishlistId[0].id,
        productVariantId: productVarientId,
      });
    }

    return { success: true, message: "Item added to wishlist successfully" };
  } catch (error) {
    console.error("Create wishlist failed:", error);
    return { success: false, message: "Failed to add item in wishlist" };
  }
}

export async function getUserWishlist() {
  try {
    const {userId} = await requireUserWithRefresh()
    
    const result = await db.transaction(async (tx) => {
      const userWishlist = await tx
        .select()
        .from(wishlist)
        .where(eq(wishlist.userId, userId))
        .limit(1);

      if (userWishlist.length === 0) return [];

      const wishlistItems = await tx
        .select({
          id: wishlistItem.id,
          productVariantId: wishlistItem.productVariantId,
          wishlistId: wishlistItem.wishlistId,
          name: productVariant.name,
          price: productVariant.basePrice,
          image: productVariant.bannerImage,
          strikethroughPrice: productVariant.strikethroughPrice,
        })
        .from(wishlistItem)
        .innerJoin(
          productVariant,
          eq(productVariant.id, wishlistItem.productVariantId),
        )
        .where(eq(wishlistItem.wishlistId, userWishlist[0].id));

      return wishlistItems;
    });

    return result;
  } catch (error) {
    return [];
  }
}

export async function removeItemFromWishlist(
  productVariantId: any,
 
) {
  try {
    const {userId} = await requireUserWithRefresh()
    await db.transaction(async (tx) => {
      const wishlistIdSubquery = tx
        .select({ id: wishlist.id })
        .from(wishlist)
        .where(eq(wishlist.userId, userId));

      await tx
        .delete(wishlistItem)
        .where(
          and(
            eq(wishlistItem.productVariantId, productVariantId),
            eq(wishlistItem.wishlistId, wishlistIdSubquery),
          ),
        );

      const wishlistItemsData = await tx
        .select()
        .from(wishlistItem)
        .where(eq(wishlistItem.wishlistId, wishlistIdSubquery));

      if (wishlistItemsData.length === 0) {
        await tx.delete(wishlist).where(eq(wishlist.userId, userId));
      }
    });

    return { success: true, message: "Item Removed from wishlist" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to remove item from wishlist" };
  }
}

export async function addWishlistItemToCart(
  productVariantId: any,

) {
  try {
    const {userId} = await requireUserWithRefresh()
     await db.transaction(async (tx) => {
      const wishlistIdSubquery = tx
        .select({ id: wishlist.id })
        .from(wishlist)
        .where(eq(wishlist.userId, userId));

      const wishlistItemData = await tx
        .select()
        .from(wishlistItem)
        .where(
          and(
            eq(wishlistItem.productVariantId, productVariantId),
            eq(wishlistItem.wishlistId, wishlistIdSubquery),
          ),
        );

      if (wishlistItemData.length === 0) {
        throw new Error("Item not found in wishlist");
      }

      const userCart = await tx
        .select()
        .from(cart)
        .where(eq(cart.userId, userId))
        .limit(1);

      let cartId: any;

      if (userCart.length === 0) {
        const newCart = await tx.insert(cart).values({ userId }).returning();
        cartId = newCart[0].id;
      } else {
        cartId = userCart[0].id;
      }

      await tx.insert(cartItem).values({
        cartId,
        productVariantId,
        quantity: 1,
      });

      await tx
        .delete(wishlistItem)
        .where(eq(wishlistItem.id, wishlistItemData[0].id));

      return true;
    });

    return { success: true, message: "Item added to cart successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add item to cart" };
  }
}
