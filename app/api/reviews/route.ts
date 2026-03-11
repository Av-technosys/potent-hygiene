import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { reviews } from "@/src/db/schema";


// GET REVIEWS
export async function GET() {

  try {

    const data = await db.select().from(reviews);

    return NextResponse.json(data);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );

  }

}


// CREATE REVIEW
export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const newReview = await db
      .insert(reviews)
      .values({
        userId: body.userId,
        productName: body.productName,
        orderId: body.orderId,
        rating: body.rating,
        comment: body.comment,
        deliveredDate: body.deliveredDate,
      })
      .returning();

    return NextResponse.json(newReview);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );

  }

}