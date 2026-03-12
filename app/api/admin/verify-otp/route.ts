import { NextResponse } from "next/server";
import { cognitoConfirmSignUp } from "@/lib/cognito";

export async function POST(req: Request) {
  try {

    const { email, code } = await req.json();

    await cognitoConfirmSignUp({ email, code });

    return NextResponse.json({
      message: "Account verified successfully"
    });

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message || "Verification failed" },
      { status: 500 }
    );
  }
}