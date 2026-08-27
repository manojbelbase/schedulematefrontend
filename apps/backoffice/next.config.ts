import type { NextConfig } from "next";

import { validateEnv } from "@/config/env";

validateEnv();

const nextConfig: NextConfig = {
  serverExternalPackages: ["rimraf"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
