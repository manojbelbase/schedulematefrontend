"use client";

import { AIResponseParser } from "ai-response-parser";

import { cn } from "@ui/lib/utils";

import type { ChatMessage } from "@/types/chat";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "rounded-xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "max-w-[75%] rounded-br-sm bg-primary text-primary-foreground"
            : "w-fit max-w-full rounded-tl-sm border border-border bg-card text-foreground",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="[&_pre]:overflow-x-auto [&_pre]:bg-muted/60 [&_pre]:p-3 [&_pre]:rounded-sm [&_pre]:my-2 ">
            <AIResponseParser
              content={message.content}
              textColor="var(--foreground)"
              className="border-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
