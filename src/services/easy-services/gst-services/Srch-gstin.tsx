import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
import { httpError } from "@/utils/httpError";

type Address = {
  bnm: string; // Building name
  loc: string; // Location
  st: string; // State
  bno: string; // Building number
  dst: string; // District
  lt: string; // Latitude
  locality: string; // Locality
  pncd: string; // Pincode
  landMark: string; // Landmark
  stcd: string; // State Code
  geocodelvl: string; // Geocode level
  flno: string; // Floor number
  lg: string; // Longitude
};

type Pradr = {
  addr: Address;
  ntr: string; // Nature of business
};

type Data = {
  stjCd: string; // State jurisdiction code
  lgnm: string; // Legal name
  stj: string; // State jurisdiction
  dty: string; // Duty type
  adadr: Address[]; // Additional addresses
  cxdt: string; // Cancellation date
  nba: string[]; // Nature of business activities
  gstin: string; // GSTIN
  lstupdt: string; // Last update date
  ctb: string; // Constitution of business
  rgdt: string; // Registration date
  pradr: Pradr; // Principal address
  ctjCd: string; // Central jurisdiction code
  tradeNam: string; // Trade name
  sts: string; // Status
  ctj: string; // Central jurisdiction
  einvoiceStatus: string; // E-invoice status
};

type BusinessData = {
  data: Data;
};

type SuccessResponse = {
  success: boolean;
  data:{
    data:BusinessData
  };
};

type ErrorResponse = {
  success: false;
  message: "";
};

export const useEasySearchGSTIN = () => {
  return useMutation({
    mutationKey: ["search-gstin"],
    mutationFn: async (gstin: string) => {
      const response = await apiAxios.post("gst/search/gstin", { gstin });
      if (response.data?.data?.error){
        throw httpError.BadRequest("Error from GST")
      }
      return response.data as SuccessResponse;
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "GSTIN Search Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "GSTIN Search Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "GSTIN Search Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
