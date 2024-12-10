import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAddToCartMutation } from "@/services/cart/addToCartMutation";
import { useUserProfileQuery } from "@/services/user/profile/UserProfileQuery";

export const AddToCartButtonRender = ({ apiId }: { apiId: string }) => {
  console.log(apiId);
  const addToCartMutation = useAddToCartMutation();
  const userQuery = useUserProfileQuery();

  const router = useRouter();

  if (userQuery.isPending || addToCartMutation.isPending) {
    return (
      <>
        <Button>
          <Loader className="animate-spin" />
        </Button>
      </>
    );
  }

  if (userQuery.isError) {
    return (
      <>
        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          Login to Buy
        </Button>
      </>
    );
  }

  if (userQuery.isSuccess) {
    return (
      <>
        <Button onClick={()=>{
            addToCartMutation.mutate(apiId)
        }}> Add to Cart</Button>
      </>
    );
  }
};
