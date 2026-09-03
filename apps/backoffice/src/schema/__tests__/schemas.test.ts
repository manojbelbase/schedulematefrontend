import { describe, expect, it } from "vitest";

import { EmbeddingConfigFormSchema } from "../embedding-config.schema";
import { LlmConfigFormSchema } from "../llm-config.schema";
import {
  AddUserSchema,
  UpdateUserLimitSchema,
  UserSchema,
} from "../user.schema";

describe("AddUserSchema", () => {
  it("accepts valid email", () => {
    expect(AddUserSchema.safeParse({ email: "test@test.com" }).success).toBe(
      true,
    );
  });

  it("accepts optional name", () => {
    expect(
      AddUserSchema.safeParse({ name: "John", email: "a@b.com" }).success,
    ).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(AddUserSchema.safeParse({ email: "not-email" }).success).toBe(false);
  });

  it("rejects missing email", () => {
    expect(AddUserSchema.safeParse({}).success).toBe(false);
  });
});

describe("UserSchema", () => {
  it("accepts valid user", () => {
    expect(
      UserSchema.safeParse({
        name: "John",
        email: "john@test.com",
        username: "john123",
      }).success,
    ).toBe(true);
  });

  it("accepts minimal user (only email)", () => {
    expect(UserSchema.safeParse({ email: "a@b.com" }).success).toBe(true);
  });
});

describe("UpdateUserLimitSchema", () => {
  it("accepts valid limit", () => {
    expect(
      UpdateUserLimitSchema.safeParse({ apiRequestLimit: 100 }).success,
    ).toBe(true);
  });

  it("accepts zero limit", () => {
    expect(
      UpdateUserLimitSchema.safeParse({ apiRequestLimit: 0 }).success,
    ).toBe(true);
  });

  it("accepts resetUsed flag", () => {
    expect(
      UpdateUserLimitSchema.safeParse({
        apiRequestLimit: 50,
        resetUsed: true,
      }).success,
    ).toBe(true);
  });

  it("rejects negative limit", () => {
    expect(
      UpdateUserLimitSchema.safeParse({ apiRequestLimit: -1 }).success,
    ).toBe(false);
  });

  it("rejects limit > 100000", () => {
    expect(
      UpdateUserLimitSchema.safeParse({ apiRequestLimit: 100001 }).success,
    ).toBe(false);
  });

  it("rejects non-integer limit", () => {
    expect(
      UpdateUserLimitSchema.safeParse({ apiRequestLimit: 1.5 }).success,
    ).toBe(false);
  });

  it("rejects non-numeric limit", () => {
    expect(
      UpdateUserLimitSchema.safeParse({ apiRequestLimit: "abc" }).success,
    ).toBe(false);
  });
});

describe("LlmConfigFormSchema", () => {
  const validConfig = {
    name: "My LLM",
    activeProvider: "openai",
    apiKey: "sk-123",
    model: "gpt-4",
  };

  it("accepts valid config", () => {
    expect(LlmConfigFormSchema.safeParse(validConfig).success).toBe(true);
  });

  it("rejects missing name", () => {
    const { name, ...rest } = validConfig;
    expect(LlmConfigFormSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects empty name", () => {
    expect(
      LlmConfigFormSchema.safeParse({ ...validConfig, name: "" }).success,
    ).toBe(false);
  });

  it("rejects name > 100 chars", () => {
    expect(
      LlmConfigFormSchema.safeParse({
        ...validConfig,
        name: "x".repeat(101),
      }).success,
    ).toBe(false);
  });

  it("rejects empty apiKey", () => {
    expect(
      LlmConfigFormSchema.safeParse({ ...validConfig, apiKey: "" }).success,
    ).toBe(false);
  });
});

describe("EmbeddingConfigFormSchema", () => {
  const validConfig = {
    name: "My Embedding",
    activeProvider: "openai",
    apiKey: "sk-123",
    model: "text-embedding-ada-002",
  };

  it("accepts valid config", () => {
    expect(EmbeddingConfigFormSchema.safeParse(validConfig).success).toBe(true);
  });

  it("rejects missing fields", () => {
    expect(EmbeddingConfigFormSchema.safeParse({}).success).toBe(false);
  });
});
