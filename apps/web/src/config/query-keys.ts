/**
 * Centralized react-query keys.
 *
 * The generated service keys mirror the API paths
 * (e.g. `/api/chat/conversations` -> `["api", "chat", "conversations"]`),
 * so these constants must stay aligned with them.
 */
const API = "api";

export const QUERY_KEYS = {
  chat: [API, "chat"],
  conversations: [API, "chat", "conversations"],
  calendar: [API, "calendar"],
  auth: [API, "auth"],
  me: [API, "auth", "me"],
};
