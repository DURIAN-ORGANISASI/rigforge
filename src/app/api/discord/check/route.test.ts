import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const mockFetch = vi.fn<typeof fetch>();
function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
function request(body: unknown): Request {
  return new Request("http://localhost/api/discord/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/discord/check", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal("fetch", mockFetch);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("normalizes a pasted Bot prefix and validates a token without a channel", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ id: "123", username: "RigForgeBot", bot: true }));
    const response = await POST(request({ token: "  Bot abc.def.ghi  ", channelId: "" }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      ok: true, status: "aktif", tokenValid: true, channelChecked: false,
      botId: "123", botUsername: "RigForgeBot",
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0]?.[1]?.headers).toEqual({ Authorization: "Bot abc.def.ghi" });
  });

  it("reports a valid token separately when a channel is inaccessible", async () => {
    mockFetch
      .mockResolvedValueOnce(jsonResponse({ id: "123", username: "RigForgeBot", bot: true }))
      .mockResolvedValueOnce(jsonResponse({ message: "Missing Access" }, 403));
    const response = await POST(request({ token: "abc.def.ghi", channelId: "123456789012345678" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      ok: false, status: "gagal", tokenValid: true,
      channelChecked: false, botUsername: "RigForgeBot",
    });
    expect(data.error).toContain("Bot Token valid");
  });

  it("does not claim the token is invalid when Discord cannot be reached", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network unavailable"));
    const response = await POST(request({ token: "abc.def.ghi", channelId: "" }));
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.tokenValid).toBeUndefined();
    expect(data.error).toContain("tidak dapat menghubungi Discord");
  });
});
