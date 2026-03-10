import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, password } = await request.json();

    // Validate input
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP (6-digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save user to database
    const newUser = await db
      .insert(users)
      .values({
        name: fullName,
        email,
        phone,
        password: hashedPassword,
        emailVerified: false,
        otp,
        otpExpiresAt,
      })
      .returning();

    // TODO: Send OTP via email (integrate email service like Resend, SendGrid, etc.)

    return NextResponse.json(
      {
        message: "User registered successfully. Please verify your email.",
        userId: newUser[0].id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}