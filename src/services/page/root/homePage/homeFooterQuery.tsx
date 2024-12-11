
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import { apiAxios } from "@/instances/apiInstance";

type SuccessResponse = {
  success: true;
  message: string;
  data: {
    socials: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      linkedin?: string;
      whatsapp?: string;
      email?: string;
      phone?: string;
      address?: string;
      addressAlternate?: string;
      copyright?: string;
    };
  };
};

// const dummyData: SuccessResponse = {
//   success: true,
//   message: "Footer links fetched successfully",
//   data: {
//     socials: {
//       facebook: "https://www.facebook.com/itaxeasy.accounting.9/",
//       instagram: "https://www.instagram.com/_itax_easy/",
//       youtube: "https://www.youtube.com/@Itaxeasy",
//       linkedin: "https://in.linkedin.com/company/itaxeasy-pvt-limited",
//       whatsapp: "https://wa.me/8770877270",
//       email: "support@itaxeasy.com",
//       phone: "+918770877270",
//       address: " -y, Padav Gwalior 474002 (M.P)",
//       addressAlternate:
//         "Second Branch: Sat 1, Flat - 811, Logix Zest Blossom, Sector 143, Noida 201306 ( U.P)",
//       copyright: "Copyright 2024 | All rights reserved by iTaxEasy",
//     },
//   },
// };



export const fetchHomeFooter = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // await apiAxios.get("cms/footer").catch(() => null);
  // const response = await apiAxios.get("cms/footer");
  // return response.data as SuccessResponse;
  // return dummyData;
  return(
    {
      "success": true,
      "message": "Footer links fetched successfully",
      "data": {
          "socials": {
              "facebook": "https://www.facebook.com/itaxeasy.accounting.9/",
              "instagram": "https://www.instagram.com/_itax_easy/",
              "youtube": "https://www.youtube.com/@Itaxeasy",
              "linkedin": "https://in.linkedin.com/company/itaxeasy-pvt-limited",
              "whatsapp": "https://wa.me/8770877270",
              "email": "support@itaxeasy.com",
              "phone": "+918770877270",
              "address": "Main Branch: G - 41, Gandhi Nagar, Near Defence Colony, Padav Gwalior 474002 (M.P)",
              "addressAlternate": "Second Branch: Sat 1, Flat - 811, Logix Zest Blossom, Sector 143, Noida 201306 ( U.P)",
              "copyright": "Copyright 2024 | All rights reserved by iTaxEasy"
          }
      }
  }
  )
}

export const fetchHomeFooterStaticProp = async ()=>{
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['homeFooter'],
    queryFn: fetchHomeFooter,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export const useHomeFooterQuery = () => {
  return useQuery({
    queryKey: ["homeFooter"],
    queryFn: fetchHomeFooter,
  });
};


