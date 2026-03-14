import { expect, describe, it, jest } from "@jest/globals";
import React from "react";
import { render } from "@testing-library/react";
import Menu from "../../components/layout/Menu";
import "@testing-library/jest-dom";

// Mock router since Next.js navigation works differently in tests
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("Menu Component", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Menu />);
    expect(container).toMatchSnapshot();
  });
});
