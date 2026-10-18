import { describe, expect, it } from "vitest";
import { normalizeBotToken } from "./token";

describe("normalizeBotToken", () => {
  it("leaves a raw token unchanged", () => {
    expect(normalizeBotToken("abc.def.ghi")).toBe("abc.def.ghi");
  });
  it("removes an optional Bot prefix", () => {
    expect(normalizeBotToken("  Bot abc.def.ghi  ")).toBe("abc.def.ghi");
  });
  it("accepts a full Authorization header", () => {
    expect(normalizeBotToken("Authorization: Bot abc.def.ghi")).toBe("abc.def.ghi");
  });
  it("unwraps a quoted prefixed token", () => {
    expect(normalizeBotToken('"Bot abc.def.ghi"')).toBe("abc.def.ghi");
  });
  it("returns empty for non-string input", () => {
    expect(normalizeBotToken(null)).toBe("");
    expect(normalizeBotToken(123)).toBe("");
  });
});
