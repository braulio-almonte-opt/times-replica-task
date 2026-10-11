import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu-images.contentstack.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
