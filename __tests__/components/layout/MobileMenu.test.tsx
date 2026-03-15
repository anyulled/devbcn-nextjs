import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import type { EditionNavigation } from "@/config/editions/types";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    onClick,
    target,
    rel,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    target?: string;
    rel?: string;
    className?: string;
  }) => (
    <a href={typeof href === "string" ? href : ""} onClick={onClick} target={target} rel={rel} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    default: MockLink,
  };
});

describe("MobileMenu", () => {
  const navigation: EditionNavigation = {
    main: [{ label: "About Us", href: "/about-us", requiresYear: false }],
    yearSpecific: [{ label: "Talks", href: "/talks", requiresYear: true }],
    news: [{ label: "CFP", href: "/cfp", requiresYear: true }],
  };

  it("renders menu and toggles accordion sections", async () => {
    const MobileMenu = (await import("@/components/layout/MobileMenu")).default;
    const handleMobileMenu = jest.fn();
    render(<MobileMenu isMobileMenu={true} handleMobileMenu={handleMobileMenu} navigation={navigation} />);

    expect(document.querySelector(".mobile-sidebar.mobile-sidebar1.mobile-menu-active")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Talks")).toBeInTheDocument();
    expect(screen.getByText("CFP")).toBeInTheDocument();

    const submenuButtons = document.querySelectorAll(".submenu-button");
    const subMenus = document.querySelectorAll(".sub-menu");
    const homeSubMenu = subMenus.item(0);
    const newsSubMenu = subMenus.item(1);
    expect(submenuButtons.length).toBeGreaterThan(1);
    if (!homeSubMenu || !newsSubMenu) {
      throw new Error("Expected mobile menu submenus to exist");
    }
    expect(homeSubMenu).toHaveStyle({ display: "none" });
    expect(newsSubMenu).toHaveStyle({ display: "none" });

    fireEvent.click(submenuButtons[0]);
    expect(homeSubMenu).toHaveStyle({ display: "block" });

    fireEvent.click(submenuButtons[1]);
    expect(newsSubMenu).toHaveStyle({ display: "block" });
  });
});
