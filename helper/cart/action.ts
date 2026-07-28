/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { db } from "@/src/db";
import { cart, cartItem, product, productVariant } from "@/src/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { requireUserWithRefresh } from "../user/action";
import { calculateCycleSyncSchedule } from "@/lib/cycleSync";
import {
  calculateMixBoxPricing,
  normalizeMixBoxRecipe,
  normalizePadSize,
  type MixBoxSelection,
  type PurchaseType,
  type SubscriptionType,
} from "@/lib/mixYourBox";

export async function getCart() {
  try {
    const { userId } = await requireUserWithRefresh();
    const userCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then((r) => r[0]);

    if (!userCart) {
      return { success: true, items: [] };
    }

    const itemsWithDetails = await db
      .select({
        productId: cartItem.productId,
        productVariantId: cartItem.productVariantId,
        isTypeSubscription: cartItem.isTypeSubscription,
        frequencyInDays: cartItem.frequencyInDays,
        quantity: cartItem.quantity,
        title: product.name,
        image: sql<string>`COALESCE(${productVariant.image}, ${product.bannerImage})`,
        price: sql<number>`COALESCE(${productVariant.price}, 0)`,
        originalPrice: productVariant.strikethroughPrice,
        slug: product.slug,
        sku: sql<string>`COALESCE(${productVariant.sku}, ${product.sku})`,
        size: productVariant.size,
        flowType: productVariant.flowType,
        mixBoxRecipe: cartItem.mixBoxRecipe,
        totalPads: cartItem.totalPads,
        boxCount: cartItem.boxCount,
        freeLiners: cartItem.freeLiners,
        purchaseType: cartItem.purchaseType,
        subscriptionType: cartItem.subscriptionType,
        cycleLength: cartItem.cycleLength,
        periodLength: cartItem.periodLength,
        lastPeriodDate: cartItem.lastPeriodDate,
        nextPeriodDate: cartItem.nextPeriodDate,
        arrivalDate: cartItem.arrivalDate,
        chargeDate: cartItem.chargeDate,
      })
      .from(cartItem)
      .leftJoin(product, eq(cartItem.productId, product.id))
      .leftJoin(productVariant, eq(cartItem.productVariantId, productVariant.id))
      .where(eq(cartItem.cartId, userCart.id));

    return { success: true, items: itemsWithDetails };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { success: false, error: "Failed to fetch cart" };
  }
}

export async function addToCart(
  productId: string,
  quantity: any,
  selectedPlan: any,
  isSubscribed: any,
  productVariantId?: string,
  cartSizes?: any,
  uuid?: any,
  metadata?: {
    mixBoxRecipe?: any;
    purchaseType?: PurchaseType;
    subscriptionType?: SubscriptionType;
    cycleSync?: {
      lastPeriodDate: string;
      cycleLength: number;
      periodLength: number;
    };
  }
) {
  try {
    const { userId } = await requireUserWithRefresh();
    if (!userId) {
      return {
        success: false,
        error: "UNAUTHORIZED",
      };
    }

    const [variantInfo] = await db
      .select({
        price: productVariant.price,
      })
      .from(productVariant)
      .where(
        productVariantId
          ? eq(productVariant.id, productVariantId)
          : eq(productVariant.productId, productId)
      )
      .limit(1);

    const purchaseType: PurchaseType =
      metadata?.purchaseType ?? (isSubscribed ? "subscription" : "one_time");
    let subscriptionType: SubscriptionType =
      metadata?.subscriptionType ??
      (selectedPlan?.subscriptionType ??
        (selectedPlan?.period === 2 ? "every_2_months" : selectedPlan?.period === 1 ? "monthly" : null));

    const cycleSchedule =
      subscriptionType === "cycle_sync" && metadata?.cycleSync
        ? calculateCycleSyncSchedule(metadata.cycleSync)
        : null;

    if (cycleSchedule && !cycleSchedule.valid) {
      return { success: false, error: cycleSchedule.message };
    }

    const effectivePurchaseType: PurchaseType =
      cycleSchedule?.valid && !cycleSchedule.shouldCreateSubscription
        ? "one_time"
        : purchaseType;

    if (effectivePurchaseType === "one_time") {
      subscriptionType = null;
      isSubscribed = false;
    }

    const result = await db.transaction(async (tx) => {
      // Get or create cart
      let existingCart = await tx
        .select()
        .from(cart)
        .where(eq(cart.userId, userId))
        .then((r) => r[0]);

      if (!existingCart) {
        const [newCart] = await tx
          .insert(cart)
          .values({
            id: uuidv4(),
            userId,
          })
          .returning();
        existingCart = newCart;
      }

      // Lock the cart row to prevent race conditions
      await tx.execute(
        sql`SELECT id FROM cart WHERE id = ${existingCart.id} FOR UPDATE`,
      );

      if (!cartSizes || cartSizes.length === 0) {
        // Check if item already exists
        const existingItem = await tx
          .select()
          .from(cartItem)
          .where(
            and(
              eq(cartItem.cartId, existingCart.id),
              eq(cartItem.productId, productId),
              productVariantId ? eq(cartItem.productVariantId, productVariantId) : sql`product_variant_id IS NULL`
            ),
          )
          .then((r) => r[0]);

        if (existingItem) {
          const currentQuantity = existingItem.quantity ?? 0;
          const newQuantity = currentQuantity + quantity;
          await tx
            .update(cartItem)
            .set({ quantity: newQuantity })
            .where(eq(cartItem.id, existingItem.id));

          return {
            success: true,
            action: "updated",
            quantity: newQuantity,
          };
        } else {
          // Insert new item
          await tx.insert(cartItem).values({
            id: uuidv4(),
            cartId: existingCart.id,
            productId,
            productVariantId: productVariantId || null,
            quantity,
            isTypeSubscription: isSubscribed,
            frequencyInDays: selectedPlan !== null && selectedPlan?.period ? selectedPlan.period * 30 : null,
          });

          return {
            success: true,
            action: "added",
            quantity,
          };
        }
      } else {
        const recipe =
          metadata?.mixBoxRecipe ??
          normalizeMixBoxRecipe(
            cartSizes
              .map((size: any): MixBoxSelection | null => {
                const padSize = normalizePadSize(size.name ?? "");
                return padSize ? { size: padSize, quantity: size.qty } : null;
              })
              .filter(Boolean) as MixBoxSelection[],
          );

        const pricing = calculateMixBoxPricing({
          recipe,
          setPrice: variantInfo?.price ?? 0,
          purchaseType: effectivePurchaseType,
          subscriptionType,
        });

        if (!pricing.valid) {
          return {
            success: false,
            error: pricing.message,
          };
        }

        const [mixVariant] = await tx
          .select({ id: productVariant.id })
          .from(productVariant)
          .where(and(eq(productVariant.productId, productId), eq(productVariant.isMixBox, true)))
          .limit(1);

        await tx.insert(cartItem).values({
          id: uuidv4(),
          cartId: existingCart.id,
          productId,
          productVariantId: mixVariant?.id || productVariantId || null,
          quantity: 1,
          isTypeSubscription: effectivePurchaseType === "subscription",
          frequencyInDays: subscriptionType === "monthly" ? 30 : subscriptionType === "every_2_months" ? 60 : null,
          clientCartItemId: uuid,
          mixBoxRecipe: recipe,
          totalPads: pricing.totalPads,
          boxCount: pricing.boxCount,
          freeLiners: pricing.freeLiners,
          purchaseType: effectivePurchaseType,
          subscriptionType,
          cycleLength: cycleSchedule?.valid ? cycleSchedule.cycleLength : null,
          periodLength: cycleSchedule?.valid ? cycleSchedule.periodLength : null,
          lastPeriodDate:
            cycleSchedule?.valid && metadata?.cycleSync?.lastPeriodDate
              ? new Date(metadata.cycleSync.lastPeriodDate)
              : null,
          nextPeriodDate: cycleSchedule?.valid ? cycleSchedule.nextPeriod : null,
          arrivalDate: cycleSchedule?.valid ? cycleSchedule.arrivalDate : null,
          chargeDate: cycleSchedule?.valid ? cycleSchedule.chargeDate : null,
        });

        return {
          success: true,
          action: "added",
          quantity,
        };
      }
    });

    revalidatePath("/cart");
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: "Failed to add to cart" };
  }
}

export async function removeFromCart(
  productId: string,
  productVariantId?: any,
  uuid?: any,
  cartSizes?: any,
) {
  try {
    const { userId } = await requireUserWithRefresh();
    const result = await db.transaction(async (tx) => {
      const userCart = await tx
        .select()
        .from(cart)
        .where(eq(cart.userId, userId))
        .then((r) => r[0]);

      if (!userCart) {
        return { success: true };
      }

      // Lock the cart
      await tx.execute(
        sql`SELECT id FROM cart WHERE id = ${userCart.id} FOR UPDATE`,
      );

      if (!cartSizes || cartSizes.length === 0) {
        await tx.delete(cartItem).where(
          and(
            eq(cartItem.cartId, userCart.id),
            eq(cartItem.productId, productId),
            productVariantId ? eq(cartItem.productVariantId, productVariantId) : sql`TRUE`
          ),
        );
      } else {
        await tx.delete(cartItem).where(
          and(
            eq(cartItem.cartId, userCart.id),
            eq(cartItem.productId, productId),
            eq(cartItem.clientCartItemId, uuid),
          ),
        );
      }

      return { success: true };
    });

    revalidatePath("/cart");
    return result;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, error: "Failed to remove from cart" };
  }
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number,
  productVariantId?: string,
) {
  try {
    const { userId } = await requireUserWithRefresh();
    if (quantity < 0) {
      return { success: false, error: "Invalid quantity" };
    }

    const result = await db.transaction(async (tx) => {
      const userCart = await tx
        .select()
        .from(cart)
        .where(eq(cart.userId, userId))
        .then((r) => r[0]);

      if (!userCart) {
        return { success: true };
      }

      // Lock the cart
      await tx.execute(
        sql`SELECT id FROM cart WHERE id = ${userCart.id} FOR UPDATE`,
      );

      if (quantity === 0) {
        await tx
          .delete(cartItem)
          .where(
            and(
              eq(cartItem.cartId, userCart.id),
              eq(cartItem.productId, productId),
              productVariantId ? eq(cartItem.productVariantId, productVariantId) : sql`TRUE`
            ),
          );
      } else {
        await tx
          .update(cartItem)
          .set({ quantity })
          .where(
            and(
              eq(cartItem.cartId, userCart.id),
              eq(cartItem.productId, productId),
              productVariantId ? eq(cartItem.productVariantId, productVariantId) : sql`TRUE`
            ),
          );
      }

      return { success: true };
    });

    revalidatePath("/cart");
    return result;
  } catch (error) {
    console.error("Error updating cart:", error);
    return { success: false, error: "Failed to update cart" };
  }
}

export async function clearCart() {
  try {
    const { userId } = await requireUserWithRefresh();
    const result = await db.transaction(async (tx) => {
      const userCart = await tx
        .select()
        .from(cart)
        .where(eq(cart.userId, userId))
        .then((r) => r[0]);

      if (!userCart) {
        return { success: true };
      }

      // Lock the cart
      await tx.execute(
        sql`SELECT id FROM cart WHERE id = ${userCart.id} FOR UPDATE`,
      );

      await tx.delete(cartItem).where(eq(cartItem.cartId, userCart.id));

      return { success: true };
    });

    revalidatePath("/cart");
    return result;
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: "Failed to clear cart" };
  }
}

export async function syncCartWithDatabase() {
  try {
    const { userId } = await requireUserWithRefresh();
    const userCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then((r) => r[0]);

    if (!userCart) {
      return { success: true, items: [] };
    }

    const cartItems = await db
      .select()
      .from(cartItem)
      .where(eq(cartItem.cartId, userCart.id));

    return { success: true, items: cartItems };
  } catch (error) {
    console.error("Error syncing cart:", error);
    return { success: false, error: "Failed to sync cart" };
  }
}
