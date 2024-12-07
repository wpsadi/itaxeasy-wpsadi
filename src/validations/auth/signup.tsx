import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().regex(/^\d{10}$/, {
      message: "Please enter a valid 10 digit phone number.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    gender: z.string({
      required_error: "Please select a gender.",
    }),
    pinCode: z.string().regex(/^\d{6}$/, {
      message: "Please enter a valid 6 digit PIN code.",
    }).optional(),
    address: z.string().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })