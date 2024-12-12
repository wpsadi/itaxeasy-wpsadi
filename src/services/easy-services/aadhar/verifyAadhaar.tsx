import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { isHttpError } from "http-errors";

type SuccessResponse = {
    success: false;
    message: "";
};

type ErrorResponse = {
    success: false;
    message: "";
};

export const useVerifyAadhaar = ()=>{
    return useMutation({
        mutationKey: ["verify-aadhaar"],
        mutationFn: async (data:{
            aadhaar_number: string, otp: string, reference_id: string
        })=>{
            const response = await apiAxios.post("aadhar/verify-aadhaar", data);
            return response.data as SuccessResponse;
        },
        onError: (error: unknown) => {
            if (isHttpError(error)) {
              toast({
                title: "Aadhar OTP Verification Failed",
                variant: "destructive",
                description: error.message,
              });
              return;
            }
      
            if (axios.isAxiosError(error)) {
              const errorResponse = error.response?.data as ErrorResponse;
              toast({
                title: "Aadhar OTP Verification Failed",
                variant: "destructive",
                description: errorResponse.message || "Unknown error occurred.",
              });
              return;
            }
      
            toast({
              title: "Aadhar OTP Verification Failed",
              variant: "destructive",
              description:
                "Unknown error occurred. Please try again later or contact support.",
            });
            return;
          },
    })
}