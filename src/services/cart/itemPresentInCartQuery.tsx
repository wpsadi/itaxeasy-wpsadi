import { useQuery } from "@tanstack/react-query"

export const useItemInCartQuery = (itemId: string) => {
    return useQuery({
        queryKey:["cart",{itemId}],
        queryFn:async()=>{
            console.log(itemId)
            await new Promise((resolve)=>setTimeout(resolve,1000))
            return {
                success:false,
            }
        }
    })
}