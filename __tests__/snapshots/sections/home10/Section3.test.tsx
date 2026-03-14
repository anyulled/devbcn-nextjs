import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section3 from "@/components/sections/home10/section3";

describe("Section3 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section3 />);
    expect(container).toMatchSnapshot();
  });
});
