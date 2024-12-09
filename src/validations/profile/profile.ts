import * as z from "zod"

export const businessProfileSchema = z.object({
  gstin: z.string().min(15, {
    message: "GSTIN must be 15 characters long",
  }).max(15),
  pan: z.string().min(10, {
    message: "PAN must be 10 characters long",
  }).max(10),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters long",
  }),
  taxpayerType: z.string().min(1, {
    message: "Please select a taxpayer type",
  }),
  status: z.string().min(1, {
    message: "Please enter status",
  }),
  ctb: z.string().min(1, {
    message: "Please enter CTB",
  }),
  stateCode: z.string().min(1, {
    message: "Please enter state code",
  }),
  streetAddress: z.string().min(1, {
    message: "Please enter street address",
  }),
  landmark: z.string().optional(),
  city: z.string().min(1, {
    message: "Please enter city",
  }),
  district: z.string().min(1, {
    message: "Please enter district",
  }),
  state: z.string().min(1, {
    message: "Please enter state",
  }),
})

export type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>
