import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const cookieName = "auth";

export const POST = async () => {
  const cookieStore = await cookies();

  if (!cookieStore.has(cookieName)) {
    return NextResponse.json({
        success: true,
    })
  }

  await cookieStore.delete(cookieName);

  return NextResponse.json({
    success: true,
})
};
