import { db } from "@/db";
import { address } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  try {

    // sab addresses ko non default karo
    await db
      .update(address)
      .set({ isDefault: false });

    // selected address ko default karo
    await db
      .update(address)
      .set({ isDefault: true })
      .where(eq(address.id, Number(body.id)));

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error
    });

  }

}