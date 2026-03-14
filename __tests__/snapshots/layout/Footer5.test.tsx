import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer5 from "@/components/layout/footer/Footer5";

describe("Footer5 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer5 />);
    expect(container).toMatchSnapshot();
  });
});
