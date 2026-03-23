"use client";
import { EditionNavigation } from "@/config/editions/types";
import { mainNavLinks, newsDropdownLinks, yearSpecificNavLinks } from "@/config/navigation";
import AOS from "aos";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import AddClassBody from "../elements/AddClassBody";
import BackToTop from "../elements/BackToTop";
import Footer1 from "./footer/Footer1";
import Footer10 from "./footer/Footer10";
import Footer2 from "./footer/Footer2";
import Footer3 from "./footer/Footer3";
import Footer4 from "./footer/Footer4";
import Footer5 from "./footer/Footer5";
import Footer6 from "./footer/Footer6";
import Footer7 from "./footer/Footer7";
import Footer8 from "./footer/Footer8";
import Footer9 from "./footer/Footer9";
import Header1 from "./header/Header1";
import Header10 from "./header/Header10";
import Header2 from "./header/Header2";
import Header3 from "./header/Header3";
import Header4 from "./header/Header4";
import Header5 from "./header/Header5";
import Header6 from "./header/Header6";
import Header7 from "./header/Header7";
import Header8 from "./header/Header8";
import Header9 from "./header/Header9";
import MobileMenu from "./MobileMenu";

interface LayoutProps {
  headerStyle?: number;
  footerStyle?: number;
  children?: React.ReactNode;
  breadcrumbTitle?: string;
}

interface BaseHeaderProps {
  scroll: boolean;
  isSearch: boolean;
  handleSearch: () => void;
}

type HeaderRenderer = (props: BaseHeaderProps, navigation: EditionNavigation) => ReactElement;

const headerRenderers: Record<number, HeaderRenderer> = {
  1: (props) => <Header1 {...props} />,
  2: (props) => <Header2 {...props} />,
  3: (props) => <Header3 {...props} />,
  4: (props) => <Header4 {...props} />,
  5: (props) => <Header5 {...props} />,
  6: (props) => <Header6 {...props} />,
  7: (props) => <Header7 {...props} />,
  8: (props, navigation) => <Header8 navigation={navigation} {...props} />,
  9: (props) => <Header9 {...props} />,
  10: (props) => <Header10 {...props} />,
};

const footerComponents: Record<number, ReactElement> = {
  1: <Footer1 />,
  2: <Footer2 />,
  3: <Footer3 />,
  4: <Footer4 />,
  5: <Footer5 />,
  6: <Footer6 />,
  7: <Footer7 />,
  8: <Footer8 />,
  9: <Footer9 />,
  10: <Footer10 />,
};

export default function Layout({ headerStyle, footerStyle, breadcrumbTitle: _breadcrumbTitle, children }: Readonly<LayoutProps>) {
  const [scroll, setScroll] = useState<boolean>(false);

  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = (): void => setIsMobileMenu(!isMobileMenu);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleSearch = (): void => setIsSearch(!isSearch);

  useEffect(() => {
    AOS.init();
    const state = { isTicking: false, frameId: 0 };
    const handleScroll = (): void => {
      if (!state.isTicking) {
        state.frameId = window.requestAnimationFrame(() => {
          const scrollCheck: boolean = window.scrollY > 100;
          if (scrollCheck !== scroll) {
            setScroll(scrollCheck);
          }
          state.isTicking = false;
        });
        state.isTicking = true;
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
      if (state.frameId) window.cancelAnimationFrame(state.frameId);
    };
  }, [scroll]);

  const defaultNavigation: EditionNavigation = {
    main: mainNavLinks,
    yearSpecific: yearSpecificNavLinks,
    news: newsDropdownLinks,
  };

  const resolvedHeaderStyle = headerStyle || 1;
  const resolvedFooterStyle = footerStyle || 1;
  const headerRenderer = headerRenderers[resolvedHeaderStyle] ?? headerRenderers[1];
  const headerElement = headerRenderer({ scroll, isSearch, handleSearch }, defaultNavigation);
  const footerElement = footerComponents[resolvedFooterStyle] ?? footerComponents[1];

  return (
    <>
      <div id="top" />
      <AddClassBody />
      {/* <AnimatedText /> */}
      {headerElement}
      <MobileMenu navigation={defaultNavigation} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />

      {children}

      {footerElement}

      <BackToTop target="#top" />
    </>
  );
}
