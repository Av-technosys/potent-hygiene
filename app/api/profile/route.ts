import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/helper/user/action";

export async function GET() {
  try {
    const { email } = await getCurrentUser();

    if (!email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email as string))
      .limit(1);

    if (!result.length) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = result[0];

    return NextResponse.json({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { fullName, phone } = await request.json();

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "fullName and phone are required" },
        { status: 400 }
      );
    }

    const { email } = await getCurrentUser(); 

    const updated = await db
      .update(users)
      .set({
        name: fullName,
        phone,
      })
      .where(eq(users.email, email as string))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = updated[0];

    return NextResponse.json({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
