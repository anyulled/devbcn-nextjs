import { describe, expect, it } from "@jest/globals";
import { buildOpenFeedbackTalkUrl } from "@/lib/shared/openfeedback";

describe("buildOpenFeedbackTalkUrl", () => {
  it("builds url with event id, date, and talk id", () => {
    expect(buildOpenFeedbackTalkUrl("devbcn26", "2026-06-16T10:00:00+02:00", "1188843")).toBe("https://openfeedback.io/devbcn26/2026-06-16/1188843");
  });

  it("falls back to legacy url when date is invalid", () => {
    expect(buildOpenFeedbackTalkUrl("devbcn26", "invalid-date", "1188843")).toBe("https://openfeedback.io/1188843");
  });
});
