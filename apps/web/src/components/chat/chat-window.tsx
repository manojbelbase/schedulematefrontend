"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { Textarea } from "@ui/components/ui/textarea";
import { cn } from "@ui/lib/utils";

import { EmptyState } from "@/components/chat/chat-empty-state";
import { MessageBubble } from "@/components/chat/message-bubble";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import type { ChatMessage } from "@/types/chat";

type ChatWindowProps = {
  messages: ChatMessage[];
  isSending: boolean;
  onSend: (content: string) => void;
  onPromptClick: (prompt: string) => void;
  userName?: string;
};

export default function ChatWindow({
  messages,
  isSending,
  onSend,
  onPromptClick,
  userName,
}: ChatWindowProps) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const submit = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(value);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {hasMessages || isSending ? (
          <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-6">
            {messages.map((message) => {
              if (message.role === "assistant" && !message.content) {
                return null;
              }
              return <MessageBubble key={message.id} message={message} />;
            })}
            {isSending && <TypingIndicator />}
          </div>
        ) : (
          <EmptyState userName={userName} onPromptClick={onPromptClick} />
        )}
      </div>

      <div className="flex justify-center px-4 pb-4 pt-2 sm:px-6">
        <div className="w-full max-w-3xl">
          <div className="flex items-end gap-1.5 rounded-full border  p-1">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              rows={1}
              autoFocus
              className="field-sizing-content  min-h-10 max-h-[160px] resize-none border-0  px-2.5 py-2 text-sm leading-relaxed shadow-none rounded-full focus-visible:ring-0  placeholder:text-muted-foreground/70"
            />
            <Button
              size="icon"
              onClick={() => submit(value)}
              disabled={!value.trim() || isSending}
              aria-label="Send message"
              className={cn(
                "size-8 shrink-0 rounded-full transition-colors",
                value.trim() && !isSending
                  ? "bg-primary text-primary-foreground"
                  : "bg-foreground/5 text-foreground/40",
              )}
            >
              <SendHorizonal className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            ScheduledMate can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
