import axios from "axios";
import { cookies } from "next/headers";

import { env } from "@/env";

import { UserProfileSuccessResponse } from "../../services/user/profile/UserProfileQuery";

const cookieName = "auth";

// This function returns the token from cookie on the server
export const getServerSideToken = async () => {
  const cookieStore = await cookies();

  if (!cookieStore.has(cookieName)) {
    return "";
  }

  let token = null;
  if (cookieStore.get(cookieName)) {
    token = cookieStore.get(cookieName)?.value || "";
  }
  return token;
};

// This function returns the user object from token.
export const getUserOnServer = async () => {
  const cookieToken = await getServerSideToken();
  if (cookieToken) {
    const user = await axios.get(`${env.web.apiURL}/user/profile`);
    return user.data as UserProfileSuccessResponse;
  }
  return null;
};
