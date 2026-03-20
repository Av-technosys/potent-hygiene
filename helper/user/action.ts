"use server";
import { db } from "@/db";
import { address, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAddresses(email: string) {
  try {
    if (!email) {
      return {
        error: "User emailId is required for fetching addresses",
      };
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));
    const userId = user[0].id;

    const rows = await db
      .select()
      .from(address)
      .where(eq(address.userId, userId));

    return rows;
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}

export async function getUserId(email: string) {
  try {
    if (!email) {
      return {
        error: "User emailId is required for fetching user",
      };
    }

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));
    const userId = user[0].id;
    return userId;
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}
