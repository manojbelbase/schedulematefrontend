"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LibraryBig,
  MessageSquare,
  MessageSquarePlus,
  PanelLeftClose,
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
        "relative flex h-full shrink-0 flex-col justify-between border-r border-border/50 bg-sidebar transition-all duration-200 ease-in-out",
        expanded ? "w-72" : "w-[72px]",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex h-14 shrink-0 items-center justify-between px-3">
          {expanded ? (
            <Link href="/" className="min-w-0 ml-4">
              <Logo className="scale-[0.55] origin-left" />
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
              "hidden size-8 shrink-0 text-muted-foreground hover:text-foreground",
              expanded && "flex",
            )}
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>

        <div className="px-2 pb-1">
          <Button
            onClick={onNewChat}
            className={cn(
              "w-full gap-2 border-dashed text-muted-foreground hover:text-foreground",
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
                            isActive && "opacity-100",
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

        <div className="shrink-0 border-t border-border/50 px-2 py-2 space-y-1">
          <RequestLimitIndicator expanded={expanded} />
          <CalendarConnectButton expanded={expanded} />
          <UserProfileButton expanded={expanded} />
        </div>
      </div>
    </aside>
  );
}
