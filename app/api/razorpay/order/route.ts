import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";
import { calculateCheckoutPricingForUser } from "@/helper";
import { requireUserWithRefresh } from "@/helper/user/action";

export async function POST(req: Request) {
  const body = await req.json();
  const { couponCode } = body;
  const { userId } = await requireUserWithRefresh();
  const pricing = await calculateCheckoutPricingForUser({ userId, couponCode });

  if (!pricing.success || pricing.final <= 0) {
    return NextResponse.json(
      { error: pricing.message ?? "Unable to calculate checkout total" },
      { status: 400 },
    );
  }

  const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID!,
    key_secret: RAZORPAY_KEY_SECRET!,
  });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(pricing.final * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ ...order, checkout: pricing });
  } catch (error: unknown) {
    console.error("Razorpay order creation failed:", error);
    const razorpayError = error as {
      error?: { description?: string };
      statusCode?: number;
    };

    return NextResponse.json(
      {
        error:
          razorpayError.error?.description ??
          "Razorpay order creation failed. Check Razorpay key id and secret.",
      },
      { status: razorpayError.statusCode ?? 500 },
    );
  }
}
