import type { Metadata } from "next";

import { fetchChatControllerListConversations } from "@repo/services/web";

import ChatLayout from "@/components/chat/chat-layout";

export const metadata: Metadata = { title: "Chat" };
export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const conversations = await fetchChatControllerListConversations({});

  return <ChatLayout data={conversations} />;
}
