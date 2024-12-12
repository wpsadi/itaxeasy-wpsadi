import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { env } from "@/env";

const API_BASE_URL = env.web.ocr_api_url;
const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  console.log(formData);
  const response = await axios.post(
   `${API_BASE_URL}/api/aadhar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ["AadharCardForExtractionUploaded"],
    mutationFn: uploadImage,
    onSuccess: () => {
      alert("image uploaded succesfully");
    },
    onError: () => {
      alert("error adding user !");
    },
  });
};
