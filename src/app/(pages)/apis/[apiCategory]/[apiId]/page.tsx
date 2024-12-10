"use client";

import { useParams } from "next/navigation";

import { RenderAPIEndpoint } from "./RenderEndpoint";

export default function Page() {
  const params = useParams();
  const apiId = String(params.apiId) ?? "x";

  return (
    <>
    <div className="bg-white">
    <RenderAPIEndpoint apiId={apiId} />
    </div>
 
    </>
  );
}
