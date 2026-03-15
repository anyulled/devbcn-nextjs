import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section3 from "@/components/sections/home2/section3";

describe("Home2 Section3 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section3 />);
    expect(container).toMatchSnapshot();
  });
});
