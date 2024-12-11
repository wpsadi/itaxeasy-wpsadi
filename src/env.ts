export const env = {
    NODE_ENV:String(process.env.NODE_ENV),
    web:{
        prefix:parseInt(process.env.NEXT_PUBLIC_HTTPS || "0") === 1 ? "https://" : "http://",
        domain:String(process.env.NEXT_PUBLIC_VERCEL_URL),
        url:`${parseInt(process.env.NEXT_PUBLIC_HTTPS || "0") === 1 ? "https://" : "http://"}${String(process.env.NEXT_PUBLIC_Domain)}`,
        apiURL:`${String(process.env.NEXT_PUBLIC_API_URL)}`
    },
    apiKeys:{
        public:{
            google_maps:String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
        }
    },
    auth:{
        google:{
            client_id:String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
        }
    }
}