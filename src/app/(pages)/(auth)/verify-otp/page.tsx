"use client";

import { Suspense } from "react";

import { ErrorPage } from "@/components/common/errorRaiser";

import VerifyOTPBordered from "./BoundaryWrapperVerifyOTP";

// it get email & otp_key from the query params
export default function Page() {
  return (
    <>
      <Suspense fallback={<ErrorPage message="Unable to render the page" />}>
        <VerifyOTPBordered />
      </Suspense>
    </>
  );
}
