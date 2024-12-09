import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
import { verifyOtpSchema } from "@/validations/auth/verify-otp";
import { validate } from "@/validations/validate";

type SuccessfullResponse = {
  success: boolean;
};

type ErrorResponse = {
  success: boolean;
  message: string;
};

export const useVerifyOTP = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: z.infer<typeof verifyOtpSchema>) => {
      const validatedData = validate(data, verifyOtpSchema);
      console.log(validatedData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await apiAxios.post("user/verify", {
        ...validatedData,
        otp_key: parseInt(validatedData.otp_key),
      });
      return response.data as SuccessfullResponse;
      // return { success: true } as SuccessfullResponse;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Verification Successful",
        description: "OTP has been verified!",
      });
      router.push("/dashboard");
    },
    onError: (error: ErrorResponse) => {
      if (isHttpError(error)) {
        toast({
          title: "Verification Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Verification Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Verification Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
