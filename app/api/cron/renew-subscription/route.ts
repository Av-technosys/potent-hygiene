import { db } from "@/db"
import { subscriptions } from "@/db/schema"
import { subscriptionPlans } from "@/db/schema"
import { order } from "@/db/schema"
import { eq, lte } from "drizzle-orm"

export async function GET() {

  const today = new Date()

  const activeSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(lte(subscriptions.nextBillingDate, today))

  for (const sub of activeSubscriptions) {

    if (!sub.planId) continue

    const plan = await db.query.subscriptionPlans.findFirst({
      where: eq(subscriptionPlans.id, sub.planId)
    })

    if (!plan) continue

    await db.insert(order).values({
      userId: sub.userId,
      subscriptionId: sub.id,
      totalAmountPaid: plan.price,
      status: "pending",
      createdAt: new Date()
    })

    if (!sub.nextBillingDate || !plan.intervalMonths) continue

    const nextBilling = new Date(sub.nextBillingDate)

    nextBilling.setMonth(
      nextBilling.getMonth() + plan.intervalMonths
    )

    await db
      .update(subscriptions)
      .set({ nextBillingDate: nextBilling })
      .where(eq(subscriptions.id, sub.id))
  }

  return Response.json({ message: "Renewal completed" })
}