import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock("swiper/modules", () => ({}));

import Section4 from "@/components/sections/home1/section4";

describe("Home1 Section4 Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Section4 />);
    expect(container).toMatchSnapshot();
  });
});
