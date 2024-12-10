"use client";

import { useRouter } from "next/navigation";

import { useUserProfileQuery } from "../../services/user/profile/UserProfileQuery";
import { ErrorPage } from "./errorRaiser";
import { LoadingScreen } from "./Loader";

export const EnsureAuthenticated = ({
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
    setTimeout(() => {
      router.push("/login");
    }, 1000);
    return <ErrorPage message="We could verify your authentication Status" />;
  }

  return <>{children}</>;
};
