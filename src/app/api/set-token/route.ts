import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { setTokenPayloadZod } from "./payloadZod";

const cookieName = "auth";

export type SetTokenResponse = {
    success: boolean;
    message: string;
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!body) {
    return NextResponse.json({
      success: false,
      message: "No body provided",
    },{
        status:400
    });
  }

  const validation = setTokenPayloadZod.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({
      success: false,
      message: validation.error.errors[0].message,
    },{
        status:400
    });
  }

  const validatedData = validation.data;

  const cookieStore = await cookies();

    await cookieStore.set(cookieName, validation.data.token,{
        expires:validatedData.expireAt,
        secure:true,
        httpOnly:true,
        sameSite:"strict",
        priority:"high"

    });

    console.log("cookie set successfully");


    return NextResponse.json({
        success:true,
        message:"Token set successfully"
    },{
        status:201
    })
};
