import type { NextConfig } from "next";
const regionalHostName = process.env.CONTENTSTACK_REGIONAL_HOSTNAME?.trim();

if (!regionalHostName) {
  throw new Error(
    "Missing required environment variable CONTENTSTACK_REGIONAL_HOSTNAME.",
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: regionalHostName,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
