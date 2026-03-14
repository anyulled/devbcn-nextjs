/**
 * @jest-environment jsdom
 */

import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { render } from "@testing-library/react";
import React from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
}));

describe("Modal Component", () => {
  it("matches snapshot", async () => {
    const Modal = (await import("@/components/ui/Modal")).default;
    const { container } = render(
      <Modal>
        <div>Test Modal Content</div>
      </Modal>
    );
    expect(container).toMatchSnapshot();
  });
});
