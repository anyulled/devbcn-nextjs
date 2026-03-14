import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import ThemeSwitch from "@/components/elements/ThemeSwitch";

describe("ThemeSwitch Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<ThemeSwitch />);
    expect(container).toMatchSnapshot();
  });
});
