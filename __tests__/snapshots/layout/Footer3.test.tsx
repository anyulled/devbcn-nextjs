import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer3 from "@/components/layout/footer/Footer3";

describe("Footer3 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer3 />);
    expect(container).toMatchSnapshot();
  });
});
