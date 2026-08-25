import type { MODALS, SHEETS } from "@/components/modals/data";

declare global {
  namespace Keys {
    type TModals = typeof MODALS;
    type TModalKeys = keyof TModals;
    type TModalSlots = "DEFAULT";

    type TSheets = typeof SHEETS;
    type TSheetKeys = keyof TSheets;
    type TSheetSlots = "DEFAULT";
  }
}
export {};
