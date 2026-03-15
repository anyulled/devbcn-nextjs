import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section1 from "@/components/sections/home3/section1";

describe("Home3 Section1 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section1 />);
    expect(container).toMatchSnapshot();
  });
});
