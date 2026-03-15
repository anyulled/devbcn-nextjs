import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { mainNavLinks, newsDropdownLinks, yearSpecificNavLinks } from "@/config/navigation";

const usePathname = jest.fn();
const trackTicketClick = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

jest.mock("@/lib/shared/analytics", () => ({
  __esModule: true,
  trackTicketClick: (...args: unknown[]) => trackTicketClick(...args),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href, onClick, className }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) => (
    <a href={typeof href === "string" ? href : ""} onClick={onClick} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    default: MockLink,
  };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}));

describe("Header8", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/2026/talks");
    trackTicketClick.mockClear();
  });

  it("renders navigation links and tracks ticket clicks", async () => {
    const Header8 = (await import("@/components/layout/header/Header8")).default;
    const { container } = render(
      <Header8
        scroll={false}
        isSearch={false}
        handleSearch={jest.fn()}
        navigation={{ main: mainNavLinks, yearSpecific: yearSpecificNavLinks, news: newsDropdownLinks }}
      />
    );

    expect(container.querySelector(".header-area")).toBeInTheDocument();
    const buyButtons = screen.getAllByText("Buy Ticket");
    fireEvent.click(buyButtons[0]);
    fireEvent.click(buyButtons[1]);

    expect(trackTicketClick).toHaveBeenCalledWith("header_top", "2026");
    expect(trackTicketClick).toHaveBeenCalledWith("header_button", "2026");
  });
});
