import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Countdown from "@/components/elements/Countdown";

describe("Countdown Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Countdown eventDate="2026-06-15T09:00:00" />);
    expect(container).toMatchSnapshot();
  });
});
