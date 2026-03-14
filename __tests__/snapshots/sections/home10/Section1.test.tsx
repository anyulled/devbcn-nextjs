import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section1 from "@/components/sections/home10/section1";

describe("Section1 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section1 />);
    expect(container).toMatchSnapshot();
  });
});
