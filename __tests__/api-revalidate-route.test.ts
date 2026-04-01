import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";

const revalidateTagMock = jest.fn();

jest.mock("next/cache", () => ({
  __esModule: true,
  revalidateTag: (...args: unknown[]) => revalidateTagMock(...args),
}));

jest.mock("next/server", () => ({
  __esModule: true,
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) =>
      new Response(JSON.stringify(body), {
        headers: {
          "content-type": "application/json",
        },
        status: init?.status ?? 200,
      }),
  },
}));

describe("POST /api/revalidate", () => {
  const originalSecret = process.env.REVALIDATE_SECRET;

  beforeEach(() => {
    process.env.REVALIDATE_SECRET = "test-secret";
    revalidateTagMock.mockClear();
    jest.resetModules();
  });

  afterEach(() => {
    process.env.REVALIDATE_SECRET = originalSecret;
  });

  it("revalidates the current edition when no year is provided", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const request = new Request("https://www.devbcn.com/api/revalidate", {
      method: "POST",
      headers: {
        authorization: "Bearer test-secret",
      },
    });

    const response = await POST(request as never);
    const payload = (await response.json()) as { revalidated: boolean; year: string };

    expect(response.status).toBe(200);
    expect(payload.revalidated).toBe(true);
    expect(payload.year).toBe("2026");
    expect(revalidateTagMock).toHaveBeenCalledWith("sessionize:2026", "default");
  });

  it("revalidates the requested edition when the payload includes a valid year", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const request = new Request("https://www.devbcn.com/api/revalidate", {
      method: "POST",
      headers: {
        authorization: "Bearer test-secret",
        "content-type": "application/json",
      },
      body: JSON.stringify({ year: "2025" }),
    });

    const response = await POST(request as never);
    const payload = (await response.json()) as { revalidated: boolean; year: string };

    expect(response.status).toBe(200);
    expect(payload.revalidated).toBe(true);
    expect(payload.year).toBe("2025");
    expect(revalidateTagMock).toHaveBeenCalledWith("sessionize:2025", "default");
  });

  it("rejects invalid edition years", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const request = new Request("https://www.devbcn.com/api/revalidate", {
      method: "POST",
      headers: {
        authorization: "Bearer test-secret",
        "content-type": "application/json",
      },
      body: JSON.stringify({ year: "2030" }),
    });

    const response = await POST(request as never);
    const payload = (await response.json()) as { message: string };

    expect(response.status).toBe(400);
    expect(payload.message).toBe("Invalid edition year");
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("rejects unauthorized requests", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const request = new Request("https://www.devbcn.com/api/revalidate", {
      method: "POST",
    });

    const response = await POST(request as never);
    const payload = (await response.json()) as { message: string };

    expect(response.status).toBe(401);
    expect(payload.message).toBe("Unauthorized");
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });
});
