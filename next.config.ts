import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "fraudspect.nyc3.digitaloceanspaces.com",
      "fusiondesk-staging.nyc3.cdn.digitaloceanspaces.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fraudspect.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "fusiondesk-staging.nyc3.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "*.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "*.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
