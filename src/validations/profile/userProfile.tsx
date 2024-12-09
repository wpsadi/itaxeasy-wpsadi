import { z } from "zod";

export const userProfileSchema  =  z.object({
    pan: z.string().min(10, "PAN must be 10 characters"),
    aadhaar: z.string().min(12, "Aadhaar must be 12 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be 10 digits"),
    gender: z.string(),
    pinCode: z.string().min(6, "PIN code must be 6 digits"),
    address: z.string().min(1, "Address is required"),
  });