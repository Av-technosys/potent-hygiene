import { db } from "@/db";
import { address } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  try {

    if (body.isDefault) {

      await db
        .update(address)
        .set({ isDefault: false });

    }

    const newAddress = await db.insert(address).values({
      fullName: body.fullName,
      phone: body.phone,
      street: body.street,
      userId: body.userId,
      locality: body.locality,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      country: body.country,
      isDefault: body.isDefault ?? false
    }).returning();

    return NextResponse.json(newAddress);

  } catch (error) {

    return NextResponse.json({
      success:false,
      error
    });

  }
}