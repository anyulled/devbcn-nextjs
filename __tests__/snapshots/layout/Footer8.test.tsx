import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer8 from "@/components/layout/footer/Footer8";

describe("Footer8 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer8 />);
    expect(container).toMatchSnapshot();
  });
});
