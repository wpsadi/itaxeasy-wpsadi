import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

import {
  SignupErrorResponse,
  SignupSuccessResponse,
} from "../signup/signupMutation";

export const useGoogleSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["google-signup"],
    mutationFn: async (accessToken: string) => {
      const response = await apiAxios.post("auth/google/signup", {
        accessToken,
      });
      const responseData = response.data as SignupSuccessResponse;

      return responseData;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Signup Successful",
        description: "Welcome to the family!",
      });
      router.push("/login");
    },
    onError: (error: unknown) => {
      console.log(error);
      if (isHttpError(error)) {
        toast({
          title: "Signup Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as SignupErrorResponse;
        toast({
          title: "Signup Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Signup Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
    },
  });
};
