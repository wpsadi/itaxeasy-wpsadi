import { useQuery } from "@tanstack/react-query";
import React from "react";

import {
  All_Apis,
  Authentication,
  Bank,
  Extraction,
  ImagePDF,
  Post_Office,
} from "@/app/(pages)/apis/[apiCategory]/(api-service)/icons";

export type APICategoryData = {
  id: string;
  title: string;
  icon?: React.ReactElement;
  src?: string;
  path: string;
};

type SuccessResponse = {
  success: boolean;
  data: APICategoryData[];
};

const gst = "/icons/home/gst.png";

const dummydata: SuccessResponse = {
  success: true,
  data: [
    {
      id: "all_apis",
      icon: All_Apis,
      title: "All Apis",
      path: "/apis/all_apis",
    },
    {
      id: "authentication",
      icon: Authentication,
      title: "Authentication",
      path: "/apis/authentication",
    },
    {
      id: "bank",
      icon: Bank,
      title: "Bank",
      path: "/apis/bank",
    },
    {
      id: "image_pdf",
      icon: ImagePDF,
      title: "Image/PDF",
      path: "/apis/image_pdf",
    },
    {
      id: "post_office",
      icon: Post_Office,
      title: "Post Office",
      path: "/apis/post_office",
    },
    {
      id: "gst",
      src: gst,
      title: "GST",
      path: "/apis/gst",
    },
    {
      id: "extraction_e_kyc",
      icon: Extraction,
      title: "Extraction & E-KYC",
      path: "/apis/extraction_e_kyc",
    },
  ],
};

const placeHolderData = {
  success: true,
  data: [],
};

export const useListAPICategory = () => {
  return useQuery({
    queryKey: ["apis"],
    queryFn: () => {
      return dummydata as SuccessResponse;
    },
    placeholderData: placeHolderData,
  });
};
