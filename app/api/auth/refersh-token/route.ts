/* eslint-disable @typescript-eslint/no-explicit-any */
import { COGNITO_CLIENT_ID } from "@/env";
import { cognito, generateSecretHash } from "@/helper/cognito";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const body = await req.json();
    const { refreshToken, idToken } = body;

     const decoded: any = jwt.decode(idToken);
     const username = decoded["cognito:username"] || decoded.email;


    if (!refreshToken)
        return NextResponse.json({ message: 'Refresh token is required.' }, { status: 400 });

    try {
        const secretHash = await generateSecretHash(username);
        const command = new InitiateAuthCommand({
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: COGNITO_CLIENT_ID,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
                SECRET_HASH: secretHash,
            },
        });

        const response = await cognito.send(command);

        return NextResponse.json({ response: response }, { status: 200 });
    } catch (err: any) {
        console.error('refreshToken error:', err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}