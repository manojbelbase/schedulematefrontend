import type { MODALS } from "@/components/modals/data";

declare global {
  namespace Keys {
    type TModalKeys = keyof typeof MODALS;
    type TSheetKeys = string | "DEFAULT";
  }
}
export {};
