import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
// import { apiAxios } from "@/instances/apiInstance";
import { signupSchema } from "@/validations/auth/signup";
import { validate } from "@/validations/validate";
// "data": {
//         "user": {
//             "id": 92,
//             "firstName": "fgfg",
//             "lastName": "fgfg",
//             "email": "wpsadi@proton.me",
//             "phone": "9868147258"
//         },
//         "otp_key": 166
//     }

type SuccessfullResponse = {
  success: boolean;
  message: string;
  data: {
    otp_key: number;
  };
};

export type SignupSuccessResponse = SuccessfullResponse

type ErrorResponse = {
  success: boolean;
  message: string;
};

export type SignupErrorResponse = ErrorResponse

export const useSignupMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      // checking with the zod again to make sure the data is correct
      const validatedData = validate(data, signupSchema);
      // console.log(validatedData);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await apiAxios.post("user/sign-up", validatedData);
      return response.data as SuccessfullResponse;
      // return {
      //   success: true,
      //   message: "Signup Successful",
      //   data: {
      //     user: {
      //       id: 92,
      //       firstName: "fgfg",
      //       lastName: "fgfg",
      //       email: validatedData.email,
      //     },
      //     otp_key: 166,
      //   },
      // } as SuccessfullResponse;
    },
    onSuccess: (data,inputData) => {
      console.log(data);
      toast({
        title: "Signup Successful",
        description: "Welcome to the family!",
      });
      router.push(
        `/verify-otp?email=${(inputData.email).trim().toLocaleLowerCase()}&otp_key=${data.data.otp_key}`
      );
    },
    onError: (error: ErrorResponse) => {
      console.log(error);
      if (isHttpError(error)) {
        toast({
          title: "Signup Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Signup Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Signup Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
