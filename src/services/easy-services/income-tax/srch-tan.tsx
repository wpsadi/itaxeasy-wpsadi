import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: boolean;
  data: {
    header: Record<string, unknown>;
    messages: {
      code: string;
      type: string;
      desc: string;
    }[];
    errors: unknown[];
  };
};

type ErrorResponse = {
  success: boolean;
  message: "";
};

export const useEasySearchTan = () => {
  return useMutation({
    mutationKey: ["search-tan"],
    mutationFn: async (tan: string) => {
      const response = await apiAxios.get(`tan/search?tan=${tan}`);
      return response.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "TAN Search Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "TAN Search Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "TAN Search Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
