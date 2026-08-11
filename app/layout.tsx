import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/styles/main.scss";
import "@/styles/vendor/aos.css";
import "@/styles/vendor/bootstrap.min.css";
import "@/styles/vendor/magnific-popup.css";
import "@/styles/vendor/mobile.css";
import "@/styles/vendor/nice-select.css";
import "@/styles/vendor/odometer.css";
import "@/styles/vendor/sidebar.css";
import "@/styles/vendor/slick-slider.css";

import ClientLayout from "@/components/layout/ClientLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Figtree, Space_Grotesk } from "next/font/google";

const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--figtree",
  display: "swap",
});
const grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevBcn - Barcelona Developers' Conference",
    template: "%s | DevBcn",
  },
  description: "The Biggest Developer conference in Barcelona. Join hundreds of developers for cutting-edge talks, workshops, and networking.",
  keywords: [
    "conference",
    "barcelona",
    "frontend",
    "backend",
    "java",
    "agile",
    "kubernetes",
    "leadership",
    "AI",
    "ML",
    "machine learning",
    "artificial intelligence",
    "cloud",
    "security",
    "frontend development",
    "backend development",
    "jvm",
    "kotlin",
    "DevOps",
    "developer conference",
    "tech conference",
    "software development",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.devbcn.com",
    siteName: "devbcn.com",
    title: "DevBcn - Barcelona Developers' Conference",
    description: "The Biggest Developer conference in Barcelona",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "DevBcn - Barcelona Developers Conference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dev_bcn",
    creator: "@dev_bcn",
    title: "DevBcn - Barcelona Developers' Conference",
    description: "The Biggest Developer conference in Barcelona",
    images: ["/assets/img/logo/logo.png"],
  },
  metadataBase: new URL("https://www.devbcn.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldEnableVercelTelemetry = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== "false";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <meta name="google-site-verification" content="LNQXre5kOuyrkwaHjRRuLOzesEtCyoYisEXYwhi3ENY" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css" />

        <meta name="application-name" content="DevBcn" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#007bff" />
        <link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon.png" />
      </head>
      <body className={`${figtree.variable} ${grotesk.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
      {shouldEnableVercelTelemetry ? (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      ) : null}
    </html>
  );
}
