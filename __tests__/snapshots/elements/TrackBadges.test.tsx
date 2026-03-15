import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import TrackBadges from "@/components/elements/TrackBadges";

describe("TrackBadges Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<TrackBadges />);
    expect(container).toMatchSnapshot();
  });
});
