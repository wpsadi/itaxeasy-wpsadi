"use client";

import { useRouter } from "next/navigation";

import { useUserProfileQuery } from "@/services/user/profile/UserProfileQuery";

import { ErrorPage } from "./errorRaiser";
import { LoadingScreen } from "./Loader";

export const EnsureNotAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userQuery = useUserProfileQuery();
  const router = useRouter();

  if (userQuery.isPending) {
    return <LoadingScreen />;
  }



  if (userQuery.isError) {
    return (<>
    {children}
    </>)
  }

  setTimeout(() => {
    router.push("/dashboard");
}, 1000);
return <ErrorPage message="User Already Logged In" />;

  
};
