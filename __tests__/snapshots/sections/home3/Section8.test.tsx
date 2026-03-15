import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section8 from "@/components/sections/home3/section8";

describe("Home3 Section8 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section8 />);
    expect(container).toMatchSnapshot();
  });
});
