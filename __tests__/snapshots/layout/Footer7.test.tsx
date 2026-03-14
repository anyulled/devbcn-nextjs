import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Footer7 from "@/components/layout/footer/Footer7";

describe("Footer7 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Footer7 />);
    expect(container).toMatchSnapshot();
  });
});
