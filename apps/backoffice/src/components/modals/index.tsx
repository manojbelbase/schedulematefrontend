"use client";

import ModalX from "@ui/components/deployables/modal";
import SheetX from "@ui/components/deployables/sheet";

import { EXIT_WARNING_MODAL, MODALS, SHEETS } from "./data";

export { EXIT_WARNING_MODAL } from "./data";

export function ModalsRenderer() {
  return (
    <>
      <ModalX
        slot="DEFAULT"
        items={MODALS}
        EXIT_WARNING_MODAL={EXIT_WARNING_MODAL}
      />
      <SheetX
        slot="DEFAULT"
        items={SHEETS}
        EXIT_WARNING_MODAL={EXIT_WARNING_MODAL}
      />
    </>
  );
}
