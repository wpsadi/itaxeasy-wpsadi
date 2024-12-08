import { useInfiniteQuery } from "@tanstack/react-query";

// import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: boolean;
  data: BlogSuccessData;
};

export type BlogData = {
  id: string;
  title: string;
  imageUrl: string;
  contentDescription: string;
  category: string;
  createdAt: string;
};

export type BlogSuccessData = { posts: BlogData[]; pages: number };

const placeholderData: SuccessResponse = {
  success: true,
  data: {
    posts: [
      {
        id: "1",
        title: "title",
        contentDescription: "contentDescription",
        imageUrl: "/favicon.svg",
        category: "category",
        createdAt: "2024-12-08T10:18:17.461Z",
      },
    ],
    pages: 3,
  },
};

export const useBlogsQuery = (data: {  limit: number }) => {
  return useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      console.log("data", data);
      console.log("pageParam", pageParam);  
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   const response = await apiAxios.get(`blog/posts?page=${pageParam}&limit=${data.limit}`);
      //     return response.data as SuccessResponse;
      return placeholderData as SuccessResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
        console.log({
            lastPage,
            lastPageParam
        })
        if (lastPage.data.pages === lastPageParam) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_, __, firstPageParam) => {
        console.log("firstPageParam", firstPageParam);
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      }
  });
};

// 1,2,3,4,5,6,7,8,
