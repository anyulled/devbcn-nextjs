import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section7 from "@/components/sections/home2/section7";

describe("Home2 Section7 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section7 />);
    expect(container).toMatchSnapshot();
  });
});
