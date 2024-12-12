/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next"; // Import the NextConfig type

// Define the RemotePattern type
interface RemotePattern {
  protocol: "http" | "https"; // Restrict to valid protocols
  hostname: string;
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Define the configuration
const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable Strict Mode
  experimental: {
    optimizePackageImports: ["icon-library"],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
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
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ] as RemotePattern[], // Use the RemotePattern type
  },
};

export default bundleAnalyzer(nextConfig);
