import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section2 from "@/components/sections/home10/section2";

describe("Section2 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section2 />);
    expect(container).toMatchSnapshot();
  });
});
