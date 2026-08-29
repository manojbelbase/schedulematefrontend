"use client";

import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useModalContext } from "@ui/context/modal-context";
import { type Any } from "@ui/types/globals";

import Sheet from "./sheet";

type TProps = {
  slot: Keys.TSheetSlots;
  items: Keys.TSheets;
  EXIT_WARNING_MODAL: Keys.TModalKeys;
};

export default function SheetX({ slot, items, EXIT_WARNING_MODAL }: TProps) {
  const { data, setForm, close, open } = useModalContext();

  const sheets = useMemo(
    () => data.filter((d) => d.slot === slot) || [],
    [data, slot],
  );

  const safeExtract = (key: Keys.TSheetKeys) => {
    return key in items
      ? items[key]
      : {
          component: (() => null) as React.FC<Any>,
          variant: "default" as const,
          className: "",
          side: "right" as const,
        };
  };

  return sheets.map((sheet, i) => {
    if (sheet.type !== "SHEET") return null;

    const isSheetOpened = sheet.isOpen;
    const sheetId = sheet.modalID;
    const sheetData = sheet.data || {};
    const sheetOnClose = sheet.onClose || (() => {});
    const form = sheet.form;

    const SheetComponent = safeExtract(sheetId)?.component;

    const handleClose = () => {
      if (sheetId) {
        close(sheetId);
        sheetOnClose();
      }
    };

    const setFormCallback = (form: UseFormReturn<Any>) => {
      if (sheetId) setForm(form, sheetId);

      return () => {};
    };

    return (
      <Sheet
        key={i}
        open={isSheetOpened}
        onOpenChange={handleClose}
        form={form}
        variant={safeExtract(sheetId)?.variant || "form"}
        side={safeExtract(sheetId)?.side || "right"}
        className={safeExtract(sheetId)?.className}
        EXIT_WARNING_MODAL={EXIT_WARNING_MODAL}
      >
        {SheetComponent && (
          <SheetComponent
            {...({
              close: handleClose,
              open,
              data: sheetData,
              setForm: setFormCallback,
            } as Any)}
          />
        )}
      </Sheet>
    );
  });
}
