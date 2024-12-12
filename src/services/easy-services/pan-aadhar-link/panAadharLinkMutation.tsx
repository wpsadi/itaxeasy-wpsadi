import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: boolean;
  data: unknown;
  entity: string;
  consent: string;
  reason: string;
};

type ErrorResponse = {
  success: boolean;
  message: string;
};

export const usePanAadharMutation = () => {
  return useMutation({
    mutationKey: ["panAadharVerify"],
    mutationFn: async (data: { pan: string; aadhaar: string }) => {
      const request = await apiAxios.post(`pan/pan-aadhaar-link-status`, data);
      return request.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "Pan-Aadhaar Status Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Pan-Aadhaar Status Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Pan-Aadhaar Status Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
