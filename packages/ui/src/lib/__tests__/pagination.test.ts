import { describe, expect, it } from "vitest";

import {
  DEFAULT_PAGINATION_FILTER,
  withDefaultPagination,
} from "../pagination";

describe("DEFAULT_PAGINATION_FILTER", () => {
  it("has take=25 and page=0", () => {
    expect(DEFAULT_PAGINATION_FILTER).toEqual({ take: 25, page: 0 });
  });
});

describe("withDefaultPagination", () => {
  it("applies defaults to empty object", () => {
    const result = withDefaultPagination({});
    expect(result).toEqual({ take: 25, page: 0 });
  });

  it("keeps valid take and page", () => {
    const result = withDefaultPagination({ take: 10, page: 5 });
    expect(result).toEqual({ take: 10, page: 5 });
  });

  it("defaults take when negative", () => {
    const result = withDefaultPagination({ take: -1, page: 0 });
    expect(result).toEqual({ take: 25, page: 0 });
  });

  it("defaults page when negative", () => {
    const result = withDefaultPagination({ take: 10, page: -1 });
    expect(result).toEqual({ take: 10, page: 0 });
  });

  it("preserves extra params", () => {
    const result = withDefaultPagination({
      take: 10,
      page: 0,
      search: "hello",
    });
    expect(result).toEqual({ take: 10, page: 0, search: "hello" });
  });

  it("handles string numbers", () => {
    const result = withDefaultPagination({ take: "5", page: "2" });
    expect(result).toEqual({ take: 5, page: 2 });
  });
});
