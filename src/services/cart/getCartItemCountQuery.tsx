import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { apiAxios } from "@/instances/apiInstance"

type SuccessResponse = {
    success: boolean,
    count:number
}

export const useGetCartItemCount = ()=>{
    return useQuery({
        queryKey: ['cartItemCount'],
        queryFn: async()=> {
            const response = await apiAxios.get('/cart/count')
            return response.data as SuccessResponse
        },
        placeholderData: keepPreviousData ?? {success:false, count:0}
    })
}