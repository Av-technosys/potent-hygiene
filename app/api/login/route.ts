import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const found = user[0];

    const match = await bcrypt.compare(password, found.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!found.emailVerified) {
      return NextResponse.json({ error: "Email not verified" }, { status: 403 });
    }

    // login successful - you might return a token or set a cookie here
    return NextResponse.json({ message: "Login successful", userId: found.id }, { status: 200 });
  } catch (err) {
    console.error("Login error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}