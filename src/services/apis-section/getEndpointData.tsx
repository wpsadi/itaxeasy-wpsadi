import { useQuery } from "@tanstack/react-query";

import { API_endpointDataUnderCategory } from "./allAPIInCategoryQuery";

type SuccessResponse = {
  success: boolean;
  data: API_endpointDataUnderCategory;
};

export const useAPIEndpointQeuery = (api_id: string) => {
  return useQuery({
    queryKey: ["apis", { api_id }],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: true,
        data: {
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
      } as SuccessResponse;
    },
  });
};
