"use server";

import { db } from "@/lib/db";
import { order, payment, users } from "@/db/schema";
import { desc, ilike, or, sql, eq } from "drizzle-orm";

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
