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

export type BlogSuccessData = { posts: BlogData[]; pages: number, currentPage: number };

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
    currentPage:1,
    pages: 3,
  },
};

export const useBlogsQuery = (data: {  limit: number }) => {
  return useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      console.log("data", data);
      // console.log("pageParam", pageParam);  
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   const response = await apiAxios.get(`blog/posts?page=${pageParam}&limit=${data.limit}`);
      //     return response.data as SuccessResponse;
      const response  ={
        ...placeholderData,
        success: true,
        data:{
            ...placeholderData.data,
            currentPage: pageParam
        }}
      return response  as SuccessResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.data.pages === lastPageParam) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (prevResponse,allPages) => {
        console.log(prevResponse.data.currentPage,"current",prevResponse,allPages)
        if (prevResponse.data.currentPage+1 == 1) {
          return undefined; // Already at the first page
        }
        return prevResponse.data.currentPage - 1; // Go to the previous page
      },
  });
};

// 1,2,3,4,5,6,7,8,