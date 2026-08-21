import { useState } from "react";

import { Button } from "@ui/components/ui/button";
import type { _FormModalProps } from "@ui/types/extended";

export type TDeleteItemContent = {
  /** Resource being deleted, e.g. "conversation". */
  id: string;
  /** Human readable name shown in the confirm dialog. */
  name?: string;
  itemIds?: string[];
  message?: string;
  description?: React.ReactNode;
  callback?: () => void;
  deleteButtonText?: string;
  /** Actual delete implementation; called by the delete modal. */
  deleteByID?: (
    initiatorName: string,
    data: TDeleteItemContent,
  ) => Promise<void> | void;
};

export default function DeleteItemModal({
  close,
  data,
  initiatorName,
}: _FormModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const typedData = data as TDeleteItemContent | undefined;
  const { name, itemIds, deleteByID } = typedData ?? {};
  const isBulk = Boolean(itemIds?.length);

  const handleDelete = async () => {
    if (!deleteByID || !initiatorName || !typedData) return;
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteByID(initiatorName, typedData);
      typedData.callback?.();
      close();
    } catch {
      close();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 3xl:space-y-10 px-4">
      <div className="space-y-4">
        <h3 className="text-xl 3xl:text-2xl font-medium text-center">
          Are you sure?
        </h3>

        {typedData?.description ? (
          typedData.description
        ) : (
          <p className="text-center text-sm 3xl:text-base">
            You are about to delete {isBulk ? "these" : "this"}{" "}
            <span className="font-semibold">
              {isBulk ? `${itemIds?.length} ` : ""}
              {name || "item"}
              {isBulk ? " (s)" : ""}
            </span>
            . This action cannot be undone.
          </p>
        )}
      </div>
      <div className="gap-2 flex flex-col w-full">
        <Button onClick={handleDelete} disabled={isDeleting}>
          {typedData?.deleteButtonText ||
            `Yes, Delete ${isBulk ? "All Selected" : "It"}.`}
        </Button>
        <Button variant="outline" onClick={close} disabled={isDeleting}>
          No, Cancel.
        </Button>
      </div>
    </div>
  );
}
