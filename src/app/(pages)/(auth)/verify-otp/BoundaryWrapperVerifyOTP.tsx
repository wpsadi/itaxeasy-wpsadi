"use client";
import { useSearchParams } from "next/navigation";

import { ErrorPage } from "@/components/common/errorRaiser";

import { OTPVerificationForm } from "./VerifyOTPForm";

// it get email & otp_key from the query params
export default function VerifyOTPBordered() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otpKey = searchParams.get("otp_key");

  if (!email || !otpKey) {
    return <ErrorPage message="Missing email or OTP key" />;
  }

  return (
    <>
      <OTPVerificationForm email={email} otpKey={otpKey} />
    </>
  );
}
