import type { Metadata } from "next";

import {
  fetchChatControllerGetConversation,
  fetchChatControllerListConversations,
  type ChatConversationResponse,
} from "@repo/services/web";

import ChatLayout from "@/components/chat/chat-layout";

export const metadata: Metadata = { title: "Chat" };
export const dynamic = "force-dynamic";

export default async function ChatPage(props: PageProps<"/chat/[id]">) {
  const { id } = await props.params;

  const conversations = await fetchChatControllerListConversations({});
  let conversation: ChatConversationResponse | undefined;
  try {
    conversation = await fetchChatControllerGetConversation({
      pathParams: { id },
    });
  } catch {
    conversation = undefined;
  }

  return (
    <ChatLayout
      data={conversations}
      conversationId={id}
      initialConversation={conversation}
    />
  );
}
