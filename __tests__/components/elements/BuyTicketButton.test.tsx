/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render } from "@testing-library/react";
import BuyTicketButton from "@/components/elements/BuyTicketButton";

describe("BuyTicketButton Component", () => {
  it("matches snapshot with default props", () => {
    const { container } = render(<BuyTicketButton />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with custom props", () => {
    const { container } = render(
      <BuyTicketButton href="https://example.com" className="custom-btn" text="Custom Text" target="_self" rel="nofollow">
        <span>Child Node</span>
      </BuyTicketButton>
    );
    expect(container).toMatchSnapshot();
  });
});
