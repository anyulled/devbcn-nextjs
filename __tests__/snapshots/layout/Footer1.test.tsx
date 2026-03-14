import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer1 from "@/components/layout/footer/Footer1";

describe("Footer1 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer1 />);
    expect(container).toMatchSnapshot();
  });
});
