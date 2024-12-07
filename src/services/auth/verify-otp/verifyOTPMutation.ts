import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { verifyOtpSchema } from "@/validations/auth/verify-otp";
import { validate } from "@/validations/validate";

type SuccessfullResponse = {
  success: boolean;
};

type ErrorResponse = {
    success: boolean;
    message: string;
}

export const useVerifyOTP = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: z.infer<typeof verifyOtpSchema>) => {
      const validatedData = validate(data, verifyOtpSchema);
      console.log(validatedData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // const response = await apiAxios.post("user/login", validatedData);
      // return response.data as SuccessfullResponse;
      return { success: true } as SuccessfullResponse;
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
      console.error(error);
      toast({
        title: "Verification Failed",
        variant: "destructive",
        description: error.message || "Please check your OTP and try again.",
      });
    },
  });
};
