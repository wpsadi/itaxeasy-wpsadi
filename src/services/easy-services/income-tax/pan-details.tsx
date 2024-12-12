import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: false;
  message: "";
};

type ErrorResponse = {
  success: false;
  message: "";
};

export const useEasyDetailsPAN = () => {
  return useMutation({
    mutationKey: ["details-pan"],
    mutationFn: async (data: {
      pan: string, name_as_per_pan: string, date_of_birth: string, consent: string, reason: string
    }) => {
      const response = await apiAxios.post("pan/get-pan-details", data);  
      return response.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "Pan Details Search Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Pan Details Search Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Pan Details Search Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
