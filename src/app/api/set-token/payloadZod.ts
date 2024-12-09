import { z } from "zod";

// ye bola gya tha ki token hmesha 24 hr me expire ho jayega isiliye 23.5hr me expire kar diya
export const setTokenPayloadZod = z.object({
    token: z.string({
        message: "Token must be a string",
        required_error: "Token is required"
    }),
    expireAt: z.date().default(() => new Date(Date.now() + 23 * 60 * 60 * 1000 + 30 * 60 * 1000))
})