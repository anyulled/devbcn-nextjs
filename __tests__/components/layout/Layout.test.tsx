import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

beforeAll(() => {
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

afterAll(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});

const aosInit = jest.fn();

const createHeaderMock = (id: number) => {
  return {
    __esModule: true,
    default: ({ scroll }: { scroll: boolean }) => <div data-testid={`header-${id}`} data-scroll={scroll ? "true" : "false"} />,
  };
};

const createFooterMock = (id: number) => {
  return {
    __esModule: true,
    default: () => <div data-testid={`footer-${id}`} />,
  };
};

jest.mock("aos", () => ({
  __esModule: true,
  default: { init: aosInit },
}));

jest.mock("@/components/elements/AddClassBody", () => ({
  __esModule: true,
  default: () => <div data-testid="add-class-body" />,
}));

jest.mock("@/components/elements/BackToTop", () => ({
  __esModule: true,
  default: ({ target }: { target: string }) => <div data-testid="back-to-top" data-target={target} />,
}));

jest.mock("@/components/layout/MobileMenu", () => ({
  __esModule: true,
  default: ({ isMobileMenu }: { isMobileMenu: boolean }) => <div data-testid="mobile-menu" data-open={isMobileMenu ? "true" : "false"} />,
}));

jest.mock("@/components/layout/header/Header1", () => createHeaderMock(1));
jest.mock("@/components/layout/header/Header2", () => createHeaderMock(2));
jest.mock("@/components/layout/header/Header3", () => createHeaderMock(3));
jest.mock("@/components/layout/header/Header4", () => createHeaderMock(4));
jest.mock("@/components/layout/header/Header5", () => createHeaderMock(5));
jest.mock("@/components/layout/header/Header6", () => createHeaderMock(6));
jest.mock("@/components/layout/header/Header7", () => createHeaderMock(7));
jest.mock("@/components/layout/header/Header8", () => createHeaderMock(8));
jest.mock("@/components/layout/header/Header9", () => createHeaderMock(9));
jest.mock("@/components/layout/header/Header10", () => createHeaderMock(10));

jest.mock("@/components/layout/footer/Footer1", () => createFooterMock(1));
jest.mock("@/components/layout/footer/Footer2", () => createFooterMock(2));
jest.mock("@/components/layout/footer/Footer3", () => createFooterMock(3));
jest.mock("@/components/layout/footer/Footer4", () => createFooterMock(4));
jest.mock("@/components/layout/footer/Footer5", () => createFooterMock(5));
jest.mock("@/components/layout/footer/Footer6", () => createFooterMock(6));
jest.mock("@/components/layout/footer/Footer7", () => createFooterMock(7));
jest.mock("@/components/layout/footer/Footer8", () => createFooterMock(8));
jest.mock("@/components/layout/footer/Footer9", () => createFooterMock(9));
jest.mock("@/components/layout/footer/Footer10", () => createFooterMock(10));

describe("Layout", () => {
  beforeEach(() => {
    aosInit.mockClear();
  });

  it("renders default header/footer and initializes AOS", async () => {
    const Layout = (await import("@/components/layout/Layout")).default;
    render(
      <Layout>
        <div data-testid="child" />
      </Layout>
    );

    expect(screen.getByTestId("header-1")).toBeInTheDocument();
    expect(screen.getByTestId("footer-1")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("add-class-body")).toBeInTheDocument();
    expect(screen.getByTestId("back-to-top")).toHaveAttribute("data-target", "#top");
    expect(aosInit).toHaveBeenCalledTimes(1);
  });

  it("uses provided header and footer styles", async () => {
    const Layout = (await import("@/components/layout/Layout")).default;
    render(<Layout headerStyle={8} footerStyle={9} />);

    expect(screen.getByTestId("header-8")).toBeInTheDocument();
    expect(screen.getByTestId("footer-9")).toBeInTheDocument();
  });

  it("updates header when scrolling", async () => {
    const Layout = (await import("@/components/layout/Layout")).default;
    render(<Layout headerStyle={1} />);

    expect(screen.getByTestId("header-1")).toHaveAttribute("data-scroll", "false");

    Object.defineProperty(window, "scrollY", { value: 150, writable: true, configurable: true });
    fireEvent.scroll(document);

    expect(screen.getByTestId("header-1")).toHaveAttribute("data-scroll", "true");
  });
});
