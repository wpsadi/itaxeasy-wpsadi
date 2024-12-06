import { useMutation} from "@tanstack/react-query";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
// import { apiAxios } from "@/instances/apiInstance";
import { loginFormSchema } from "@/validations/auth/login";
import { validate } from "@/validations/validate";

type SuccessfullResponse = {
  success: boolean;
};

type ErrorResponse = {
  success: boolean;
  error: string;
};

export const useLoginMutation = () => {
return useMutation({
    mutationFn:async (data: z.infer<typeof loginFormSchema>) => {
        // checking with the zod again to make sure the data is correct
        const validatedData = validate(data, loginFormSchema);
        console.log(validatedData);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        //   const response = await apiAxios.post("user/login", validatedData);
        //   return response.data as SuccessfullResponse;
        return { success: true } as SuccessfullResponse;
    },
    onSuccess: (data) => {
        console.log(data);
        toast({
            title: "Login Successful",
            description: "Welcome back!",
        });
    },
    onError: (error: ErrorResponse) => {
        console.error(error);
        toast({
            title: "Login Failed",
            description: error.error || "Please check your credentials and try again.",
        });
    }
});
};
