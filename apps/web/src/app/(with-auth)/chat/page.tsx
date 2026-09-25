import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  fetchChatControllerCreateConversation,
  fetchChatControllerListConversations,
} from "@repo/services/web";

export const metadata: Metadata = { title: "Chat" };
export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const conversationsResponse = await fetchChatControllerListConversations({});
  const conversations = conversationsResponse.data ?? [];

  const emptyConv = conversations.find((c) => c.title === "New conversation");

  if (emptyConv?.id) {
    redirect(`/chat/${emptyConv.id}`);
  }

  const response = await fetchChatControllerCreateConversation({ body: {} });
  const conversationId = response.data?.id;

  if (!conversationId) {
    // The (with-auth) layout already proved a session exists, so a failure
    // here is a backend problem - sending the user to /auth/login would be
    // a lie and would needlessly drop them out of the app.
    throw new Error("Could not create a new conversation.");
  }

  redirect(`/chat/${conversationId}`);
}
