import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    otp_key: number;
  };
};

type ErrorResponse = {
  success: boolean;
  error: string;
};

export const useSignupMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      // checking with the zod again to make sure the data is correct
      const validatedData = validate(data, signupSchema);
      console.log(validatedData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // const response = await apiAxios.post("user/login", validatedData);
      // return response.data as SuccessfullResponse;
      return {
        success: true,
        message: "Signup Successful",
        data: {
          user: {
            id: 92,
            firstName: "fgfg",
            lastName: "fgfg",
            email: validatedData.email,
          },
          otp_key: 166,
        },
      } as SuccessfullResponse;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Signup Successful",
        description: "Welcome to the family!",
      });
      router.push(`/verify-otp?email=${data.data.user.email}&otp_key=${data.data.otp_key}`);
    },
    onError: (error: ErrorResponse) => {
      console.error(error);
      toast({
        title: "Signup Failed",
        variant: "destructive",
        description:
          error.error || "Please check your credentials and try again.",
      });
    },
  });
};
