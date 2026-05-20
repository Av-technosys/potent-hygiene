"use server";

import { db } from "@/lib/db";
import {
  cancelRequest,
  category,
  featuredCategory,
  featuredProduct,
  order,
  orderItem,
  payment,
  product,
  returnRequest,
  returnRequestImage,
  users,
} from "@/db/schema";
import { desc, eq, ilike, inArray, or, sql } from "drizzle-orm";

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
      emailVerified: users.emailVerified,
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
      basePrice: product.basePrice,
      isInStock: product.isInStock,
    })
    .from(featuredProduct)
    .leftJoin(product, eq(featuredProduct.productId, product.id))
    .where(whereClause)
    .orderBy(desc(featuredProduct.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(featuredProduct)
    .leftJoin(product, eq(featuredProduct.productId, product.id))
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
