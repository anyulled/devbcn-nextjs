import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer4 from "@/components/layout/footer/Footer4";

describe("Footer4 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer4 />);
    expect(container).toMatchSnapshot();
  });
});
