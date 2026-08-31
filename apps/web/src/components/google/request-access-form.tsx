"use client";

import { BadgeCheck, InfoIcon, Loader2Icon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { Button } from "@ui/components/ui/button";
import { options } from "@ui/lib/utils";

import {
  useAccessRequestControllerRequestAccess,
  type AccessRequestStatusEnum,
} from "@repo/services/web";

export function RequestAccessForm({
  status,
  onRequested,
}: {
  status: AccessRequestStatusEnum | null | undefined;
  onRequested: () => void | Promise<void>;
}) {
  const requestAccess = useAccessRequestControllerRequestAccess(
    options(undefined, onRequested, {
      successMessage:
        "Access request sent. Our team will add your Google account soon.",
    }),
  );

  if (status === "pending") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed bg-muted/30 px-3 py-2.5">
        <BadgeCheck className="size-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Requested</p>
          <p className="truncate text-xs text-muted-foreground">
            Waiting for the developer&apos;s approval
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled
          className="shrink-0 cursor-not-allowed"
        >
          Requested
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-dashed bg-muted/30 p-2">
      <div className="flex items-center gap-1.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex cursor-help">
              <InfoIcon className="text-muted-foreground size-4" />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            This app is in Google test mode, so you can&apos;t connect your
            calendar directly. Send a request and the developer will add your
            Google account as a tester.
          </TooltipContent>
        </Tooltip>
        <p className="text-sm font-medium">Connect Google Calendar</p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground ">
        This app is in test mode, so you can&apos;t connect directly — send a
        request and the developer will grant you access.
      </p>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="mt-2 w-full gap-2"
        disabled={requestAccess.isPending}
        onClick={() => requestAccess.mutate({})}
      >
        {requestAccess.isPending && (
          <Loader2Icon className="size-4 animate-spin" />
        )}
        Request Access
      </Button>
    </div>
  );
}
