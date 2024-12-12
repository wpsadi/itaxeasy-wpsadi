import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
import { httpError } from "@/utils/httpError";

type SuccessResponse = {
  success: boolean;
  data: {
    MICR: string;
    BRANCH: string;
    ADDRESS: string;
    STATE: string;
    CONTACT: string | null;
    UPI: boolean;
    RTGS: boolean;
    CITY: string;
    CENTRE: string;
    DISTRICT: string;
    NEFT: boolean;
    IMPS: boolean;
    SWIFT: string | null;
    ISO3166: string;
    BANK: string;
    BANKCODE: string;
    IFSC: string;
  };
};

type ErrorResponse = {
  success: false;
  message: "";
};

export const useEasySearchIFSC = () => {
  return useMutation({
    mutationKey: ["search-ifsc"],
    mutationFn: async (ifsc: string) => {
      const response = await apiAxios.post("bank/details", { ifsc});
      if (!response?.data?.data){
        throw httpError.BadRequest(response.data?.message ?? "No data found")
      }
      return response.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "IFSC Search Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "IFSC Search Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "IFSC Search Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
