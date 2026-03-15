import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

jest.mock("@/components/elements/Countdown", () => () => <div data-testid="countdown" />);

import Section1 from "@/components/sections/home1/section1";

describe("Home1 Section1 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section1 />);
    expect(container).toMatchSnapshot();
  });
});
