import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import ScheduleItemSkeleton from "@/components/skeletons/ScheduleItemSkeleton";

describe("ScheduleItemSkeleton Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<ScheduleItemSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
