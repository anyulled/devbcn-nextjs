import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer10 from "@/components/layout/footer/Footer10";

describe("Footer10 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer10 />);
    expect(container).toMatchSnapshot();
  });
});
