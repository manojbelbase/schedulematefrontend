"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MessageSquare,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Trash,
} from "lucide-react";

import { Button } from "@ui/components/ui/button";
import ModalTrigger from "@ui/components/ui/trigger";
import { cn } from "@ui/lib/utils";
import type { TDeleteItemModalData } from "@ui/types/extended";
import { ModalType } from "@ui/types/types";

import { CalendarConnectButton } from "@/components/google/calendar-connect-button";
import RequestLimitIndicator from "@/components/layouts/sidebar/request-limit-indicator";
import UserProfileButton from "@/components/layouts/sidebar/user-profile-button";
import Logo from "@/components/logo";
import { QUERY_KEYS } from "@/config/query-keys";

type TConversation = {
  id: string;
  title: string;
};

type ChatSidebarProps = {
  conversations: TConversation[];
  activeConversationId?: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
};

export default function ChatSidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
}: ChatSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const expanded = isExpanded;

  return (
    <aside
      className={cn(
        "relative flex h-full shrink-0 flex-col justify-between border-r border-border bg-sidebar transition-all duration-200 ease-in-out",
        expanded ? "w-72" : "w-[72px]",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex h-14 shrink-0 items-center justify-between px-3">
          <Link
            href="/"
            className={cn("min-w-0", expanded ? "ml-4" : "mx-auto")}
          >
            {expanded ? (
              <Logo className="scale-[0.55] origin-left  ml-6" />
            ) : (
              <Image
                src="/schedulemate-logo.png"
                alt="ScheduleMate AI"
                width={300}
                height={300}
                className="size-8"
              />
            )}
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 -right-3 z-30 size-6 rounded-full border-border bg-background text-muted-foreground shadow-xs  hover:text-foreground"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            {expanded ? (
              <PanelLeftClose className="size-3.5" />
            ) : (
              <PanelLeftOpen className="size-3.5" />
            )}
          </Button>
        </div>

        <div className="px-2 pb-1">
          <Button
            onClick={onNewChat}
            className={cn(
              "w-full gap-2 border-border text-muted-foreground rounded-sm hover:text-foreground",
              !expanded && "px-0 justify-center",
            )}
            variant="outline"
            size="sm"
          >
            <MessageSquarePlus className="size-4 shrink-0" />
            {expanded && <span>New chat</span>}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-1">
          {expanded ? (
            <>
              <p className="mb-1 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Conversations
              </p>
              <div className="space-y-0.5">
                {conversations.map((conversation) => {
                  const isActive = conversation.id === activeConversationId;
                  return (
                    <div key={conversation.id} className="group relative">
                      <button
                        type="button"
                        onClick={() => onSelectConversation(conversation.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left text-sm transition-all duration-150",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                        )}
                      >
                        <MessageSquare className="size-4 shrink-0" />
                        <span className="truncate mr-5">
                          {conversation.title}
                        </span>
                      </button>
                      <ModalTrigger<TDeleteItemModalData>
                        modalID="DELETE_MODAL"
                        type={ModalType.MODAL}
                        initiatorName={conversation.id}
                        queryKeys={[QUERY_KEYS.conversations]}
                        data={{
                          id: "conversation",
                          name: conversation.title,
                        }}
                      >
                        <Button
                          type="button"
                          size={"icon-xs"}
                          variant={"secondary"}
                          aria-label={`Delete ${conversation.title}`}
                          className={cn(
                            "absolute top-1/2 right-1 -translate-y-1/2 rounded-sm   text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100",
                          )}
                        >
                          <Trash className="size-4" />
                        </Button>
                      </ModalTrigger>
                    </div>
                  );
                })}
                {conversations.length === 0 && (
                  <p className="px-2 py-3 text-xs text-muted-foreground">
                    No conversations yet
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 pt-1">
              {conversations.map((conversation) => {
                const isActive = conversation.id === activeConversationId;
                return (
                  <button
                    key={conversation.id}
                    type="button"
                    title={conversation.title}
                    onClick={() => onSelectConversation(conversation.id)}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-sm text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-foreground",
                      isActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <MessageSquare className="size-4" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border px-2 py-2 space-y-1">
          <RequestLimitIndicator expanded={expanded} />
          <CalendarConnectButton expanded={expanded} />
          <UserProfileButton expanded={expanded} />
        </div>
      </div>
    </aside>
  );
}
