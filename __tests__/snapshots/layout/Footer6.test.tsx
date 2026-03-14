import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer6 from "@/components/layout/footer/Footer6";

describe("Footer6 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer6 />);
    expect(container).toMatchSnapshot();
  });
});
