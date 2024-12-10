import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { apiAxios } from "@/instances/apiInstance";

export type UserProfileSuccessResponse = {
  success: boolean;
  data: {
    user: {
      id: number;
      createdAt: string;
      email: string;
      gender: string;
      firstName: string;
      middleName: string;
      lastName: string;
      fatherName: string;
      aadhaar: string;
      address: string;
      phone: string;
      pan: string;
      userType: string;
      pin: string;
      dob: string;
      avatar: string;
    };
  };
  buisnessprofile: boolean;
};
export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await apiAxios.get("user/profile");
      return response.data as UserProfileSuccessResponse;
    },
    placeholderData: keepPreviousData,
    retry: 1,
  });
};
