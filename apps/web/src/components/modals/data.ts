import type { _TModal } from "@ui/types/extended";

import DeleteItemModal from "./globals/delete-item";

type TKeys = "DELETE_MODAL" | "WARN_FORM_EXIT";

export const MODALS: {
  [key in TKeys]: _TModal;
} = {
  DELETE_MODAL: {
    component: DeleteItemModal,
    variant: "form",
    className: "sm:max-w-md!",
  },
  WARN_FORM_EXIT: {
    component: DeleteItemModal,
    variant: "warning",
    className: "sm:max-w-md!",
  },
};
