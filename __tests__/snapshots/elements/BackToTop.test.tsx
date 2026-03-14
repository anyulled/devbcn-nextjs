import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import BackToTop from "@/components/elements/BackToTop";

describe("BackToTop Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<BackToTop target="#top" />);
    expect(container).toMatchSnapshot();
  });
});
