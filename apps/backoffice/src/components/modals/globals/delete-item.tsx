"use client";

import { Button } from "@ui/components/ui/button";
import type { TDeleteItemModalData } from "@ui/types/extended";
import type { _TModalProps } from "@ui/types/globals";

export default function DeleteItemModal<T extends object = object>({
  close,
  data,
}: _TModalProps<TDeleteItemModalData<T>>) {
  const handleDelete = () => {
    data?.callback?.();
    close();
  };

  return (
    <div className="space-y-4">
      {data?.description ? (
        <div className="text-sm text-muted-foreground">{data.description}</div>
      ) : (
        <p className="text-sm text-muted-foreground">
          You are about to delete{" "}
          <span className="font-semibold text-foreground">
            {data?.itemIds?.length ? `${data.itemIds.length} ` : ""}
            {data?.name || "item"}
            {data?.itemIds?.length ? " (s)" : ""}
          </span>
          . This action cannot be undone.
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={close}>
          No, Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          {data?.deleteButtonText ||
            `Yes, Delete ${data?.itemIds?.length ? "All Selected" : "It"}.`}
        </Button>
      </div>
    </div>
  );
}
