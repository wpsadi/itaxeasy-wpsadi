/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.daisyui.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "www.gravatar.com" },
      { protocol: "https", hostname: "flowbite.s3.amazonaws.com" },
      { protocol: "https", hostname: "googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com"
      }
    ],
  },
};

export default nextConfig;