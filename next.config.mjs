import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
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

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontendNav: false,
  workboxOptions: {
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "workbox-pages-cache",
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60,
          },
          networkTimeoutSeconds: 10,
        },
      },
      {
        urlPattern: /\/_next\/image\?url=.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "workbox-next-image-cache",
          expiration: {
            maxEntries: 128,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^https:\/\/sessionize\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "workbox-sessionize-images",
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "workbox-static-images",
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
    ],
  },
});

export default withPWA(nextConfig);
