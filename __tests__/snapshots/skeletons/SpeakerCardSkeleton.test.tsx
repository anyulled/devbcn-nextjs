import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import SpeakerCardSkeleton from "@/components/skeletons/SpeakerCardSkeleton";

describe("SpeakerCardSkeleton Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<SpeakerCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
