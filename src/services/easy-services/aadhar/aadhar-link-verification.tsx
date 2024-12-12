import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: false;
  data:{
  
      message:string;
   
  };
};

type ErrorResponse = {
  success: false;
  message: "";
};

export const useAadhaarPanLink= () => {
  return useMutation({
    mutationKey: ["aadhar-pan-link"],
    mutationFn: async (data:{
        aadhaar: string;
        pan: string;
    }) => {
      const response = await apiAxios.post("pan/pan-aadhaar-link-status", {
        pan: data.pan.toUpperCase(),
        aadhaar: data.aadhaar.toUpperCase(),
      });
      return response.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "Aadhaar-Pan Link Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Aadhaar-Pan Link Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Aadhaar-Pan Link Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
