import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { apiAxios } from "@/instances/apiInstance";
import { loginFormSchema } from "@/validations/auth/login";
import { validate } from "@/validations/validate";

type SuccessResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      createdAt: string;
      email: string;
      firstName: string;
      middleName: string;
      lastName: string;
      fatherName: string | null;
      phone: string;
      gender: string;
      address: string;
      pin: string;
      aadhaar: string;
      pan: string;
      dob: string;
      avatar: string;
      adminId: string | null;
      superadminId: string | null;
      ispanlinked: boolean;
      verified: boolean;
      userType: string;
      inventory: boolean;
    };
    token: string;
  };
};

export type UserSuccessLogin = SuccessResponse; 

type ErrorResponse = {
  success: boolean;
  message: string;
};

export type UserErrorLogin = ErrorResponse
// const dummyData: SuccessResponse = {
//   success: true,
//   message: "Login successful",
//   data: {
//     user: {
//       id: 1,
//       createdAt: "2024-12-07T13:35:09.323Z",
//       email: "sarthaksahu81@gmail.com",
//       firstName: "Harsh",
//       middleName: "",
//       lastName: "Singh",
//       fatherName: null,
//       phone: "7652035152",
//       gender: "male",
//       address: "India",
//       pin: "276011",
//       aadhaar: "123456789",
//       adminId: null,
//       superadminId: null,
//       ispanlinked: true,
//       verified: true,
//       userType: "superadmin",
//       inventory: false,
//       pan: "",
//       dob: "",
//       avatar: "",
//     },
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcnRoYWtzYWh1ODFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTczMzc0MDMyMCwiZXhwIjoxNzMzODI2NzIwLCJpc3MiOiJpVGF4RWFzeSJ9.HSuHGY699Pc_b67AYvuLLAqRVquo41FxLvMxfDV9qTE",
//   },
// };

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
      // checking with the zod again to make sure the data is correct
      const validatedData = validate(data, loginFormSchema);
      console.log(validatedData);
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await apiAxios.post("user/login", validatedData);
      const responseData = response.data as SuccessResponse;

      //   const response = {
      //     data: dummyData,
      //   }

      await axios.post("/api/set-token", {
        token: responseData.data.token,
      });

      return response.data as SuccessResponse;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (isHttpError(error)) {
        toast({
          title: "Login Failed",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        toast({
          title: "Login Failed",
          variant: "destructive",
          description: errorResponse.message || "Unknown error occurred.",
        });
        return;
      }

      toast({
        title: "Login Failed",
        variant: "destructive",
        description:
          "Unknown error occurred. Please try again later or contact support.",
      });
      return;
    },
  });
};
