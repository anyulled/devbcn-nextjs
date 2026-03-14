import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import AddClassBody from "@/components/elements/AddClassBody";

describe("AddClassBody Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<AddClassBody />);
    expect(container).toMatchSnapshot();
  });
});
