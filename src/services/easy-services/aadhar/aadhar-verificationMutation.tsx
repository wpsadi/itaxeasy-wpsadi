import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: boolean;
  message: string;
};

type ErrorResponse = {
  success: boolean;
  message: string;
};

export const useAadharVerifyMutation = () => {
  return useMutation({
    mutationKey: ["aadharVerify"],
    mutationFn: async (aadharNumber: string) => {
      const request = await apiAxios.post(
        `/aadhar/verify?aadhar_number=${aadharNumber}`
      );
      return request.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "Aadhaar Verification Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Aadhaar Verification Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Aadhaar Verification Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
