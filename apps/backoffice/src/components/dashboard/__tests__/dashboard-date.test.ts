import { describe, expect, it } from "vitest";

import {
  DASHBOARD_DEFAULT_PRESET,
  getDefaultRange,
  getInterval,
  parseRange,
} from "../dashboard-date";

describe("DASHBOARD_DEFAULT_PRESET", () => {
  it("is 'last-30'", () => {
    expect(DASHBOARD_DEFAULT_PRESET).toBe("last-30");
  });
});

describe("getDefaultRange", () => {
  it("returns 30-day range ending today", () => {
    const today = new Date("2026-01-31T12:00:00");
    const range = getDefaultRange(today);
    expect(range.from.getFullYear()).toBe(2026);
    expect(range.from.getMonth()).toBe(0); // January
    expect(range.from.getDate()).toBe(2);
    expect(range.to.getFullYear()).toBe(2026);
    expect(range.to.getMonth()).toBe(0);
    expect(range.to.getDate()).toBe(31);
  });

  it("uses current date when no argument", () => {
    const range = getDefaultRange();
    const now = new Date();
    expect(range.to.getDate()).toBe(now.getDate());
  });
});

describe("parseRange", () => {
  it("parses valid date strings", () => {
    const result = parseRange({
      dateFrom: "2026-01-01",
      dateTo: "2026-01-31",
    });
    expect(result).toBeDefined();
    expect(result!.from.getFullYear()).toBe(2026);
    expect(result!.to.getFullYear()).toBe(2026);
  });

  it("returns undefined for missing dates", () => {
    expect(parseRange({})).toBeUndefined();
    expect(parseRange({ dateFrom: "2026-01-01" })).toBeUndefined();
    expect(parseRange({ dateTo: "2026-01-31" })).toBeUndefined();
  });

  it("returns undefined for invalid dates", () => {
    expect(
      parseRange({ dateFrom: "not-a-date", dateTo: "also-not" }),
    ).toBeUndefined();
  });
});

describe("getInterval", () => {
  it("returns 'hour' for <= 3 days", () => {
    const from = new Date("2026-01-01");
    const to = new Date("2026-01-03");
    expect(getInterval(from, to)).toBe("hour");
  });

  it("returns 'day' for 4-95 days", () => {
    const from = new Date("2026-01-01");
    const to = new Date("2026-03-01");
    expect(getInterval(from, to)).toBe("day");
  });

  it("returns 'week' for 96-420 days", () => {
    const from = new Date("2026-01-01");
    const to = new Date("2027-01-01");
    expect(getInterval(from, to)).toBe("week");
  });

  it("returns 'month' for > 420 days", () => {
    const from = new Date("2026-01-01");
    const to = new Date("2028-01-01");
    expect(getInterval(from, to)).toBe("month");
  });
});
