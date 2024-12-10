import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { isHttpError } from "http-errors";

import { toast } from "@/hooks/use-toast";

type SuccessReponse = {
  success: boolean;
  message: string;
};

type ErrorResponse = {
    success: boolean;
    message: string;
}

//

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async (itemId: string) => {
      console.log(itemId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: true,
        message: "Added to cart",
      } as SuccessReponse;
    },
    onSuccess: async (_, itemId) => {
      await queryClient.invalidateQueries({ queryKey: ["cart", { itemId }] });
      toast({
        title: "Added to cart",
        description: "Horray! Item added to cart",
      });
    },
    onError: (error) => {
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
