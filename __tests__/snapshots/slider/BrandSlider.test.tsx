import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import BrandSlider from "@/components/slider/BrandSlider";

describe("BrandSlider Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<BrandSlider />);
    expect(container).toMatchSnapshot();
  });
});
