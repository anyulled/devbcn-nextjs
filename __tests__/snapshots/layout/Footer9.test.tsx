import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer9 from "@/components/layout/footer/Footer9";

describe("Footer9 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer9 />);
    expect(container).toMatchSnapshot();
  });
});
