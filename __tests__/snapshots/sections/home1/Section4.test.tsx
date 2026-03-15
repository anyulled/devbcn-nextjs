import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock("swiper/modules", () => ({}));

describe("Home1 Section4 Component", () => {
  it("matches snapshot", async () => {
    const Section4 = (await import("@/components/sections/home1/section4")).default;
    const { container } = render(<Section4 />);
    expect(container).toMatchSnapshot();
  });
});
