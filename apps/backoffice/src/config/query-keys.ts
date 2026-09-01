const API = "api";

export const QUERY_KEYS = {
  users: [API, "backoffice", "users"],
  accessRequests: [API, "backoffice", "access-requests"],
  llmConfig: [API, "backoffice", "llm-config"],
  llmProviders: [API, "backoffice", "llm-config", "providers"],
  embeddingConfig: [API, "backoffice", "embedding-config"],
  embeddingProviders: [API, "backoffice", "embedding-config", "providers"],
};
