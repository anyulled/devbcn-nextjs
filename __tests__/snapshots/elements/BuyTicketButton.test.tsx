import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import BuyTicketButton from "@/components/elements/BuyTicketButton";

describe("BuyTicketButton Component", () => {
  it("matches snapshot with default props", () => {
    const { container } = render(<BuyTicketButton />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with custom text", () => {
    const { container } = render(<BuyTicketButton text="Get Your Ticket" />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with custom href", () => {
    const { container } = render(<BuyTicketButton href="https://example.com/tickets" />);
    expect(container).toMatchSnapshot();
  });
});
