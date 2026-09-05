"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@ui/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { Separator } from "@ui/components/ui/separator";
import { cn } from "@ui/lib/utils";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/hooks/use-auth";

export default function UserProfileButton({ expanded }: { expanded: boolean }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const displayName = user?.name || user?.username || "Account";
  const subLabel = user ? `@${user.username ?? user.email}` : undefined;
  const initial = displayName.slice(0, 2).toUpperCase();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          title={user ? `${displayName} · ${subLabel}` : "Account"}
          className={cn(
            "group flex w-full items-center gap-2.5 rounded-sm px-2 py-2 text-left transition-all duration-150 hover:bg-sidebar-accent/60 bg-sidebar-accent/40 border-border border cursor-pointer",
            !expanded && "justify-center px-0",
          )}
        >
          <Avatar className="size-8 shrink-0 rounded-sm bg-primary/10">
            <AvatarFallback className="rounded-sm bg-primary/10 text-xs text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>
          {expanded && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {displayName}
              </p>
              {subLabel && (
                <p className="truncate text-xs text-muted-foreground">
                  {subLabel.length > 28
                    ? `${subLabel.slice(0, 28)}…`
                    : subLabel}
                </p>
              )}
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="right"
        sideOffset={12}
        className="w-72 overflow-hidden p-0 mb-4"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar className="size-10 shrink-0 rounded-sm bg-primary/10">
            <AvatarFallback className="rounded-sm bg-primary/10 text-sm font-medium text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <Separator />
        <div className="p-1">
          <ThemeToggle />
          <Link
            href="/auth/logout"
            className="flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Sign out
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
