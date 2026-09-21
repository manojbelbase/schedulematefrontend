import type { Metadata } from "next";

import { fetchChatControllerListConversations } from "@repo/services/web";

import ChatLayout from "@/components/pages/chat/chat-layout";

export const metadata: Metadata = { title: "ScheduleMate AI" };
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const conversations = await fetchChatControllerListConversations({});

  return <ChatLayout data={conversations} />;
}
