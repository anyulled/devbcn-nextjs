import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

const aosInit = jest.fn();

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

jest.mock("@/components/layout/footer/Footer8", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-8" />,
}));

describe("ClientLayout", () => {
  beforeEach(() => {
    aosInit.mockClear();
  });

  it("initializes AOS and renders children", async () => {
    const ClientLayout = (await import("@/components/layout/ClientLayout")).default;
    render(
      <ClientLayout>
        <div data-testid="child" />
      </ClientLayout>
    );

    expect(screen.getByTestId("add-class-body")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("footer-8")).toBeInTheDocument();
    expect(screen.getByTestId("back-to-top")).toHaveAttribute("data-target", "#top");
    await waitFor(() => {
      expect(aosInit).toHaveBeenCalledTimes(1);
    });
  });
});
