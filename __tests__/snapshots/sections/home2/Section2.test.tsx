import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section2 from "@/components/sections/home2/section2";

describe("Home2 Section2 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section2 />);
    expect(container).toMatchSnapshot();
  });
});
