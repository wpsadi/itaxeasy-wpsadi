import axios from "axios";

import { env } from "@/env";

export const apiAxios = axios.create({
  withCredentials: true,
  baseURL: env.web.apiURL,
});
