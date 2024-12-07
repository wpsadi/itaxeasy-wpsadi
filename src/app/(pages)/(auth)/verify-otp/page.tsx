"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { ErrorPage } from "@/components/common/errorRaiser";

import { OTPVerificationForm } from "./VerifyOTPForm";

// it get email & otp_key from the query params
export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otpKey = searchParams.get("otp_key");

  if (!email || !otpKey) {
    return <ErrorPage message="Missing email or OTP key" />;
  }

  return (
    <>
      <Suspense fallback={<ErrorPage message="Unable to render the page" />}>
        <OTPVerificationForm email={email} otpKey={otpKey} />
      </Suspense>
    </>
  );
}
