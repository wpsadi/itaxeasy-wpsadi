import * as z from "zod"

export const gstinSchema = z.object({
  gstin: z
    .string()
    .length(15, "GSTIN must be exactly 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, {
      message: "Please enter a valid GSTIN format",
    })
})

export type GSTINFormValues = z.infer<typeof gstinSchema>