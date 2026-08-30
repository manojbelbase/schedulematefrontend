"use client";

import { Button } from "@ui/components/ui/button";
import type { _TModalProps, Any } from "@ui/types/globals";

export default function ConfirmFormExit({ close, data }: _TModalProps<Any>) {
  const { ok, cancel, closeOpener, description } = data || {};
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {description ||
          "You have unsaved changes. Are you sure you want to exit?"}
      </p>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            close();
            cancel?.();
          }}
          size={"sm"}
        >
          {cancel ? "No" : "Cancel"}
        </Button>
        <Button
          onClick={() => {
            close();
            closeOpener?.();
            ok?.();
          }}
          size={"sm"}
        >
          {ok ? "Yes" : "Confirm"}
        </Button>
      </div>
    </div>
  );
}
