"use client";

import { createContext, useContext, useRef, useState } from "react";

import type { _LayoutProps } from "@ui/types/globals";
import { ModalType } from "@ui/types/types";

export type TModalData = {
  //unique key for each modal instance, used to identify and close the correct modal
  uid?: number;
  isOpen: boolean;
  initiatorName?: string;
  isDirty?: boolean;
  data?: object;
  queryKeys?: string[][];
  onClose?: () => void;
  allowExit?: boolean;
} & (
  | {
      modalID?: Keys.TModalKeys;
      type: ModalType.MODAL;
    }
  | {
      modalID?: Keys.TSheetKeys;
      type: ModalType.SHEET;
    }
);

export type TOpenParams<T extends object> = {
  initiatorName?: string;
  data?: T;
  queryKeys?: string[][];
  onClose?: () => void;
  allowExit?: boolean;
  /**
   * If provided, the modal with this ID will be closed before opening the new modal. This is useful for scenarios where you want to ensure that only one modal is open at a time, or when you want to replace an existing modal with a new one.
   */
  closeModalBeforeOpen?: Keys.TModalKeys | Keys.TSheetKeys;
  withDelay?: boolean;
} & (
  | {
      modalID: Keys.TModalKeys;
      type: ModalType.MODAL;
    }
  | {
      modalID: Keys.TSheetKeys;
      type: ModalType.SHEET;
    }
);

export type TModalContext = {
  data: TModalData[];
  open: <T extends object>(params: TOpenParams<T>) => void;
  close: (modalID: Keys.TModalKeys | Keys.TSheetKeys) => void;
  setDirty?: (
    dirty: boolean,
    modalID: Keys.TModalKeys | Keys.TSheetKeys,
  ) => void;
};

const ModalContext = createContext<TModalContext | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export default function ModalProvider({
  children,
}: Omit<_LayoutProps, "params">) {
  const [data, setData] = useState<TModalData[]>([]);
  const uidCounter = useRef(0);

  const open = <T extends object>({
    modalID,
    initiatorName,
    type,
    data,
    queryKeys,
    onClose,
    allowExit = true,
    withDelay = false,
    closeModalBeforeOpen,
  }: TOpenParams<T>) => {
    const applyOpen = () => {
      const uid = ++uidCounter.current;

      setData((prev) => {
        // When `closeModalBeforeOpen` is provided, filter out the modal with that ID from the previous state before adding the new modal data. This ensures that the specified modal is closed before opening the new one.
        const updated = prev.filter(
          (d) =>
            d.isOpen &&
            (!closeModalBeforeOpen || d.modalID !== closeModalBeforeOpen),
        );
        const newData = updated.concat({
          uid,
          isOpen: true,
          initiatorName,
          allowExit,
          data,
          ...(type === ModalType.MODAL
            ? { modalID, type: ModalType.MODAL }
            : { modalID, type: ModalType.SHEET }),
          queryKeys,
          onClose,
        });
        return newData;
      });
    };

    if (withDelay) {
      setTimeout(applyOpen, 200);
    } else {
      applyOpen();
    }
  };

  const close = (modalID: Keys.TModalKeys | Keys.TSheetKeys) => {
    setData((prev) => {
      return prev.map((d) => {
        if (d.modalID === modalID) {
          return { ...d, isOpen: false };
        }

        return d;
      });
    });
  };

  const setDirty = (
    dirty: boolean,
    modalID: Keys.TModalKeys | Keys.TSheetKeys,
  ) => {
    setData((prev) => {
      return prev.map((d) => {
        if (d.modalID === modalID) {
          return { ...d, isDirty: dirty };
        }

        return d;
      });
    });
  };

  return (
    <ModalContext.Provider value={{ data, open, close, setDirty }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, useModalContext };
