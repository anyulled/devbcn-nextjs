"use client";
import BackToTop from "@/components/elements/BackToTop";
import Footer8 from "@/components/layout/footer/Footer8";
import AOS from "aos";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AddClassBody from "../elements/AddClassBody";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isMinimalLayout = pathname?.includes("/convince-your-boss");

  useEffect(() => {
    AOS.init();
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
