import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import WTCVenue from "@/components/sections/venue/WTCVenue";

describe("WTCVenue Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<WTCVenue venueName="World Trade Center" />);
    expect(container).toMatchSnapshot();
  });
});
