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
      <div className="flex items-center gap-2.5 rounded-sm border border-primary/20 bg-primary/5 px-2.5 py-2">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary/10">
          <BadgeCheck className="size-3.5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-foreground/80">
            Google Calendar
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Request pending
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm px-2.5 py-2">
      <div className="flex items-center gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Connect calendar
        </p>
        <Tooltip>
          <TooltipContent className="max-w-sm text-xs w-fit ml-4 text-justify">
            This app is in Google test mode, so you can&apos;t connect your
            calendar directly. Send a request and the developer will add your
            Google account as a tester.
          </TooltipContent>
          <TooltipTrigger asChild>
            <span className="inline-flex cursor-help">
              <InfoIcon className="size-3.5 text-muted-foreground" />
            </span>
          </TooltipTrigger>
        </Tooltip>
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="mt-2 w-full border-dashed text-xs"
        disabled={requestAccess.isPending}
        onClick={() => requestAccess.mutate({})}
      >
        {requestAccess.isPending && (
          <Loader2Icon className="mr-1 size-3.5 animate-spin" />
        )}
        Request Access
      </Button>
    </div>
  );
}
