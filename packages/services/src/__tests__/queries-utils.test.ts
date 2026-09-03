import { describe, expect, it } from "vitest";

import { deepMerge } from "../web/queries-utils";

describe("deepMerge", () => {
  it("merges flat objects", () => {
    const target = { a: 1 };
    const source = { b: 2 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("overwrites existing keys", () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3 };
    const result = deepMerge(target, source);
    expect(result.b).toBe(3);
  });

  it("deep merges nested objects", () => {
    const target = { user: { name: "old" } };
    const source = { user: { email: "new@test.com" } };
    const result = deepMerge(target, source);
    expect(result).toEqual({
      user: { name: "old", email: "new@test.com" },
    });
  });

  it("handles empty target", () => {
    const result = deepMerge({}, { a: 1 });
    expect(result).toEqual({ a: 1 });
  });

  it("handles empty source", () => {
    const result = deepMerge({ a: 1 }, {});
    expect(result).toEqual({ a: 1 });
  });
});
