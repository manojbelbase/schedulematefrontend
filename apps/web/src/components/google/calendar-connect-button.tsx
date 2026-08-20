"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import {
  CalendarIcon,
  CalendarX2Icon,
  Check,
  Loader2,
  LogOut as LogOutIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

import {
  calendarConnectionControllerStatusQuery,
  useCalendarConnectionControllerDisconnect,
  useCalendarConnectionControllerStatus,
} from "@repo/services/web";

import { calendarConnectUrl } from "@/config/api";

export function CalendarConnectButton({ expanded }: { expanded: boolean }) {
  const queryClient = useQueryClient();
  const { data, isPending } = useCalendarConnectionControllerStatus({});
  const disconnect = useCalendarConnectionControllerDisconnect({
    onSuccess: async () => {
      toast.success("Google Calendar disconnected.");
      await queryClient.invalidateQueries({
        queryKey: calendarConnectionControllerStatusQuery({}).queryKey,
      });
    },
    onError: () => toast.error("Could not disconnect. Please try again."),
  });

  const connected = data?.data.connected ?? false;

  if (expanded) {
    if (isPending) {
      return (
        <Button
          variant="outline"
          className="h-auto w-full justify-start gap-2 overflow-hidden py-2"
          disabled
        >
          <Loader2 className="size-4 shrink-0 animate-spin" />
          <span className="truncate">Checking calendar…</span>
        </Button>
      );
    }

    return connected ? (
      <div className="group flex items-center gap-2 overflow-hidden rounded-md border bg-card px-3 py-2.5">
        <CalendarX2Icon className="size-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Google Calendar</p>
          <p className="truncate text-xs text-muted-foreground">
            Calendar connected
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          title="Disconnect Google Calendar"
          disabled={disconnect.isPending}
          onClick={() => disconnect.mutate({})}
        >
          <Loader2
            className={cn(
              "size-3.5 animate-spin",
              !disconnect.isPending && "hidden",
            )}
          />
          <LogOutIcon
            className={cn("size-3.5", disconnect.isPending && "hidden")}
          />
        </Button>
      </div>
    ) : (
      <Button
        asChild
        variant="outline"
        className="h-auto w-full justify-start gap-2 overflow-hidden py-2"
        title="Connect Google Calendar"
      >
        <Link href={calendarConnectUrl("/")}>
          <CalendarIcon className="size-4 shrink-0 text-primary" />
          <span className="truncate">Connect Google Calendar</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="size-10"
      title={
        connected ? "Google Calendar connected" : "Connect Google Calendar"
      }
    >
      {connected ? (
        <span className="flex size-10 items-center justify-center">
          <Check className="size-4 text-primary" />
        </span>
      ) : (
        <Link href={calendarConnectUrl("/")}>
          <CalendarIcon className="size-4" />
        </Link>
      )}
    </Button>
  );
}
