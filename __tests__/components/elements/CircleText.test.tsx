/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render } from "@testing-library/react";
import CircleText from "@/components/elements/CircleText";

describe("CircleText Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<CircleText text="test circle text" />);
    expect(container).toMatchSnapshot();
  });
});
