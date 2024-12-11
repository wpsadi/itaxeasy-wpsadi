import { useQuery } from "@tanstack/react-query";

import { apiAxios } from "@/instances/apiInstance";

export type API_endpointDataUnderCategory = {
  id: string;
  title: string;
  link: string;
  src: string;
  description: string;
  endpoint?: {
    method: string;
    endpoint: string;
  };
  price: number;
  upcoming: boolean;
  headers?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  queryParams?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  bodyParams?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responseJSON?: object | null;
};

type SuccessResponse = {
  success: boolean;
  data: API_endpointDataUnderCategory[];
};

const placeHolderData: SuccessResponse = {
  success: true,
  data: [
    {
      id: "all_apis",
      title: "All Apis",
      link: "/sdbsdbdbscgd",
      src: "/favicon.svg",
      description: "All APIs",
      endpoint: {
        method: "GET",
        endpoint: "https://api.example.com/api/v1/endpoint",
      },
      price: 0,
      upcoming: false,
      headers: [
        {
          name: "Authorization",
          type: "string",
          required: true,
          description: "Bearer token",
        },
      ],
      queryParams: [
        {
          name: "query",
          type: "string",
          required: true,
          description: "Query parameter",
        },
      ],
      bodyParams: [
        {
          name: "body",
          type: "string",
          required: true,
          description: "Body parameter",
        },
      ],
      response: [
        {
          name: "response",
          type: "string",
          required: true,
          description: "Response parameter",
        },
      ],
      responseJSON: {
        response: "Response parameter",
      },
    },
  ],
};

export const useAllApiUnderCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["apis-list"],
    queryFn: async () => {
      console.log(categoryId);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await apiAxios.get("apis/get-all-apis");

      const responseData = response.data as SuccessResponse;



      return responseData;
      // return dummydata as SuccessResponse;
    },
    placeholderData: placeHolderData,
  });
};
