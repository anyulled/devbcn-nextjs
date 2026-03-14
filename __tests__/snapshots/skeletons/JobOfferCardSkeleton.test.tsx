import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import JobOfferCardSkeleton from "@/components/skeletons/JobOfferCardSkeleton";

describe("JobOfferCardSkeleton Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<JobOfferCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
