"use client";

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
import { useAuthStore } from "@/zustand/auth";

type TProps = {
  collapsed: boolean;
};

export default function ProfilePopover({ collapsed }: TProps) {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const displayName = user?.name || user?.username || "Account";
  const email = user?.email;
  const initial = displayName.slice(0, 2).toUpperCase();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          title={user ? `${displayName} · ${email ?? ""}`.trim() : "Account"}
          className={cn(
            "flex w-full items-center gap-2 rounded-sm px-1 py-2 text-left transition-all duration-150 hover:bg-sidebar-accent/60 data-[state=open]:bg-sidebar-accent/60 border border-border/40 bg-sidebar-accent/40",
            collapsed && "justify-center px-0",
          )}
        >
          <Avatar className="size-8 shrink-0 rounded-sm bg-primary/10">
            <AvatarFallback className="rounded-sm bg-primary/10 text-xs font-semibold text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {displayName}
              </p>
              {email && (
                <p className="truncate text-xs text-muted-foreground">
                  {email}
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
        className="w-72 overflow-hidden p-0 mb-2"
      >
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="size-8 shrink-0 rounded-sm bg-primary/10">
            <AvatarFallback className="rounded-sm bg-primary/10 text-sm  text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </p>
            {email && (
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            )}
          </div>
        </div>
        <Separator />
        <div className="p-1">
          <ThemeToggle />
          <Separator className="my-1" />
          <button
            type="button"
            onClick={() => void logout()}
            className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
