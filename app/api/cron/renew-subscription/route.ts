import { db } from "@/db"
import { subscriptions } from "@/db/schema"
// import { subscriptionPlans } from "@/db/schema"
import { order } from "@/db/schema"
import { eq, lte } from "drizzle-orm"

export async function GET() {

  const today = new Date()

  const activeSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(lte(subscriptions.nextOrderDate, today))

  for (const sub of activeSubscriptions) {

    if (!sub.id) continue

    const plan = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, sub.id)
    })

    if (!plan) continue

    await db.insert(order).values({
      userId: sub.userId,
      subscriptionId: sub.id,
      // totalAmount: plan.price,
      status: "pending",
      createdAt: new Date()
    })

    if (!sub.nextOrderDate) continue

    let nextBilling = new Date(sub.nextOrderDate)

    if (plan.subscriptionType === "cycle_sync" && plan.cycleLength) {
      const nextPeriodDate = plan.nextPeriodDate
        ? new Date(plan.nextPeriodDate)
        : new Date(sub.nextOrderDate)

      nextPeriodDate.setDate(nextPeriodDate.getDate() + plan.cycleLength)
      nextBilling = new Date(nextPeriodDate)
      nextBilling.setDate(nextBilling.getDate() - 10)

      const nextArrival = new Date(nextPeriodDate)
      nextArrival.setDate(nextArrival.getDate() - 5)

      await db
        .update(subscriptions)
        .set({
          nextOrderDate: nextBilling,
          nextPeriodDate,
          arrivalDate: nextArrival,
          chargeDate: nextBilling,
        })
        .where(eq(subscriptions.id, sub.id))

      continue
    }

    if (!plan.frequencyInDays) continue

    nextBilling.setDate(
      nextBilling.getDate() + plan.frequencyInDays
    )

    await db
      .update(subscriptions)
      .set({ nextOrderDate: nextBilling })
      .where(eq(subscriptions.id, sub.id))
  }

  return Response.json({ message: "Renewal completed" })
}
