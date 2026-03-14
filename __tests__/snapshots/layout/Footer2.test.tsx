import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer2 from "@/components/layout/footer/Footer2";

describe("Footer2 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer2 />);
    expect(container).toMatchSnapshot();
  });
});
