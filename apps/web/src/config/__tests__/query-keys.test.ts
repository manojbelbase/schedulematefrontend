import { describe, expect, it } from "vitest";

import { QUERY_KEYS } from "@/config/query-keys";

describe("QUERY_KEYS", () => {
  it("chat key starts with 'api'", () => {
    expect(QUERY_KEYS.chat[0]).toBe("api");
  });

  it("conversations is nested under chat", () => {
    expect(QUERY_KEYS.conversations).toEqual(["api", "chat", "conversations"]);
  });

  it("auth key starts with 'api'", () => {
    expect(QUERY_KEYS.auth[0]).toBe("api");
  });

  it("me is nested under auth", () => {
    expect(QUERY_KEYS.me).toEqual(["api", "auth", "me"]);
  });

  it("calendar key starts with 'api'", () => {
    expect(QUERY_KEYS.calendar).toEqual(["api", "calendar"]);
  });
});
