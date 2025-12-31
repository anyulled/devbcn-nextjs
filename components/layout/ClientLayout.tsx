"use client";
import BackToTop from "@/components/elements/BackToTop";
import Footer8 from "@/components/layout/footer/Footer8";
import AOS from "aos";
import { useEffect } from "react";
import AddClassBody from "../elements/AddClassBody";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div id="top" />
      <AddClassBody />
      {children}
      <Footer8 />
      <BackToTop target="#top" />
    </>
  );
}
