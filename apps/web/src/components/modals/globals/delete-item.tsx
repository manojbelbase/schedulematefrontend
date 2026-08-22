"use client";

import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import type { _FormModalProps, TDeleteItemModalData } from "@ui/types/extended";

import { useChatControllerDeleteConversation } from "@repo/services/web";

import { QUERY_KEYS } from "@/config/query-keys";

export default function DeleteItemModal({
  close,
  data,
  initiatorName,
}: _FormModalProps) {
  const queryClient = useQueryClient();

  const typedData = data as TDeleteItemModalData | undefined;

  const resolveKey = (id?: TDeleteItemModalData["id"]) => {
    switch (id) {
      case "conversation":
        return QUERY_KEYS.conversations;
      case "chat":
        return QUERY_KEYS.chat;
      default:
        return [];
    }
  };

  const handler: Omit<
    UseMutationOptions<unknown, unknown, unknown, unknown>,
    "mutationFn"
  > = {
    onSuccess(r, _variables, _context) {
      const res = r as { message: string };
      toast.success(
        typedData?.message || res.message || "Item deleted successfully.",
      );
      void queryClient.invalidateQueries({
        queryKey: resolveKey(typedData?.id),
      });

      typedData?.callback?.();
    },

    onError(e, _variables, _context) {
      const error = e as { message: string };
      toast.error(error?.message || "Cannot delete item!");
    },
  };

  const { mutate: mutateConversation } =
    useChatControllerDeleteConversation(handler);

  const fn = () => {
    if (initiatorName) {
      switch (typedData?.id) {
        case "conversation":
          mutateConversation({
            pathParams: {
              id: initiatorName,
            },
          });
          break;
        default:
          break;
      }
    }
    close();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 px-4 3xl:space-y-10">
      <div className="space-y-4">
        <h3 className="text-center text-xl font-medium 3xl:text-2xl">
          Are you sure?
        </h3>
        <p className="text-center text-sm 3xl:text-base">
          You are about to delete {typedData?.itemIds ? "these" : "this"}{" "}
          <span className="font-semibold">
            {typedData?.itemIds?.length || ""} {typedData?.name || "item"}{" "}
            {typedData?.itemIds?.length ? "(s)" : ""}
          </span>
          . This action cannot be undone.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button onClick={() => void fn()}>Yes, Delete It.</Button>
        <Button variant="outline" onClick={close}>
          No, Cancel.
        </Button>
      </div>
    </div>
  );
}
