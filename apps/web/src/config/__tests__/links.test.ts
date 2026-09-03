import { describe, expect, it } from "vitest";

import { LINKS } from "@/config/links";

describe("LINKS", () => {
  it("has DASHBOARD pointing to root", () => {
    expect(LINKS.DASHBOARD).toBe("/");
  });

  it("has all required route paths", () => {
    expect(LINKS.APPOINTMENTS).toBe("/appointments");
    expect(LINKS.BOOKINGS).toBe("/bookings");
    expect(LINKS.CALENDAR).toBe("/calendar");
    expect(LINKS.AVAILABILITY).toBe("/availability");
    expect(LINKS.SETTINGS).toBe("/settings");
  });

  it("all values start with /", () => {
    Object.values(LINKS).forEach((path) => {
      expect(path).toMatch(/^\//);
    });
  });
});
