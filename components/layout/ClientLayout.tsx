"use client";
import BackToTop from "@/components/elements/BackToTop";
import Footer8 from "@/components/layout/footer/Footer8";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AddClassBody from "../elements/AddClassBody";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isPortalLayout = pathname?.startsWith("/admin") || pathname?.startsWith("/sponsor");
  const isMinimalLayout = isPortalLayout || pathname?.includes("/convince-your-boss");

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

  useEffect(() => {
    void import("aos")
      .then(({ default: aos }) => {
        aos.init();
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize animations:", error);
      });
  }, []);

  return (
    <>
      <div id="top" />
      <AddClassBody />
      {children}
      {!isMinimalLayout && (
        <>
          <Footer8 />
          <BackToTop target="#top" />
        </>
      )}
    </>
  );
}
