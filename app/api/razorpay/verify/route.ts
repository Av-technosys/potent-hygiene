/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import { NextResponse } from "next/server";
import { createOrder } from "@/helper"; 
import { RAZORPAY_KEY_SECRET } from "@/env";
import { getCurrentUser } from "@/helper/user/action";

export async function POST(req: Request) {
  const body = await req.json();
  const {userId} :any = await getCurrentUser()
  console.log("getting user id", userId)
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    address,
    amount,

  } = body;

  // 1️⃣ Verify signature
  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const result = await createOrder({
    userId,
    items,
    fixedAmount: amount,
    address,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
  });

  return NextResponse.json(result);
}