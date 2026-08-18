import type { TModalProps, TSheetProps } from "@ui/types/globals";

declare global {
  namespace Keys {
    type TModals = Record<TModalKeys, TModalProps>;
    type TModalKeys = keyof TModals;
    type TModalSlots = "DEFAULT";

    type TSheets = Record<TSheetKeys, TSheetProps>;
    type TSheetKeys = keyof TSheets;
    type TSheetSlots = "DEFAULT";
  }
}

export {};