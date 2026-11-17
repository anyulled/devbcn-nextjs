/**
 * @jest-environment jsdom
 */

import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockLoaderState = { shouldFail: false };

jest.mock("@/components/slider/BrandSlider", () => ({
  __esModule: true,
  get default() {
    if (mockLoaderState.shouldFail) {
      throw new Error("Simulated chunk load failure");
    }
    return function MockBrandSlider() {
      return <div data-testid="mock-brand-slider">Loaded Sponsors</div>;
    };
  },
}));

import LazyBrandSlider from "@/components/slider/LazyBrandSlider";

describe("LazyBrandSlider", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);

  beforeEach(() => {
    mockLoaderState.shouldFail = false;
    consoleErrorSpy.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a retry button when loading fails and recovers on retry", async () => {
    mockLoaderState.shouldFail = true;
    render(<LazyBrandSlider />);

    const retryButton = await screen.findByRole("button", { name: "Retry" });
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to load sponsors right now.");
    expect(consoleErrorSpy).toHaveBeenCalled();

    mockLoaderState.shouldFail = false;
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(screen.getByTestId("mock-brand-slider")).toBeInTheDocument();
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
