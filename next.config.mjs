/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
