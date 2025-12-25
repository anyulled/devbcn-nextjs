import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Global CSS from node_modules can be imported normally above.
// CSS files placed in `public/` must be linked via <link> tags, not imported.
import ClientLayout from "@/components/layout/ClientLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Figtree, Space_Grotesk } from "next/font/google";
import Script from "next/script";

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
  return (
    <html lang="en">
      <head>
        {/* Link vendor CSS served from public/ */}
        <link rel="stylesheet" href="/assets/css/vendor/aos.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/vendor/mobile.css" />
        {/* <link rel="stylesheet" href="/assets/css/vendor/owlcarousel.min.css" /> */}
        <link rel="stylesheet" href="/assets/css/vendor/sidebar.css" />
        <link rel="stylesheet" href="/assets/css/vendor/slick-slider.css" />
        <link rel="stylesheet" href="/assets/css/vendor/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/vendor/odometer.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="DevBcn" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DevBcn" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#007bff" />
        <link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon.png" />
      </head>
      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0BG1LNPT11" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0BG1LNPT11');
        `}
      </Script>
      <body className={`${figtree.variable} ${grotesk.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
