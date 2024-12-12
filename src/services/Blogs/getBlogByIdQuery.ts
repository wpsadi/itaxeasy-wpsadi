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

const placeholderData = {
  success: true,
  data: {
    id: "1",
    title: "Understanding GST: A Comprehensive Guide",
    contentDescription: "Goods and Services Tax (GST) is a single tax on the supply of goods and services, replacing multiple indirect taxes in India. This blog explains the GST structure, benefits, and its impact on businesses and consumers.",
    imageUrl: "https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Business, Taxation",
    createdAt: "2024-12-12T10:00:00.000Z"
  }
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
