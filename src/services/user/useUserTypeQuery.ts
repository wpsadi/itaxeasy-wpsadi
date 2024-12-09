import { useQuery } from "@tanstack/react-query";

// import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
    success: boolean;
    message: string;
}

// type ErrorResponse = {
//     success: boolean;
//     message: string;
// }



export const useUserTypeQuery = () => {
    return useQuery({
        queryKey:["authType"],
        queryFn:async ()=>{
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // const response = await apiAxios.get("/auth/type");
            // return response.data as SuccessResponse;
        return {success:true, message:"User is not authenticated"} as SuccessResponse;
        }
    });
}