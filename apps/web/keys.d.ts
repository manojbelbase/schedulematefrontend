import type { TModalProps, TSheetProps } from "@ui/types/globals";

declare global {
  namespace Keys {
    type TModals = Record<string, TModalProps>;
    type TModalKeys = keyof TModals;
    type TModalSlots = "DEFAULT";

    type TSheets = Record<string, TSheetProps>;
    type TSheetKeys = keyof TSheets;
    type TSheetSlots = "DEFAULT";
  }
}
export {};