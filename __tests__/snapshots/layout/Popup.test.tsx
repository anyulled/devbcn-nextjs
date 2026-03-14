import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Popup from "@/components/layout/Popup";

describe("Popup Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Popup />);
    expect(container).toMatchSnapshot();
  });
});
