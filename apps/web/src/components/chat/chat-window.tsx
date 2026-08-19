"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Sparkles, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import { Textarea } from "@ui/components/ui/textarea";
import { cn } from "@ui/lib/utils";

import { CHAT_PROMPTS } from "@/components/chat/chat-prompts.data";
import type { ChatMessage } from "@/types/chat";

type ChatWindowProps = {
  messages: ChatMessage[];
  isStreaming: boolean;
  onSend: (content: string) => void;
  onPromptClick: (prompt: string) => void;
  userName?: string;
};

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <Avatar className="mt-0.5 size-8 shrink-0 bg-primary/10">
          <AvatarFallback className="bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <Avatar className="mt-0.5 size-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function EmptyState({
  userName,
  onPromptClick,
}: {
  userName?: string;
  onPromptClick: (prompt: string) => void;
}) {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="size-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">
          How can I help you{userName ? `, ${userName}` : ""}?
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Ask me to plan your day, find a free slot, or organize your schedule.
        </p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        {CHAT_PROMPTS.map((prompt, i) => (
          <button
            key={prompt.title}
            type="button"
            onClick={() => onPromptClick(prompt.title)}
            className="group flex flex-col gap-2 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-sm font-medium text-foreground">
              {prompt.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {prompt.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatWindow({
  messages,
  isStreaming,
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
    if (!trimmed || isStreaming) return;
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
        {hasMessages ? (
          <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isStreaming && (
              <div className="flex w-full items-center gap-3">
                <Avatar className="mt-0.5 size-8 shrink-0">
                  <AvatarFallback className="bg-primary/10">
                    <Sparkles className="size-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1.5 rounded-2xl bg-muted px-4 py-3">
                  <span className="size-1.5 animate-pulse rounded-full bg-foreground/40" />
                  <span
                    className="size-1.5 animate-pulse rounded-full bg-foreground/40"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="size-1.5 animate-pulse rounded-full bg-foreground/40"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState userName={userName} onPromptClick={onPromptClick} />
        )}
      </div>

      <div className="border-t bg-background/95 p-4 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border bg-card p-2 shadow-sm focus-within:border-ring focus-within:ring-ring/30 focus-within:ring-[3px]">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ScheduledMate..."
              rows={1}
              className="max-h-48 min-h-[40px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button
              size="icon"
              onClick={() => submit(value)}
              disabled={!value.trim() || isStreaming}
              aria-label="Send message"
              className="shrink-0 rounded-xl"
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
