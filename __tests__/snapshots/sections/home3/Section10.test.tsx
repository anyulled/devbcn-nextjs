import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section10 from "@/components/sections/home3/section10";

describe("Home3 Section10 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section10 />);
    expect(container).toMatchSnapshot();
  });
});
