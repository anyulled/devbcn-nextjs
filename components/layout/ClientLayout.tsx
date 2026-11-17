"use client";
import BackToTop from "@/components/elements/BackToTop";
import Footer8 from "@/components/layout/footer/Footer8";
import AOS from "aos";
import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import AddClassBody from "../elements/AddClassBody";

const FONTAWESOME_CSS_URL = "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css";

function ClientChrome() {
  const pathname = usePathname();
  const isPortalLayout = pathname?.startsWith("/admin") || pathname?.startsWith("/sponsor");
  const isMinimalLayout = isPortalLayout || pathname?.includes("/convince-your-boss") || pathname === "/sw-reset";

  useEffect(() => {
    const handleHashScroll = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [pathname]);

  if (isMinimalLayout) {
    return null;
  }

  return (
    <>
      <Footer8 />
      <BackToTop target="#top" />
    </>
  );
}

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    AOS.init();
    void import("@/styles/vendor/aos.css");

    // Load FontAwesome asynchronously after first paint so it never blocks FCP/LCP.
    if (!document.querySelector(`link[href="${FONTAWESOME_CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONTAWESOME_CSS_URL;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (!url.searchParams.has("devbcn-sw-cleanup")) {
      return;
    }

    url.searchParams.delete("devbcn-sw-cleanup");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  return (
    <>
      <div id="top" />
      <Suspense fallback={null}>
        <AddClassBody />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <ClientChrome />
      </Suspense>
    </>
  );
}
