import { db } from "@/db"
import { subscriptionPlans } from "@/db/schema"

export async function GET() {

  const plans = await db.select().from(subscriptionPlans)

  return Response.json(plans)
}


// GET /api/plans