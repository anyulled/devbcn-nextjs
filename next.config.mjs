/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    qualities: [85],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sessionize.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "devbcn-nextjs.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.devbcn.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {},
  transpilePackages: ["swiper", "ssr-window", "dom7"],
};

export default nextConfig;
