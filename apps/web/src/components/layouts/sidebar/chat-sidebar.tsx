"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LibraryBig,
  MessageSquarePlus,
  PanelLeftClose,
  Plus,
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
  const path = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const expanded = isExpanded || isHovered;

  useEffect(() => {
    setIsExpanded(true);
    setIsHovered(false);
  }, [path]);

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex h-full shrink-0 flex-col justify-between border-r border-border bg-sidebar transition-all ease-in-out duration-300",
        expanded ? "w-72" : "w-20",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          {expanded ? (
            <Link href="/" className="min-w-0">
              <Logo className="scale-[0.6] origin-left" />
            </Link>
          ) : (
            <Link href="/" className="mx-auto">
              <LibraryBig className="size-5 text-primary" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden shrink-0 text-muted-foreground",
              expanded && "flex",
            )}
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>

        <div className="p-3">
          <Button
            onClick={onNewChat}
            className={cn("w-full", !expanded && "px-0")}
            variant="default"
          >
            <MessageSquarePlus className="size-4 shrink-0" />
            {expanded && <span>New chat</span>}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {expanded ? (
            <>
              <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                Conversations
              </p>
              <div className="space-y-1">
                {conversations.map((conversation) => {
                  const isActive = conversation.id === activeConversationId;
                  return (
                    <div key={conversation.id} className="group relative">
                      <button
                        type="button"
                        onClick={() => onSelectConversation(conversation.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-sm border border-transparent px-3 py-2.5 text-left text-sm transition-colors shadow-none",
                          isActive
                            ? "border-sidebar-border bg-sidebar-accent"
                            : "text-sidebar-foreground hover:bg-sidebar-accent",
                        )}
                      >
                        <MessageSquarePlus className="size-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{conversation.title}</span>
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
                        <button
                          type="button"
                          aria-label={`Delete ${conversation.title}`}
                          className={cn(
                            "absolute top-1/2 right-1.5 -translate-y-1/2 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-destructive group-hover:opacity-100",
                            isActive && "opacity-100",
                          )}
                        >
                          <Plus className="size-3.5 rotate-45" />
                        </button>
                      </ModalTrigger>
                    </div>
                  );
                })}
                {conversations.length === 0 && (
                  <p className="px-3 py-2 text-xs text-muted-foreground">
                    No conversations yet
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1">
              {conversations.map((conversation) => {
                const isActive = conversation.id === activeConversationId;
                return (
                  <button
                    key={conversation.id}
                    type="button"
                    title={conversation.title}
                    onClick={() => onSelectConversation(conversation.id)}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                      isActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <MessageSquarePlus className="size-4" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="shrink-0 px-3 py-2">
          {expanded ? (
            <div className="space-y-1 rounded-md border border-sidebar-border bg-sidebar/50 p-1.5">
              <RequestLimitIndicator expanded={expanded} />
              <CalendarConnectButton expanded={expanded} />
              <UserProfileButton expanded={expanded} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <CalendarConnectButton expanded={expanded} />
              <UserProfileButton expanded={expanded} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
