import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  agentRules: false,
  typedRoutes: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    imageSizes: [128, 256, 384],
    deviceSizes: [576],
  },
};

export default nextConfig;
