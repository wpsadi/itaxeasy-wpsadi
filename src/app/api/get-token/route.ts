import { cookies } from "next/headers";

const cookieName = "auth";

export type GetTokenResponse = string;

export const GET = async () => {
  const cookieStore = await cookies();

  if (!cookieStore.has(cookieName)) {
    return new Response(``);
  }

  const cookie = cookieStore.get(cookieName);

  return new Response(`${cookie?.value}`);
};
