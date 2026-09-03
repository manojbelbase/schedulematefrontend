import { describe, expect, it } from "vitest";

import { queryKeyFn, useQueriesContext } from "../queries-context";

describe("useQueriesContext", () => {
  it("returns empty fetcherOptions and queryOptions", () => {
    const result = useQueriesContext();
    expect(result).toEqual({
      fetcherOptions: {},
      queryOptions: {},
    });
  });
});

describe("queryKeyFn", () => {
  it("splits simple path into key segments", () => {
    const operation = {
      path: "/api/chat/conversations",
      variables: {},
    };
    const result = queryKeyFn(operation as never);
    expect(result).toEqual(["api", "chat", "conversations"]);
  });

  it("resolves path params", () => {
    const operation = {
      path: "/api/chat/{id}/messages",
      variables: {
        pathParams: { id: "123" },
      },
    };
    const result = queryKeyFn(operation as never);
    expect(result).toEqual(["api", "chat", "123", "messages"]);
  });

  it("appends query params", () => {
    const operation = {
      path: "/api/users",
      variables: {
        queryParams: { role: "admin" },
      },
    };
    const result = queryKeyFn(operation as never);
    expect(result).toEqual(["api", "users", { role: "admin" }]);
  });

  it("appends body", () => {
    const operation = {
      path: "/api/auth/login",
      variables: {
        body: { email: "test@test.com" },
      },
    };
    const result = queryKeyFn(operation as never);
    expect(result).toEqual([
      "api",
      "auth",
      "login",
      { email: "test@test.com" },
    ]);
  });
});
