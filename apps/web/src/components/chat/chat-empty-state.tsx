"use client";

import { Bot } from "lucide-react";

import { CHAT_PROMPTS } from "@/components/chat/chat-prompts.data";

type EmptyStateProps = {
  userName?: string;
  onPromptClick: (prompt: string) => void;
};

export function EmptyState({ userName, onPromptClick }: EmptyStateProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-11 items-center justify-center rounded-full border border-sidebar-border bg-sidebar shadow-sm">
          <Bot className="size-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">
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
