/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    qualities: [75, 85],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sessionize.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sessionize.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cache.sessionize.com",
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
      {
        protocol: "https",
        hostname: "fukvfjejcwkjuxahpbxx.supabase.co",
        pathname: "/**",
      },
    ],
  },
  turbopack: {},
  transpilePackages: ["swiper", "ssr-window", "dom7"],
};

export default nextConfig;
