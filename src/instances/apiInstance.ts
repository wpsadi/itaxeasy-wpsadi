import axios from "axios";

import { env } from "@/env";

export const apiAxios = axios.create({
  // withCredentials: true,
  baseURL: env.web.apiURL,
});

// Add an interceptor to handle precondition requests
apiAxios.interceptors.request.use(async (config) => {
  // If the config already has a specific header, skip the precondition check
  // if (config.headers["Authorization"]) {
  //   return config;
  // }

  try {
    // Send the precondition API request (e.g., fetch a token or session data)
    const preconditionResponse = await axios.get(
      `/api/get-token`,
      {
        withCredentials: true,
      }
    );

    // Extract data from the precondition response (e.g., token)
    const token = preconditionResponse.data as string;

    console.log(token,"token retrieved from cookies and injected to headers")

    // Set the Authorization header for the original request
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Precondition request failed:", error);
    throw error; // You can handle or rethrow the error as needed
  }

  return config;
});
