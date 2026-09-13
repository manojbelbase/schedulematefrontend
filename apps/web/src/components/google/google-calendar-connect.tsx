"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import { GoogleCalendarIcon } from "@ui/components/ui/google-calendar-icon";
import { Skeleton } from "@ui/components/ui/skeleton";
import { options } from "@ui/lib/utils";

import {
  accessRequestControllerGetMyAccessRequestQuery,
  useAccessRequestControllerGetMyAccessRequest,
  useCalendarConnectionControllerDisconnect,
  useCalendarConnectionControllerGetConnectionStatus,
} from "@repo/services/web";

import { calendarConnectUrl } from "@/config/api";
import { QUERY_KEYS } from "@/config/query-keys";

import { RequestAccessForm } from "./request-access-form";

export function GoogleCalendarConnect() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notifiedRef = useRef(false);

  const { data, isPending } =
    useCalendarConnectionControllerGetConnectionStatus({});
  const accessQuery = useAccessRequestControllerGetMyAccessRequest({});

  const disconnect = useCalendarConnectionControllerDisconnect(
    options(undefined, async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.calendar,
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
        <GoogleCalendarIcon className="size-5" />
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
      ) : accessStatus === "approved" ? (
        <Button asChild variant="outline" className="w-full gap-2">
          <Link href={calendarConnectUrl("/")}>Connect Google Calendar</Link>
        </Button>
      ) : (
        <RequestAccessForm
          status={accessStatus}
          onRequested={handleRequested}
        />
      )}
    </div>
  );
}
