import { useQueries } from "@tanstack/react-query";

// import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse1 = {
  success: boolean;
  data: {
    totalUsers: number;
    totalEmails: number;
    totalPhoneNumbers: number;
  };
};

type SuccessResponse2 = {
  count: number;
};

const placeholder1 = {
  success: true,
  data: {
    totalUsers: 0,
    totalEmails: 0,
    totalPhoneNumbers: 0,
  },
};

const placeholder2 = {
  count: 0,
};

// const useUserStats = ()=>{
//   return useQuery({
//     queryKey: ["userStats"],
//     queryFn: async ()=>{
//       // const { data } = await apiAxios.get<SuccessResponse1>("cms/stats");
//       // return data;
//       return placeholderData[0];
//     },
//     placeholderData: placeholderData[0],
//   })
// }

export const useUserInsights = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["userStats"],
        queryFn: async () => {
          // const { data } = await apiAxios.get<SuccessResponse1>("cms/stats");
          // return data;
          return {
            success: true,
            data: {
              totalEmails: 120,
              totalPhoneNumbers: 100,
              totalUsers: 100,
            },
          } as SuccessResponse1;
        },
        placeholderData: placeholder1 as SuccessResponse1,
      },
      {
        queryKey: ["visitor-count"],
        queryFn: async () => {
          // const { data } = await apiAxios.get<SuccessResponse2>("visitorCount/create");
          // return data;
          return placeholder2 as SuccessResponse2;
        },
        placeholderData: placeholder2,
      },
    ],
  });
};
