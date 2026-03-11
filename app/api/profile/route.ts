import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = result[0];

    return NextResponse.json(
      {
        fullName: user.name,
        email: user.email,
        phone: user.phone,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { email, fullName, phone } = await request.json();

    if (!email || !fullName || !phone) {
      return NextResponse.json(
        { error: "email, fullName and phone are required" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(users)
      .set({
        name: fullName,
        phone,
      })
      .where(eq(users.email, email))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = updated[0];

    return NextResponse.json(
      {
        fullName: user.name,
        email: user.email,
        phone: user.phone,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

