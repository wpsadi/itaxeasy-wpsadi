import * as z from "zod"

export const aadhaarSchema = z.object({
  aadhaarNumber: z
    .string()
    .min(12, "Aadhaar number must be 12 digits")
    .max(12, "Aadhaar number must be 12 digits")
    .regex(/^\d+$/, "Aadhaar number must only contain digits")
})

export type AadhaarFormValues = z.infer<typeof aadhaarSchema>