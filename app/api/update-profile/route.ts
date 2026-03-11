import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  try {

    const { userId, name, phone } = await request.json();

    if (!userId || !name || !phone) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const updatedUser = await db
      .update(users)
      .set({
        name: name,
        phone: phone,
      })
      .where(eq(users.id, Number(userId)))
      .returning();

    return NextResponse.json({
      message: "Profile updated",
      user: updatedUser[0],
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}