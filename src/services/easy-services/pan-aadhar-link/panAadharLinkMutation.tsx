import { useMutation } from "@tanstack/react-query";

import { apiAxios } from "@/instances/apiInstance";

export const usePanAadharMutation = () => {
  return useMutation({
    mutationKey: ["panAadharVerify"],
    mutationFn: async () => {
      const request = await apiAxios.post(
        `/pan-link/verify?aadhar_number=`
      );
      return request.data;
    },
  });
};
