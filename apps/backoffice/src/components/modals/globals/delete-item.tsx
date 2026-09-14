"use client";

import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import type { TDeleteItemModalData } from "@ui/types/extended";
import type { _TModalProps } from "@ui/types/globals";

import {
  useBackofficeControllerDeleteUser,
  useEmbeddingConfigControllerDeleteConfig,
  useLlmConfigControllerDeleteConfig,
} from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";

export default function DeleteItemModal<T extends object = object>({
  close,
  data,
}: _TModalProps<TDeleteItemModalData<T>>) {
  const queryClient = useQueryClient();

  const typedData = data as TDeleteItemModalData | undefined;

  const resolveKey = (id?: TDeleteItemModalData["id"]) => {
    switch (id) {
      case "user":
        return QUERY_KEYS.users;
      case "llm-config":
        return QUERY_KEYS.llmConfig;
      case "embedding-config":
        return QUERY_KEYS.embeddingConfig;
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

  const { mutate: mutateUser } = useBackofficeControllerDeleteUser(handler);
  const { mutate: mutateLlmConfig } =
    useLlmConfigControllerDeleteConfig(handler);
  const { mutate: mutateEmbeddingConfig } =
    useEmbeddingConfigControllerDeleteConfig(handler);

  const fn = () => {
    if (typedData?.initiatorName) {
      switch (typedData?.id) {
        case "user":
          mutateUser({
            pathParams: {
              id: typedData.initiatorName,
            },
          });
          break;
        case "llm-config":
          mutateLlmConfig({
            pathParams: {
              id: typedData.initiatorName,
            },
          });
          break;
        case "embedding-config":
          mutateEmbeddingConfig({
            pathParams: {
              id: typedData.initiatorName,
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
        <Button variant="destructive" onClick={fn}>
          {data?.deleteButtonText ||
            `Yes, Delete ${data?.itemIds?.length ? "All Selected" : "It"}.`}
        </Button>
      </div>
    </div>
  );
}
