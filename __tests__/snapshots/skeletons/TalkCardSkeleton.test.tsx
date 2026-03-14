import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import TalkCardSkeleton from "@/components/skeletons/TalkCardSkeleton";

describe("TalkCardSkeleton Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<TalkCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
