import { describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import type { EditionNavigation } from "@/config/editions/types";

jest.mock("@/components/layout/header/Header8", () => ({
  __esModule: true,
  default: ({ scroll, isSearch, handleSearch }: { scroll: boolean; isSearch: boolean; handleSearch: () => void }) => (
    <div data-testid="header8" data-scroll={scroll ? "true" : "false"} data-search={isSearch ? "true" : "false"}>
      <button type="button" onClick={handleSearch}>
        toggle-search
      </button>
    </div>
  ),
}));

jest.mock("@/components/layout/MobileMenu", () => ({
  __esModule: true,
  default: ({ isMobileMenu, handleMobileMenu }: { isMobileMenu: boolean; handleMobileMenu: () => void }) => (
    <div data-testid="mobile-menu" data-open={isMobileMenu ? "true" : "false"}>
      <button type="button" onClick={handleMobileMenu}>
        toggle-menu
      </button>
    </div>
  ),
}));

describe("DynamicHeaderWrapper", () => {
  const navigation: EditionNavigation = {
    main: [{ label: "About Us", href: "/about-us", requiresYear: false }],
    yearSpecific: [{ label: "Talks", href: "/talks", requiresYear: true }],
    news: [{ label: "CFP", href: "/cfp", requiresYear: true }],
  };

  it("toggles search and mobile menu state", async () => {
    const DynamicHeaderWrapper = (await import("@/components/layout/DynamicHeaderWrapper")).default;
    render(<DynamicHeaderWrapper navigation={navigation} />);

    expect(screen.getByTestId("header8")).toHaveAttribute("data-search", "false");
    fireEvent.click(screen.getByRole("button", { name: "toggle-search" }));
    expect(screen.getByTestId("header8")).toHaveAttribute("data-search", "true");

    expect(screen.getByTestId("mobile-menu")).toHaveAttribute("data-open", "false");
    fireEvent.click(screen.getByRole("button", { name: "toggle-menu" }));
    expect(screen.getByTestId("mobile-menu")).toHaveAttribute("data-open", "true");
  });

  it("updates scroll state on scroll event", async () => {
    const DynamicHeaderWrapper = (await import("@/components/layout/DynamicHeaderWrapper")).default;
    render(<DynamicHeaderWrapper navigation={navigation} />);

    expect(screen.getByTestId("header8")).toHaveAttribute("data-scroll", "false");

    Object.defineProperty(window, "scrollY", { value: 120, writable: true, configurable: true });
    window.requestAnimationFrame = (cb) => {
      cb(performance.now());
      return 1;
    };
    fireEvent.scroll(document);

    expect(screen.getByTestId("header8")).toHaveAttribute("data-scroll", "true");
  });
});
