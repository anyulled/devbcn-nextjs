import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock("swiper/modules", () => ({}));

describe("Home1 Section6 Component", () => {
  it("matches snapshot", async () => {
    const Section6 = (await import("@/components/sections/home1/section6")).default;
    const { container } = render(<Section6 />);
    expect(container).toMatchSnapshot();
  });
});
