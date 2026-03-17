export const dynamic = "force-dynamic";
import { db } from "@/src/db";
import { subscriptionPlans } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const plans = await db.select().from(subscriptionPlans);
        return NextResponse.json({ success: true, data: plans }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
