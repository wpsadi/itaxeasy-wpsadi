import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string({
        message: "Please enter a valid email address.",
        required_error: "Email is required.",
    }).email({
      message: "Please enter a valid email address.",
    }),
    password: z.string({
        required_error: "Password is required.",
        message: "Please enter a valid password.",
    }).min(8, {
      message: "Password must be at least 8 characters long.",
    }),
  });