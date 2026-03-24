"use server";
import { db } from "@/db";
import { address, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID!,
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID!,
});


export async function getAddresses() {
  try {
    const { userId } = await getCurrentUser();

    const rows = await db
      .select()
      .from(address)
      .where(eq(address.userId, userId));

    return rows;
  } catch (error) {
    return {
      error: `Something went wrong , ${error}`,
    };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifier.verify(token);

  return {
    userId: payload.sub,
    email: payload.email,
  };
}