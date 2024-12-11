import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

import { UserErrorLogin, UserSuccessLogin } from "../login/loginMutation";

export const useGoogleLoginMutate = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["google-login"],
    mutationFn: async (accessToken: string) => {
      const response = await apiAxios.post("auth/google", {
        accessToken,
      });
      const responseData = response.data as UserSuccessLogin;

      await axios.post("/api/set-token", {
        token: responseData.data.token,
      });

      return responseData;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "Login Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as UserErrorLogin;
        toast({
          title: "Login Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Login Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
