"use client";

import { createContext, use, useCallback, useMemo, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { _TModalProps, Any, TLayoutProps } from "@ui/types/globals";

export type TModalData<
  TData extends object = object,
  TForm extends UseFormReturn<Any> = UseFormReturn<Any>,
> = {
  isOpen: boolean;
  data?: TData;
  form?: TForm;
  onClose?: () => void;
} & (
  | {
      type: "MODAL";
      modalID: Keys.TModalKeys;
      slot?: Keys.TModalSlots;
    }
  | {
      type: "SHEET";
      modalID: Keys.TSheetKeys;
      slot?: Keys.TSheetSlots;
    }
);

type ExtractModalProps<T extends Keys.TModalKeys | Keys.TSheetKeys> =
  T extends Keys.TModalKeys
    ? Keys.TModals[T]["component"] extends React.FC<_TModalProps<infer P>>
      ? P
      : never
    : T extends Keys.TSheetKeys
      ? Keys.TSheets[T]["component"] extends React.FC<_TModalProps<infer P>>
        ? P
        : never
      : never;

export type TOpenParams = {
  [Key in Keys.TModalKeys | Keys.TSheetKeys]: {
    data?: ExtractModalProps<Key>;
    onClose?: () => void;
    slot?: Key extends Keys.TModalKeys
      ? Keys.TModalSlots
      : Key extends Keys.TSheetKeys
        ? Keys.TSheetSlots
        : never;
    modalID: Key;
    type: Key extends Keys.TModalKeys ? "MODAL" : "SHEET";
  };
}[Keys.TModalKeys | Keys.TSheetKeys];

export type TModalContext = {
  data: TModalData[];
  open: (params: TOpenParams) => void;
  close: (modalID: Keys.TModalKeys | Keys.TSheetKeys) => void;
  setForm: (
    form: UseFormReturn<Any>,
    modalID: Keys.TModalKeys | Keys.TSheetKeys,
  ) => void;
};

const ModalContext = createContext<TModalContext | undefined>(undefined);

const useModalContext = () => {
  const context = use(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export default function ModalContextProvider({ children }: TLayoutProps) {
  const [data, setData] = useState<TModalData[]>([]);

  const open: TModalContext["open"] = useCallback((props) => {
    setData((prev) =>
      prev
        .filter((d) => d.isOpen)
        .concat({
          isOpen: true,
          slot: props.slot || "DEFAULT",
          ...props,
        }),
    );
  }, []);

  const close: TModalContext["close"] = useCallback((modalID) => {
    setData((prev) =>
      prev.map((d) => (d.modalID === modalID ? { ...d, isOpen: false } : d)),
    );
  }, []);

  const setForm: TModalContext["setForm"] = useCallback((form, modalID) => {
    setData((prev) =>
      prev.map((d) => (d.modalID === modalID ? { ...d, form: form } : d)),
    );
  }, []);

  const memoized = useMemo(
    () => ({ data, open, close, setForm }),
    [data, open, close, setForm],
  );

  return <ModalContext value={memoized}>{children}</ModalContext>;
}

export { ModalContext, useModalContext };
