/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { paginate } from "@/lib/pagination";
import { and, or, sql, asc, eq, desc, inArray } from "drizzle-orm";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { cart, cartItem, cancelRequest, couponTransaction, product, returnRequest, returnRequestImage, review, rewardCoinsHistory } from "@/db/schema";
import { order, orderItem, payment, users } from "@/db/schema";
import { requireUserWithRefresh } from "../user/action";
import { calculateCheckoutPricingForUser } from "../checkout/action";
import { ORDER_STATUS } from "@/const/globalconst";
import { getImageKey } from "@/lib/imageUrl";
import {
  sendDeliveryConfirmationEmail,
  sendOrderStatusUpdateEmail,
  sendShippingConfirmationEmail,
  sendUserExperienceEmail,
} from "../emailTemplates/action";

export const fetchOrders = async ({
  page = 1,
  pageSize = 3,
  search = "",
  status = "",
}) => {
  const filters = [];

  if (search && search.trim() !== "") {
    filters.push(or(sql`${order.id}::text ILIKE ${`%${search}%`}`));
  }

  if (status && status.trim() !== "") {
    filters.push(eq(order.status, status));
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  return paginate({
    table: order,
    page,
    pageSize,
    where: whereClause,
    orderBy: asc(order.createdAt),
  });
};

export const fetchOrderDetails = async (orderId: string) => {
  try {
    const orderInfo = await db
      .select({
        order,
        users,
        payment,
      })
      .from(order)
      .leftJoin(users, eq(order.userId, users.id))
      .leftJoin(payment, eq(payment.orderId, order.id))
      .where(eq(order.id, orderId))
      .limit(1);

    if (!orderInfo.length) return null;

    const rawItems = await db
      .select({
        item: orderItem,
        product: product,
      })
      .from(orderItem)
      .leftJoin(product, eq(orderItem.productId, product.id))
      .where(eq(orderItem.orderId, orderId));

    const items = rawItems.map((row) => ({
      ...row.item,
      product: row.product,
    }));

    return {
      ...orderInfo[0],
      items,
    };
  } catch (error) {
    console.error("fetchOrderDetails error:", error);
    throw new Error("Failed to fetch order details");
  }
};

const CANCELABLE_ORDER_STATUSES = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PAID,
  ORDER_STATUS.PROCESSING,
];

async function sendOrderStatusMail(orderId: string, status: string) {
  const [row] = await db
    .select({
      email: users.email,
      name: users.name,
    })
    .from(order)
    .leftJoin(users, eq(order.userId, users.id))
    .where(eq(order.id, orderId))
    .limit(1);

  if (!row?.email) return;

  const firstName = row.name ?? "there";
  const currentDate = new Date().toLocaleDateString("en-IN");
  const orderLink = "https://www.potenthygiene.com/dashboard/orders";

  if (status === ORDER_STATUS.SHIPPED) {
    await sendShippingConfirmationEmail(row.email, orderId, firstName, orderLink, "FedEx");
    return;
  }

  if (status === ORDER_STATUS.DELIVERED) {
    await sendDeliveryConfirmationEmail(row.email, firstName, orderId, currentDate, orderLink);
    await sendUserExperienceEmail(row.email, firstName, "https://www.potenthygiene.com/dashboard/reviews");
    return;
  }

  const prettyStatus = status.replace(/_/g, " ");
  await sendOrderStatusUpdateEmail(
    row.email,
    firstName,
    orderId,
    prettyStatus,
    `Your order status has been updated to ${prettyStatus}.`,
  );
}

export const changeOrderStatus = async (id: string, status: string) => {
  const result = await db
    .update(order)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(order.id, id))
    .returning();

  if (result[0]) {
    await sendOrderStatusMail(id, status);
  }

  return result[0];
};

export async function updateOrderStatus(id: string, status: string | any) {
  await changeOrderStatus(id, status);
  revalidatePath("/admin/order");
  revalidatePath("/dashboard/orders");
}

export async function createCancelRequest(orderId: string, userReason: string) {
  try {
    const { userId } = await requireUserWithRefresh();
    const [orderRow] = await db
      .select()
      .from(order)
      .where(and(eq(order.id, orderId), eq(order.userId, userId)))
      .limit(1);

    if (!orderRow) return { success: false, message: "Order not found" };
    if (!orderRow.status || !CANCELABLE_ORDER_STATUSES.includes(orderRow.status as any)) {
      return { success: false, message: "This order can no longer be cancelled" };
    }

    const [existing] = await db
      .select()
      .from(cancelRequest)
      .where(and(eq(cancelRequest.orderId, orderId), eq(cancelRequest.userId, userId)))
      .limit(1);

    if (existing) return { success: false, message: "Cancel request already submitted" };

    await db.insert(cancelRequest).values({
      orderId,
      userId,
      userReason,
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/admin/cancel-requests");
    return { success: true, message: "Cancel request submitted" };
  } catch (error) {
    console.error("createCancelRequest error:", error);
    return { success: false, message: "Failed to submit cancel request" };
  }
}

export async function createReturnRequest(orderItemId: string, reason: string, imageUrls: string[] = []) {
  try {
    const { userId } = await requireUserWithRefresh();
    const [row] = await db
      .select({
        item: orderItem,
        order: order,
      })
      .from(orderItem)
      .leftJoin(order, eq(orderItem.orderId, order.id))
      .where(eq(orderItem.id, orderItemId))
      .limit(1);

    if (!row?.item || !row.order || row.order.userId !== userId) {
      return { success: false, message: "Order item not found" };
    }

    if (row.order.status !== ORDER_STATUS.DELIVERED) {
      return { success: false, message: "Return is available after delivery" };
    }

    const [existing] = await db
      .select()
      .from(returnRequest)
      .where(and(eq(returnRequest.orderItemId, orderItemId), eq(returnRequest.userId, userId)))
      .limit(1);

    if (existing) return { success: false, message: "Return request already submitted" };

    const [created] = await db
      .insert(returnRequest)
      .values({
        orderItemId,
        userId,
        reason,
      })
      .returning({ id: returnRequest.id });

    const cleanImages = imageUrls.map((imageUrl) => getImageKey(imageUrl)).filter(Boolean);
    if (cleanImages.length > 0) {
      await db.insert(returnRequestImage).values(
        cleanImages.map((imageUrl) => ({
          returnRequestId: created.id,
          imageUrl,
        })),
      );
    }

    revalidatePath("/dashboard/orders");
    revalidatePath("/admin/return-requests");
    return { success: true, message: "Return request submitted" };
  } catch (error) {
    console.error("createReturnRequest error:", error);
    return { success: false, message: "Failed to submit return request" };
  }
}

export async function updateCancelRequestStatus(
  requestId: string,
  status: "approved" | "rejected",
  adminReason?: string,
) {
  try {
    const [updated] = await db
      .update(cancelRequest)
      .set({
        status,
        adminReason,
        updatedAt: new Date(),
      })
      .where(eq(cancelRequest.id, requestId))
      .returning();

    if (!updated) return { success: false, message: "Cancel request not found" };

    if (status === "approved") {
      await changeOrderStatus(updated.orderId, ORDER_STATUS.CANCELED);
    }

    revalidatePath("/admin/cancel-requests");
    revalidatePath("/admin/order");
    revalidatePath("/dashboard/orders");
    return { success: true, message: `Cancel request ${status}` };
  } catch (error) {
    console.error("updateCancelRequestStatus error:", error);
    return { success: false, message: "Failed to update cancel request" };
  }
}

export async function updateReturnRequestStatus(
  requestId: string,
  status: "approved" | "rejected",
  adminReason?: string,
) {
  try {
    const [updated] = await db
      .update(returnRequest)
      .set({
        status,
        adminReason,
        updatedAt: new Date(),
      })
      .where(eq(returnRequest.id, requestId))
      .returning();

    if (!updated) return { success: false, message: "Return request not found" };

    if (status === "approved") {
      const [item] = await db
        .select({ orderId: orderItem.orderId })
        .from(orderItem)
        .where(eq(orderItem.id, updated.orderItemId))
        .limit(1);

      if (item?.orderId) {
        await changeOrderStatus(item.orderId, ORDER_STATUS.RETURNED);
      }
    }

    revalidatePath("/admin/return-requests");
    revalidatePath("/admin/order");
    revalidatePath("/dashboard/orders");
    return { success: true, message: `Return request ${status}` };
  } catch (error) {
    console.error("updateReturnRequestStatus error:", error);
    return { success: false, message: "Failed to update return request" };
  }
}
// export async function createOrder({
//   items,
//   userId,
//   fixedAmount,
//   address,
//   razorpayPaymentId,
//   razorpayOrderId,
// }: {
//   items: { productId: string; quantity: number }[];
//   userId: string;
//   fixedAmount: number;
//   address: any;
//   razorpayPaymentId: string;
//   razorpayOrderId: string;
// }) {
//   try {
//     if (!items || items.length === 0) {
//       throw new Error("Order items are required");
//     }

//     const productIds = items.map((i) => (i as any).productId || (i as any).productId);

//     const products = await db
//       .select()
//       .from(product)
//       .where(inArray(product.id, productIds));

//     if (products.length !== items.length) {
//       throw new Error("Some products not found");
//     }

//     const productMap = new Map(products.map((p) => [p.id, p]));

//     const safeAmount = Math.round(fixedAmount);

//     const result = await db.transaction(async (tx) => {
//       const insertedOrder = await tx
//         .insert(order)
//         .values({
//           userId,
//           status: "paid",
//           totalAmountPaid: safeAmount,
//           addressLine1: address.addressLine1,
//           addressLine2: address.addressLine2,
//           city: address.city,
//           state: address.state,
//           pincode: address.pincode,
//         })
//         .returning({ id: order.id });

//       const orderId = insertedOrder[0].id;

//       const orderItemsToInsert = items.map((item) => {
//         const Id = (item as any).productId || (item as any).productId;
//         const p = productMap.get(Id);

//         if (!p || !p.name || !p.slug || p.basePrice == null) {
//           throw new Error("Invalid product data");
//         }

//         return {
//           orderId,
//           productId: p.id,
//           quantity: item.quantity,
//           productName: p.name,
//           productSlug: p.slug,
//           productImage: p.bannerImage ?? null,
//           productSKU: p.sku ?? null,
//           productPrice: p.basePrice,
//         };
//       });

//       await Promise.all([
//         tx.insert(orderItem).values(orderItemsToInsert),
//         tx.insert(payment).values({
//           orderId,
//           paymentId: razorpayPaymentId,
//           paymentStatus: "success",
//           paymentMethod: "razorpay",
//           paymentAmount: safeAmount,
//           paymentCurrency: "INR",
//         }),
//       ]);

//       return { orderId };
//     });
//     const cartRes = await db
//       .select()
//       .from(cart)
//       .where(eq(cart.userId, userId))
//       .limit(1);

//     if (cartRes.length > 0) {
//       await db.delete(cartItem)
//         .where(eq(cartItem.cartId, cartRes[0].id));

//       await db.delete(cart)
//         .where(eq(cart.id, cartRes[0].id));
//     }
//     return {
//       success: true,
//       orderId: result.orderId,
//     };

//   } catch (error) {
//     console.error("Order creation failed:", error);
//     return {
//       success: false,
//       message: "Failed to create order",
//     };
//   }
// }

export async function createOrder({
  items,
  couponCode,
  address,
  userId,
  razorpayPaymentId,
  razorpayOrderId,
}: {
  items: any;
  userId: any;
  couponCode?: string;
  address: any;
  razorpayPaymentId: string;
  razorpayOrderId: string;
}) {
  try {
    if (!items || items.length === 0) {
      throw new Error("Order items are required");
    }

    const pricing = await calculateCheckoutPricingForUser({ userId, couponCode });

    if (!pricing.success) {
      throw new Error(pricing.message ?? "Invalid checkout total");
    }

    const checkoutItems = pricing.items.length > 0 ? pricing.items : items;

    const productIds = checkoutItems
      .map((i: any) => i.productId)
      .filter((id: any): id is string => typeof id === "string");

    const uniqueProductIds: any = [...new Set(productIds)];

    if (uniqueProductIds.length === 0) {
      throw new Error("No product IDs provided");
    }

    const products = await db
      .select()
      .from(product)
      .where(inArray(product.id, uniqueProductIds));

    if (products.length !== uniqueProductIds.length) {
      throw new Error("Some products not found");
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    const safeAmount = Math.round(pricing.final);

    const result = await db.transaction(async (tx) => {
      const insertedOrder = await tx
        .insert(order)
        .values({
          userId,
          status: "paid",
          totalAmount: safeAmount,
          addressLine1: address.street,
          addressLine2: address.locality,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        })
        .returning({ id: order.id });

      const orderId = insertedOrder[0].id;

      const orderItemsToInsert = checkoutItems.map((item: any) => {
        // const Id =
        //   (item as any).id || (item as any).productId;
        const Id = item.productId;
        const p = productMap.get(Id);

        if (!p || !p.name || !p.slug || p.basePrice == null) {
          throw new Error("Invalid product data");
        }

        return {
          orderId,
          productId: p.id,
          quantity: item.quantity,
          productVarientBox: item.productVarientBox,
          productName: p.name,
          productSlug: p.slug,
          productImage: p.bannerImage ?? null,
          productSKU: p.sku ?? null,
          productPrice: p.basePrice,
        };
      });

      await tx.insert(orderItem).values(orderItemsToInsert);
      await tx.insert(payment).values({
        orderId: orderId,
        paymentId: razorpayPaymentId,
        paymentStatus: "success",
        paymentMethod: "razorpay",
        paymentAmount: safeAmount,
        paymentMeta: {
          status: "success",
          subtotal: pricing.subtotal,
          discount: pricing.discount,
          discountedSubtotal: pricing.discountedSubtotal,
          gst: pricing.gst,
          shipping: pricing.shipping,
          coupon: pricing.coupon,
        },
        paymentOrderId: razorpayOrderId,
      });
      await tx.insert(rewardCoinsHistory).values({
        orderId: orderId,
        userId: userId,
        coins: safeAmount,
      });
      await tx
        .update(users)
        .set({
          rewardOrderCoins: sql`${users.rewardOrderCoins} + ${safeAmount}`,
        })
        .where(eq(users.id, userId));

      if (pricing.coupon) {
        await tx.insert(couponTransaction).values({
          userId,
          couponId: pricing.coupon.id,
          code: pricing.coupon.code,
          isDiscountPercentage: pricing.coupon.isDiscountPercentage,
          discountPercentage: pricing.coupon.discountPercentage,
          discountFixedAmount: pricing.coupon.discountFixedAmount,
        });
      }

      return { orderId, totalAmount: safeAmount };
    });

    // This part is commented out because the cart is not used yet , we use localstorage for manage cart

    // const cartRes = await db.query.cart.findFirst({
    //   where: eq(cart.userId, userId),
    // });

    const cartRes = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .limit(1);

    if (cartRes.length > 0) {
      const cartData = cartRes[0];

      await db.delete(cartItem).where(eq(cartItem.cartId, cartData.id));
      await db.delete(cart).where(eq(cart.id, cartData.id));
    }

    return {
      success: true,
      orderId: result.orderId,
      totalAmount: result.totalAmount,
    };
  } catch (error) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      message: "Failed to create order",
    };
  }
}

export async function checkUserFirstOrder(userId: string) {
  try {
    const existingOrder = await db.select().from(order).where(eq(order.userId, userId)).limit(1);
    return existingOrder;
  } catch (error) {
    console.error("Error checking user's first order:", error);
    return [];
  }
}

export async function getOrdersByUserId() {
  try {
    const { userId } = await requireUserWithRefresh();
    const orders = await db
      .select()
      .from(order)
      .where(eq(order.userId, userId))
      .orderBy(desc(order.createdAt));

    const orderData = await Promise.all(
      orders.map(async (orderRow) => {
        const [items, cancelRequests] = await Promise.all([
          db
            .select()
            .from(orderItem)
            .where(eq(orderItem.orderId, orderRow.id)),
          db
            .select()
            .from(cancelRequest)
            .where(eq(cancelRequest.orderId, orderRow.id)),
        ]);

        const productIds = items
          .map((item) => item.productId)
          .filter((productId): productId is string => Boolean(productId));

        const [returnRequests, reviews] = items.length
          ? await Promise.all([
              db
                .select()
                .from(returnRequest)
                .where(inArray(returnRequest.orderItemId, items.map((item) => item.id))),
              productIds.length
                ? db
                    .select()
                    .from(review)
                    .where(and(eq(review.userId, userId), inArray(review.productId, productIds)))
                : Promise.resolve([]),
            ])
          : [[], []];

        const returnRequestMap = new Map(
          returnRequests.map((request) => [request.orderItemId, request]),
        );
        const reviewMap = new Map(reviews.map((review) => [review.productId, review]));

        return {
          ...orderRow,
          cancelRequest: cancelRequests[0] ?? null,
          order_items: items.map((item) => ({
            ...item,
            returnRequest: returnRequestMap.get(item.id) ?? null,
            review: item.productId ? reviewMap.get(item.productId) ?? null : null,
          })),
        };
      }),
    );

    return orderData;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrderById(orderId: string) {
  const rows = await db
    .select({
      order: order,
      item: orderItem,
      product: product,
      payment: payment,
    })
    .from(order)
    .leftJoin(orderItem, eq(order.id, orderItem.orderId))
    .leftJoin(product, eq(orderItem.productId, product.id))
    .leftJoin(payment, eq(order.id, payment.orderId))
    .where(eq(order.id, orderId));

  if (!rows.length) return null;

  const orderData = rows[0].order;

  const items = rows
    .filter((r) => r.item)
    .map((r) => ({
      ...r.item,
      product: r.product ?? null,
    }));

  const paymentData = rows[0].payment ?? null;

  return {
    ...orderData,
    items,
    payment: paymentData,
  };
}
