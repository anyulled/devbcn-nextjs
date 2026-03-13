/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render } from "@testing-library/react";
import AboutCounter from "@/components/elements/AboutCounter";

describe("AboutCounter Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<AboutCounter />);
    expect(container).toMatchSnapshot();
  });
});
