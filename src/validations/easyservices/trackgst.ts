import * as z from "zod"

export const trackGSTSchema = z.object({
  gstin: z.string()
    .min(15, { message: "GSTIN must be exactly 15 characters" })
    .max(15, { message: "GSTIN must be exactly 15 characters" }),
  financialYear: z.string({
    required_error: "Please select a financial year",
  }),
})

export type TrackGSTFormValues = z.infer<typeof trackGSTSchema>
