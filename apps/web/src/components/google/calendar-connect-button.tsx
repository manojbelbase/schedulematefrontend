"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, LogOut as LogOutIcon } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { GoogleCalendarIcon } from "@ui/components/ui/google-calendar-icon";
import { options } from "@ui/lib/utils";

import {
  accessRequestControllerGetMyAccessRequestQuery,
  calendarConnectionControllerGetConnectionStatusQuery,
  useAccessRequestControllerGetMyAccessRequest,
  useCalendarConnectionControllerDisconnect,
  useCalendarConnectionControllerGetConnectionStatus,
} from "@repo/services/web";

import { calendarConnectUrl } from "@/config/api";

import { RequestAccessForm } from "./request-access-form";

export function CalendarConnectButton({ expanded }: { expanded: boolean }) {
  const queryClient = useQueryClient();
  const { data, isPending } =
    useCalendarConnectionControllerGetConnectionStatus({});
  const accessQuery = useAccessRequestControllerGetMyAccessRequest({});
  const disconnect = useCalendarConnectionControllerDisconnect(
    options(undefined, async () => {
      await queryClient.invalidateQueries({
        queryKey: calendarConnectionControllerGetConnectionStatusQuery({})
          .queryKey,
      });
    }),
  );

  const connected = data?.data.connected ?? false;
  const accessStatus = accessQuery.data?.data?.status ?? null;

  async function handleRequested() {
    await queryClient.invalidateQueries({
      queryKey: accessRequestControllerGetMyAccessRequestQuery({}).queryKey,
    });
  }

  if (expanded) {
    if (isPending) {
      return (
        <div className="flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-muted-foreground">
          <Loader2 className="size-4 shrink-0 animate-spin" />
          <span className="truncate text-xs">Checking calendar…</span>
        </div>
      );
    }

    return connected ? (
      <div className="group flex items-center gap-2.5 rounded-sm border border-border  px-2.5 py-2">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary/10">
          <GoogleCalendarIcon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-foreground">
            Google Calendar
          </p>
          <p className="truncate text-xs text-muted-foreground">Connected</p>
        </div>
        <Button
          type="button"
          variant={"outline"}
          size={"icon-xs"}
          title="Disconnect Google Calendar"
          className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
          disabled={disconnect.isPending}
          onClick={() => disconnect.mutate({})}
        >
          {disconnect.isPending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <LogOutIcon className="size-3.5" />
          )}
        </Button>
      </div>
    ) : accessStatus === "approved" ? (
      <Link
        href={calendarConnectUrl("/")}
        className="group flex items-center gap-2.5 rounded-sm border border-dashed border-border px-2.5 py-2 transition-colors hover:bg-primary/5 bg-sidebar-accent/40"
        title="Connect Google Calendar"
      >
        <div className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-muted">
          <GoogleCalendarIcon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground/80">
            Google Calendar
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Connect to sync events
          </p>
        </div>
      </Link>
    ) : (
      <RequestAccessForm status={accessStatus} onRequested={handleRequested} />
    );
  }

  if (!connected && accessStatus !== "approved") {
    return null;
  }

  return (
    <div className="flex justify-center py-1.5">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="size-9"
        title={
          connected ? "Google Calendar connected" : "Connect Google Calendar"
        }
      >
        {connected ? (
          <span className="flex size-9 items-center justify-center">
            <Check className="size-4 text-primary" />
          </span>
        ) : (
          <Link href={calendarConnectUrl("/")}>
            <GoogleCalendarIcon className="size-4" />
          </Link>
        )}
      </Button>
    </div>
  );
}
