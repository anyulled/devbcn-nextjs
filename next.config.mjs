/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sessionize.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
