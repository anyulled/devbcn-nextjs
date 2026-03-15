import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Section5 from "@/components/sections/home10/section5";

describe("Section5 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section5 />);
    expect(container).toMatchSnapshot();
  });
});
