import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogoutMutation = ()=>{
    const queryClient = useQueryClient();
    const router = useRouter()
    return useMutation({
        mutationKey:["logout"],
        mutationFn:async ()=>{
            const response = await axios.post("/api/logout",{});
            return response.data;
        },
        onSuccess:async ()=>{
            await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            router.push("/");
        }

    })
}