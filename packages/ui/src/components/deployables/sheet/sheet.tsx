"use client";

import {
  Sheet as RootSheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@ui/components/ui/sheet";
import { useModalContext, type TOpenParams } from "@ui/context/modal-context";
import { cn } from "@ui/lib/utils";
import { ModalType, type TStoredForm } from "@ui/types/globals";

type TProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  className?: string;
  variant: "form" | "warning" | "default";
  side: "top" | "bottom" | "left" | "right";
  form?: TStoredForm;

  children: React.ReactNode;
  EXIT_WARNING_MODAL: Keys.TModalKeys;
};

export default function Sheet({
  open,
  onOpenChange,

  children,

  form,
  variant,
  side,
  className,
  EXIT_WARNING_MODAL,
}: TProps) {
  const { open: openWarningModal } = useModalContext();

  const handleChange = (open: boolean) => {
    if (variant === "form" && form && form.formState.isDirty) {
      openWarningModal({
        modalID: EXIT_WARNING_MODAL,
        type: ModalType.MODAL,
        data: {
          close: () => onOpenChange(open),
          closeOpener: () => onOpenChange(open),
          // The exit-warning modal consumes this payload; its shape is owned by the registry component.
        } as Record<string, unknown>,
      } as TOpenParams);
    } else {
      onOpenChange?.(open);
    }
  };

  return (
    <RootSheet open={open} onOpenChange={handleChange}>
      <SheetContent
        className={cn(
          "overflow-hidden flex flex-col rounded-md no-scrollbar",
          className,
        )}
        side={side}
        hideExit={side === "right" ? true : false}
      >
        <SheetTitle className="sr-only">Sheet</SheetTitle>
        <SheetDescription className="sr-only">A Sheet Opened</SheetDescription>
        {children}
      </SheetContent>
    </RootSheet>
  );
}
