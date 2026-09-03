import { describe, expect, it } from "vitest";

import {
  cn,
  filterDirtyData,
  getBackendErrorMessage,
  objectToQueryString,
  parseInfiniteQueryData,
  parsePrice,
  unique,
} from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conflicting tailwind classes", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });
});

describe("parsePrice", () => {
  it("parses a number price", () => {
    const result = parsePrice(99.99);
    expect(result.value).toBe(99.99);
    expect(result.toDollar()).toBe(99.99);
    expect(result.toCent()).toBe(9999);
  });

  it("parses a string price", () => {
    const result = parsePrice("49.50");
    expect(result.value).toBe(49.5);
  });

  it("parses cent price", () => {
    const result = parsePrice(1999, true);
    expect(result.value).toBe(19.99);
  });

  it("returns null for null input", () => {
    const result = parsePrice(null);
    expect(result.value).toBeNull();
    expect(result.toCent()).toBeNull();
    expect(result.toDollar()).toBeNull();
  });

  it("returns NaN for empty string", () => {
    const result = parsePrice("");
    expect(result.value).toBeNaN();
  });

  it("returns 0 for NaN string", () => {
    const result = parsePrice("abc");
    expect(result.value).toBe(0);
  });

  it("formats with comma", () => {
    const result = parsePrice(1234.56);
    expect(result.toAddComa()).toBe("1,234.56");
  });

  it("formats zero with comma", () => {
    const result = parsePrice(null);
    expect(result.toAddComa()).toBe("0");
  });
});

describe("unique", () => {
  it("deduplicates primitives", () => {
    expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("deduplicates strings", () => {
    expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  it("deduplicates objects by key (keeps last)", () => {
    const input = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
    ];
    expect(unique(input, "id")).toEqual([
      { id: 1, name: "c" },
      { id: 2, name: "b" },
    ]);
  });
});

describe("objectToQueryString", () => {
  it("builds query string from object", () => {
    const result = objectToQueryString({ name: "test", age: "25" });
    expect(result).toContain("name=test");
    expect(result).toContain("age=25");
    expect(result).toMatch(/^\?/);
  });

  it("skips undefined values", () => {
    const result = objectToQueryString({ a: "1", b: undefined });
    expect(result).toContain("a=1");
    expect(result).not.toContain("b=");
  });

  it("handles array values", () => {
    const result = objectToQueryString({ tags: ["a", "b"] });
    expect(result).toContain("tags=a");
    expect(result).toContain("tags=b");
  });

  it("handles raw key", () => {
    const result = objectToQueryString({ raw: "custom=query" });
    expect(result).toContain("custom=query");
  });
});

describe("getBackendErrorMessage", () => {
  it("extracts message from error object", () => {
    expect(getBackendErrorMessage({ message: "Not found" })).toBe("Not found");
  });

  it("extracts message from payload", () => {
    expect(
      getBackendErrorMessage({ payload: { message: "Server error" } }),
    ).toBe("Server error");
  });

  it("returns default for unknown error", () => {
    expect(getBackendErrorMessage(null)).toBe("Something went wrong.");
    expect(getBackendErrorMessage(undefined)).toBe("Something went wrong.");
    expect(getBackendErrorMessage("string error")).toBe(
      "Something went wrong.",
    );
  });

  it("handles USER_QUOTA_EXCEEDED", () => {
    const error = {
      payload: {
        code: "USER_QUOTA_EXCEEDED",
        upgradeInfo: {
          message: "Quota exceeded",
          contact: {
            email: "test@example.com",
            phone: "123456",
            portfolio: "https://example.com",
          },
        },
      },
    };
    const result = getBackendErrorMessage(error);
    expect(result).toContain("Quota exceeded");
    expect(result).toContain("test@example.com");
    expect(result).toContain("123456");
  });
});

describe("filterDirtyData", () => {
  it("returns full data when no dirtyFields", () => {
    const data = { name: "test", age: 25 };
    expect(filterDirtyData(data)).toEqual(data);
  });

  it("filters only dirty fields", () => {
    const data = { name: "test", age: 25, email: "a@b.com" };
    const dirtyFields = { name: true, age: true };
    expect(filterDirtyData(data, dirtyFields)).toEqual({
      name: "test",
      age: 25,
    });
  });

  it("handles nested dirty fields", () => {
    const data = {
      user: { name: "test", email: "a@b.com" },
      title: "hello",
    };
    const dirtyFields = { user: { name: true } };
    expect(filterDirtyData(data, dirtyFields)).toEqual({
      user: { name: "test" },
    });
  });
});

describe("parseInfiniteQueryData", () => {
  it("returns empty object for undefined data", () => {
    expect(parseInfiniteQueryData(undefined)).toEqual({});
  });

  it("flattens paginated data", () => {
    const data = {
      pages: [
        {
          data: [{ id: 1 }, { id: 2 }],
          pagination: { total: 4, count: 2, nextPage: 1, previousPage: null },
          message: "ok",
        },
        {
          data: [{ id: 3 }, { id: 4 }],
          pagination: { total: 4, count: 2, nextPage: null, previousPage: 0 },
          message: "ok",
        },
      ],
      pageParams: [0, 1],
    };
    const result = parseInfiniteQueryData(data);
    expect(result.data).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    expect(result.count).toBe(2);
    expect(result.pagination).toEqual({
      total: 4,
      count: 2,
      nextPage: null,
      previousPage: 0,
    });
  });
});
