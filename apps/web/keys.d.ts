import type { TModalProps, TSheetProps } from "@ui/types/globals";

import type { MODALS } from "@/components/modals/data";

declare global {
  namespace Keys {
    type TModals = Record<string, TModalProps>;
    type TModalKeys = keyof typeof MODALS;
    type TModalSlots = "DEFAULT";

    type TSheets = Record<string, TSheetProps>;
    type TSheetKeys = string | "DEFAULT";
    type TSheetSlots = "DEFAULT";
  }
}
export {};
