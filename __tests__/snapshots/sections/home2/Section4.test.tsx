import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section4 from "@/components/sections/home2/section4";

describe("Home2 Section4 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section4 />);
    expect(container).toMatchSnapshot();
  });
});
