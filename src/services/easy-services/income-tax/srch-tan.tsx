import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

type TanSearchSuccessResponse = {
  success: boolean;
  data: {
    header: Record<string, unknown>;
    messages: {
      code: string;
      type: string;
      desc: string;
    }[];
    errors: unknown[];
    nameOrgn?: string;
    addLine1?: string;
    addLine2?: string;
    addLine3?: string;
    addLine4?: string;
    addLine5?: string;
    stateCd?: number;
    pin?: number;
    phoneNum?: string;
    dtTanAllotment?: number;
    emailId1?: string;
    emailId2?: string;
  };
};

type TanSearchErrorResponse = {
  success: boolean;
  message: string;
};

export const useEasySearchTan = () => {
  return useMutation<TanSearchSuccessResponse, TanSearchErrorResponse, string>({
    mutationKey: ["search-tan"],
    mutationFn: async (tan: string) => {
      // Convert TAN to uppercase before making the request
      const response = await apiAxios.post(`/tan/search`, {
        tan: tan.toUpperCase(),
      });

      if (response?.data?.data?.errors?.length !== 0) {
        throw new Error(response?.data?.message || "TAN search failed.");
      }

      return response.data;
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as TanSearchErrorResponse;

        toast({
          title: "TAN Search Failed",
          variant: "destructive",
          description: errorResponse?.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "TAN Search Failed",
        variant: "destructive",
        description: "An unexpected error occurred. Please try again later.",
      });
    },
  });
};
