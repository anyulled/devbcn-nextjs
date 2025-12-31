"use client";
import { EditionNavigation } from "@/config/editions/types";
import React, { useState } from "react";
import Header8 from "./header/Header8";
import MobileMenu from "./MobileMenu";

interface DynamicHeaderWrapperProps {
  navigation: EditionNavigation;
  scroll?: boolean; // Optional if we want to pass initial scroll state, though Header/ClientLayout handles it
}

export default function DynamicHeaderWrapper({ navigation }: DynamicHeaderWrapperProps) {
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = (): void => setIsMobileMenu(!isMobileMenu);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleSearch = (): void => setIsSearch(!isSearch);

  // Scroll state is typically managed globally or in ClientLayout, but Header needs it.
  // We can either lift that state back up, or keep it in ClientLayout and pass context.
  // HOWEVER, we moved Header OUT of ClientLayout. So we need to handle scroll here or in each layout?
  // Actually, ClientLayout still handles scroll state for the "sticky" class on body or similar.
  // But Header receives `scroll` prop. Let's replicate scroll logic here or simplify.
  // Simplest is to manage scroll here since this is now the "Header Container".

  const [scroll, setScroll] = useState<boolean>(false);
  React.useEffect(() => {
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
      <Header8
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isSearch={isSearch}
        handleSearch={handleSearch}
        navigation={navigation}
      />
      <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} navigation={navigation} />
    </>
  );
}
