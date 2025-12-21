import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
// Global CSS from node_modules can be imported normally above.
// CSS files placed in `public/` must be linked via <link> tags, not imported.

import type { Metadata } from "next"
import { Figtree, Space_Grotesk } from "next/font/google"
import ClientLayout from '@/components/layout/ClientLayout';

const figtree = Figtree({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: "--figtree",
    display: 'swap',
})
const grotesk = Space_Grotesk({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--grotesk",
    display: 'swap',
})

export const metadata: Metadata = {
    title: "DevBcn - Barcelona Developers' Conference",
    description: "The Biggest Developer conference in Barcelona",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
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
            </head>
            <body className={`${figtree.variable} ${grotesk.variable}`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    )
}
