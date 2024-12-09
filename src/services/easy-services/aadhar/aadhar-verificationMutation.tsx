import { useMutation } from "@tanstack/react-query";

import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
    success:boolean
};

export const useAadharVerifyMutation = () => {
  return useMutation({
    mutationKey: ["aadharVerify"],
    mutationFn: async (aadharNumber: string) => {
      const request = await apiAxios.post(
        `/aadhar/verify?aadhar_number=${aadharNumber}`
      );
      return request.data as SuccessResponse;
    },
  });
};
