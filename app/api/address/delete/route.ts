import { db } from "@/db";
import { address } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { id } = await req.json();

  await db.delete(address)
  .where(eq(address.id, Number(id)));

  return NextResponse.json({
    success:true
  });

}