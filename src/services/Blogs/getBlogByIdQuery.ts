import { keepPreviousData, useQuery } from "@tanstack/react-query";



// import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: boolean;
  data: IndividualBlogData;
};

// not sure about existence of this much data
export type IndividualBlogData = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  contentHeading: string;
  contentDescription: string;
  category: string;
  createdAt: string;
};

const placeholderData: SuccessResponse = {
  success: true,
  data: {
    id: "1",
    title: "title",
    contentHeading: "contentHeading",
    contentDescription: "contentDescription",
    content: "content",
    imageUrl: "/favicon.svg",
    category: "category",
    createdAt: "2024-12-08T10:18:17.461Z",
  },
};

export const useBlogQuery = (id: string) => {
  return useQuery({
    queryKey: ["blog", { id }],
    queryFn: async () => {
      new Promise<void>((resolve) => setTimeout(resolve, 1000));
      //   const response = await apiAxios.get(`/blog/posts/${id}`);
      //     return response.data as SuccessResponse;
      return {
        ...placeholderData,
        success: true,
        data: {
          ...placeholderData.data,
          id,
        },
      } as SuccessResponse;
    },
    placeholderData:keepPreviousData ?? placeholderData,
  });
};
