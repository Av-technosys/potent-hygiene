"use server";
import { db } from "@/db";
import {
  wishlist,
  wishlistItem,
  productVariant,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { requireUserWithRefresh } from "../user/action";

export async function addToWishlistDB(productVariantId: string) {
  const { userId } = await requireUserWithRefresh();

  const userWishlist = await db
    .select()
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
    .limit(1);

  let wishlistId: string;

  if (userWishlist.length === 0) {
    const newWishlist = await db
      .insert(wishlist)
      .values({ userId })
      .returning({ id: wishlist.id });

    wishlistId = newWishlist[0].id;
  } else {
    wishlistId = userWishlist[0].id;
  }

  const existing = await db
    .select()
    .from(wishlistItem)
    .where(
      and(
        eq(wishlistItem.wishlistId, wishlistId),
        eq(wishlistItem.productVariantId, productVariantId)
      )
    );

  if (existing.length > 0) return;

  await db.insert(wishlistItem).values({
    wishlistId,
    productVariantId,
  });
}

export async function removeFromWishlistDB(productVariantId: string) {
  const { userId } = await requireUserWithRefresh();

  const userWishlist = await db
    .select()
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
    .limit(1);

  if (!userWishlist.length) return;

  await db
    .delete(wishlistItem)
    .where(
      and(
        eq(wishlistItem.wishlistId, userWishlist[0].id),
        eq(wishlistItem.productVariantId, productVariantId)
      )
    );
}

export async function getWishlistDB() {
  const { userId } = await requireUserWithRefresh();

  const result = await db
    .select({
      productVariantId: wishlistItem.productVariantId,
      name: productVariant.name,
      price: productVariant.basePrice,
      image: productVariant.bannerImage,
    })
    .from(wishlistItem)
    .innerJoin(
      productVariant,
      eq(productVariant.id, wishlistItem.productVariantId)
    )
    .innerJoin(
      wishlist,
      eq(wishlist.id, wishlistItem.wishlistId)
    )
    .where(eq(wishlist.userId, userId));

  return result;
}