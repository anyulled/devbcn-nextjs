"use client";
import { EditionNavigation } from "@/config/editions/types";
import React, { useState } from "react";
import Header8 from "./header/Header8";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

interface DynamicHeaderWrapperProps {
  navigation: EditionNavigation;
}

export default function DynamicHeaderWrapper({ navigation }: Readonly<DynamicHeaderWrapperProps>) {
  const pathname = usePathname();
  const isMinimalLayout = pathname?.includes("/convince-your-boss");
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = (): void => setIsMobileMenu(!isMobileMenu);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleSearch = (): void => setIsSearch(!isSearch);
  const [scroll, setScroll] = useState<boolean>(false);

  React.useEffect(() => {
    if (isMinimalLayout) {
      return;
    }
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

  if (isMinimalLayout) {
    return null;
  }

  return (
    <>
      <Header8 scroll={scroll} isSearch={isSearch} handleSearch={handleSearch} navigation={navigation} />
      <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} navigation={navigation} />
    </>
  );
}
