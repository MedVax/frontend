import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["fraudspect.nyc3.digitaloceanspaces.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fraudspect.nyc3.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
