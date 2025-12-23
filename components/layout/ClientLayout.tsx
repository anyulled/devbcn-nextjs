"use client";
import AOS from "aos";
import { useEffect, useState } from "react";
import Header8 from "@/components/layout/header/Header8";
import MobileMenu from "@/components/layout/MobileMenu";
import Footer8 from "@/components/layout/footer/Footer8";
import BackToTop from "@/components/elements/BackToTop";
import AddClassBody from "../elements/AddClassBody";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [scroll, setScroll] = useState<boolean>(false);
  // Mobile Menu
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = (): void => setIsMobileMenu(!isMobileMenu);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleSearch = (): void => setIsSearch(!isSearch);
  useEffect(() => {
    AOS.init();
    const handleScroll = (): void => {
      const scrollCheck: boolean = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return (
    <>
      <div id="top" />
      <AddClassBody />
      <Header8 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isSearch={isSearch} handleSearch={handleSearch} />
      <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
      {children}
      <Footer8 />
      <BackToTop target="#top" />
    </>
  );
}
