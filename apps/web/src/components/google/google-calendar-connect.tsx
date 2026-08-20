"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, CalendarX2Icon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import { Skeleton } from "@ui/components/ui/skeleton";

import {
  calendarConnectionControllerStatusQuery,
  useCalendarConnectionControllerDisconnect,
  useCalendarConnectionControllerStatus,
} from "@repo/services/web";

import { calendarConnectUrl } from "@/config/api";

export function GoogleCalendarConnect() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notifiedRef = useRef(false);

  const { data, isPending } = useCalendarConnectionControllerStatus({});
  const disconnect = useCalendarConnectionControllerDisconnect({
    onSuccess: async () => {
      toast.success("Google Calendar disconnected.");
      await queryClient.invalidateQueries({
        queryKey: calendarConnectionControllerStatusQuery({}).queryKey,
      });
    },
    onError: (error) => {
      const message =
        typeof error === "object" && error !== null && "payload" in error
          ? String(
              (error as { payload?: { message?: unknown } }).payload?.message ??
                "Could not disconnect. Please try again.",
            )
          : "Could not disconnect. Please try again.";
      toast.error(message);
    },
  });

  const connected = data?.data.connected ?? false;

  useEffect(() => {
    if (notifiedRef.current) return;
    if (searchParams.get("google") === "connected") {
      notifiedRef.current = true;
      toast.success("Google Calendar connected successfully.");
    } else if (searchParams.get("error")) {
      notifiedRef.current = true;
      toast.error("Could not connect Google Calendar. Please try again.");
    }
  }, [searchParams]);

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {connected ? (
          <CalendarIcon className="text-primary size-5" />
        ) : (
          <CalendarX2Icon className="text-muted-foreground size-5" />
        )}
        <div>
          <p className="text-foreground text-sm font-medium">Google Calendar</p>
          <p className="text-muted-foreground text-xs">
            {connected
              ? `Connected as ${data?.data.googleEmail ?? "your Google account"}.`
              : "Connect your Google Calendar to manage scheduling."}
          </p>
        </div>
      </div>
      {connected ? (
        <Button
          variant="outline"
          className="w-full gap-2 text-destructive hover:text-destructive"
          disabled={disconnect.isPending}
          onClick={() => disconnect.mutate({})}
        >
          {disconnect.isPending && (
            <Loader2Icon className="size-4 animate-spin" />
          )}
          Disconnect Google Calendar
        </Button>
      ) : (
        <Button asChild variant="outline" className="w-full gap-2">
          <Link href={calendarConnectUrl("/")}>Connect Google Calendar</Link>
        </Button>
      )}
    </div>
  );
}
