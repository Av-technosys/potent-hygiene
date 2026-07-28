"use server";

import { db } from "@/lib/db";
import {
  cancelRequest,
  category,
  contactUs,
  featuredCategory,
  featuredProduct,
  order,
  orderItem,
  payment,
  product,
  productVariant,
  returnRequest,
  returnRequestImage,
  users,
} from "@/db/schema";
import { desc, eq, ilike, inArray, notInArray, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type ListingOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
};

function normalizePage(value = 1) {
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function normalizePageSize(value = 10) {
  return Number.isFinite(value) && value > 0 ? value : 10;
}

export async function fetchAdminUsers({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        ilike(users.name, `%${text}%`),
        ilike(users.email, `%${text}%`),
        ilike(users.phone, `%${text}%`),
      )
    : undefined;

  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      emailVerified: users.isEmailVerified,
      rewardOrderCoins: users.rewardOrderCoins,
      referralCoins: users.referralCoins,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(whereClause)
    .orderBy(desc(users.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(whereClause);

  const total = Number(count);

  return {
    data,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminContactMessages({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        ilike(contactUs.name, `%${text}%`),
        ilike(contactUs.email, `%${text}%`),
        ilike(contactUs.number, `%${text}%`),
        ilike(contactUs.message, `%${text}%`),
      )
    : undefined;

  const data = await db
    .select({
      id: contactUs.id,
      name: contactUs.name,
      email: contactUs.email,
      number: contactUs.number,
      message: contactUs.message,
      createdAt: contactUs.createdAt,
    })
    .from(contactUs)
    .where(whereClause)
    .orderBy(desc(contactUs.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactUs)
    .where(whereClause);

  const total = Number(count);

  return {
    data,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminPayments({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        ilike(payment.paymentId, `%${text}%`),
        ilike(payment.paymentOrderId, `%${text}%`),
        sql`${payment.orderId}::text ILIKE ${`%${text}%`}`,
        ilike(users.name, `%${text}%`),
        ilike(users.email, `%${text}%`),
      )
    : undefined;

  const data = await db
    .select({
      id: payment.id,
      orderId: payment.orderId,
      paymentId: payment.paymentId,
      paymentStatus: payment.paymentStatus,
      paymentMethod: payment.paymentMethod,
      paymentAmount: payment.paymentAmount,
      paymentOrderId: payment.paymentOrderId,
      createdAt: payment.createdAt,
      orderStatus: order.status,
      customerName: users.name,
      customerEmail: users.email,
    })
    .from(payment)
    .leftJoin(order, eq(payment.orderId, order.id))
    .leftJoin(users, eq(order.userId, users.id))
    .where(whereClause)
    .orderBy(desc(payment.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(payment)
    .leftJoin(order, eq(payment.orderId, order.id))
    .leftJoin(users, eq(order.userId, users.id))
    .where(whereClause);

  const total = Number(count);

  return {
    data,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminFeaturedProducts({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        ilike(product.name, `%${text}%`),
        ilike(product.sku, `%${text}%`),
        ilike(product.slug, `%${text}%`),
      )
    : undefined;

  const data = await db
    .select({
      id: featuredProduct.id,
      productId: featuredProduct.productId,
      createdAt: featuredProduct.createdAt,
      productName: product.name,
      productSku: product.sku,
      productSlug: product.slug,
      bannerImage: product.bannerImage,
      basePrice: productVariant.price,
      isInStock: product.isInStock,
    })
    .from(featuredProduct)
    .leftJoin(product, eq(featuredProduct.productId, product.id))
    .leftJoin(productVariant, eq(product.id, productVariant.productId))
    .where(whereClause)
    .orderBy(desc(featuredProduct.createdAt))
    .limit(limit * 5)
    .offset(offset);

  // deduplicate products
  const seen = new Set();
  const dedupedData = data.filter((item: any) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  }).slice(0, limit);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(featuredProduct)
    .leftJoin(product, eq(featuredProduct.productId, product.id))
    .where(whereClause);

  const total = Number(count);

  return {
    data: dedupedData,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminFeaturedCategories({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        ilike(category.name, `%${text}%`),
        ilike(category.slug, `%${text}%`),
      )
    : undefined;

  const data = await db
    .select({
      id: featuredCategory.id,
      categoryId: featuredCategory.categoryId,
      createdAt: featuredCategory.createdAt,
      categoryName: category.name,
      categorySlug: category.slug,
      bannerImage: category.bannerImage,
      description: category.description,
    })
    .from(featuredCategory)
    .leftJoin(category, eq(featuredCategory.categoryId, category.id))
    .where(whereClause)
    .orderBy(desc(featuredCategory.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(featuredCategory)
    .leftJoin(category, eq(featuredCategory.categoryId, category.id))
    .where(whereClause);

  const total = Number(count);

  return {
    data,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminCancelRequests({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        sql`${cancelRequest.orderId}::text ILIKE ${`%${text}%`}`,
        ilike(users.name, `%${text}%`),
        ilike(users.email, `%${text}%`),
        ilike(cancelRequest.status, `%${text}%`),
      )
    : undefined;

  const data = await db
    .select({
      id: cancelRequest.id,
      orderId: cancelRequest.orderId,
      userId: cancelRequest.userId,
      userReason: cancelRequest.userReason,
      adminReason: cancelRequest.adminReason,
      status: cancelRequest.status,
      createdAt: cancelRequest.createdAt,
      orderStatus: order.status,
      totalAmount: order.totalAmount,
      customerName: users.name,
      customerEmail: users.email,
      customerPhone: users.phone,
    })
    .from(cancelRequest)
    .leftJoin(order, eq(cancelRequest.orderId, order.id))
    .leftJoin(users, eq(cancelRequest.userId, users.id))
    .where(whereClause)
    .orderBy(desc(cancelRequest.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(cancelRequest)
    .leftJoin(order, eq(cancelRequest.orderId, order.id))
    .leftJoin(users, eq(cancelRequest.userId, users.id))
    .where(whereClause);

  const total = Number(count);

  return {
    data,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminReturnRequests({
  page = 1,
  pageSize = 10,
  search = "",
}: ListingOptions) {
  const currentPage = normalizePage(page);
  const limit = normalizePageSize(pageSize);
  const offset = (currentPage - 1) * limit;
  const text = search.trim();

  const whereClause = text
    ? or(
        sql`${returnRequest.id}::text ILIKE ${`%${text}%`}`,
        sql`${returnRequest.orderItemId}::text ILIKE ${`%${text}%`}`,
        ilike(users.name, `%${text}%`),
        ilike(users.email, `%${text}%`),
        ilike(orderItem.productName, `%${text}%`),
        ilike(returnRequest.status, `%${text}%`),
      )
    : undefined;

  const requests = await db
    .select({
      id: returnRequest.id,
      orderItemId: returnRequest.orderItemId,
      userId: returnRequest.userId,
      reason: returnRequest.reason,
      adminReason: returnRequest.adminReason,
      status: returnRequest.status,
      createdAt: returnRequest.createdAt,
      productName: orderItem.productName,
      productSku: orderItem.productSKU,
      productImage: orderItem.productImage,
      productPrice: orderItem.productPrice,
      quantity: orderItem.quantity,
      orderId: orderItem.orderId,
      customerName: users.name,
      customerEmail: users.email,
      customerPhone: users.phone,
    })
    .from(returnRequest)
    .leftJoin(orderItem, eq(returnRequest.orderItemId, orderItem.id))
    .leftJoin(users, eq(returnRequest.userId, users.id))
    .where(whereClause)
    .orderBy(desc(returnRequest.createdAt))
    .limit(limit)
    .offset(offset);

  const requestIds = requests.map((request) => request.id);
  const images = requestIds.length
    ? await db
        .select({
          id: returnRequestImage.id,
          returnRequestId: returnRequestImage.returnRequestId,
          imageUrl: returnRequestImage.imageUrl,
        })
        .from(returnRequestImage)
        .where(inArray(returnRequestImage.returnRequestId, requestIds))
    : [];

  const imageMap = new Map<string, { id: string; imageUrl: string }[]>();

  images.forEach((image) => {
    const list = imageMap.get(image.returnRequestId) ?? [];
    list.push({ id: image.id, imageUrl: image.imageUrl });
    imageMap.set(image.returnRequestId, list);
  });

  const data = requests.map((request) => ({
    ...request,
    images: imageMap.get(request.id) ?? [],
  }));

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(returnRequest)
    .leftJoin(orderItem, eq(returnRequest.orderItemId, orderItem.id))
    .leftJoin(users, eq(returnRequest.userId, users.id))
    .where(whereClause);

  const total = Number(count);

  return {
    data,
    meta: {
      page: currentPage,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function fetchAdminDashboardStats() {
  const [
    [{ totalOrders }],
    [{ totalProducts }],
    [{ activeProducts }],
    [{ totalUsers }],
    [{ verifiedUsers }],
    [{ totalRevenue }],
    [{ successfulPayments }],
    [{ pendingOrders }],
  ] = await Promise.all([
    db.select({ totalOrders: sql<number>`count(*)` }).from(order),
    db.select({ totalProducts: sql<number>`count(*)` }).from(product),
    db
      .select({ activeProducts: sql<number>`count(*)` })
      .from(product)
      .where(eq(product.isInStock, true)),
    db.select({ totalUsers: sql<number>`count(*)` }).from(users),
    db
      .select({ verifiedUsers: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.isEmailVerified, true)),
    db
      .select({
        totalRevenue: sql<number>`coalesce(sum(${payment.paymentAmount}), 0)`,
      })
      .from(payment)
      .where(eq(payment.paymentStatus, "success")),
    db
      .select({ successfulPayments: sql<number>`count(*)` })
      .from(payment)
      .where(eq(payment.paymentStatus, "success")),
    db
      .select({ pendingOrders: sql<number>`count(*)` })
      .from(order)
      .where(eq(order.status, "pending")),
  ]);

  return {
    totalOrders: Number(totalOrders),
    totalProducts: Number(totalProducts),
    activeProducts: Number(activeProducts),
    totalUsers: Number(totalUsers),
    verifiedUsers: Number(verifiedUsers),
    totalRevenue: Number(totalRevenue),
    successfulPayments: Number(successfulPayments),
    pendingOrders: Number(pendingOrders),
  };
}

export async function fetchFeaturedProductOptions() {
  const alreadyFeatured = db
    .select({ productId: featuredProduct.productId })
    .from(featuredProduct);

  return db
    .select({
      value: product.id,
      label: product.name,
      sku: product.sku,
    })
    .from(product)
    .where(notInArray(product.id, alreadyFeatured))
    .orderBy(product.name);
}

export async function fetchFeaturedCategoryOptions() {
  const alreadyFeatured = db
    .select({ categoryId: featuredCategory.categoryId })
    .from(featuredCategory);

  return db
    .select({
      value: category.id,
      label: category.name,
      slug: category.slug,
    })
    .from(category)
    .where(notInArray(category.id, alreadyFeatured))
    .orderBy(category.name);
}

export async function addFeaturedProduct(productId: string) {
  try {
    const existing = await db
      .select({ id: featuredProduct.id })
      .from(featuredProduct)
      .where(eq(featuredProduct.productId, productId))
      .limit(1);

    if (existing.length) {
      return { success: false, message: "Product is already featured" };
    }

    await db.insert(featuredProduct).values({ productId });
    revalidatePath("/admin/featured-products");

    return { success: true, message: "Product added to featured" };
  } catch (error) {
    console.error("addFeaturedProduct failed:", error);
    return { success: false, message: "Failed to add featured product" };
  }
}

export async function removeFeaturedProduct(id: string) {
  try {
    await db.delete(featuredProduct).where(eq(featuredProduct.id, id));
    revalidatePath("/admin/featured-products");

    return { success: true, message: "Featured product removed" };
  } catch (error) {
    console.error("removeFeaturedProduct failed:", error);
    return { success: false, message: "Failed to remove featured product" };
  }
}

export async function addFeaturedCategory(categoryId: string) {
  try {
    const existing = await db
      .select({ id: featuredCategory.id })
      .from(featuredCategory)
      .where(eq(featuredCategory.categoryId, categoryId))
      .limit(1);

    if (existing.length) {
      return { success: false, message: "Category is already featured" };
    }

    await db.insert(featuredCategory).values({ categoryId });
    revalidatePath("/admin/featured-categories");

    return { success: true, message: "Category added to featured" };
  } catch (error) {
    console.error("addFeaturedCategory failed:", error);
    return { success: false, message: "Failed to add featured category" };
  }
}

export async function removeFeaturedCategory(id: string) {
  try {
    await db.delete(featuredCategory).where(eq(featuredCategory.id, id));
    revalidatePath("/admin/featured-categories");

    return { success: true, message: "Featured category removed" };
  } catch (error) {
    console.error("removeFeaturedCategory failed:", error);
    return { success: false, message: "Failed to remove featured category" };
  }
}
