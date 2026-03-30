/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { db } from "@/db";
import { address, subscriptionPayment, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import jwt from "jsonwebtoken";
import { emailRegex } from "@/const/globalconst";

type NewAddressInput = {
  fullName: string;
  phone: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
};

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID!,
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID!,
});

async function refreshUserTokens() {

  // console.log("here we go inside refreshUserTokens")
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const idToken = cookieStore.get("idToken")?.value;

  if (!refreshToken || !idToken) return null;
  //console.log("i must confirm that we have access token and id token probbaly expired")
  try {

    //  console.log("calling api ")
    const res = await fetch(`${process.env.BASE_API_URL}/auth/refersh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken, idToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    //  console.log("api  returns", data)
    return data; // { accessToken, idToken }

  } catch {
    return null;
  }
}


export async function requireUserWithRefresh() {

  // console.log("hey i come down here to find user inside requreUserWithReferesh ")

  const user = await getCurrentUser();

  //  console.log("i am back after crawling getCurrentUser")
  if (user) {
    // console.log("got user returning as it is", user)
    return user;
  }

  //  console.log("so here we go things does work as we expected now we dont have user goinf to get referesh token")
  const refreshed = await refreshUserTokens();

  // console.log("i crawled the refreshUserTokens")
  if (!refreshed) {
    throw new Error("UNAUTHORIZED");
  }

  const idToken =
    refreshed?.response?.AuthenticationResult?.IdToken;

  const decoded: any = jwt.decode(idToken);
  // console.log("returning decoded" , decoded )
  return {
    userId: decoded?.["custom:user_id"],
    email: decoded?.email,
  };
}
export async function getCurrentUser() {
  // console.log("hey i come down here in getCurrentUser ")

  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const idToken = cookieStore.get("idToken")?.value;

    if (!accessToken || !idToken) return null;

    //  console.log("so far  i can confirm  we have idToken and accessTOken")

    await verifier.verify(accessToken);
    //  console.log(" accessTOken verified sucessfull")

    const decoded: any = jwt.decode(idToken);
    // console.log("now decoded idToken", decoded)
    const userId = decoded?.["custom:user_id"];
    const email = decoded?.email;
    if (!userId) {
      throw new Error("USER_ID_MISSING");
    }
    //console.log("have find user id and email inside getCurrentUser  going forward")
    return {
      userId,
      email,
    };
  } catch (error) {
    console.log(error)
  }

}

export async function getProfile() {
  const { email }: any = await requireUserWithRefresh();

  if (!email) throw new Error("Unauthorized");

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!result.length) throw new Error("User not found");

  const user = result[0];

  return {
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}

export async function updateProfile(data: {
  fullName: string;
  phone: string;
}) {
  const { email }: any = await requireUserWithRefresh();

  if (!email) throw new Error("Unauthorized");

  const updated = await db
    .update(users)
    .set({
      name: data.fullName,
      phone: data.phone,
    })
    .where(eq(users.email, email))
    .returning();

  if (!updated.length) throw new Error("User not found");

  const user = updated[0];

  return {
    fullName: user.name,
    email: user.email,
    phone: user.phone,
  };
}


export async function getAddresses() {
  const { userId } = await requireUserWithRefresh();

  if (!userId) {
    // console.log(" in getting address api  tri  to find userid   didnt find going by by")

    throw new Error("UNAUTHORIZED");
  }
  return await db
    .select()
    .from(address)
    .where(eq(address.userId, userId));
}

export async function getUserAddressById(addressId: number) {
  const { userId } = await requireUserWithRefresh();

  const data = await db
    .select()
    .from(address)
    .where(
      and(
        eq(address.id, addressId),
        eq(address.userId, userId)
      )
    );

  return data[0] || null;
}

export async function updateUserAddress(data: any) {
  const { userId } = await requireUserWithRefresh();

  if (data.isDefault) {
    await db
      .update(address)
      .set({ isDefault: false })
      .where(eq(address.userId, userId));
  }

  await db
    .update(address)
    .set({
      fullName: data.fullName,
      phone: data.phone,
      street: data.street,
      locality: data.locality,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      isDefault: data.isDefault,
    })
    .where(
      and(
        eq(address.id, Number(data.id)),
        eq(address.userId, userId)
      )
    );

  return { success: true };
}

export async function deleteUserAddress(id: number) {
  const { userId } = await requireUserWithRefresh();

  await db
    .delete(address)
    .where(
      and(
        eq(address.id, id),
        eq(address.userId, userId)
      )
    );

  return { success: true };
}

export async function setDefaultAddress(id: number) {
  const { userId } = await requireUserWithRefresh();

  await db
    .update(address)
    .set({ isDefault: false })
    .where(eq(address.userId, userId));

  await db
    .update(address)
    .set({ isDefault: true })
    .where(
      and(
        eq(address.id, id),
        eq(address.userId, userId)
      )
    );

  return { success: true };
}

export async function createUserAddress(data: NewAddressInput) {
  const { userId } = await requireUserWithRefresh();

  try {
    if (data.isDefault) {
      await db
        .update(address)
        .set({ isDefault: false })
        .where(eq(address.userId, userId));
    }

    const [newAddress] = await db
      .insert(address)
      .values({
        ...data,
        userId,
        isDefault: data.isDefault ?? false,
      })
      .returning();

    return { success: true, data: newAddress };
  } catch (error) {
    return { success: false, error };
  }
}

export async function subscribeEmail(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("Email is required");
  }

  if (!emailRegex.test(email.trim())) {
    throw new Error("Please enter a valid email address");
  }

  await db.insert(subscriptionPayment).values({
    email,
  });

  return { success: true };
}