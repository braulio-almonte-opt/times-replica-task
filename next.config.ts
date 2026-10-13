import type { NextConfig } from "next";
const regionalHosName = process.env.CONTENTSTACK_REGIONAL_HOSTNAME
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: regionalHosName ?? "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
