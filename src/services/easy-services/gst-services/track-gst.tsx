import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
import { httpError } from "@/utils/httpError";

type SuccessResponse = {
  success: true;
  data: {
    code: number;
    timestamp: number;
    transaction_id: string;
    data: {
      data: {
        EFiledlist: Array<{
          valid: string;
          mof: string;
          dof: string;
          ret_prd: string;
          rtntype: string;
          arn: string;
          status: string;
        }>;
      };
      status_cd: string;
    };
  };
};

type ErrorResponse = {
  success: boolean;
  message: "";
};

export const useEasyTrackGST = () => {
  return useMutation({
    mutationKey: ["search-track-gst"],
    mutationFn: async (data: {
      gstin: string;
      financial_year: string;
      gstr: string;
    }) => {
      const response = await apiAxios.post("gst/return/track",data);
      if (response.data?.data?.data?.error_cd){
        throw httpError.BadRequest(response.data?.data?.data?.message ?? "Error from GST")
      }
      return response.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "GST Tracking Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "GST Tracking Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "GST Tracking Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
