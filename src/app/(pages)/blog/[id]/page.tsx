"use client";
import { useParams } from "next/navigation";

import { ErrorPage } from "@/components/common/errorRaiser";
import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import { Blog } from "./blog";

interface Params {
  id: string;
  [key: string]: string;
}

export default function Page() {
  const params = useParams<Params>();
  const blogId = params.id;

  if (!blogId) {
    return <ErrorPage message="Pass a Blog Id at /blogs/:id" />;
  }
  return (
    <>
      <div className="bg-white">
        <HomeNavbar />
        <Blog blogId={blogId} />
        <HomeFooter />
      </div>
    </>
  );
}
