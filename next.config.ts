import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // UPGRADE: Optimized for Next.js 16 + GSAP
  experimental: {
    // Prevents the dev server from compiling thousands of unused icons
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },
  // Ensure that source maps are handled correctly for debugging GSAP
  productionBrowserSourceMaps: false,
};

export default nextConfig;
