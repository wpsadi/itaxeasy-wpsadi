import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { forgotPasswordSchema } from "@/validations/auth/forgot-password";
import { validate } from "@/validations/validate";

type SuccessfullResponse = {
  success: boolean;
};

type ErrorResponse = {
  success: boolean;
  message: string;
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof forgotPasswordSchema>) => {
      // checking with the zod again to make sure the data is correct
      const validatedData = validate(data, forgotPasswordSchema);
      console.log(validatedData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //   const response = await apiAxios.post("user/login", validatedData);
      //   return response.data as SuccessfullResponse;
      return { success: true } as SuccessfullResponse;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Password Reset Request",
        description: "Password reset request has been sent!",
      });
    },
    onError: (error: ErrorResponse) => {
      console.error(error);
      toast({
        title: "Password Reset Request Failed",
        variant: "destructive",
        description: error.message || "Please check your email and try again.",
      });
    },
  });
};
