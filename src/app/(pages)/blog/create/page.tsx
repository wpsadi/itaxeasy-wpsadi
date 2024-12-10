"use client";
import { ErrorPage } from "@/components/common/errorRaiser";
import { LoadingScreen } from "@/components/common/Loader";

import { useUserTypeQuery } from "../../../../services/user/useUserTypeQuery";
import { CreateBlog } from "./CreateBlog";

export default function Page() {
  const userTypeQuery = useUserTypeQuery();
  if (userTypeQuery.isPending) {
    return <LoadingScreen />;
  }

  if (userTypeQuery.isError) {
    return <ErrorPage message={"Some Error"} />;
  }

  if (userTypeQuery.data?.success === false) {
    return <ErrorPage message={userTypeQuery.data.message} />;
  }

  return (
    <>
      <CreateBlog />
    </>
  );
}
