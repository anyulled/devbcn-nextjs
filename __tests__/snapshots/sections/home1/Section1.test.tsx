import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

jest.mock("@/components/elements/Countdown", () => () => <div data-testid="countdown" />);

describe("Home1 Section1 Component", () => {
  it("matches snapshot", async () => {
    const Section1 = (await import("@/components/sections/home1/section1")).default;
    const { container } = render(<Section1 />);
    expect(container).toMatchSnapshot();
  });
});
